import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  ClipboardList, 
  Wrench, 
  Calendar, 
  User, 
  Search, 
  ChevronRight, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Pause,
  BarChart3, 
  Settings,
  LayoutGrid,
  MessageSquare,
  ShieldCheck,
  Cpu,
  Database,
  Cloud,
  Menu,
  Lock,
  Mail,
  Phone,
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  RefreshCw,
  Info,
  Scan,
  LogOut,
  ChevronLeft,
  Smartphone,
  Camera,
  ShieldOff,
  Box,
  Activity,
  Monitor,
  Key,
  Users,
  ClipboardCheck,
  Server,
  BellOff,
  ChevronDown,
  Star,
  X,
  MoreVertical,
  ArrowRightLeft,
  Play,
  MessageSquareText,
  History,
  BookOpen,
  Paperclip
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface OperationObject {
  category: string;
  package: string;
  model: string;
  quantity: number;
}

interface WorkOrder {
  id: string;
  ticketNo: string;
  sn: string;
  title: string;
  status: 'pending' | 'unstarted' | 'processing' | 'suspended' | 'completed';
  priority: 'high' | 'medium' | 'low';
  time: string;
  type: string;
  staff: string;
  creator: string;
  dataCenter: string;
  expectedTime: string;
  deviceCount: number;
  responsiblePerson: string;
  outsourcingRequester: string;
  operationObjects: OperationObject[];
  operationDetails: string;
  remarks: string;
}

interface Alert {
  id: string;
  level: 'critical' | 'warning' | 'info';
  content: string;
  time: string;
}

// --- Mock Data ---
const USER_INFO = {
  name: "刘丽娟",
  role: "高级运维工程师",
  roleType: "supervisor" as "supervisor" | "staff",
  dataCenters: ["北京二区", "上海一区", "香港三区"]
};

const MOCK_ORDERS: WorkOrder[] = [
  { 
    id: 'WO-20240328-01', 
    ticketNo: '102938', 
    sn: 'SN-882910', 
    title: '北京二区云服务器扩容申请', 
    status: 'processing', 
    priority: 'high', 
    time: '10:24', 
    type: '扩容', 
    staff: '张三', 
    creator: '刘主管', 
    dataCenter: '北京二区',
    expectedTime: '2024-03-29 18:00',
    deviceCount: 5,
    responsiblePerson: '张三',
    outsourcingRequester: '李四',
    operationObjects: [
      { category: '服务器', package: '标准型 S5', model: 'Dell R740', quantity: 3 },
      { category: '交换机', package: '万兆光口', model: 'Huawei CE6800', quantity: 2 }
    ],
    operationDetails: '1. 硬件上架安装\n2. 网络线缆连接\n3. 系统初始化配置',
    remarks: '请务必在下班前完成初步调试'
  },
  { 
    id: 'WO-20240328-02', 
    ticketNo: '293847', 
    sn: 'SN-771234', 
    title: 'RDS 数据库性能调优请求', 
    status: 'pending', 
    priority: 'medium', 
    time: '09:15', 
    type: '调优', 
    staff: '李四', 
    creator: '王经理', 
    dataCenter: '上海一区',
    expectedTime: '2024-03-30 12:00',
    deviceCount: 1,
    responsiblePerson: '李四',
    outsourcingRequester: '陈五',
    operationObjects: [
      { category: '数据库', package: 'MySQL 8.0', model: 'High-IOPS', quantity: 1 }
    ],
    operationDetails: '1. 参数优化\n2. 索引重建\n3. 慢查询分析',
    remarks: '业务高峰期前完成'
  },
  { 
    id: 'WO-20240328-03', 
    ticketNo: '384756', 
    sn: 'SN-665544', 
    title: 'VPC 网络隔离规则变更', 
    status: 'completed', 
    priority: 'low', 
    time: '昨天', 
    type: '网络', 
    staff: '王五', 
    creator: '赵工', 
    dataCenter: '香港三区',
    expectedTime: '2024-03-28 10:00',
    deviceCount: 0,
    responsiblePerson: '王五',
    outsourcingRequester: '无',
    operationObjects: [],
    operationDetails: '1. 防火墙规则更新\n2. 路由表调整',
    remarks: '已验证通过'
  },
  { 
    id: 'WO-20240328-04', 
    ticketNo: '475612', 
    sn: 'SN-554433', 
    title: 'IDC 机房巡检任务', 
    status: 'suspended', 
    priority: 'medium', 
    time: '前天', 
    type: '巡检', 
    staff: '赵六', 
    creator: '孙主管', 
    dataCenter: '北京二区',
    expectedTime: '2024-03-27 17:00',
    deviceCount: 50,
    responsiblePerson: '赵六',
    outsourcingRequester: '无',
    operationObjects: [],
    operationDetails: '1. 环境温度检查\n2. 供电系统检查\n3. 消防设施检查',
    remarks: '部分空调滤网需更换'
  },
  { 
    id: 'WO-20240328-05', 
    ticketNo: '561234', 
    sn: 'SN-443322', 
    title: '服务器硬件故障排查', 
    status: 'unstarted', 
    priority: 'high', 
    time: '14:20', 
    type: '维修', 
    staff: '孙七', 
    creator: '周工', 
    dataCenter: '上海一区',
    expectedTime: '2024-03-29 10:00',
    deviceCount: 1,
    responsiblePerson: '孙七',
    outsourcingRequester: '无',
    operationObjects: [
      { category: '服务器', package: '计算型 C3', model: 'HP DL380', quantity: 1 }
    ],
    operationDetails: '1. 内存报错排查\n2. 硬盘健康度检测',
    remarks: '需备件更换'
  },
  { 
    id: 'WO-20240328-06', 
    ticketNo: '612345', 
    sn: 'SN-332211', 
    title: '新机架上电申请', 
    status: 'pending', 
    priority: 'medium', 
    time: '16:45', 
    type: '上电', 
    staff: '周八', 
    creator: '吴经理', 
    dataCenter: '香港三区',
    expectedTime: '2024-03-31 15:00',
    deviceCount: 2,
    responsiblePerson: '周八',
    outsourcingRequester: '郑九',
    operationObjects: [
      { category: '机架', package: '42U 标准', model: 'APC AR3100', quantity: 2 }
    ],
    operationDetails: '1. PDU 安装\n2. 电源线连接\n3. 负载测试',
    remarks: '注意双路供电平衡'
  },
  { 
    id: 'WO-20240328-07', 
    ticketNo: '723456', 
    sn: 'SN-221100', 
    title: '出口带宽临时扩容', 
    status: 'processing', 
    priority: 'high', 
    time: '11:30', 
    type: '网络', 
    staff: '吴九', 
    creator: '郑主管', 
    dataCenter: '北京二区',
    expectedTime: '2024-03-29 09:00',
    deviceCount: 0,
    responsiblePerson: '吴九',
    outsourcingRequester: '无',
    operationObjects: [],
    operationDetails: '1. 核心路由器限速调整\n2. 运营商链路监控',
    remarks: '活动期间保持监控'
  },
  { 
    id: 'WO-20240328-08', 
    ticketNo: '834567', 
    sn: 'SN-110099', 
    title: '交换机上线', 
    status: 'unstarted', 
    priority: 'high', 
    time: '15:10', 
    type: '网络', 
    staff: '郑十', 
    creator: '冯工', 
    dataCenter: '上海一区',
    expectedTime: '2024-03-29 14:00',
    deviceCount: 4,
    responsiblePerson: '郑十',
    outsourcingRequester: '无',
    operationObjects: [
      { category: '交换机', package: '25G 接入', model: 'Cisco Nexus 9300', quantity: 4 }
    ],
    operationDetails: '1. 堆叠配置\n2. VLAN 划分\n3. 端口安全设置',
    remarks: '需配合业务侧割接'
  },
  { 
    id: 'WO-20240328-09', 
    ticketNo: '945678', 
    sn: 'SN-009988', 
    title: '网络设备上线', 
    status: 'processing', 
    priority: 'high', 
    time: '08:30', 
    type: '网络', 
    staff: '张三', 
    creator: '刘主管', 
    dataCenter: '北京二区',
    expectedTime: '2024-03-29 12:00',
    deviceCount: 2,
    responsiblePerson: '张三',
    outsourcingRequester: '无',
    operationObjects: [
      { category: '路由器', package: '核心级', model: 'Huawei NE40E', quantity: 2 }
    ],
    operationDetails: '1. 设备加电\n2. 基础配置导入\n3. 业务链路测试',
    remarks: '核心节点，需双人操作'
  },
];

const MOCK_ALERTS: Alert[] = [
  { id: 'AL-01', level: 'critical', content: '上海一区负载均衡器响应延迟过高 (>500ms)', time: '3分钟前' },
  { id: 'AL-02', level: 'warning', content: '对象存储 KS3 存储桶写入速率接近阈值', time: '12分钟前' },
];

const TOOLS = [
  { icon: ShieldOff, name: '告警屏蔽', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: Box, name: '机房库存', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: Activity, name: '检测工具', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: Monitor, name: '展示信息', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: MessageSquare, name: '我的消息', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { icon: Key, name: '入室工单', color: 'text-teal-500', bg: 'bg-teal-50' },
  { icon: Wrench, name: '报修信息', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Users, name: '人员调用', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: ClipboardCheck, name: '线下盘点', color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { icon: Server, name: '机架位订正', color: 'text-slate-500', bg: 'bg-slate-50' },
];

// --- Components ---

const StatusBadge = ({ status }: { status: WorkOrder['status'] }) => {
  const styles = {
    pending: 'bg-amber-50 text-amber-600 border-amber-100',
    unstarted: 'bg-slate-100 text-slate-500 border-slate-200',
    processing: 'bg-blue-50 text-blue-600 border-blue-100',
    suspended: 'bg-rose-50 text-rose-600 border-rose-100',
    completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  };
  const labels = { 
    pending: '待分配', 
    unstarted: '未开始', 
    processing: '已开始', 
    suspended: '挂起', 
    completed: '已完成' 
  };
  return (
    <span className={`text-[9px] px-1.5 py-0.5 rounded-md border font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const SlideToUnlock = ({ onUnlock, text = "右滑开始操作" }: { onUnlock: () => void, text?: string }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const handleRef = React.useRef<HTMLDivElement>(null);

  const updateConstraints = React.useCallback(() => {
    if (containerRef.current && handleRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const handleWidth = handleRef.current.offsetWidth;
      if (containerWidth > 0) {
        setConstraints({
          left: 0,
          right: containerWidth - handleWidth - 8
        });
      }
    }
  }, []);

  useEffect(() => {
    updateConstraints();
    
    // Use ResizeObserver to handle layout changes
    if (containerRef.current) {
      const observer = new ResizeObserver(updateConstraints);
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [updateConstraints]);

  return (
    <div ref={containerRef} className="relative w-full h-14 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner p-1">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-bold text-slate-400 animate-pulse select-none">{text}</span>
      </div>
      
      <motion.div
        ref={handleRef}
        drag="x"
        dragConstraints={constraints}
        dragElastic={0.05}
        dragSnapToOrigin={!isUnlocked}
        onDragEnd={(_, info) => {
          if (info.offset.x > constraints.right * 0.7) {
            setIsUnlocked(true);
            onUnlock();
            setTimeout(() => setIsUnlocked(false), 1500);
          }
        }}
        className="absolute left-1 top-1 bottom-1 w-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg cursor-grab active:cursor-grabbing z-10"
      >
        <ChevronRight size={20} />
      </motion.div>
      
      <motion.div 
        className="absolute left-0 top-0 bottom-0 bg-emerald-500/20"
        animate={{ width: isUnlocked ? '100%' : '0%' }}
      />
    </div>
  );
};

const PriorityBadge = ({ priority }: { priority: WorkOrder['priority'] }) => {
  const styles = {
    high: 'text-rose-500',
    medium: 'text-amber-500',
    low: 'text-slate-400',
  };
  return <span className={`text-[10px] font-medium ${styles[priority]}`}>●</span>;
};

// --- Login Page Component ---
const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [loginMethod, setLoginMethod] = useState<'account' | 'sms' | 'email'>('account');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const tabs = [
    { id: 'account', label: '账号登录' },
    { id: 'sms', label: '短信登录' },
    { id: 'email', label: '邮箱登录' },
  ];

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Subtle Background Decorations */}
      <div className="absolute top-[-5%] right-[-5%] w-72 h-72 bg-emerald-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-slate-200/50 rounded-full blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-display font-bold text-slate-900 tracking-[0.1em]">OMS</h1>
          <p className="text-slate-400 text-[11px] mt-2 uppercase tracking-[0.05em] font-bold">金山云OMS系统，指令到现场，执行有回响</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[40px] p-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-100/50 backdrop-blur-sm">
          {/* Tabs */}
          <div className="flex bg-slate-100/50 p-1.5 rounded-2xl mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLoginMethod(tab.id as any)}
                className={`flex-1 py-2.5 text-[11px] font-display font-bold rounded-xl transition-all duration-300 ${
                  loginMethod === tab.id 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <AnimatePresence mode="wait">
              {loginMethod === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="用户名 / 手机号" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-[11px] font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="登录密码" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 text-[11px] font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </motion.div>
              )}

              {loginMethod === 'sms' && (
                <motion.div
                  key="sms"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="tel" 
                      placeholder="手机号码" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-[11px] font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="短信验证码" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-28 text-[11px] font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                      required
                    />
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-display font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                      获取验证码
                    </button>
                  </div>
                </motion.div>
              )}

              {loginMethod === 'email' && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="email" 
                      placeholder="电子邮箱" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-[11px] font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="邮箱验证码" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-28 text-[11px] font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                      required
                    />
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-display font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                      获取验证码
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Common Captcha Field */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="图形验证码" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-[11px] font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                  required
                />
              </div>
              <div 
                onClick={generateCaptcha}
                className="w-24 bg-slate-50 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all border border-slate-100 group"
              >
                <span className="text-slate-600 font-mono font-bold tracking-widest text-sm select-none italic opacity-70 group-hover:opacity-100">
                  {captcha}
                </span>
                <RefreshCw size={10} className="text-slate-300 ml-2 group-hover:rotate-180 transition-transform duration-500" />
              </div>
            </div>

            {loginMethod === 'account' && (
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-200 bg-slate-50 checked:bg-emerald-600 transition-colors" />
                  <span className="text-[10px] text-slate-400 font-medium group-hover:text-slate-600 transition-colors">记住我</span>
                </label>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full relative group overflow-hidden rounded-2xl shadow-xl shadow-emerald-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 transition-transform duration-500 group-hover:scale-110" />
              <div className="relative py-4 flex items-center justify-center gap-2 transition-all">
                {isLoading ? (
                  <RefreshCw size={18} className="animate-spin text-white" />
                ) : (
                  <>
                    <span className="text-white font-display font-bold tracking-[0.2em] text-[11px]">立即登录</span>
                    <ArrowRight size={16} className="text-emerald-100 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// --- Floating User Tips Component ---
const FloatingUserTips = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  if (isHidden) {
    return (
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={{ left: 0, right: 350, top: 0, bottom: 750 }}
        initial={{ x: 340, y: 120 }}
        className="absolute z-[100] cursor-pointer"
        onClick={() => setIsHidden(false)}
      >
        <div className="w-6 h-6 bg-emerald-600/80 rounded-full shadow-md flex items-center justify-center border border-white/30 backdrop-blur-sm text-white hover:bg-emerald-600 transition-colors">
          <User size={12} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ left: -260, right: 40, top: -700, bottom: 0 }}
      initial={{ x: 20, y: 680 }}
      className="absolute z-[100] cursor-move"
    >
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-600 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 border-2 border-white/20 backdrop-blur-sm relative group"
        >
          <User size={14} />
          <span className="text-xs font-bold">{USER_INFO.name}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={12} />
          </motion.div>
          
          {/* Quick Hide Button */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setIsHidden(true);
            }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-slate-800/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20"
          >
            <X size={10} />
          </div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10, x: -160 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: -160 }}
              exit={{ opacity: 0, scale: 0.9, y: 10, x: -160 }}
              className="absolute bottom-full mb-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800">{USER_INFO.name}</p>
                      <p className="text-[9px] text-slate-400">{USER_INFO.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsHidden(true);
                    }}
                    className="p-1 text-slate-300 hover:text-slate-500"
                  >
                    <EyeOff size={14} />
                  </button>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Server size={10} /> 负责机房
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {USER_INFO.dataCenters.map((dc, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[9px] font-medium">
                        {dc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Home Page Component ---
const HomePage = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState<'supervisor' | 'staff'>(USER_INFO.roleType);
  const [showScanSettings, setShowScanSettings] = useState(false);
  const [scanMode, setScanMode] = useState<'pda' | 'camera'>('pda');
  const [homeView, setHomeView] = useState<'message' | 'duty'>('message');
  const [messageCategory, setMessageCategory] = useState<'ticket' | 'system'>('ticket');
  const [unreadMessages, setUnreadMessages] = useState({ ticket: true, system: false });
  const [myTools, setMyTools] = useState<typeof TOOLS>([]);
  const [ticketSearch, setTicketSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false); // Toggle search visibility
  const [ticketStage, setTicketStage] = useState(0); // 0: To-do, 1: In-progress, 2: Completed
  const [ticketSubStage, setTicketSubStage] = useState<string | null>(null); // Sub-filter for In-progress
  const [orders, setOrders] = useState<WorkOrder[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [showMoreBasicInfo, setShowMoreBasicInfo] = useState(false);
  const [showActionDrawer, setShowActionDrawer] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showActionModal, setShowActionModal] = useState<{ type: 'start' | 'feedback' | 'transfer' | 'suspend' | 'assign', title: string } | null>(null);
  const [actionDescription, setActionDescription] = useState('');
  const [actionAttachment, setActionAttachment] = useState<File | null>(null);
  const [transferTo, setTransferTo] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [supervisor, setSupervisor] = useState('');

  const stages = userRole === 'supervisor' 
    ? [
        { name: '待分配', statuses: ['pending'] },
        { name: '进行中', statuses: ['unstarted', 'processing', 'suspended'] },
        { name: '已完成', statuses: ['completed'] }
      ]
    : [
        { name: '未开始', statuses: ['unstarted'] },
        { name: '进行中', statuses: ['processing', 'suspended'] },
        { name: '已完成', statuses: ['completed'] }
      ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(ticketSearch.toLowerCase()) || 
      order.ticketNo.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      order.title.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      order.sn.toLowerCase().includes(ticketSearch.toLowerCase()) ||
      order.type.toLowerCase().includes(ticketSearch.toLowerCase());
      
    const currentStage = stages[ticketStage];
    const matchesStage = currentStage.statuses.includes(order.status);
    
    // Sub-stage filtering for "进行中" (usually index 1)
    if (ticketStage === 1 && ticketSubStage) {
      return matchesSearch && order.status === ticketSubStage;
    }
    
    return matchesSearch && matchesStage;
  });

  const handleToolLongPress = (tool: typeof TOOLS[0]) => {
    if (!myTools.find(t => t.name === tool.name)) {
      setMyTools([...myTools, tool]);
    }
  };

  const removeMyTool = (toolName: string) => {
    setMyTools(myTools.filter(t => t.name !== toolName));
  };

  const renderHomeContent = () => (
    <>
      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
            <Cloud size={20} />
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">OMS</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowScanSettings(true)}
            className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Scan size={18} />
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-5 pb-24 space-y-4 pt-2">
        
        {/* My Common Tools Section */}
        {myTools.length > 0 && (
          <section className="space-y-2.5">
            <h3 className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
              <Star size={13} className="text-amber-500 fill-amber-500" />
              我的常用工具
            </h3>
            <div className="grid grid-cols-4 gap-2.5">
              {myTools.map((tool, idx) => (
                <motion.button 
                  key={idx} 
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    removeMyTool(tool.name);
                  }}
                  className="flex flex-col items-center justify-center p-2 bg-white rounded-2xl border border-slate-100 shadow-sm gap-1.5 relative group"
                >
                  <div className={`w-8 h-8 ${tool.bg} ${tool.color} rounded-xl flex items-center justify-center`}>
                    <tool.icon size={16} />
                  </div>
                  <span className="text-[9px] font-bold text-slate-600 text-center leading-tight">{tool.name}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeMyTool(tool.name); }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <X size={10} />
                  </button>
                </motion.button>
              ))}
            </div>
          </section>
        )}
        
        {/* Integrated Tabbed Card - Duty / Message */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          {/* Tab Switcher at the top of the card */}
          <div className="px-3.5 pt-3.5 pb-2 border-b border-slate-50">
            <section className="bg-slate-100/80 backdrop-blur-sm p-1 rounded-2xl flex gap-1 w-full relative">
              <div 
                className="absolute top-1 bottom-1 bg-white rounded-xl shadow-sm transition-all duration-300 ease-out"
                style={{
                  width: 'calc(50% - 4px)',
                  left: homeView === 'message' ? '4px' : '50%'
                }}
              />
              <button 
                onClick={() => setHomeView('message')}
                className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-all relative z-10 flex items-center justify-center gap-1.5 ${
                  homeView === 'message' ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                消息
                {(unreadMessages.ticket || unreadMessages.system) && (
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                )}
              </button>
              <button 
                onClick={() => setHomeView('duty')}
                className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-all relative z-10 ${
                  homeView === 'duty' ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                值班
              </button>
            </section>
          </div>

          {/* Dynamic Content Area */}
          <div className="p-3.5">
            <AnimatePresence mode="wait">
            {homeView === 'message' ? (
              <motion.div
                key="message-view"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-3"
              >
                {/* Message Categories */}
                <div className="flex gap-2 mb-1">
                  {[
                    { id: 'ticket', label: '工单消息', hasUnread: unreadMessages.ticket },
                    { id: 'system', label: '系统消息', hasUnread: unreadMessages.system }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setMessageCategory(cat.id as any);
                        if (cat.id === 'ticket') setUnreadMessages(prev => ({ ...prev, ticket: false }));
                        if (cat.id === 'system') setUnreadMessages(prev => ({ ...prev, system: false }));
                      }}
                      className={`px-3 py-1 rounded-lg text-[9px] font-bold transition-all flex items-center gap-1.5 ${
                        messageCategory === cat.id 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : 'bg-slate-50 text-slate-400 border border-transparent hover:bg-slate-100'
                      }`}
                    >
                      {cat.label}
                      {cat.hasUnread && <div className="w-1 h-1 bg-rose-500 rounded-full" />}
                    </button>
                  ))}
                </div>

                <div className="divide-y divide-slate-50">
                  {(messageCategory === 'ticket' ? [
                    { id: 1, type: 'success', title: '工单已指派', content: '您有一个新的工单 [BJ-20240328-001] 待处理', time: '刚刚', unread: true },
                    { id: 2, type: 'info', title: '工单状态更新', content: '工单 [BJ-20240328-002] 已由主管审批通过', time: '10m', unread: false },
                    { id: 3, type: 'alert', title: '工单即将超时', content: '工单 [BJ-20240328-003] 距离截止时间仅剩 30 分钟', time: '1h', unread: false },
                  ] : [
                    { id: 101, type: 'alert', title: '系统告警', content: '北京三区 BGP 线路出现波动，请关注监控数据', time: '5m', unread: false },
                    { id: 102, type: 'info', title: '维护通知', content: '本周六凌晨 02:00 核心交换机固件升级', time: '2h', unread: false },
                  ]).map((msg) => (
                    <div key={msg.id} className="flex items-center gap-2.5 py-2.5 first:pt-0 last:pb-0 relative">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        msg.type === 'alert' ? 'bg-rose-100 text-rose-500' : msg.type === 'success' ? 'bg-emerald-100 text-emerald-500' : 'bg-blue-100 text-blue-500'
                      }`}>
                        {msg.type === 'alert' ? <AlertCircle size={14} /> : msg.type === 'success' ? <CheckCircle2 size={14} /> : <Info size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-[9px] font-bold text-slate-800">{msg.title}</h4>
                            {msg.unread && <div className="w-1 h-1 bg-rose-500 rounded-full" />}
                          </div>
                          <span className="text-[8px] text-slate-400">{msg.time}</span>
                        </div>
                        <p className="text-[8px] text-slate-500 truncate">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="duty-view"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-800">实时排班</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] text-slate-400 font-medium">2024-03-28</span>
                    <button className="text-[8px] text-emerald-600 font-bold hover:underline">更多排班</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { title: '网络运维', staff: '王春梅、张文旭', phone: '13381369452', icon: Cloud, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { title: 'IDC运维', staff: '秦哲飞、黄文选', phone: '13693530624', icon: Server, color: 'text-slate-600', bg: 'bg-slate-100' },
                    { title: '公有云资产', staff: '李星星', phone: '15810025820', icon: Box, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { title: 'NOC平台', staff: '刘丽娟、刘会成', phone: '13141272968', icon: Monitor, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5 p-2.5 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.bg} ${item.color} shrink-0`}>
                          <item.icon size={14} />
                        </div>
                        <p className="text-[10px] font-bold text-slate-800 truncate">{item.title}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[9px] text-slate-500 truncate font-medium">{item.staff}</p>
                        <p className="text-[8px] text-slate-400 font-mono">{item.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

        {/* Daily Tools Grid - More Compact */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1 relative group">
            <h3 className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
              <Wrench size={13} className="text-indigo-500" />
              日常工具
            </h3>
            {/* Tooltip on Hover */}
            <div className="absolute left-0 -top-7 bg-slate-800/90 backdrop-blur-sm text-white text-[9px] px-2.5 py-1.5 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 translate-y-1 group-hover:translate-y-0 flex items-center gap-1.5 border border-white/10">
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
              常按工具可以置顶，使用不迷路哦
              <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-800/90 rotate-45" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {TOOLS.map((tool, idx) => {
              let timer: any;
              return (
                <motion.button
                  key={idx}
                  onPointerDown={() => {
                    timer = setTimeout(() => handleToolLongPress(tool), 600);
                  }}
                  onPointerUp={() => clearTimeout(timer)}
                  onPointerLeave={() => clearTimeout(timer)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-1.5 bg-transparent rounded-2xl gap-1 select-none"
                >
                  <div className={`w-9 h-9 ${tool.color} flex items-center justify-center shrink-0`}>
                    <tool.icon size={18} />
                  </div>
                  <span className="text-[10px] font-medium text-slate-600 text-center leading-tight px-1">{tool.name}</span>
                </motion.button>
              );
            })}
          </div>
        </section>

      </main>
    </>
  );

  const renderOrderDetail = (order: WorkOrder) => (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-4 rounded-b-[32px] shadow-sm border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => {
              setSelectedOrder(null);
              setShowMoreBasicInfo(false);
            }}
            className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-500 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 tracking-wider">工单详情</h2>
              <StatusBadge status={order.status} />
            </div>
          </div>

          <button 
            onClick={() => setShowActionDrawer(true)}
            className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-500 transition-all"
          >
            <MoreVertical size={18} />
          </button>
        </div>

        <h3 className="text-sm font-bold text-slate-800 leading-tight text-center flex items-center justify-center gap-1.5">
          <span className="text-emerald-600">{order.ticketNo}</span>
          <span className="text-slate-300">-</span>
          <span>{order.title}</span>
          <button 
            onClick={() => setShowDuration(!showDuration)}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              showDuration ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
            }`}
          >
            <Clock size={14} />
          </button>
        </h3>

        {/* Global Duration Info Bar */}
        <AnimatePresence>
          {showDuration && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-center gap-6 py-2.5 px-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                    <User size={12} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">当前操作人</span>
                    <span className="text-[10px] text-slate-700 font-bold">{order.staff || '未指派'}</span>
                  </div>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
                    <Clock size={12} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">累计用时</span>
                    <span className="text-[10px] text-slate-700 font-mono font-bold">02:15:43</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 pb-24 custom-scrollbar">
        {/* Basic Info Section */}
        <section className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-3">
              <h4 className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                <div className="w-1 h-3 bg-emerald-500 rounded-full" />
                基本信息
              </h4>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md border shadow-sm ${
                order.priority === 'high' ? 'bg-rose-50 border-rose-100 text-rose-600' : 
                order.priority === 'medium' ? 'bg-amber-50 border-amber-100 text-amber-600' : 
                'bg-slate-50 border-slate-100 text-slate-600'
              }`}>
                <div className={`w-1 h-1 rounded-full ${
                  order.priority === 'high' ? 'bg-rose-500' : 
                  order.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                }`} />
                <span className="text-[9px] font-bold">
                  {order.priority === 'high' ? '高优先级' : order.priority === 'medium' ? '中优先级' : '低优先级'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setShowMoreBasicInfo(!showMoreBasicInfo)}
              className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-md"
            >
              {showMoreBasicInfo ? '收起' : '更多'}
              <ChevronDown size={10} className={`transition-transform ${showMoreBasicInfo ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
            {order.status === 'pending' ? (
              <>
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">主单发起人</span>
                  <span className="text-[10px] text-slate-700 font-bold">{order.creator}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">发起时间</span>
                  <span className="text-[10px] text-slate-700 font-bold">{order.time}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">工单发起人</span>
                  <span className="text-[10px] text-slate-700 font-bold">{order.creator}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">期望完成时间</span>
                  <span className="text-[10px] text-slate-700 font-bold">{order.expectedTime}</span>
                </div>
              </>
            )}

            <AnimatePresence>
              {showMoreBasicInfo && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="col-span-2 grid grid-cols-2 gap-y-2.5 gap-x-4 overflow-hidden pt-2.5 border-t border-slate-50 mt-0.5"
                >
                  {order.status === 'pending' ? (
                    <>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">外包单发起人</span>
                        <span className="text-[10px] text-slate-700 font-bold">{order.outsourcingRequester}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">期望完成时间</span>
                        <span className="text-[10px] text-slate-700 font-bold">{order.expectedTime}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">操作设备数量</span>
                        <span className="text-[10px] text-slate-700 font-bold">{order.deviceCount}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">机房</span>
                        <span className="text-[10px] text-slate-700 font-bold">{order.dataCenter}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">发起时间</span>
                        <span className="text-[10px] text-slate-700 font-bold">{order.time}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">工单责任人</span>
                        <span className="text-[10px] text-slate-700 font-bold">{order.responsiblePerson}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">外包单发起人</span>
                        <span className="text-[10px] text-slate-700 font-bold">{order.outsourcingRequester}</span>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Operation Objects Section */}
        <section className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
              <div className="w-1 h-3 bg-emerald-500 rounded-full" />
              操作对象
            </h4>
            {order.status !== 'pending' && (
              <div className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                <span className="text-[8px] text-slate-400 font-bold uppercase">操作总数量</span>
                <span className="text-[10px] text-emerald-600 font-bold">{order.deviceCount}</span>
              </div>
            )}
          </div>
          {order.operationObjects.length > 0 ? (
            <div className="space-y-2">
              {order.operationObjects.map((obj, idx) => (
                <div key={idx} className="bg-slate-50/50 rounded-xl p-2.5 border border-slate-100/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] bg-emerald-100/50 text-emerald-700 px-1.5 py-0.5 rounded font-bold">{obj.category}</span>
                    <span className="text-[10px] text-slate-900 font-bold">x{obj.quantity}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[7px] text-slate-400 font-bold uppercase">资产归属</span>
                      <span className="text-[9px] text-slate-600 font-bold truncate">公有云</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] text-slate-400 font-bold uppercase">套餐</span>
                      <span className="text-[9px] text-slate-600 font-bold truncate">{obj.package}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] text-slate-400 font-bold uppercase">型号</span>
                      <span className="text-[9px] text-slate-600 font-bold truncate">{obj.model}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[9px] text-slate-400 italic px-1">暂无操作对象</p>
          )}
        </section>

        {/* Operation Details Section */}
        <section className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5 mb-2.5">
            <div className="w-1 h-3 bg-emerald-500 rounded-full" />
            操作明细
          </h4>
          <div className="bg-slate-50/50 rounded-xl p-2.5 border border-slate-100/50">
            <p className="text-[9px] text-slate-600 leading-relaxed whitespace-pre-line font-medium">
              {order.operationDetails || '暂无操作明细'}
            </p>
          </div>
        </section>

        {/* Remarks Section */}
        <section className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm">
          <h4 className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5 mb-2.5">
            <div className="w-1 h-3 bg-emerald-500 rounded-full" />
            备注说明
          </h4>
          <div className="bg-slate-50/50 rounded-xl p-2.5 border border-slate-100/50">
            <p className="text-[9px] text-slate-600 leading-relaxed font-medium">
              {order.remarks || '暂无备注'}
            </p>
          </div>
        </section>
      </div>

      {/* Slide to Assign for Pending Orders */}
      {order.status === 'pending' && (
        <div key={`assign-${order.id}`} className="absolute bottom-[80px] left-0 right-0 px-5 pb-4 pt-3 bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
          <SlideToUnlock 
            text="右滑开始分配"
            onUnlock={() => {
              setShowActionModal({ type: 'assign', title: '任务分配' });
            }} 
          />
        </div>
      )}

      {/* Slide to Start for Unstarted Orders */}
      {order.status === 'unstarted' && (
        <div key={order.id} className="absolute bottom-[80px] left-0 right-0 px-5 pb-4 pt-3 bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
          <SlideToUnlock 
            onUnlock={() => {
              setShowActionModal({ type: 'start', title: '开始操作' });
            }} 
          />
        </div>
      )}

      {/* Slide to Resume for Suspended Orders */}
      {order.status === 'suspended' && (
        <div key={`resume-${order.id}`} className="absolute bottom-[80px] left-0 right-0 px-5 pb-4 pt-3 bg-white/90 backdrop-blur-md border-t border-slate-100 z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
          <SlideToUnlock 
            text="右滑取消挂起"
            onUnlock={() => {
              setOrders(prev => prev.map(o => 
                o.id === order.id ? { ...o, status: 'processing' } : o
              ));
              setSelectedOrder(prev => prev ? { ...prev, status: 'processing' } : null);
            }} 
          />
        </div>
      )}

      {/* Action Modal */}
      <AnimatePresence>
        {showActionModal && (
          <div className="absolute inset-0 z-[70] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowActionModal(null);
                setActionDescription('');
                setActionAttachment(null);
                setTransferTo('');
                setSupervisor('');
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm bg-white rounded-[32px] overflow-hidden relative z-10 shadow-2xl border border-slate-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 ${
                      showActionModal.type === 'start' ? 'bg-emerald-50 text-emerald-600' : 
                      showActionModal.type === 'transfer' ? 'bg-blue-50 text-blue-600' :
                      'bg-amber-50 text-amber-600'
                    } rounded-xl flex items-center justify-center`}>
                      {showActionModal.type === 'start' ? <Play size={16} /> : 
                       showActionModal.type === 'transfer' ? <ArrowRightLeft size={16} /> :
                       <MessageSquareText size={16} />}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{showActionModal.title}</h3>
                  </div>
                  <button 
                    onClick={() => {
                      setShowActionModal(null);
                      setActionDescription('');
                      setActionAttachment(null);
                      setTransferTo('');
                      setSupervisor('');
                    }}
                    className="w-7 h-7 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-4">
                  {(showActionModal.type === 'transfer' || showActionModal.type === 'assign') && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="flex items-center justify-between mb-1.5 px-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {showActionModal.type === 'transfer' ? '转交人' : '接手人'}
                            </label>
                            <span className="text-[9px] text-rose-500 font-bold bg-rose-50 px-1.5 py-0.5 rounded-md">必选</span>
                          </div>
                          <select 
                            value={showActionModal.type === 'transfer' ? transferTo : assignTo}
                            onChange={(e) => showActionModal.type === 'transfer' ? setTransferTo(e.target.value) : setAssignTo(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-[11px] text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none"
                          >
                            <option value="">{showActionModal.type === 'transfer' ? '请选择转交人' : '请选择接手人'}</option>
                            <option value="李四">李四 (网络工程师)</option>
                            <option value="王五">王五 (系统工程师)</option>
                            <option value="赵六">赵六 (安全工程师)</option>
                          </select>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5 px-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">监督人</label>
                            <span className="text-[9px] text-rose-500 font-bold bg-rose-50 px-1.5 py-0.5 rounded-md">必选</span>
                          </div>
                          <select 
                            value={supervisor}
                            onChange={(e) => setSupervisor(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-[11px] text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none"
                          >
                            <option value="">请选择监督人</option>
                            <option value="刘主管">刘主管</option>
                            <option value="陈经理">陈经理</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1.5 px-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {showActionModal.type === 'transfer' ? '转交说明' : 
                         showActionModal.type === 'assign' ? '分配说明' :
                         showActionModal.type === 'suspend' ? '挂起说明' : '信息说明'}
                      </label>
                      <span className="text-[9px] text-rose-500 font-bold bg-rose-50 px-1.5 py-0.5 rounded-md">必填</span>
                    </div>
                    <textarea 
                      value={actionDescription}
                      onChange={(e) => setActionDescription(e.target.value)}
                      placeholder={`请输入${showActionModal.title}的相关说明...`}
                      className="w-full h-24 bg-slate-50 border border-slate-100 rounded-2xl p-3 text-[11px] text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none placeholder:text-slate-300"
                    />
                    {/* Common Phrases */}
                    <div className="mt-2 flex flex-wrap gap-1.5 px-1">
                      {(showActionModal.type === 'start' ? [
                        '已到达现场，准备开始',
                        '设备就绪，开始执行',
                        '环境检查完成'
                      ] : showActionModal.type === 'feedback' ? [
                        '操作完成，运行正常',
                        '发现异常，需排查',
                        '进度正常，持续观察'
                      ] : showActionModal.type === 'suspend' ? [
                        '物料缺失，等待到货',
                        '环境受限，无法继续',
                        '需跨部门协调'
                      ] : showActionModal.type === 'assign' ? [
                        '任务紧急，请优先处理',
                        '按计划执行',
                        '注意操作规范'
                      ] : [
                        '超出权限范围',
                        '需专业人员协助',
                        '交接班，请接手'
                      ]).map((phrase, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActionDescription(phrase)}
                          className="text-[9px] text-slate-400 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 px-2 py-1 rounded-lg border border-slate-100 transition-all active:scale-95"
                        >
                          {phrase}
                        </button>
                      ))}
                    </div>
                  </div>

                  {showActionModal.type === 'feedback' && (
                    <div>
                      <div className="flex items-center justify-between mb-1.5 px-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">附件信息</label>
                        <span className="text-[9px] text-slate-300 font-bold bg-slate-50 px-1.5 py-0.5 rounded-md">选填</span>
                      </div>
                      <div className="relative">
                        <input 
                          type="file" 
                          id="action-file"
                          className="hidden" 
                          onChange={(e) => setActionAttachment(e.target.files?.[0] || null)}
                        />
                        <label 
                          htmlFor="action-file"
                          className="flex items-center gap-3 p-3 bg-slate-50 border border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all group"
                        >
                          <div className="w-8 h-8 bg-white text-slate-400 rounded-lg flex items-center justify-center shadow-sm group-hover:text-emerald-500 transition-colors">
                            <Paperclip size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-slate-600 truncate">
                              {actionAttachment ? actionAttachment.name : '点击上传附件'}
                            </p>
                            <p className="text-[8px] text-slate-400">支持图片、文档等格式</p>
                          </div>
                          {actionAttachment && (
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                setActionAttachment(null);
                              }}
                              className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          )}
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">
                  <button 
                    onClick={() => {
                      setShowActionModal(null);
                      setActionDescription('');
                      setActionAttachment(null);
                      setTransferTo('');
                      setAssignTo('');
                      setSupervisor('');
                    }}
                    className="py-3 bg-slate-50 text-slate-500 text-[11px] font-bold rounded-2xl hover:bg-slate-100 transition-all"
                  >
                    取消
                  </button>
                  <button 
                    disabled={
                      !actionDescription.trim() || 
                      (showActionModal.type === 'transfer' && (!transferTo || !supervisor)) ||
                      (showActionModal.type === 'assign' && (!assignTo || !supervisor))
                    }
                    onClick={() => {
                      // Handle submit logic here
                      if (showActionModal.type === 'start' && selectedOrder) {
                        setOrders(prev => prev.map(o => 
                          o.id === selectedOrder.id ? { ...o, status: 'processing' } : o
                        ));
                        setSelectedOrder(prev => prev ? { ...prev, status: 'processing' } : null);
                      }

                      if (showActionModal.type === 'assign' && selectedOrder) {
                        setOrders(prev => prev.map(o => 
                          o.id === selectedOrder.id ? { ...o, status: 'unstarted' } : o
                        ));
                        setSelectedOrder(null); // Return to list
                        setTicketStage(0); // Return to first stage (which might be '待分配' or '未开始' depending on role)
                      }

                      if (showActionModal.type === 'suspend' && selectedOrder) {
                        setOrders(prev => prev.map(o => 
                          o.id === selectedOrder.id ? { ...o, status: 'suspended' } : o
                        ));
                        setSelectedOrder(null); // Return to list
                        setTicketStage(1); // Ensure we are in "In-progress" stage
                        setTicketSubStage('suspended'); // Set sub-filter to "Suspended"
                      }
                      
                      setShowActionModal(null);
                      setActionDescription('');
                      setActionAttachment(null);
                      setTransferTo('');
                      setSupervisor('');
                    }}
                    className={`py-3 text-[11px] font-bold rounded-2xl transition-all shadow-sm ${
                      (actionDescription.trim() && (showActionModal.type !== 'transfer' || (transferTo && supervisor)))
                        ? 'bg-emerald-500 text-white shadow-emerald-200 hover:bg-emerald-600 active:scale-95' 
                        : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    }`}
                  >
                    提交
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Action Drawer */}
      <AnimatePresence>
        {showActionDrawer && (
          <div className="absolute inset-0 z-[60] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowActionDrawer(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="h-full w-[200px] bg-white rounded-l-[32px] p-5 pt-14 relative z-10 shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setShowActionDrawer(false)}
                className="absolute left-5 top-8 w-7 h-7 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-500 transition-all"
              >
                <ChevronRight size={16} />
              </button>

              <div className="flex-1 overflow-y-auto no-scrollbar space-y-5 mt-2">
                <div>
                  <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">工单操作项</h5>
                  <div className="space-y-1">
                    {[
                      ...(order.status !== 'completed' ? [{ 
                        icon: ArrowRightLeft, 
                        label: '转交任务', 
                        color: 'text-blue-500', 
                        bg: 'bg-blue-50', 
                        action: () => {
                          setShowActionModal({ type: 'transfer', title: '转交任务' });
                          setShowActionDrawer(false);
                        } 
                      }] : []),
                      ...(order.status !== 'unstarted' && order.status !== 'processing' && order.status !== 'completed' ? [{ 
                        icon: Play, 
                        label: '开始操作', 
                        color: 'text-emerald-500', 
                        bg: 'bg-emerald-50',
                        action: () => {
                          setShowActionModal({ type: 'start', title: '开始操作' });
                          setShowActionDrawer(false);
                        }
                      }] : []),
                      ...(order.status === 'processing' ? [{ 
                        icon: Pause, 
                        label: '挂起工单', 
                        color: 'text-amber-500', 
                        bg: 'bg-amber-50',
                        action: () => {
                          setShowActionModal({ type: 'suspend', title: '挂起工单' });
                          setShowActionDrawer(false);
                        }
                      }] : []),
                      { 
                        icon: MessageSquareText, 
                        label: '反馈信息', 
                        color: 'text-indigo-500', 
                        bg: 'bg-indigo-50',
                        action: () => {
                          setShowActionModal({ type: 'feedback', title: '反馈信息' });
                          setShowActionDrawer(false);
                        }
                      },
                    ].map((item, idx) => (
                      <button 
                        key={idx} 
                        onClick={item.action}
                        className="w-full flex items-center gap-2.5 p-2.5 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all group"
                      >
                        <div className={`w-7 h-7 ${item.bg} ${item.color} rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                          <item.icon size={12} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-50">
                  <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">其他类</h5>
                  <div className="space-y-1">
                    {[
                      { icon: History, label: '查看日志', color: 'text-slate-500', bg: 'bg-slate-50' },
                      { icon: BookOpen, label: '操作手册', color: 'text-indigo-500', bg: 'bg-indigo-50' },
                    ].map((item, idx) => (
                      <button 
                        key={idx} 
                        className="w-full flex items-center gap-2.5 p-2.5 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all group"
                      >
                        <div className={`w-7 h-7 ${item.bg} ${item.color} rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                          <item.icon size={12} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderOrdersContent = () => {
    if (selectedOrder) {
      return renderOrderDetail(selectedOrder);
    }

    return (
      <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-4 rounded-b-[32px] shadow-sm border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">工单管理</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setUserRole(userRole === 'supervisor' ? 'staff' : 'supervisor')}
              className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-500 transition-all"
              title={userRole === 'supervisor' ? '切换为普通用户' : '切换为机房主管'}
            >
              <Users size={16} />
            </button>
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                showSearch ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-50 text-slate-400'
              }`}
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Search and Stage Tabs */}
        <div className="space-y-3">
          <AnimatePresence>
            {showSearch && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="relative mb-2">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="搜索工单号、SN、关键字..." 
                    value={ticketSearch}
                    onChange={(e) => setTicketSearch(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[11px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors">
                    <Scan size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2.5">
            <div className="flex bg-slate-100/50 p-1 rounded-xl gap-1">
              {stages.map((stage, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTicketStage(idx);
                    setTicketSubStage(null);
                  }}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${
                    ticketStage === idx 
                      ? 'bg-white text-emerald-600 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {stage.name}
                  <span className="ml-1 opacity-50">
                    ({orders.filter(o => stage.statuses.includes(o.status)).length})
                  </span>
                </button>
              ))}
            </div>

            {/* Sub-stage Tips for "进行中" */}
            {ticketStage === 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar px-0.5">
                {[
                  { label: '全部', value: null, count: orders.filter(o => stages[1].statuses.includes(o.status)).length },
                  ...(userRole === 'supervisor' ? [{ label: '未开始', value: 'unstarted', count: orders.filter(o => o.status === 'unstarted').length }] : []),
                  { label: '已开始', value: 'processing', count: orders.filter(o => o.status === 'processing').length },
                  { label: '挂起', value: 'suspended', count: orders.filter(o => o.status === 'suspended').length },
                ].map((sub) => (
                  <button
                    key={sub.label}
                    onClick={() => setTicketSubStage(sub.value)}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-bold whitespace-nowrap transition-all border ${
                      ticketSubStage === sub.value
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                        : 'bg-white text-slate-500 border-slate-100'
                    }`}
                  >
                    {sub.label}
                    <span className={`ml-1 ${ticketSubStage === sub.value ? 'text-white/70' : 'text-slate-300'}`}>
                      {sub.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="flex-1 px-4 mt-3 overflow-y-auto pb-24 custom-scrollbar">
        <div className="space-y-2">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedOrder(order)}
                className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-[11px] font-bold text-slate-800 leading-tight flex-1 mr-2 truncate">
                    <span className="text-emerald-600 mr-1.5">{order.ticketNo}</span>
                    {order.title}
                  </h4>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <StatusBadge status={order.status} />
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      order.priority === 'high' ? 'bg-rose-500' : 
                      order.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                    }`} />
                    <span className="text-[9px] text-slate-500 font-bold">
                      {order.priority === 'high' ? '高' : 
                       order.priority === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2 border-t border-slate-50">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-slate-400 font-bold uppercase w-12">机房</span>
                    <span className="text-[9px] text-slate-600 font-bold truncate">{order.dataCenter}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-slate-400 font-bold uppercase w-12">外包发单人</span>
                    <span className="text-[9px] text-slate-600 font-bold truncate">{order.outsourcingRequester}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-slate-400 font-bold uppercase w-12">期望完成</span>
                    <span className="text-[9px] text-slate-600 font-bold truncate">{order.expectedTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-slate-400 font-bold uppercase w-12">当前操作人</span>
                    <span className="text-[9px] text-slate-600 font-bold truncate">{order.staff || '未指派'}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4">
                <ClipboardList size={28} className="text-slate-200" />
              </div>
              <p className="text-xs text-slate-400 font-medium">暂无相关工单</p>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  };

  const renderProfileContent = () => (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Profile Header */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[40px] shadow-sm border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xl">
            <User size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">刘丽娟</h2>
              <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">核心架构组</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">高级系统工程师</p>
            <p className="text-[10px] text-slate-500 mt-1 font-medium flex items-center gap-1">
              <span className="text-slate-300">负责机房：</span>
              庆阳移动01、天津逸仙园
            </p>
            <div className="mt-3 pt-3 border-t border-slate-50 flex items-center gap-4">
              <div>
                <p className="text-[8px] text-slate-300 uppercase tracking-wider font-bold">登录账号</p>
                <p className="text-[10px] text-slate-600 font-mono font-medium">admin_zhang</p>
              </div>
              <div className="w-px h-6 bg-slate-100" />
              <div>
                <p className="text-[8px] text-slate-300 uppercase tracking-wider font-bold">工号</p>
                <p className="text-[10px] text-slate-600 font-mono font-medium">9527</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Menu */}
      <div className="px-5 mt-8 space-y-4">
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 divide-y divide-slate-50">
          <button 
            onClick={() => setShowScanSettings(true)}
            className="w-full flex items-center justify-between p-4 group active:bg-slate-50 transition-colors rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <Scan size={18} />
              </div>
              <span className="text-xs font-semibold text-slate-700">扫码设置</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400">{scanMode === 'pda' ? 'PDA顶部扫码' : '摄像头扫码'}</span>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
            </div>
          </button>

          <div className="w-full flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                <Info size={18} />
              </div>
              <span className="text-xs font-semibold text-slate-700">版本信息</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">v2.4.0-release</span>
          </div>

          <button className="w-full flex items-center justify-between p-4 group active:bg-slate-50 transition-colors rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <RefreshCw size={18} />
              </div>
              <span className="text-xs font-semibold text-slate-700">检查更新</span>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
          </button>
        </div>

        <button 
          onClick={onLogout}
          className="w-full bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center justify-center gap-2 text-rose-500 hover:bg-rose-50 active:scale-[0.98] transition-all"
        >
          <LogOut size={18} />
          <span className="text-xs font-bold">退出登录</span>
        </button>
      </div>

      {/* Scan Settings Drawer */}
      <AnimatePresence>
        {showScanSettings && (
          <div className="absolute inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScanSettings(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="h-full w-[200px] bg-white rounded-l-[32px] p-5 pt-14 relative z-10 shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setShowScanSettings(false)}
                className="absolute left-5 top-8 w-7 h-7 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-500 transition-all"
              >
                <ChevronRight size={16} />
              </button>

              <div className="flex-1 overflow-y-auto no-scrollbar space-y-5 mt-2">
                <div>
                  <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">扫码设备设置</h5>
                  <div className="space-y-2">
                    {[
                      { id: 'pda', label: 'PDA顶部扫码', icon: Smartphone, desc: 'PDA专用激光头' },
                      { id: 'camera', label: '摄像头扫码', icon: Camera, desc: '手机后置摄像头' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setScanMode(option.id as any);
                          setShowScanSettings(false);
                        }}
                        className={`w-full p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                          scanMode === option.id 
                            ? 'border-emerald-500 bg-emerald-50/50' 
                            : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          scanMode === option.id ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'
                        }`}>
                          <option.icon size={16} />
                        </div>
                        <div className="text-left min-w-0">
                          <p className={`text-[10px] font-bold truncate ${scanMode === option.id ? 'text-emerald-900' : 'text-slate-700'}`}>
                            {option.label}
                          </p>
                          <p className="text-[8px] text-slate-400 truncate mt-0.5">{option.desc}</p>
                        </div>
                        {scanMode === option.id && (
                          <div className="ml-auto w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                            <CheckCircle2 size={10} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col bg-white overflow-hidden relative">
      {/* Status Bar */}
      <div className="h-10 bg-white flex items-center justify-between px-8 pt-2 shrink-0">
        <span className="text-xs font-semibold">09:41</span>
        <div className="flex gap-1.5 items-center">
          <div className="w-4 h-4 rounded-full bg-slate-200" />
          <div className="w-4 h-4 rounded-full bg-slate-200" />
          <div className="w-6 h-3 rounded-sm border border-slate-300 relative">
            <div className="absolute left-0 top-0 h-full bg-slate-800 w-4/5" />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'home' ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {renderHomeContent()}
          </motion.div>
        ) : activeTab === 'orders' ? (
          <motion.div 
            key="orders"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {renderOrdersContent()}
          </motion.div>
        ) : activeTab === 'profile' ? (
          <motion.div 
            key="profile"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {renderProfileContent()}
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-300 text-xs italic">
            功能开发中...
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-10 py-3 flex items-center justify-between pb-8 z-40">
        {[
          { id: 'home', icon: LayoutGrid, label: '首页' },
          { id: 'orders', icon: ClipboardList, label: '工单管理' },
          { id: 'profile', icon: User, label: '我的-刘丽娟' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === item.id ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            <div className={`p-1 rounded-lg ${activeTab === item.id ? 'bg-emerald-50' : ''}`}>
              <item.icon size={20} />
            </div>
            <span className="text-[9px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Android Navigation Bar */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-200 rounded-full" />
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Android Frame Simulation */}
      <div className="w-full max-w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-slate-900 relative flex flex-col">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              <LoginPage onLogin={() => setIsLoggedIn(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              <HomePage onLogout={() => setIsLoggedIn(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
