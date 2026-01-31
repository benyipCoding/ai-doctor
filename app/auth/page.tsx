"use client";
import React, { useState } from "react";
import {
  Activity,
  User,
  LogIn,
  ArrowRight,
  Mail,
  Lock,
  Github,
  Chrome,
} from "lucide-react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // login or register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // 模拟提交
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 实际项目中这里接 Auth API
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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  忘记密码？
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-200 hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center mt-2"
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
            <button className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Github className="w-5 h-5 text-slate-700" />
            </button>
            <button className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Chrome className="w-5 h-5 text-blue-500" />
            </button>
          </div>

          {/* 底部切换 */}
          <div className="mt-8 text-center text-sm">
            <span className="text-slate-500">
              {isLogin ? "还没有账号？" : "已有账号？"}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-blue-600 hover:text-blue-700 ml-1"
            >
              {isLogin ? "立即注册" : "直接登录"}
            </button>
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="p-4 text-center text-xs text-slate-400">
        &copy; 2024 智能验单助手. All rights reserved.
      </div>
    </div>
  );
};

export default AuthPage;
