"use client";
import React, { useState } from "react";
import { Activity, User, LogIn, ArrowRight, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { IoLogoWechat } from "react-icons/io5";
import { FaAlipay } from "react-icons/fa";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // login or register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const router = useRouter();

  // 模拟提交
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 在提交时确保所有字段都已校验并阻止无效提交
    setEmailTouched(true);
    setPasswordTouched(true);
    // 触发最终校验
    const emailValid = validateEmail(email);
    const passwordValid = password.length >= 8;
    setEmailError(emailValid ? "" : "请输入有效的邮箱地址");
    setPasswordError(passwordValid ? "" : "密码长度不少于8位");
    if (!emailValid || !passwordValid) return;
    // TODO: 实际项目中这里接 Auth API
  };

  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setEmail(v);
    setEmailTouched(true);
    if (v === "") {
      setEmailError("邮箱不能为空");
    } else if (!validateEmail(v)) {
      setEmailError("请输入有效的邮箱地址");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setPassword(v);
    setPasswordTouched(true);
    if (v === "") {
      setPasswordError("密码不能为空");
    } else if (v.length < 8) {
      setPasswordError("密码长度不少于8位");
    } else {
      setPasswordError("");
    }
  };

  const onBack = () => {
    router.push("/");
  };

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col font-sans"
      style={{ fontFamily: '"Noto Sans SC", sans-serif' }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');`}</style>

      {/* 极简 Header */}
      <div className="p-4 sm:p-6">
        <button
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-slate-800 transition-colors"
        >
          <div className="bg-white p-2 rounded-full shadow-sm mr-2 border border-slate-100">
            <ArrowRight className="w-4 h-4 rotate-180" />
          </div>
          <span className="font-medium text-sm">返回首页</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 sm:p-10 border border-slate-100 animate-fade-in-up">
          {/* Logo 区 */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 p-3 rounded-2xl mb-4 shadow-lg shadow-blue-200">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {isLogin ? "欢迎回来" : "创建新账号"}
            </h2>
            {/* <p className="text-slate-400 text-sm">
              {isLogin ? "登录以保存您的健康数据" : "开启您的智能健康管理之旅"}
            </p> */}
          </div>

          {/* 表单区 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 ml-1">
                电子邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="name@example.com"
                  className={`w-full bg-slate-50 border ${emailError && emailTouched ? "border-red-500" : "border-slate-200"} text-slate-800 rounded-xl py-3 pl-11 pr-4 focus:outline-none ${emailError && emailTouched ? "focus:ring-2 focus:ring-red-500/20 focus:border-red-500" : "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"} transition-all placeholder:text-slate-400`}
                />
                {emailError && emailTouched && (
                  <p className="text-xs text-red-600 mt-1">{emailError}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 ml-1">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border ${passwordError && passwordTouched ? "border-red-500" : "border-slate-200"} text-slate-800 rounded-xl py-3 pl-11 pr-4 focus:outline-none ${passwordError && passwordTouched ? "focus:ring-2 focus:ring-red-500/20 focus:border-red-500" : "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"} transition-all placeholder:text-slate-400`}
                />
                {passwordError && passwordTouched && (
                  <p className="text-xs text-red-600 mt-1">{passwordError}</p>
                )}
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  忘记密码？
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-200 hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center mt-2 cursor-pointer"
            >
              {isLogin ? (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  立即登录
                </>
              ) : (
                <>
                  <User className="w-5 h-5 mr-2" />
                  注册账号
                </>
              )}
            </button>
          </form>

          {/* 社交登录分割线 */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium">
                或者使用以下方式
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
              <IoLogoWechat className="w-6 h-6 text-green-500 ml-2" />
            </button>
            <button className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
              <FaAlipay className="w-6 h-6 text-blue-500" />
            </button>
          </div>

          {/* 底部切换 */}
          <div className="mt-8 text-center text-sm">
            <span className="text-slate-500">
              {isLogin ? "还没有账号？" : "已有账号？"}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-blue-600 hover:text-blue-700 ml-1 cursor-pointer"
            >
              {isLogin ? "立即注册" : "直接登录"}
            </button>
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      {/* <div className="p-4 text-center text-xs text-slate-400">
        &copy; 2024 智能验单助手. All rights reserved.
      </div> */}
    </div>
  );
};

export default AuthPage;
