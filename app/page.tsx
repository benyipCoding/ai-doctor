"use client";
import React, { useState, useRef, useEffect } from "react";
import ModelSelector from "./components/ModelSelector";
import UploadArea from "./components/UploadArea";
import {
  Upload,
  FileText,
  AlertCircle,
  Activity,
  HeartPulse,
  ShieldCheck,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  Camera,
  AlertTriangle,
  Info,
  Sparkles,
  Check,
  Bot,
  BookOpen,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { HomeFeature, features } from "@/constant/home";
import FeatureModal from "./components/FeatureModal";
import PreviewArea from "./components/PreviewArea";
import { AnalyzePayload } from "./api/types";

const apiKey = "";

// --- Helper: Exponential Backoff for API Calls ---
const callGeminiWithBackoff = async (
  payload: AnalyzePayload,
  retryCount = 0
) => {
  const maxRetries = 3;
  const delays = [1000, 2000, 4000];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (retryCount < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, delays[retryCount]));
      return callGeminiWithBackoff(payload, retryCount + 1);
    }
    throw error;
  }
};

export default function Home() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [models, setModels] = useState<any[]>([]); // 可用模型列表

  // --- 模型选择状态 ---
  const [selectedModel, setSelectedModel] = useState("");

  // --- 解读风格状态 ---
  const [explanationStyle, setExplanationStyle] = useState<
    "simple" | "professional"
  >("simple"); // simple | professional

  // --- 首页特性弹窗状态 (新增) ---
  const [activeFeature, setActiveFeature] = useState<HomeFeature | null>(null);

  const currentModelName = models.find((m) => m.id === selectedModel)?.name;

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 重置状态
    setResult(null);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 触发文件选择
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // 核心分析逻辑
  // const analyzeImage = async () => {
  //   if (!image) return;

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     // 去除 Base64 前缀
  //     const base64Data = (image as string).split(",")[1];
  //     const mimeType = (image as string).split(";")[0].split(":")[1];

  //     // 根据选择的风格调整 Prompt 指令
  //     const styleInstruction =
  //       explanationStyle === "professional"
  //         ? "请使用严谨、专业的医学术语进行解读。重点分析病理生理机制、临床意义及鉴别诊断。语言风格应客观、学术，适合具备一定医学背景的人群阅读。"
  //         : "请使用通俗易懂的大白话进行解读，就像医生给邻居老奶奶解释一样。尽量避免晦涩的专业术语，如果必须使用，请配合生活中的比喻来帮助理解。重点在于让普通人听懂这个指标意味着什么。";

  //     // 构造 Prompt
  //     const promptText = `
  //       你是一个专业的全栈医生助手。请分析这张医院化验单/检查报告的图片。

  //       ${styleInstruction}

  //       请提取其中的关键信息，并严格按照以下 JSON 格式返回结果（不要使用 Markdown 代码块，直接返回 JSON 字符串）：

  //       {
  //         "reportType": "报告类型（如：血常规、肝功能、肾功能等）",
  //         "patientName": "患者姓名（如果涉及隐私可模糊处理或返回'隐去'）",
  //         "healthScore": "健康评分（0-100的整数）。评分规则：若所有指标均在参考范围内，则为100分；若有异常，请根据异常指标的重要程度（如核心指标vs次要指标）和偏离程度（轻微vs严重）酌情扣分。例如：轻微异常扣2-5分，关键指标严重异常扣10-20分。",
  //         "summary": "一句话总结整体健康状况（${
  //           explanationStyle === "simple" ? "通俗易懂" : "专业严谨"
  //         }）",
  //         "abnormalities": [
  //           {
  //             "name": "指标名称",
  //             "value": "当前数值",
  //             "reference": "参考范围",
  //             "status": "偏高/偏低/阳性/异常",
  //             "explanation": "解读内容：这个指标代表什么？（请严格遵循上述的'${
  //               explanationStyle === "simple" ? "通俗" : "专业"
  //             }'风格要求）",
  //             "possibleCauses": "异常原因：哪些生活习惯、饮食、药物或生理因素可能导致此指标异常",
  //             "consequence": "详细说明：异常可能引起的问题或相关疾病",
  //             "advice": "健康管理建议（饮食、作息、复查建议等）"
  //           }
  //         ],
  //         "normalCount": "正常指标的数量（数字）",
  //         "disclaimer": "基于AI识别，结果仅供参考，不可替代专业医生诊断。"
  //       }

  //       如果图片不是化验单或无法识别，请返回一个包含 "error" 字段的 JSON，说明原因。
  //     `;

  //     const payload: AnalyzePayload = {
  //       explanationStyle,
  //       contents: [
  //         {
  //           role: "user",
  //           parts: [
  //             { text: promptText },
  //             { inlineData: { mimeType: mimeType, data: base64Data } },
  //           ],
  //         },
  //       ],
  //       generationConfig: {
  //         responseMimeType: "application/json",
  //       },
  //     };

  //     const apiResult = await callGeminiWithBackoff(payload);

  //     const responseText = apiResult.candidates?.[0]?.content?.parts?.[0]?.text;

  //     if (!responseText) {
  //       throw new Error("无法从 AI 获取响应");
  //     }

  //     // 尝试解析 JSON
  //     try {
  //       const parsedData = JSON.parse(responseText);
  //       if (parsedData.error) {
  //         setError(parsedData.error);
  //       } else {
  //         setResult(parsedData);
  //       }
  //     } catch (e) {
  //       console.error("JSON Parse Error", e);
  //       const cleanedText = responseText
  //         .replace(/```json/g, "")
  //         .replace(/```/g, "");
  //       setResult(JSON.parse(cleanedText));
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError("分析过程中发生错误，请稍后重试或检查网络。");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const test = async () => {
    // 去除 Base64 前缀
    const base64Data = (image as string).split(",")[1];
    const mimeType = (image as string).split(";")[0].split(":")[1];

    const payload: AnalyzePayload = {
      explanationStyle,
      mimeType: mimeType,
      data: base64Data,
      llmKey: "gemini-2.5-flash-preview-09-2025",
    };

    const res = await fetch("/api/ai_power", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Test API Response:", data);
  };

  const getLLMs = async () => {
    const res = await fetch("/api/llms");
    const data = await res.json();
    setModels(data);
    setSelectedModel(data[0]?.id);
  };

  const resetAnalysis = () => {
    setImage(null);
    setResult(null);
    setError(null);
  };

  useEffect(() => {
    getLLMs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 顶部导航 - 适配移动端宽度 */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg shrink-0">
              <Activity className="w-5 h-5 text-white" />
            </div>
            {/* 小屏显示简短标题，大屏显示完整标题 */}
            <h1 className="text-lg font-bold text-slate-900 hidden sm:block">
              智能验单助手
            </h1>
            <h1 className="text-lg font-bold text-slate-900 sm:hidden">
              验单助手
            </h1>
          </div>

          {/* 模型选择器 */}
          <ModelSelector
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            models={models}
          />
        </div>
      </header>

      {/* main content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* 1. 上传区域 */}
        {!image && (
          <UploadArea
            fileInputRef={fileInputRef}
            onFileChange={handleImageUpload}
            onTriggerFile={triggerFileInput}
            features={features}
            onFeatureClick={setActiveFeature}
          />
        )}

        {/* 2. 预览与分析控制区域 */}
        {image && !result && (
          <PreviewArea
            image={image as string}
            onReset={resetAnalysis}
            error={error}
            explanationStyle={explanationStyle as "simple" | "professional"}
            setExplanationStyle={(s) => setExplanationStyle(s)}
            onAnalyze={test}
            loading={loading}
            currentModelName={currentModelName}
          />
        )}

        {/* 3. 分析结果展示区域 */}
      </main>

      {/* 特性详情弹窗 Modal */}
      {activeFeature && (
        <FeatureModal
          feature={activeFeature}
          onClose={() => setActiveFeature(null)}
        />
      )}
    </div>
  );
}
