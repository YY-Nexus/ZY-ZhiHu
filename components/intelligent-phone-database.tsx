"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Database,
  Upload,
  Download,
  RefreshCw,
  Search,
  Phone,
  MapPin,
  Star,
  CheckCircle,
  BarChart3,
  PieChart,
  TrendingUp,
  Brain,
  Zap,
  Settings,
  FileText,
  Target,
  Shield,
  Activity,
  Clock,
  Award,
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  SortAsc,
  SortDesc,
} from "lucide-react"

// 号码数据类型
interface PhoneRecord {
  id: string
  phoneNumber: string
  carrier: "移动" | "联通" | "电信" | "虚拟运营商"
  region: string
  city: string
  isActive: boolean
  qualityScore: number
  tags: string[]
  source: string
  addedDate: string
  lastVerified: string
  callAttempts: number
  successfulCalls: number
  customerType: string
  notes: string
  riskLevel: "低" | "中" | "高"
  businessPotential: number
}

// 数据源类型
interface DataSource {
  id: string
  name: string
  type: "房产数据" | "建材市场" | "电商平台" | "社交媒体" | "展会获客" | "其他"
  totalRecords: number
  validRecords: number
  qualityScore: number
  lastUpdate: string
  status: "active" | "inactive" | "processing"
}

// 清洗规则类型
interface CleaningRule {
  id: string
  name: string
  description: string
  ruleType: "格式验证" | "重复检测" | "黑名单过滤" | "活跃度检测"
  isEnabled: boolean
  priority: number
  matchCount: number
}

// 模拟号码数据
const mockPhoneRecords: PhoneRecord[] = [
  {
    id: "1",
    phoneNumber: "138****8888",
    carrier: "移动",
    region: "北京",
    city: "朝阳区",
    isActive: true,
    qualityScore: 95,
    tags: ["高端客户", "新房业主", "装修意向"],
    source: "房产数据",
    addedDate: "2024-01-15",
    lastVerified: "2024-01-22",
    callAttempts: 3,
    successfulCalls: 2,
    customerType: "潜在客户",
    notes: "多次表达购买意向，预算充足",
    riskLevel: "低",
    businessPotential: 85,
  },
  {
    id: "2",
    phoneNumber: "139****6666",
    carrier: "联通",
    region: "上海",
    city: "浦东新区",
    isActive: true,
    qualityScore: 88,
    tags: ["价格敏感", "品质要求", "时间灵活"],
    source: "建材市场",
    addedDate: "2024-01-18",
    lastVerified: "2024-01-21",
    callAttempts: 2,
    successfulCalls: 1,
    customerType: "意向客户",
    notes: "对价格比较关注，需要优惠政策",
    riskLevel: "中",
    businessPotential: 72,
  },
  {
    id: "3",
    phoneNumber: "136****9999",
    carrier: "电信",
    region: "深圳",
    city: "南山区",
    isActive: true,
    qualityScore: 92,
    tags: ["企业客户", "批量采购", "决策快"],
    source: "展会获客",
    addedDate: "2024-01-20",
    lastVerified: "2024-01-22",
    callAttempts: 1,
    successfulCalls: 1,
    customerType: "高价值客户",
    notes: "公司采购负责人，有长期合作意向",
    riskLevel: "低",
    businessPotential: 95,
  },
  {
    id: "4",
    phoneNumber: "135****7777",
    carrier: "移动",
    region: "广州",
    city: "天河区",
    isActive: false,
    qualityScore: 45,
    tags: ["空号", "无效号码"],
    source: "电商平台",
    addedDate: "2024-01-12",
    lastVerified: "2024-01-20",
    callAttempts: 5,
    successfulCalls: 0,
    customerType: "无效客户",
    notes: "多次拨打无人接听，疑似空号",
    riskLevel: "高",
    businessPotential: 10,
  },
  {
    id: "5",
    phoneNumber: "137****5555",
    carrier: "联通",
    region: "杭州",
    city: "西湖区",
    isActive: true,
    qualityScore: 78,
    tags: ["设计需求", "互联网从业", "年轻群体"],
    source: "社交媒体",
    addedDate: "2024-01-19",
    lastVerified: "2024-01-22",
    callAttempts: 2,
    successfulCalls: 1,
    customerType: "潜在客户",
    notes: "对设计服务感兴趣，后期可能有购买需求",
    riskLevel: "中",
    businessPotential: 68,
  },
]

// 模拟数据源
const mockDataSources: DataSource[] = [
  {
    id: "1",
    name: "新房业主数据库",
    type: "房产数据",
    totalRecords: 450000,
    validRecords: 425000,
    qualityScore: 94.4,
    lastUpdate: "2024-01-22",
    status: "active",
  },
  {
    id: "2",
    name: "建材市场客户",
    type: "建材市场",
    totalRecords: 380000,
    validRecords: 342000,
    qualityScore: 90.0,
    lastUpdate: "2024-01-21",
    status: "active",
  },
  {
    id: "3",
    name: "电商平台用户",
    type: "电商平台",
    totalRecords: 320000,
    validRecords: 256000,
    qualityScore: 80.0,
    lastUpdate: "2024-01-20",
    status: "processing",
  },
  {
    id: "4",
    name: "社交媒体线索",
    type: "社交媒体",
    totalRecords: 530000,
    validRecords: 371000,
    qualityScore: 70.0,
    lastUpdate: "2024-01-19",
    status: "active",
  },
  {
    id: "5",
    name: "展会收集名单",
    type: "展会获客",
    totalRecords: 25000,
    validRecords: 24500,
    qualityScore: 98.0,
    lastUpdate: "2024-01-22",
    status: "active",
  },
]

// 模拟清洗规则
const mockCleaningRules: CleaningRule[] = [
  {
    id: "1",
    name: "手机号格式验证",
    description: "验证手机号码是否符合11位数字格式",
    ruleType: "格式验证",
    isEnabled: true,
    priority: 1,
    matchCount: 1250,
  },
  {
    id: "2",
    name: "重复号码检测",
    description: "检测并标记重复的手机号码",
    ruleType: "重复检测",
    isEnabled: true,
    priority: 2,
    matchCount: 8900,
  },
  {
    id: "3",
    name: "黑名单过滤",
    description: "过滤投诉用户和拒绝营销的号码",
    ruleType: "黑名单过滤",
    isEnabled: true,
    priority: 3,
    matchCount: 2340,
  },
  {
    id: "4",
    name: "活跃度检测",
    description: "检测号码的活跃状态和接通率",
    ruleType: "活跃度检测",
    isEnabled: true,
    priority: 4,
    matchCount: 15600,
  },
]

const colorSystem = {
  green: {
    primary: "border-l-green-500",
    bg: "bg-green-50",
    text: "text-green-600",
    badge: "bg-green-500",
    hover: "hover:bg-green-50",
    icon: "text-green-500",
  },
  blue: {
    primary: "border-l-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
    badge: "bg-blue-500",
    hover: "hover:bg-blue-50",
    icon: "text-blue-500",
  },
  orange: {
    primary: "border-l-orange-500",
    bg: "bg-orange-50",
    text: "text-orange-600",
    badge: "bg-orange-500",
    hover: "hover:bg-orange-50",
    icon: "text-orange-500",
  },
  purple: {
    primary: "border-l-purple-500",
    bg: "bg-purple-50",
    text: "text-purple-600",
    badge: "bg-purple-500",
    hover: "hover:bg-purple-50",
    icon: "text-purple-500",
  },
  rose: {
    primary: "border-l-rose-500",
    bg: "bg-rose-50",
    text: "text-rose-600",
    badge: "bg-rose-500",
    hover: "hover:bg-rose-50",
    icon: "text-rose-500",
  },
  indigo: {
    primary: "border-l-indigo-500",
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    badge: "bg-indigo-500",
    hover: "hover:bg-indigo-50",
    icon: "text-indigo-500",
  },
}

export default function IntelligentPhoneDatabase() {
  const [activeTab, setActiveTab] = useState("overview")
  const [phoneRecords, setPhoneRecords] = useState<PhoneRecord[]>(mockPhoneRecords)
  const [dataSources, setDataSources] = useState<DataSource[]>(mockDataSources)
  const [cleaningRules, setCleaningRules] = useState<CleaningRule[]>(mockCleaningRules)
  const [filteredRecords, setFilteredRecords] = useState<PhoneRecord[]>(mockPhoneRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [carrierFilter, setCarrierFilter] = useState("all")
  const [qualityFilter, setQualityFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState<PhoneRecord | null>(null)
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isCleaningDialogOpen, setIsCleaningDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddSourceDialogOpen, setIsAddSourceDialogOpen] = useState(false)
  const [isAddRuleDialogOpen, setIsAddRuleDialogOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isCleaning, setIsCleaning] = useState(false)
  const [cleaningProgress, setCleaningProgress] = useState(0)
  const [sortField, setSortField] = useState<keyof PhoneRecord>("addedDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [editingRecord, setEditingRecord] = useState<PhoneRecord | null>(null)
  const [newDataSource, setNewDataSource] = useState({
    name: "",
    type: "房产数据" as DataSource["type"],
    description: "",
  })
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    ruleType: "格式验证" as CleaningRule["ruleType"],
    priority: 1,
  })
  const [importSettings, setImportSettings] = useState({
    dataSource: "",
    autoDedup: true,
    formatValidation: true,
    carrierDetection: true,
    qualityAssessment: false,
  })

  const { toast } = useToast()

  // 搜索和筛选逻辑
  useEffect(() => {
    let filtered = [...phoneRecords]

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(
        (record) =>
          record.phoneNumber.includes(searchTerm) ||
          record.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // 运营商过滤
    if (carrierFilter !== "all") {
      filtered = filtered.filter((record) => record.carrier === carrierFilter)
    }

    // 质量过滤
    if (qualityFilter !== "all") {
      if (qualityFilter === "high") {
        filtered = filtered.filter((record) => record.qualityScore >= 80)
      } else if (qualityFilter === "medium") {
        filtered = filtered.filter((record) => record.qualityScore >= 60 && record.qualityScore < 80)
      } else if (qualityFilter === "low") {
        filtered = filtered.filter((record) => record.qualityScore < 60)
      }
    }

    // 地区过滤
    if (regionFilter !== "all") {
      filtered = filtered.filter((record) => record.region === regionFilter)
    }

    // 排序
    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })

    setFilteredRecords(filtered)
  }, [phoneRecords, searchTerm, carrierFilter, qualityFilter, regionFilter, sortField, sortDirection])

  // 实际功能实现
  const handleRefresh = async () => {
    setIsRefreshing(true)
    toast({
      title: "刷新数据",
      description: "正在刷新号码数据...",
    })
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 更新数据
    const updatedRecords = phoneRecords.map(record => ({
      ...record,
      lastVerified: new Date().toISOString().split('T')[0],
    }))
    setPhoneRecords(updatedRecords)
    
    setIsRefreshing(false)
    toast({
      title: "刷新完成",
      description: "号码数据已更新",
    })
  }

  const handleImport = async () => {
    toast({
      title: "开始导入",
      description: "正在处理导入文件...",
    })
    
    // 模拟导入过程
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // 生成新的模拟数据
    const newRecords: PhoneRecord[] = Array.from({ length: 50 }, (_, i) => ({
      id: `import_${Date.now()}_${i}`,
      phoneNumber: `1${Math.floor(Math.random() * 9) + 3}${Math.floor(Math.random() * 10)}****${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      carrier: ["移动", "联通", "电信", "虚拟运营商"][Math.floor(Math.random() * 4)] as PhoneRecord["carrier"],
      region: ["北京", "上海", "深圳", "广州", "杭州"][Math.floor(Math.random() * 5)],
      city: "新导入",
      isActive: Math.random() > 0.2,
      qualityScore: Math.floor(Math.random() * 40) + 60,
      tags: ["新导入", "待验证"],
      source: importSettings.dataSource || "批量导入",
      addedDate: new Date().toISOString().split('T')[0],
      lastVerified: new Date().toISOString().split('T')[0],
      callAttempts: 0,
      successfulCalls: 0,
      customerType: "待分类",
      notes: "批量导入的号码，待进一步验证",
      riskLevel: "中" as PhoneRecord["riskLevel"],
      businessPotential: Math.floor(Math.random() * 50) + 30,
    }))
    
    setPhoneRecords(prev => [...prev, ...newRecords])
    setIsImportDialogOpen(false)
    
    toast({
      title: "导入成功",
      description: `成功导入 ${newRecords.length} 条号码记录`,
    })
  }

  const handleExport = async (format: 'csv' | 'excel' | 'json') => {
    toast({
      title: "开始导出",
      description: `正在生成 ${format.toUpperCase()} 文件...`,
    })
    
    // 模拟导出过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 准备导出数据
    const exportData = filteredRecords.map(record => ({
      手机号码: record.phoneNumber,
      运营商: record.carrier,
      归属地: `${record.region} ${record.city}`,
      质量评分: record.qualityScore,
      活跃状态: record.isActive ? '活跃' : '非活跃',
      客户类型: record.customerType,
      商业潜力: `${record.businessPotential}%`,
      风险等级: record.riskLevel,
      数据来源: record.source,
      添加日期: record.addedDate,
      标签: record.tags.join(', '),
      备注: record.notes,
    }))
    
    // 创建下载链接
    const dataStr = format === 'json' 
      ? JSON.stringify(exportData, null, 2)
      : exportData.map(row => Object.values(row).join(',')).join('\n')
    
    const dataBlob = new Blob([dataStr], { type: 'text/plain' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `phone_records_${new Date().toISOString().split('T')[0]}.${format === 'json' ? 'json' : 'csv'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    setIsExportDialogOpen(false)
    toast({
      title: "导出成功",
      description: `${format.toUpperCase()} 文件已下载`,
    })
  }

  const handleCleanData = async () => {
    setIsCleaning(true)
    setCleaningProgress(0)
    
    toast({
      title: "开始清洗",
      description: "AI正在分析和清洗数据...",
    })
    
    // 模拟清洗过程
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setCleaningProgress(i)
    }
    
    // 应用清洗结果
    const cleanedRecords = phoneRecords.map(record => {
      let newScore = record.qualityScore
      let newTags = [...record.tags]
      
      // 模拟清洗逻辑
      if (record.qualityScore < 60) {
        newScore = Math.min(record.qualityScore + 15, 85)
        newTags = newTags.filter(tag => tag !== "低质量").concat(["已清洗"])
      }
      
      return {
        ...record,
        qualityScore: newScore,
        tags: newTags,
        lastVerified: new Date().toISOString().split('T')[0],
      }
    })
    
    setPhoneRecords(cleanedRecords)
    setIsCleaning(false)
    setCleaningProgress(0)
    setIsCleaningDialogOpen(false)
    
    toast({
      title: "清洗完成",
      description: "数据质量已提升，无效号码已标记",
    })
  }

  const handleEditRecord = (record: PhoneRecord) => {
    setEditingRecord({ ...record })
    setIsEditDialogOpen(true)
  }

  const handleSaveRecord = async () => {
    if (!editingRecord) return
    
    toast({
      title: "保存中",
      description: "正在更新号码信息...",
    })
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setPhoneRecords(prev => 
      prev.map(record => 
        record.id === editingRecord.id ? editingRecord : record
      )
    )
    
    setIsEditDialogOpen(false)
    setEditingRecord(null)
    
    toast({
      title: "保存成功",
      description: "号码信息已更新",
    })
  }

  const handleDeleteRecord = async (recordId: string) => {
    toast({
      title: "删除中",
      description: "正在删除号码记录...",
    })
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setPhoneRecords(prev => prev.filter(record => record.id !== recordId))
    
    toast({
      title: "删除成功",
      description: "号码记录已删除",
    })
  }

  const handleCallPhone = (phoneNumber: string) => {
    toast({
      title: "发起通话",
      description: `正在拨打 ${phoneNumber}...`,
    })
    
    // 这里可以集成实际的通话系统
    setTimeout(() => {
      toast({
        title: "通话已连接",
        description: "请注意接听电话",
      })
    }, 2000)
  }

  const handleAddDataSource = async () => {
    if (!newDataSource.name.trim()) {
      toast({
        title: "错误",
        description: "请输入数据源名称",
        variant: "destructive",
      })
      return
    }
    
    toast({
      title: "添加中",
      description: "正在创建新数据源...",
    })
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newSource: DataSource = {
      id: `source_${Date.now()}`,
      name: newDataSource.name,
      type: newDataSource.type,
      totalRecords: 0,
      validRecords: 0,
      qualityScore: 0,
      lastUpdate: new Date().toISOString().split('T')[0],
      status: "inactive",
    }
    
    setDataSources(prev => [...prev, newSource])
    setNewDataSource({ name: "", type: "房产数据", description: "" })
    setIsAddSourceDialogOpen(false)
    
    toast({
      title: "添加成功",
      description: "新数据源已创建",
    })
  }

  const handleToggleRule = async (ruleId: string) => {
    const rule = cleaningRules.find(r => r.id === ruleId)
    if (!rule) return
    
    toast({
      title: rule.isEnabled ? "禁用规则" : "启用规则",
      description: `正在${rule.isEnabled ? "禁用" : "启用"}清洗规则...`,
    })
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setCleaningRules(prev =>
      prev.map(r =>
        r.id === ruleId ? { ...r, isEnabled: !r.isEnabled } : r
      )
    )
    
    toast({
      title: "操作成功",
      description: `规则已${rule.isEnabled ? "禁用" : "启用"}`,
    })
  }

  const getQualityColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50"
    if (score >= 80) return "text-blue-600 bg-blue-50"
    if (score >= 60) return "text-orange-600 bg-orange-50"
    return "text-red-600 bg-red-50"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "低":
        return "text-green-600 bg-green-50"
      case "中":
        return "text-orange-600 bg-orange-50"
      case "高":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getCarrierColor = (carrier: string) => {
    switch (carrier) {
      case "移动":
        return "bg-blue-500"
      case "联通":
        return "bg-red-500"
      case "电信":
        return "bg-green-500"
      case "虚拟运营商":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case "房产数据":
        return "bg-green-500"
      case "建材市场":
        return "bg-blue-500"
      case "电商平台":
        return "bg-orange-500"
      case "社交媒体":
        return "bg-purple-500"
      case "展会获客":
        return "bg-rose-500"
      default:
        return "bg-gray-500"
    }
  }

  // 统计数据计算
  const totalRecords = phoneRecords.length
  const activeRecords = phoneRecords.filter((r) => r.isActive).length
  const highQualityRecords = phoneRecords.filter((r) => r.qualityScore >= 80).length
  const averageQuality = phoneRecords.reduce((sum, r) => sum + r.qualityScore, 0) / totalRecords

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            智能号库管理中心
          </h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">AI驱动的号码质量管理，提升营销效率和成功率</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="hover:bg-blue-50 hover:border-blue-300 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? '刷新中...' : '刷新'}
          </Button>
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <Upload className="w-4 h-4 mr-2" />
                导入号码
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-green-600" />
                  批量导入号码
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-2">选择数据源</label>
                  <Select value={importSettings.dataSource} onValueChange={(value) => setImportSettings(prev => ({ ...prev, dataSource: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择数据来源" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="房产数据">房产数据</SelectItem>
                      <SelectItem value="建材市场">建材市场</SelectItem>
                      <SelectItem value="电商平台">电商平台</SelectItem>
                      <SelectItem value="社交媒体">社交媒体</SelectItem>
                      <SelectItem value="展会获客">展会获客</SelectItem>
                      <SelectItem value="其他">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">上传文件</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-300">
                    <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">点击上传或拖拽文件到此处</p>
                    <p className="text-xs text-gray-500 mt-1">支持 CSV, Excel 格式，最大 10MB</p>
                    <input type="file" className="hidden" accept=".csv,.xlsx,.xls" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">导入设置</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <Switch 
                        checked={importSettings.autoDedup} 
                        onCheckedChange={(checked) => setImportSettings(prev => ({ ...prev, autoDedup: checked }))}
                      />
                      <span className="ml-2 text-sm">自动去重</span>
                    </label>
                    <label className="flex items-center">
                      <Switch 
                        checked={importSettings.formatValidation} 
                        onCheckedChange={(checked) => setImportSettings(prev => ({ ...prev, formatValidation: checked }))}
                      />
                      <span className="ml-2 text-sm">格式验证</span>
                    </label>
                    <label className="flex items-center">
                      <Switch 
                        checked={importSettings.carrierDetection} 
                        onCheckedChange={(checked) => setImportSettings(prev => ({ ...prev, carrierDetection: checked }))}
                      />
                      <span className="ml-2 text-sm">运营商识别</span>
                    </label>
                    <label className="flex items-center">
                      <Switch 
                        checked={importSettings.qualityAssessment} 
                        onCheckedChange={(checked) => setImportSettings(prev => ({ ...prev, qualityAssessment: checked }))}
                      />
                      <span className="ml-2 text-sm">立即质量评估</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                  取消
                </Button>
                <Button 
                  onClick={handleImport}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  开始导入
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="hover:bg-blue-50 hover:border-blue-300 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                导出数据
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-blue-600" />
                  导出号码数据
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    将导出 {filteredRecords.length} 条号码记录
                  </p>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => handleExport('csv')}
                      variant="outline" 
                      className="w-full justify-start hover:bg-green-50"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      导出为 CSV 格式
                    </Button>
                    <Button 
                      onClick={() => handleExport('excel')}
                      variant="outline" 
                      className="w-full justify-start hover:bg-blue-50"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      导出为 Excel 格式
                    </Button>
                    <Button 
                      onClick={() => handleExport('json')}
                      variant="outline" 
                      className="w-full justify-start hover:bg-purple-50"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      导出为 JSON 格式
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 导航标签 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 mb-6 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs sm:text-sm"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">数据总览</span>
          </TabsTrigger>
          <TabsTrigger
            value="records"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs sm:text-sm"
          >
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">号码管理</span>
          </TabsTrigger>
          <TabsTrigger
            value="quality"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs sm:text-sm"
          >
            <Star className="w-4 h-4" />
            <span className="hidden sm:inline">质量分析</span>
          </TabsTrigger>
          <TabsTrigger
            value="sources"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs sm:text-sm"
          >
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">数据源</span>
          </TabsTrigger>
          <TabsTrigger
            value="cleaning"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-rose-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs sm:text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">数据清洗</span>
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs sm:text-sm"
          >
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">AI分析</span>
          </TabsTrigger>
        </TabsList>

        {/* 数据总览页面 */}
        <TabsContent value="overview" className="mt-6">
          {/* 核心指标卡片 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <Card
              className={`border-l-4 ${colorSystem.blue.primary} text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {totalRecords.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">总号码数</div>
                <div className="text-xs text-blue-600 mt-1">+1,250 本周新增</div>
              </CardContent>
            </Card>
            <Card
              className={`border-l-4 ${colorSystem.green.primary} text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  {activeRecords}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">有效号码</div>
                <div className="text-xs text-green-600 mt-1">
                  {((activeRecords / totalRecords) * 100).toFixed(1)}% 有效率
                </div>
              </CardContent>
            </Card>
            <Card
              className={`border-l-4 ${colorSystem.orange.primary} text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                  {averageQuality.toFixed(1)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">平均质量分</div>
                <div className="text-xs text-orange-600 mt-1">+2.3 较上月</div>
              </CardContent>
            </Card>
            <Card
              className={`border-l-4 ${colorSystem.purple.primary} text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  {highQualityRecords}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">高质量号码</div>
                <div className="text-xs text-purple-600 mt-1">≥80分</div>
              </CardContent>
            </Card>
          </div>

          {/* 数据分布图表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card
              className={`border-l-4 ${colorSystem.green.primary} ${colorSystem.green.hover} transition-all duration-300 hover:shadow-xl`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <PieChart className={`w-5 h-5 ${colorSystem.green.icon}`} />
                  运营商分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["移动", "联通", "电信", "虚拟运营商"].map((carrier, index) => {
                    const count = phoneRecords.filter((r) => r.carrier === carrier).length
                    const percentage = (count / totalRecords) * 100
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={`${getCarrierColor(carrier)} text-white text-xs`}>{carrier}</Badge>
                          <span className="text-sm">{count.toLocaleString()}个</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={percentage} className="w-16 sm:w-20 h-2" />
                          <span className="text-sm font-medium w-10 sm:w-12">{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-l-4 ${colorSystem.blue.primary} ${colorSystem.blue.hover} transition-all duration-300 hover:shadow-xl`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <MapPin className={`w-5 h-5 ${colorSystem.blue.icon}`} />
                  地区分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["北京", "上海", "深圳", "广州", "杭州"].map((region, index) => {
                    const count = phoneRecords.filter((r) => r.region === region).length
                    const percentage = (count / totalRecords) * 100
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">{region}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={percentage} className="w-16 sm:w-20 h-2" />
                          <span className="text-sm font-medium w-10 sm:w-12">{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 质量分析 */}
          <Card
            className={`border-l-4 ${colorSystem.orange.primary} ${colorSystem.orange.hover} transition-all duration-300 hover:shadow-xl`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Star className={`w-5 h-5 ${colorSystem.orange.icon}`} />
                号码质量分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    {phoneRecords.filter((r) => r.qualityScore >= 90).length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">优秀 (≥90分)</div>
                  <Progress
                    value={(phoneRecords.filter((r) => r.qualityScore >= 90).length / totalRecords) * 100}
                    className="mt-2"
                  />
                </div>
                <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">
                    {phoneRecords.filter((r) => r.qualityScore >= 80 && r.qualityScore < 90).length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">良好 (80-89分)</div>
                  <Progress
                    value={
                      (phoneRecords.filter((r) => r.qualityScore >= 80 && r.qualityScore < 90).length / totalRecords) *
                      100
                    }
                    className="mt-2"
                  />
                </div>
                <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600">
                    {phoneRecords.filter((r) => r.qualityScore >= 60 && r.qualityScore < 80).length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">一般 (60-79分)</div>
                  <Progress
                    value={
                      (phoneRecords.filter((r) => r.qualityScore >= 60 && r.qualityScore < 80).length / totalRecords) *
                      100
                    }
                    className="mt-2"
                  />
                </div>
                <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg">
                  <div className="text-xl sm:text-2xl font-bold text-red-600">
                    {phoneRecords.filter((r) => r.qualityScore < 60).length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">较差 (&lt;60分)</div>
                  <Progress
                    value={(phoneRecords.filter((r) => r.qualityScore < 60).length / totalRecords) * 100}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 号码管理页面 */}
        <TabsContent value="records" className="mt-6">
          {/* 搜索和筛选 */}
          <Card
            className={`border-l-4 ${colorSystem.blue.primary} shadow-lg hover:shadow-xl transition-all duration-300 mb-6`}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="搜索号码、地区或标签..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={carrierFilter} onValueChange={setCarrierFilter}>
                    <SelectTrigger className="w-32 border-2 focus:border-blue-500">
                      <SelectValue placeholder="运营商" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                      <SelectItem value="移动">移动</SelectItem>
                      <SelectItem value="联通">联通</SelectItem>
                      <SelectItem value="电信">电信</SelectItem>
                      <SelectItem value="虚拟运营商">虚拟运营商</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={qualityFilter} onValueChange={setQualityFilter}>
                    <SelectTrigger className="w-32 border-2 focus:border-blue-500">
                      <SelectValue placeholder="质量" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部质量</SelectItem>
                      <SelectItem value="high">高质量</SelectItem>
                      <SelectItem value="medium">中质量</SelectItem>
                      <SelectItem value="low">低质量</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={regionFilter} onValueChange={setRegionFilter}>
                    <SelectTrigger className="w-32 border-2 focus:border-blue-500">
                      <SelectValue placeholder="地区" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部地区</SelectItem>
                      <SelectItem value="北京">北京</SelectItem>
                      <SelectItem value="上海">上海</SelectItem>
                      <SelectItem value="深圳">深圳</SelectItem>
                      <SelectItem value="广州">广州</SelectItem>
                      <SelectItem value="杭州">杭州</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                    className="hover:bg-blue-50"
                  >
                    {sortDirection === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 号码列表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredRecords.map((record) => (
              <Card
                key={record.id}
                className={`border-l-4 ${colorSystem.green.primary} ${colorSystem.green.hover} transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group`}
                onClick={() => setSelectedRecord(record)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg group-hover:text-green-600 transition-colors duration-300">
                      {record.phoneNumber}
                    </CardTitle>
                    <div className="flex gap-1 sm:gap-2">
                      <Badge className={`${getCarrierColor(record.carrier)} text-white shadow-sm text-xs`}>
                        {record.carrier}
                      </Badge>
                      <Badge className={`${getQualityColor(record.qualityScore)} border text-xs`}>
                        {record.qualityScore}分
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>
                      {record.region} · {record.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span>{record.customerType}</span>
                    <Badge className={`${getSourceColor(record.source)} text-white text-xs`}>{record.source}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="w-4 h-4 text-gray-500" />
                    <span>
                      通话成功率：
                      <span className="font-medium text-green-600">
                        {record.callAttempts > 0
                          ? ((record.successfulCalls / record.callAttempts) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span>风险等级：</span>
                    <Badge className={getRiskColor(record.riskLevel)}>{record.riskLevel}风险</Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {record.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700">
                        {tag}
                      </Badge>
                    ))}
                    {record.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-200">
                        +{record.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      商业潜力：<span className="font-medium text-purple-600">{record.businessPotential}%</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {record.isActive ? (
                        <Badge className="bg-green-500 text-white text-xs">活跃</Badge>
                      ) : (
                        <Badge className="bg-red-500 text-white text-xs">非活跃</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-1 sm:gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 hover:bg-green-50 hover:border-green-300 bg-transparent text-xs sm:text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCallPhone(record.phoneNumber)
                      }}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      拨打
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 hover:bg-blue-50 hover:border-blue-300 bg-transparent text-xs sm:text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditRecord(record)
                      }}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      编辑
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="hover:bg-red-50 hover:border-red-300 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteRecord(record.id)
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 空状态 */}
          {filteredRecords.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Database className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">暂无号码数据</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || carrierFilter !== "all" || qualityFilter !== "all" || regionFilter !== "all"
                    ? "没有找到符合条件的号码，请调整筛选条件"
                    : "还没有号码数据，点击导入按钮添加号码"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 质量分析页面 */}
        <TabsContent value="quality" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card
              className={`border-l-4 ${colorSystem.orange.primary} ${colorSystem.orange.hover} transition-all duration-300 hover:shadow-xl`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className={`w-5 h-5 ${colorSystem.orange.icon}`} />
                  质量评估维度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold mb-3 text-orange-600">评估指标</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>号码格式验证</span>
                        <span className="font-medium text-green-600">99.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>运营商识别</span>
                        <span className="font-medium text-green-600">98.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>地区归属识别</span>
                        <span className="font-medium text-green-600">97.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>活跃度评估</span>
                        <span className="font-medium text-blue-600">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>重复检测</span>
                        <span className="font-medium text-orange-600">92.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>黑名单过滤</span>
                        <span className="font-medium text-purple-600">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-l-4 ${colorSystem.purple.primary} ${colorSystem.purple.hover} transition-all duration-300 hover:shadow-xl`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className={`w-5 h-5 ${colorSystem.purple.icon}`} />
                  质量趋势分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold mb-3 text-purple-600">本月质量提升</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>平均质量分提升 2.3 分</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>高质量号码占比提升 5.2%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>无效号码减少 12.8%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>通话成功率提升 8.5%</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center text-sm">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-bold text-green-600">+15.2%</div>
                      <div className="text-gray-600">质量改善</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-bold text-blue-600">-8.7%</div>
                      <div className="text-gray-600">无效率</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI质量分析 */}
          <Card
            className={`border-l-4 ${colorSystem.indigo.primary} ${colorSystem.indigo.hover} transition-all duration-300 hover:shadow-xl`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className={`w-5 h-5 ${colorSystem.indigo.icon}`} />
                AI智能质量分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-indigo-600">质量问题识别</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-600">高风险号码</div>
                      <div className="text-gray-600">
                        检测到 {phoneRecords.filter((r) => r.riskLevel === "高").length} 个高风险号码
                      </div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-medium text-orange-600">重复号码</div>
                      <div className="text-gray-600">发现 156 个重复号码</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-600">格式异常</div>
                      <div className="text-gray-600">23 个号码格式需要修正</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-indigo-600">优化建议</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-600">数据源优化</div>
                      <div className="text-gray-600">建议增加房产数据源比重</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-600">清洗策略</div>
                      <div className="text-gray-600">启用自动清洗规则</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-600">标签完善</div>
                      <div className="text-gray-600">补充客户类型标签</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-indigo-600">预期效果</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>质量分提升</span>
                      <span className="font-medium text-green-600">+8.5分</span>
                    </div>
                    <div className="flex justify-between">
                      <span>通话成功率</span>
                      <span className="font-medium text-green-600">+12.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>转化率提升</span>
                      <span className="font-medium text-green-600">+15.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>成本节约</span>
                      <span className="font-medium text-green-600">-25.6%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据源管理页面 */}
        <TabsContent value="sources" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {dataSources.map((source) => (
              <Card
                key={source.id}
                className={`border-l-4 ${colorSystem.purple.primary} ${colorSystem.purple.hover} transition-all duration-300 hover:shadow-xl hover:scale-105`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{source.name}</CardTitle>
                    <Badge
                      className={`${
                        source.status === "active"
                          ? "bg-green-500"
                          : source.status === "processing"
                            ? "bg-orange-500"
                            : "bg-gray-500"
                      } text-white shadow-sm`}
                    >
                      {source.status === "active" ? "活跃" : source.status === "processing" ? "处理中" : "非活跃"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span>类型：{source.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Database className="w-4 h-4 text-gray-500" />
                    <span>总记录：{source.totalRecords.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                    <span>有效记录：{source.validRecords.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-gray-500" />
                    <span>质量评分：</span>
                    <Badge className={getQualityColor(source.qualityScore)}>{source.qualityScore.toFixed(1)}分</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>最后更新：{source.lastUpdate}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">有效率</span>
                      <span className="text-sm font-medium">
                        {((source.validRecords / source.totalRecords) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={(source.validRecords / source.totalRecords) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 hover:bg-purple-50 hover:border-purple-300 bg-transparent"
                      onClick={() => {
                        toast({
                          title: "更新数据源",
                          description: `正在更新 ${source.name}...`,
                        })
                      }}
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      更新
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                      onClick={() => setSelectedDataSource(source)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      详情
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-green-50 hover:border-green-300 bg-transparent"
                    >
                      <Settings className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 添加新数据源 */}
          <Card
            className={`border-l-4 ${colorSystem.green.primary} mt-6 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className={`w-5 h-5 ${colorSystem.green.icon}`} />
                添加新数据源
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">数据源名称</label>
                  <Input 
                    placeholder="请输入数据源名称" 
                    value={newDataSource.name}
                    onChange={(e) => setNewDataSource(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">数据源类型</label>
                  <Select value={newDataSource.type} onValueChange={(value: DataSource["type"]) => setNewDataSource(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择数据源类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="房产数据">房产数据</SelectItem>
                      <SelectItem value="建材市场">建材市场</SelectItem>
                      <SelectItem value="电商平台">电商平台</SelectItem>
                      <SelectItem value="社交媒体">社交媒体</SelectItem>
                      <SelectItem value="展会获客">展会获客</SelectItem>
                      <SelectItem value="其他">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">描述</label>
                  <Textarea 
                    placeholder="请描述数据源的详细信息..." 
                    rows={3} 
                    value={newDataSource.description}
                    onChange={(e) => setNewDataSource(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline"
                  onClick={() => setNewDataSource({ name: "", type: "房产数据", description: "" })}
                >
                  重置
                </Button>
                <Button 
                  onClick={handleAddDataSource}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  添加数据源
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据清洗页面 */}
        <TabsContent value="cleaning" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card
              className={`border-l-4 ${colorSystem.rose.primary} ${colorSystem.rose.hover} transition-all duration-300 hover:shadow-xl`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className={`w-5 h-5 ${colorSystem.rose.icon}`} />
                  清洗规则管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cleaningRules.map((rule) => (
                    <div
                      key={rule.id}
                      className={`p-4 border rounded-lg ${colorSystem.rose.hover} transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{rule.name}</h4>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={rule.isEnabled}
                            onCheckedChange={() => handleToggleRule(rule.id)}
                          />
                          <Badge className={rule.isEnabled ? colorSystem.green.badge : "bg-gray-500"}>
                            {rule.isEnabled ? "启用" : "禁用"}
                          </Badge>
                          <Badge variant="outline">优先级 {rule.priority}</Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{rule.description}</div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">匹配数量：{rule.matchCount.toLocaleString()}</span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-l-4 ${colorSystem.blue.primary} ${colorSystem.blue.hover} transition-all duration-300 hover:shadow-xl`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className={`w-5 h-5 ${colorSystem.blue.icon}`} />
                  一键清洗
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-600">智能清洗配置</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">格式验证</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">重复检测</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">黑名单过滤</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">活跃度检测</span>
                      </label>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-3 text-green-600">清洗统计</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>待清洗记录</span>
                        <span className="font-medium">28,456</span>
                      </div>
                      <div className="flex justify-between">
                        <span>预计清洗时间</span>
                        <span className="font-medium">约 15 分钟</span>
                      </div>
                      <div className="flex justify-between">
                        <span>预期提升质量</span>
                        <span className="font-medium text-green-600">+12.5%</span>
                      </div>
                    </div>
                  </div>
                  {isCleaning ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>清洗进度</span>
                        <span>{cleaningProgress}%</span>
                      </div>
                      <Progress value={cleaningProgress} className="h-2" />
                      <p className="text-xs text-gray-600 text-center">AI正在分析和清洗数据...</p>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setIsCleaningDialogOpen(true)}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      开始智能清洗
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 清洗历史记录 */}
          <Card
            className={`border-l-4 ${colorSystem.orange.primary} ${colorSystem.orange.hover} transition-all duration-300 hover:shadow-xl`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className={`w-5 h-5 ${colorSystem.orange.icon}`} />
                清洗历史记录
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "2024-01-22 14:30",
                    type: "全量清洗",
                    processed: 285000,
                    cleaned: 23400,
                    improvement: "+8.5%",
                    status: "completed",
                  },
                  {
                    date: "2024-01-21 09:15",
                    type: "增量清洗",
                    processed: 12500,
                    cleaned: 890,
                    improvement: "+2.1%",
                    status: "completed",
                  },
                  {
                    date: "2024-01-20 16:45",
                    type: "规则清洗",
                    processed: 45600,
                    cleaned: 3200,
                    improvement: "+5.3%",
                    status: "completed",
                  },
                ].map((record, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-orange-50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{record.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500 text-white">已完成</Badge>
                        <span className="text-sm text-gray-600">{record.date}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{record.processed.toLocaleString()}</div>
                        <div className="text-gray-600">处理记录</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-orange-600">{record.cleaned.toLocaleString()}</div>
                        <div className="text-gray-600">清洗记录</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-600">{record.improvement}</div>
                        <div className="text-gray-600">质量提升</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-600">
                          {((record.cleaned / record.processed) * 100).toFixed(1)}%
                        </div>
                        <div className="text-gray-600">清洗率</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI分析页面 */}
        <TabsContent value="ai" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <Card
              className={`border-l-4 ${colorSystem.indigo.primary} text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                  94.8%
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">AI预测准确率</div>
                <div className="text-xs text-indigo-600 mt-1">号码质量预测</div>
              </CardContent>
            </Card>
            <Card
              className={`border-l-4 ${colorSystem.green.primary} text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  87.3%
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">智能标签准确率</div>
                <div className="text-xs text-green-600 mt-1">自动标签分类</div>
              </CardContent>
            </Card>
            <Card
              className={`border-l-4 ${colorSystem.orange.primary} text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                  76.2%
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">自动清洗效率</div>
                <div className="text-xs text-orange-600 mt-1">无需人工干预</div>
              </CardContent>
            </Card>
            <Card
              className={`border-l-4 ${colorSystem.purple.primary} text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  0.3秒
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">AI分析响应时间</div>
                <div className="text-xs text-purple-600 mt-1">实时处理</div>
              </CardContent>
            </Card>
          </div>

          {/* AI功能模块 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card
              className={`border-l-4 ${colorSystem.indigo.primary} ${colorSystem.indigo.hover} transition-all duration-300 hover:shadow-xl`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className={`w-5 h-5 ${colorSystem.indigo.icon}`} />
                  AI智能分析引擎
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-indigo-600">号码质量预测</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 通话成功率预测：准确率94.8%</li>
                      <li>• 客户意向评估：智能打分系统</li>
                      <li>• 最佳联系时间：AI推荐算法</li>
                      <li>• 转化概率分析：精准营销指导</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-green-600">智能标签系统</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 自动客户分类：87.3%准确率</li>
                      <li>• 行为特征识别：多维度分析</li>
                      <li>• 价值潜力评估：商业价值预测</li>
                      <li>• 风险等级判定：降低营销风险</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-l-4 ${colorSystem.orange.primary} ${colorSystem.orange.hover} transition-all duration-300 hover:shadow-xl`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className={`w-5 h-5 ${colorSystem.orange.icon}`} />
                  智能优化建议
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-orange-600">数据质量优化</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 建议增加房产数据源比重至40%</li>
                      <li>• 启用自动清洗规则，预计提升12%质量</li>
                      <li>• 优化标签体系，提升分类准确性</li>
                      <li>• 定期更新黑名单，降低投诉风险</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-600">营销策略建议</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 高质量号码优先分配给资深销售</li>
                      <li>• 中等质量号码适合新人练手</li>
                      <li>• 低质量号码建议暂停使用</li>
                      <li>• 根据地区特点调整营销时间</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI洞察报告 */}
          <Card
            className={`border-l-4 ${colorSystem.purple.primary} ${colorSystem.purple.hover} transition-all duration-300 hover:shadow-xl`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className={`w-5 h-5 ${colorSystem.purple.icon}`} />
                AI深度洞察报告
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-purple-600">数据趋势洞察</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium">高质量号码增长</div>
                      <div className="text-gray-600">本月高质量号码占比提升5.2%，主要来源于房产数据</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium">地区分布优化</div>
                      <div className="text-gray-600">一线城市号码质量普遍较高，建议重点开发</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-purple-600">运营商分析</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium">移动用户特征</div>
                      <div className="text-gray-600">通话接通率最高，适合电话营销</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-medium">联通用户特征</div>
                      <div className="text-gray-600">年轻用户较多，偏好数字化沟通</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-purple-600">预测与建议</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 bg-rose-50 rounded-lg">
                      <div className="font-medium">质量提升预期</div>
                      <div className="text-gray-600">按当前优化速度，下月平均质量分可达88.5</div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <div className="font-medium">成本效益分析</div>
                      <div className="text-gray-600">投入数据清洗成本，预期ROI提升25%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 号码详情弹窗 */}
      {selectedRecord && (
        <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                号码详情 - {selectedRecord.phoneNumber}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-3 text-blue-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    基本信息
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">手机号码：</span>
                      <span className="font-medium">{selectedRecord.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">运营商：</span>
                      <Badge className={`${getCarrierColor(selectedRecord.carrier)} text-white`}>
                        {selectedRecord.carrier}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">归属地：</span>
                      <span className="font-medium">
                        {selectedRecord.region} · {selectedRecord.city}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">活跃状态：</span>
                      <Badge className={selectedRecord.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                        {selectedRecord.isActive ? "活跃" : "非活跃"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-3 text-green-600 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    质量评估
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">质量评分：</span>
                      <Badge className={getQualityColor(selectedRecord.qualityScore)}>
                        {selectedRecord.qualityScore}分
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">风险等级：</span>
                      <Badge className={getRiskColor(selectedRecord.riskLevel)}>{selectedRecord.riskLevel}风险</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">商业潜力：</span>
                      <span className="font-medium text-purple-600">{selectedRecord.businessPotential}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">客户类型：</span>
                      <span className="font-medium">{selectedRecord.customerType}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold mb-3 text-orange-600 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    通话记录
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">尝试次数：</span>
                      <span className="font-medium">{selectedRecord.callAttempts}次</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">成功次数：</span>
                      <span className="font-medium text-green-600">{selectedRecord.successfulCalls}次</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">成功率：</span>
                      <span className="font-medium text-green-600">
                        {selectedRecord.callAttempts > 0
                          ? ((selectedRecord.successfulCalls / selectedRecord.callAttempts) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">最后验证：</span>
                      <span className="font-medium">{selectedRecord.lastVerified}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-3 text-purple-600 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    数据来源
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">来源：</span>
                      <Badge className={`${getSourceColor(selectedRecord.source)} text-white`}>
                        {selectedRecord.source}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">添加日期：</span>
                      <span className="font-medium">{selectedRecord.addedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold mb-2 text-indigo-600 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    标签信息
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecord.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-indigo-200 text-indigo-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {selectedRecord.notes && (
                <div className="col-span-2">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      备注信息
                    </h4>
                    <div className="text-sm leading-relaxed">{selectedRecord.notes}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-end gap-2 pt-4 border-t">
              <Button 
                variant="outline" 
                className="hover:bg-green-50 hover:border-green-300 bg-transparent"
                onClick={() => handleCallPhone(selectedRecord.phoneNumber)}
              >
                <Phone className="w-4 h-4 mr-2" />
                拨打电话
              </Button>
              <Button 
                variant="outline" 
                className="hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                onClick={() => handleEditRecord(selectedRecord)}
              >
                <Edit className="w-4 h-4 mr-2" />
                编辑信息
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                更新状态
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* 编辑号码弹窗 */}
      {editingRecord && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-600" />
                编辑号码信息 - {editingRecord.phoneNumber}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
\
