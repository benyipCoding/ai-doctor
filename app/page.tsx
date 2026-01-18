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
import { HomeFeature, features, models } from "@/constant/home";

const apiKey = "";

export default function Home() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --- 模型选择状态 ---
  const [selectedModel, setSelectedModel] = useState("gemini-flash");

  // --- 解读风格状态 ---
  const [explanationStyle, setExplanationStyle] = useState("simple"); // simple | professional

  // --- 首页特性弹窗状态 (新增) ---
  const [activeFeature, setActiveFeature] = useState<HomeFeature | null>(null);

  const currentModelName = models.find((m) => m.id === selectedModel)?.name;

  // --- 首页特性数据 (新增) ---

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
        {/* 3. 分析结果展示区域 */}
      </main>
    </div>
  );
}
