"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import SmartCallSystem from "@/components/smart-call-system"
import CustomerProfile360 from "@/components/customer-profile-360"
import MarketingAutomation from "@/components/marketing-automation"
import CustomerManagement from "@/components/customer-management"
import { Brain, Phone, Users, BarChart3, Star, User, Zap, Database, FileText, Smartphone } from "lucide-react"
// 在导入部分添加智能号库组件
import IntelligentPhoneDatabase from "@/components/intelligent-phone-database"
// 在导入部分添加智能表单组件：
import IntelligentForms from "@/components/intelligent-forms"

export default function Home() {
  const [activeTab, setActiveTab] = useState("smartcall")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              左右沙发智能客户服务中心
            </h1>
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              AI驱动
            </Badge>
          </div>
          <p className="text-lg text-gray-600">智能号库 · 专业表单 · 全生命周期管理 · 数据驱动决策</p>
        </div>

        {/* 导航标签 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl">
            <TabsTrigger
              value="smartcall"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              智能外呼
            </TabsTrigger>
            <TabsTrigger
              value="customer"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Users className="w-4 h-4" />
              客户管理
            </TabsTrigger>
            <TabsTrigger
              value="profile360"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <User className="w-4 h-4" />
              客户画像
            </TabsTrigger>
            <TabsTrigger
              value="automation"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Zap className="w-4 h-4" />
              营销自动化
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <BarChart3 className="w-4 h-4" />
              数据分析
            </TabsTrigger>
            <TabsTrigger
              value="database"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-rose-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Database className="w-4 h-4" />
              智能号库
            </TabsTrigger>
            <TabsTrigger
              value="forms"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <FileText className="w-4 h-4" />
              智能表单
            </TabsTrigger>
            <TabsTrigger
              value="mobile"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Smartphone className="w-4 h-4" />
              移动应用
            </TabsTrigger>
          </TabsList>

          {/* 智能外呼系统页面 */}
          <TabsContent value="smartcall" className="mt-6">
            <SmartCallSystem />
          </TabsContent>

          {/* 客户管理页面 */}
          <TabsContent value="customer" className="mt-6">
            <CustomerManagement />
          </TabsContent>

          {/* 360度客户画像页面 */}
          <TabsContent value="profile360" className="mt-6">
            <CustomerProfile360 />
          </TabsContent>

          {/* 营销自动化页面 */}
          <TabsContent value="automation" className="mt-6">
            <MarketingAutomation />
          </TabsContent>

          {/* 其他页面暂时显示占位符 */}
          <TabsContent value="analytics" className="mt-6">
            <div className="text-center py-20">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-20 h-20 mx-auto mb-4">
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">数据分析模块</h3>
              <p className="text-gray-500 mb-4">销售数据分析、客户行为分析、业绩报表等功能</p>
              <div className="text-sm text-orange-600 bg-orange-50 px-4 py-2 rounded-full inline-block">
                正在开发中...
              </div>
            </div>
          </TabsContent>

          {/* 在TabsContent部分，将database页面的占位符替换为实际组件 */}
          <TabsContent value="database" className="mt-6">
            <IntelligentPhoneDatabase />
          </TabsContent>

          {/* 在TabsContent部分，将forms页面的占位符替换为实际组件： */}
          <TabsContent value="forms" className="mt-6">
            <IntelligentForms />
          </TabsContent>

          <TabsContent value="mobile" className="mt-6">
            <div className="text-center py-20">
              <div className="p-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full w-20 h-20 mx-auto mb-4">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">移动应用模块</h3>
              <p className="text-gray-500 mb-4">移动端客户管理、外呼功能、数据同步等功能</p>
              <div className="text-sm text-pink-600 bg-pink-50 px-4 py-2 rounded-full inline-block">正在开发中...</div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
