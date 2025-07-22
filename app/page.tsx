"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  Phone,
  Users,
  BarChart3,
  MessageSquare,
  Database,
  FileText,
  Smartphone,
  Settings,
  Bell,
  Target,
  Zap,
  Activity,
  ArrowUp,
  ArrowDown,
  Minus,
  Menu,
  X,
  Download,
  RefreshCw,
  HelpCircle,
  User,
  LogOut,
} from "lucide-react"

// 导入各个功能组件
import SmartCallSystem from "@/components/smart-call-system"
import CustomerProfile360 from "@/components/customer-profile-360"
import MarketingAutomation from "@/components/marketing-automation"
import CustomerManagement from "@/components/customer-management"
import IntelligentPhoneDatabase from "@/components/intelligent-phone-database"
import IntelligentForms from "@/components/intelligent-forms"
import MobileApplication from "@/components/mobile-application"
import DataAnalytics from "@/components/data-analytics"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // 模拟实时数据
  const realTimeStats = {
    totalCalls: 1247,
    activeCalls: 23,
    successRate: 68.5,
    avgCallDuration: "4:32",
    todayCustomers: 156,
    newCustomers: 34,
    followUps: 89,
    conversions: 12,
    onlineAgents: 18,
    totalAgents: 25,
    systemHealth: 98.7,
    responseTime: "1.2s",
  }

  const quickStats = [
    {
      title: "今日通话",
      value: realTimeStats.totalCalls,
      change: "+12.5%",
      trend: "up",
      icon: Phone,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "活跃客户",
      value: realTimeStats.todayCustomers,
      change: "+8.3%",
      trend: "up",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "转化率",
      value: `${realTimeStats.successRate}%`,
      change: "-2.1%",
      trend: "down",
      icon: Target,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "在线坐席",
      value: `${realTimeStats.onlineAgents}/${realTimeStats.totalAgents}`,
      change: "稳定",
      trend: "stable",
      icon: Activity,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "新客户分配",
      message: "您有3个新客户待跟进",
      time: "5分钟前",
      type: "info",
      unread: true,
    },
    {
      id: 2,
      title: "系统更新",
      message: "系统将在今晚进行维护升级",
      time: "1小时前",
      type: "warning",
      unread: true,
    },
    {
      id: 3,
      title: "业绩达成",
      message: "恭喜！本月业绩已达成120%",
      time: "2小时前",
      type: "success",
      unread: false,
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-4 h-4 text-green-500" />
      case "down":
        return <ArrowDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setIsMobileMenuOpen(false)
  }

  const handleRefresh = () => {
    // 刷新数据逻辑
    window.location.reload()
  }

  const handleExport = () => {
    // 导出数据逻辑
    const data = {
      stats: realTimeStats,
      timestamp: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `dashboard-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"}`}
    >
      {/* 顶部导航栏 - 移动端优化 */}
      <header
        className={`sticky top-0 z-50 shadow-sm transition-colors duration-300 ${isDarkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-sm border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 左侧 Logo 和标题 */}
            <div className="flex items-center gap-4">
              <img src="/images/jinlan-logo.png" alt="锦澜家居" className="h-8 w-auto sm:h-10" />
              <div className="hidden sm:block">
                <h1
                  className={`text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
                >
                  锦澜家居智能客户服务中心
                </h1>
                <p className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  AI驱动的全方位客户服务解决方案
                </p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  锦澜家居
                </h1>
              </div>
            </div>

            {/* 右侧操作按钮 */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* 系统状态 */}
              <Badge className="hidden sm:flex bg-green-500 text-white">
                <Activity className="w-3 h-3 mr-1" />
                系统正常
              </Badge>

              {/* 刷新按钮 */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className={`hidden sm:flex ${isDarkMode ? "border-gray-600 hover:bg-gray-700" : "hover:bg-gray-50"}`}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新
              </Button>

              {/* 通知按钮 */}
              <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`relative ${isDarkMode ? "border-gray-600 hover:bg-gray-700" : "hover:bg-gray-50"}`}
                  >
                    <Bell className="w-4 h-4" />
                    {notifications.filter((n) => n.unread).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                        {notifications.filter((n) => n.unread).length}
                      </span>
                    )}
                    <span className="hidden sm:inline ml-2">通知</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className={`max-w-md ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                  <DialogHeader>
                    <DialogTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                      <Bell className="w-5 h-5 text-blue-600" />
                      系统通知
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 py-4 max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border transition-colors duration-200 ${
                          notification.unread
                            ? isDarkMode
                              ? "bg-blue-900/20 border-blue-700"
                              : "bg-blue-50 border-blue-200"
                            : isDarkMode
                              ? "bg-gray-700 border-gray-600"
                              : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className={`font-medium text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {notification.title}
                            </div>
                            <div className={`text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                              {notification.message}
                            </div>
                            <div className={`text-xs mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {notification.time}
                            </div>
                          </div>
                          {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        // 标记所有为已读
                        notifications.forEach((n) => (n.unread = false))
                      }}
                    >
                      全部已读
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsNotificationOpen(false)}
                    >
                      关闭
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* 设置按钮 */}
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${isDarkMode ? "border-gray-600 hover:bg-gray-700" : "hover:bg-gray-50"}`}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline ml-2">设置</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className={`max-w-2xl ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                  <DialogHeader>
                    <DialogTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                      <Settings className="w-5 h-5 text-purple-600" />
                      系统设置
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    {/* 外观设置 */}
                    <div>
                      <h3 className={`font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>外观设置</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>深色模式</div>
                            <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              切换到深色主题
                            </div>
                          </div>
                          <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>自动刷新</div>
                            <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              每30秒自动刷新数据
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>声音提醒</div>
                            <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              新消息声音提醒
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    {/* 数据设置 */}
                    <div>
                      <h3 className={`font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>数据设置</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>数据缓存</div>
                            <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              本地缓存数据以提升性能
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>数据同步</div>
                            <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              自动同步到云端
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" onClick={handleExport} className="flex-1 bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        导出数据
                      </Button>
                      <Button variant="outline" onClick={handleRefresh} className="flex-1 bg-transparent">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        刷新数据
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* 用户菜单 */}
              <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${isDarkMode ? "border-gray-600 hover:bg-gray-700" : "hover:bg-gray-50"}`}
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline ml-2">账户</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className={`max-w-md ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                  <DialogHeader>
                    <DialogTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                      <User className="w-5 h-5 text-green-600" />
                      用户信息
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        管
                      </div>
                      <div>
                        <div className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>系统管理员</div>
                        <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          admin@jinlan.com
                        </div>
                        <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                          最后登录：今天 09:30
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => {
                          // 个人资料逻辑
                          setIsProfileOpen(false)
                        }}
                      >
                        <User className="w-4 h-4 mr-2" />
                        个人资料
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => {
                          setIsProfileOpen(false)
                          setIsSettingsOpen(true)
                        }}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        系统设置
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => {
                          // 帮助逻辑
                          window.open("/help", "_blank")
                        }}
                      >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        帮助中心
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                        onClick={() => {
                          // 退出登录逻辑
                          if (confirm("确定要退出登录吗？")) {
                            window.location.href = "/login"
                          }
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        退出登录
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* 移动端菜单按钮 */}
              <Button
                variant="outline"
                size="sm"
                className={`lg:hidden ${isDarkMode ? "border-gray-600 hover:bg-gray-700" : "hover:bg-gray-50"}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* 快速统计卡片 - 移动端优化 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className={`border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}
            >
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {stat.title}
                    </p>
                    <p className={`text-lg sm:text-2xl font-bold ${stat.textColor} mt-1`}>{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1 sm:mt-2">
                      {getTrendIcon(stat.trend)}
                      <span
                        className={`text-xs sm:text-sm ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : stat.trend === "down"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor} ml-2`}>
                    <stat.icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主要功能模块 */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* 桌面端标签导航 */}
          <TabsList
            className={`hidden lg:grid w-full grid-cols-8 mb-8 shadow-lg rounded-xl ${isDarkMode ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-sm`}
          >
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <BarChart3 className="w-4 h-4" />
              总览
            </TabsTrigger>
            <TabsTrigger
              value="calls"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              智能外呼
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Users className="w-4 h-4" />
              客户360
            </TabsTrigger>
            <TabsTrigger
              value="marketing"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <MessageSquare className="w-4 h-4" />
              营销自动化
            </TabsTrigger>
            <TabsTrigger
              value="management"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Database className="w-4 h-4" />
              客户管理
            </TabsTrigger>
            <TabsTrigger
              value="database"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              智能号库
            </TabsTrigger>
            <TabsTrigger
              value="forms"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <FileText className="w-4 h-4" />
              智能表单
            </TabsTrigger>
            <TabsTrigger
              value="mobile"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-rose-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Smartphone className="w-4 h-4" />
              移动应用
            </TabsTrigger>
          </TabsList>

          {/* 移动端导航菜单 */}
          {isMobileMenuOpen && (
            <div className={`lg:hidden fixed inset-0 z-50 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
              <div className="flex flex-col h-full">
                <div
                  className={`flex items-center justify-between p-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                >
                  <h2 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>功能菜单</h2>
                  <Button variant="outline" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "系统总览", icon: BarChart3, tab: "overview", color: "text-blue-600 bg-blue-50" },
                      { name: "智能外呼", icon: Phone, tab: "calls", color: "text-green-600 bg-green-50" },
                      { name: "客户360", icon: Users, tab: "customers", color: "text-purple-600 bg-purple-50" },
                      { name: "营销自动化", icon: MessageSquare, tab: "marketing", color: "text-pink-600 bg-pink-50" },
                      { name: "客户管理", icon: Database, tab: "management", color: "text-orange-600 bg-orange-50" },
                      { name: "智能号库", icon: Phone, tab: "database", color: "text-teal-600 bg-teal-50" },
                      { name: "智能表单", icon: FileText, tab: "forms", color: "text-indigo-600 bg-indigo-50" },
                      { name: "移动应用", icon: Smartphone, tab: "mobile", color: "text-rose-600 bg-rose-50" },
                    ].map((module, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`h-20 flex flex-col gap-2 ${module.color} hover:scale-105 transition-all duration-300 border-2 ${
                          activeTab === module.tab ? "border-current" : ""
                        }`}
                        onClick={() => handleTabChange(module.tab)}
                      >
                        <module.icon className="w-6 h-6" />
                        <span className="text-xs font-medium">{module.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 系统总览 */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Card
                className={`border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}
              >
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                    <Activity className="w-5 h-5 text-blue-600" />
                    系统实时状态
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        系统健康度
                      </span>
                      <span className="text-sm font-bold text-green-600">{realTimeStats.systemHealth}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        平均响应时间
                      </span>
                      <span className="text-sm font-bold text-blue-600">{realTimeStats.responseTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        活跃通话
                      </span>
                      <span className="text-sm font-bold text-orange-600">{realTimeStats.activeCalls}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        平均通话时长
                      </span>
                      <span className="text-sm font-bold text-purple-600">{realTimeStats.avgCallDuration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}
              >
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                    <Target className="w-5 h-5 text-green-600" />
                    今日业绩概览
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        新增客户
                      </span>
                      <span className="text-sm font-bold text-green-600">{realTimeStats.newCustomers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        待跟进
                      </span>
                      <span className="text-sm font-bold text-orange-600">{realTimeStats.followUps}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        成功转化
                      </span>
                      <span className="text-sm font-bold text-blue-600">{realTimeStats.conversions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        转化率
                      </span>
                      <span className="text-sm font-bold text-purple-600">{realTimeStats.successRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 功能模块快速访问 */}
            <Card
              className={`border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}
            >
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                  <Zap className="w-5 h-5 text-purple-600" />
                  功能模块快速访问
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
                  {[
                    { name: "智能外呼", icon: Phone, tab: "calls", color: "text-green-600 bg-green-50" },
                    { name: "客户360", icon: Users, tab: "customers", color: "text-purple-600 bg-purple-50" },
                    { name: "营销自动化", icon: MessageSquare, tab: "marketing", color: "text-pink-600 bg-pink-50" },
                    { name: "客户管理", icon: Database, tab: "management", color: "text-orange-600 bg-orange-50" },
                    { name: "智能号库", icon: Phone, tab: "database", color: "text-teal-600 bg-teal-50" },
                    { name: "智能表单", icon: FileText, tab: "forms", color: "text-indigo-600 bg-indigo-50" },
                    { name: "移动应用", icon: Smartphone, tab: "mobile", color: "text-rose-600 bg-rose-50" },
                  ].map((module, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-16 sm:h-20 flex flex-col gap-1 sm:gap-2 ${module.color} hover:scale-105 transition-all duration-300 border-2`}
                      onClick={() => handleTabChange(module.tab)}
                    >
                      <module.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-xs font-medium">{module.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 各功能模块内容 */}
          <TabsContent value="calls">
            <SmartCallSystem />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerProfile360 />
          </TabsContent>

          <TabsContent value="marketing">
            <MarketingAutomation />
          </TabsContent>

          <TabsContent value="management">
            <CustomerManagement />
          </TabsContent>

          <TabsContent value="database">
            <IntelligentPhoneDatabase />
          </TabsContent>

          <TabsContent value="forms">
            <IntelligentForms />
          </TabsContent>

          <TabsContent value="mobile">
            <MobileApplication />
          </TabsContent>

          <TabsContent value="analytics">
            <DataAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
