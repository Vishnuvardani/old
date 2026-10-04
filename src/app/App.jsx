import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { formatDate, formatTime } from "../utils/dateTime";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  Shield,
  MapPin,
  Activity,
  Bell,
  User,
  Settings,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Eye,
  Leaf,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Map,
  FileText,
  Users,
  Building2,
  BarChart2,
  Database,
  Menu,
  X,
  ArrowRight,
  Syringe,
  Heart,
  LogOut,
  Search,
  Plus,
  Download,
  Home,
  Calendar,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Lock,
  RefreshCw,
  Send,
  AlertCircle,
  Info,
  ArrowLeft,
  MoreVertical,
  Check,
  Layers,
  Wifi,
  Server,
  Target,
  Cpu,
  UserPlus,
  UserCheck,
  UserX,
  Stethoscope,
  FlaskConical,
  Microscope,
  ClipboardList,
  Navigation,
  Compass,
  Flag,
  Award
} from "lucide-react";
const P = {
  olive: "#808034",
  oliveDark: "#5c5c24",
  oliveLight: "#c8c860",
  lavender: "#DBD4FF",
  purple: "#723480",
  purpleDark: "#4a1f5c",
  ivory: "#FFFFE3",
  ivoryDark: "#f0f0d8",
  success: "#4CAF50",
  warning: "#FF9800",
  danger: "#D32F2F",
  info: "#42A5F5",
  dark: "#1a1a0e",
  mid: "#6b6b4a",
  light: "#a0a080",
  govBg: "#0d1a2d",
  vetBg: "#1e0838",
  adminBg: "#1a2010",
  white: "#ffffff"
};
const UI_TEXT = {
  en: {
    language: "Language",
    tamil: "தமிழ்",
    english: "English",
    welcome: "Welcome back",
    loginSub: "Sign in to your account to continue",
    email: "Email Address",
    password: "Password",
    remember: "Remember me",
    forgot: "Forgot password?",
    signIn: "Sign In",
    or: "or",
    google: "Sign in with Google",
    noAccount: "Don't have an account?",
    createAccount: "Create account",
    registerTitle: "Create your account",
    registerSub: "Enter your personal and login details below.",
    backLogin: "Back to Login",
    continue: "Continue",
    register: "Register",
    skip: "Skip",
    back: "Back",
    next: "Next",
    getStarted: "Get Started",
    show: "Show",
    hide: "Hide",
    login: "Login",
    dashboard: "Dashboard",
    farmManagement: "Farm Management",
    animals: "Animals",
    biosecurity: "Biosecurity",
    gisMap: "GIS Map",
    diseaseAlerts: "Disease Alerts",
    vaccination: "Vaccination",
    aiAssistant: "AI Assistant",
    reports: "Reports",
    notifications: "Notifications",
    profile: "Profile",
    assignedFarms: "Assigned Farms",
    inspection: "Inspection",
    healthRecords: "Health Records",
    diseaseReport: "Disease Report",
    aiRecommendation: "AI Recommendation",
    farmMonitoring: "Farm Monitoring",
    diseaseSurveillance: "Disease Surveillance",
    gisDashboard: "GIS Dashboard",
    compliance: "Compliance",
    analytics: "Analytics",
    advisories: "Advisories",
    userManagement: "User Management",
    diseaseDatabase: "Disease Database",
    systemSettings: "System Settings",
    logout: "Logout",
    search: "Search…",
    profileText: "Profile",
    roleDetails: "Role Details",
    accountInformation: "Account Information",
    saveChanges: "Save Changes",
    security: "Security",
    notificationsSettings: "Notification Settings",
    currentLocation: "Current Location",
    useLocation: "Use my current location",
    professionalDetails: "Professional Details",
    requiredDetails: "Required for verification by the system administrator.",
    selectRole: "Select your role",
    roleDescription: "Choose the role that best describes your position in the system.",
    registerAs: "Register as",
    roleSelection: "Role Selection",
    accountDetails: "Account Details",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    agree: "I agree to the",
    and: "and",
    confirmPassword: "Confirm Password",
    passwordsMatch: "Passwords match",
    passwordMin: "Min 8 chars, 1 uppercase, 1 number",
    currentPassword: "Current password",
    newPassword: "New password",
    changePassword: "Change Password",
    updatePassword: "Update Password",
    setPassword: "Set Password",
    passwordChanged: "Password changed successfully",
    passwordSet: "Password set successfully",
    passwordsMismatch: "Passwords do not match",
    myFarm: "My Farm",
    animalsCount: "animals",
    locationNotSet: "Location not set",
    governmentOffice: "Government Office",
    commandCenter: "Command Center",
    viewDetails: "View Details",
    dismiss: "Dismiss",
    newText: "New",
    markAllRead: "Mark all read",
    processing: "Processing…",
    noData: "Page coming soon…",
    nav: {
      dashboard: "Dashboard",
      farmManagement: "Farm Management",
      animals: "Animals",
      biosecurity: "Biosecurity",
      gisMap: "GIS Map",
      diseaseAlerts: "Disease Alerts",
      vaccination: "Vaccination",
      aiAssistant: "AI Assistant",
      reports: "Reports",
      notifications: "Notifications",
      profile: "Profile",
      assignedFarms: "Assigned Farms",
      inspection: "Inspection",
      healthRecords: "Health Records",
      diseaseReport: "Disease Report",
      aiRecommendation: "AI Recommendation",
      farmMonitoring: "Farm Monitoring",
      diseaseSurveillance: "Disease Surveillance",
      gisDashboard: "GIS Dashboard",
      compliance: "Compliance",
      analytics: "Analytics",
      advisories: "Advisories",
      userManagement: "User Management",
      diseaseDatabase: "Disease Database",
      systemSettings: "System Settings"
    }
  },
  ta: {
    language: "மொழி",
    tamil: "தமிழ்",
    english: "English",
    welcome: "மீண்டும் வரவேற்கிறோம்",
    loginSub: "தொடர உங்கள் கணக்கில் உள்நுழைக",
    email: "மின்னஞ்சல் முகவரி",
    password: "கடவுச்சொல்",
    remember: "என்னை நினைவில் கொள்க",
    forgot: "கடவுச்சொல் மறந்துவிட்டதா?",
    signIn: "உள்நுழைக",
    or: "அல்லது",
    google: "Google மூலம் உள்நுழைக",
    noAccount: "கணக்கு இல்லையா?",
    createAccount: "கணக்கை உருவாக்கு",
    registerTitle: "உங்கள் கணக்கை உருவாக்குங்கள்",
    registerSub: "உங்கள் தனிப்பட்ட மற்றும் உள்நுழைவு விவரங்களை உள்ளிடவும்.",
    backLogin: "உள்நுழைவுக்குத் திரும்பு",
    continue: "தொடர்க",
    register: "பதிவு செய்க",
    skip: "தவிர்",
    back: "பின்னால்",
    next: "அடுத்து",
    getStarted: "தொடங்கவும்",
    show: "காட்டு",
    hide: "மறை",
    login: "உள்நுழை",
    dashboard: "டாஷ்போர்டு",
    farmManagement: "பண்ணை மேலாண்மை",
    animals: "விலங்குகள்",
    biosecurity: "உயிர்காப்பு",
    gisMap: "GIS வரைபடம்",
    diseaseAlerts: "நோய் எச்சரிக்கைகள்",
    vaccination: "தடுப்பூசி",
    aiAssistant: "AI உதவியாளர்",
    reports: "அறிக்கைகள்",
    notifications: "அறிவிப்புகள்",
    profile: "சுயவிவரம்",
    assignedFarms: "ஒதுக்கப்பட்ட பண்ணைகள்",
    inspection: "சோதனை",
    healthRecords: "சுகாதார பதிவுகள்",
    diseaseReport: "நோய் அறிக்கை",
    aiRecommendation: "AI பரிந்துரை",
    farmMonitoring: "பண்ணை கண்காணிப்பு",
    diseaseSurveillance: "நோய் கண்காணிப்பு",
    gisDashboard: "GIS டாஷ்போர்டு",
    compliance: "உறுப்பு கடமை",
    analytics: "பகுப்பாய்வு",
    advisories: "அறிவுரைகள்",
    userManagement: "பயனர் மேலாண்மை",
    diseaseDatabase: "நோய் தரவுத்தளம்",
    systemSettings: "சிஸ்டம் அமைப்புகள்",
    logout: "வெளியேறு",
    search: "தேடு…",
    profileText: "சுயவிவரம்",
    roleDetails: "பங்கு விவரங்கள்",
    accountInformation: "கணக்கு தகவல்",
    saveChanges: "மாற்றங்களைச் சேமி",
    security: "பாதுகாப்பு",
    notificationsSettings: "அறிவிப்பு அமைப்புகள்",
    currentLocation: "தற்போதைய இடம்",
    useLocation: "என் தற்போதைய இடத்தைப் பயன்படுத்துக",
    professionalDetails: "தொழில் விவரங்கள்",
    requiredDetails: "சிஸ்டம் நிர்வாகியால் சரிபார்க்க வேண்டியவை.",
    selectRole: "உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்",
    roleDescription: "சிஸ்டத்தில் உங்கள் நிலையை சிறந்த முறையில் விவரிக்கும் பாத்திரத்தைத் தேர்ந்தெடுக்கவும்.",
    registerAs: "பதிவு செய்கிறேன்",
    roleSelection: "பங்கு தேர்வு",
    accountDetails: "கணக்கு விவரங்கள்",
    terms: "சேவை விதிமுறைகள்",
    privacy: "தனியுரிமைக் கொள்கை",
    agree: "நான் ஒப்புக்கொள்கிறேன்",
    and: "மற்றும்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்துக",
    passwordsMatch: "கடவுச்சொற்கள் பொருந்துகின்றன",
    passwordMin: "குறைந்தபட்சம் 8 எழுத்துகள், 1 பெரிய எழுத்து, 1 எண்",
    currentPassword: "தற்போதைய கடவுச்சொல்",
    newPassword: "புதிய கடவுச்சொல்",
    changePassword: "கடவுச்சொல்லை மாற்று",
    updatePassword: "கடவுச்சொல்லைப் புதுப்பி",
    setPassword: "கடவுச்சொல்லை அமைக்கவும்",
    passwordChanged: "கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது",
    passwordsMismatch: "கடவுச்சொற்கள் பொருந்தவில்லை",
    passwordSet: "கடவுச்சொல் வெற்றிகரமாக அமைக்கப்பட்டது",
    myFarm: "என் பண்ணை",
    animalsCount: "விலங்குகள்",
    locationNotSet: "இடம் அமைக்கப்படவில்லை",
    governmentOffice: "அரசு அலுவலகம்",
    commandCenter: "கட்டளை மையம்",
    viewDetails: "விவரங்களைப் பார்க்க",
    dismiss: "நிராகரி",
    newText: "புதிய",
    markAllRead: "எல்லாம் வாசித்ததாக குறி",
    processing: "செயலாக்கப்படுகிறது…",
    noData: "பக்கம் விரைவில் வரும்…",
    nav: {
      dashboard: "டாஷ்போர்டு",
      farmManagement: "பண்ணை மேலாண்மை",
      animals: "விலங்குகள்",
      biosecurity: "உயிர்காப்பு",
      gisMap: "GIS வரைபடம்",
      diseaseAlerts: "நோய் எச்சரிக்கைகள்",
      vaccination: "தடுப்பூசி",
      aiAssistant: "AI உதவியாளர்",
      reports: "அறிக்கைகள்",
      notifications: "அறிவிப்புகள்",
      profile: "சுயவிவரம்",
      assignedFarms: "ஒதுக்கப்பட்ட பண்ணைகள்",
      inspection: "சோதனை",
      healthRecords: "சுகாதார பதிவுகள்",
      diseaseReport: "நோய் அறிக்கை",
      aiRecommendation: "AI பரிந்துரை",
      farmMonitoring: "பண்ணை கண்காணிப்பு",
      diseaseSurveillance: "நோய் கண்காணிப்பு",
      gisDashboard: "GIS டாஷ்போர்டு",
      compliance: "உறுப்பு கடமை",
      analytics: "பகுப்பாய்வு",
      advisories: "அறிவுரைகள்",
      userManagement: "பயனர் மேலாண்மை",
      diseaseDatabase: "நோய் தரவுத்தளம்",
      systemSettings: "சிஸ்டம் அமைப்புகள்"
    }
  }
};
const t = (language, key, fallback = "") => {
  const value = UI_TEXT[language]?.[key] ?? UI_TEXT.en?.[key];
  return value ?? fallback;
};
function LanguageToggle({ language, onChange }) {
  const text = UI_TEXT[language];
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
    /* @__PURE__ */ jsx("span", { style: { color: P.mid }, children: text.language }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center rounded-lg p-1", style: { background: P.ivoryDark }, children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => onChange("en"), className: "px-3 py-1.5 rounded-md font-semibold transition-all", style: { background: language === "en" ? P.olive : "transparent", color: language === "en" ? "#fff" : P.mid }, children: text.english }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => onChange("ta"), className: "px-3 py-1.5 rounded-md font-semibold transition-all", style: { background: language === "ta" ? P.olive : "transparent", color: language === "ta" ? "#fff" : P.mid }, children: text.tamil })
    ] })
  ] });
}
const healthTrend = [
  { month: "Jan", healthy: 420, sick: 18, at_risk: 32 },
  { month: "Feb", healthy: 435, sick: 12, at_risk: 28 },
  { month: "Mar", healthy: 448, sick: 8, at_risk: 24 },
  { month: "Apr", healthy: 441, sick: 15, at_risk: 19 },
  { month: "May", healthy: 456, sick: 9, at_risk: 15 },
  { month: "Jun", healthy: 463, sick: 6, at_risk: 11 }
];
const livestock = [
  { id: "AN-001", name: "Sow #12", species: "Pig", breed: "Large White Sow", age: "2y", weight: "210kg", health: "Healthy", tag: "EAR-4821", vaccinated: true, paddock: "Farrowing House" },
  { id: "AN-002", name: "Boar #3", species: "Pig", breed: "Duroc Boar", age: "3y", weight: "280kg", health: "At Risk", tag: "EAR-4822", vaccinated: false, paddock: "Boar Stall" },
  { id: "AN-003", name: "Batch G-14", species: "Pig", breed: "Landrace Grower", age: "14wk", weight: "42kg", health: "Healthy", tag: "EAR-4823", vaccinated: true, paddock: "Grower Pen" },
  { id: "AN-004", name: "Batch F-07", species: "Pig", breed: "Pietrain Finisher", age: "22wk", weight: "98kg", health: "Sick", tag: "EAR-4824", vaccinated: false, paddock: "Finisher Pen" },
  { id: "AN-005", name: "Flock B1-A", species: "Broiler", breed: "Ross 308", age: "28d", weight: "1.8kg", health: "Healthy", tag: "FLK-5001", vaccinated: true, paddock: "Broiler House 1" },
  { id: "AN-006", name: "Flock B2-A", species: "Broiler", breed: "Cobb 500", age: "21d", weight: "1.2kg", health: "Healthy", tag: "FLK-5002", vaccinated: true, paddock: "Broiler House 2" },
  { id: "AN-007", name: "Layer Flock L-3", species: "Layer", breed: "Hy-Line Brown", age: "32wk", weight: "1.9kg", health: "At Risk", tag: "FLK-5003", vaccinated: true, paddock: "Layer House" },
  { id: "AN-008", name: "Breeder Flock BR-1", species: "Breeder", breed: "Ross Breeder", age: "40wk", weight: "3.2kg", health: "Healthy", tag: "FLK-5004", vaccinated: false, paddock: "Breeder House" }
];
const vaccinations = [
  { id: "VAC-001", disease: "CSF (Hog Cholera)", animals: 320, date: "2025-07-20", status: "Scheduled", vet: "Dr. Nimal W.", coverage: 88 },
  { id: "VAC-002", disease: "PRRS", animals: 210, date: "2025-07-28", status: "Scheduled", vet: "Dr. Priya S.", coverage: 72 },
  { id: "VAC-003", disease: "Newcastle Disease", animals: 8500, date: "2025-06-10", status: "Completed", vet: "Dr. Nimal W.", coverage: 95 },
  { id: "VAC-004", disease: "IBD (Gumboro)", animals: 6200, date: "2025-08-05", status: "Pending", vet: "Unassigned", coverage: 61 },
  { id: "VAC-005", disease: "Marek's Disease", animals: 12e3, date: "2025-05-20", status: "Completed", vet: "Dr. Suresh K.", coverage: 90 },
  { id: "VAC-006", disease: "PCV2 (Circovirus)", animals: 180, date: "2025-07-30", status: "Scheduled", vet: "Dr. Priya S.", coverage: 80 }
];
const diseases = [
  { id: "D001", name: "African Swine Fever", code: "ASF", type: "Viral", host: "Pig", severity: "Critical", notifiable: true, vaccine: "None" },
  { id: "D002", name: "Classical Swine Fever", code: "CSF", type: "Viral", host: "Pig", severity: "High", notifiable: true, vaccine: "Available" },
  { id: "D003", name: "Porcine Reproductive & Respiratory Syndrome", code: "PRRS", type: "Viral", host: "Pig", severity: "High", notifiable: true, vaccine: "Available" },
  { id: "D004", name: "Porcine Epidemic Diarrhea", code: "PED", type: "Viral", host: "Pig", severity: "High", notifiable: true, vaccine: "Available" },
  { id: "D005", name: "Swine Influenza", code: "SIV", type: "Viral", host: "Pig", severity: "Medium", notifiable: true, vaccine: "Available" },
  { id: "D006", name: "Porcine Circovirus Disease", code: "PCV2", type: "Viral", host: "Pig", severity: "Medium", notifiable: false, vaccine: "Available" },
  { id: "D007", name: "Erysipelas", code: "ERS", type: "Bacterial", host: "Pig", severity: "Medium", notifiable: false, vaccine: "Available" },
  { id: "D008", name: "Mycoplasma Pneumonia", code: "MHP", type: "Bacterial", host: "Pig", severity: "Medium", notifiable: false, vaccine: "Available" },
  { id: "D009", name: "Highly Pathogenic Avian Influenza", code: "HPAI", type: "Viral", host: "Poultry", severity: "Critical", notifiable: true, vaccine: "Conditional" },
  { id: "D010", name: "Newcastle Disease", code: "ND", type: "Viral", host: "Poultry", severity: "High", notifiable: true, vaccine: "Available" },
  { id: "D011", name: "Infectious Bursal Disease", code: "IBD", type: "Viral", host: "Poultry", severity: "High", notifiable: true, vaccine: "Available" },
  { id: "D012", name: "Marek's Disease", code: "MD", type: "Viral", host: "Poultry", severity: "High", notifiable: false, vaccine: "Available" },
  { id: "D013", name: "Infectious Bronchitis", code: "IB", type: "Viral", host: "Poultry", severity: "Medium", notifiable: false, vaccine: "Available" },
  { id: "D014", name: "Avian Cholera (Fowl Cholera)", code: "FC", type: "Bacterial", host: "Poultry", severity: "Medium", notifiable: true, vaccine: "Available" },
  { id: "D015", name: "Salmonellosis", code: "SAL", type: "Bacterial", host: "Poultry", severity: "Medium", notifiable: true, vaccine: "Limited" },
  { id: "D016", name: "Coccidiosis", code: "COC", type: "Protozoal", host: "Poultry", severity: "Medium", notifiable: false, vaccine: "Available" }
];
const allUsers = [
  { id: "U001", name: "Nimal Kumari", role: "farmer", email: "nimal@farm.lk", farm: "Kumari Pig Farm", district: "Anuradhapura", status: "Active", joined: "2024-03-12" },
  { id: "U002", name: "Dr. Nimal Wickramasinghe", role: "veterinarian", email: "nimal.w@vet.gov.lk", farm: "\u2014", district: "Anuradhapura", status: "Active", joined: "2023-08-20" },
  { id: "U003", name: "S. Rathnayake", role: "government", email: "rathnayake@moa.gov.lk", farm: "\u2014", district: "National", status: "Active", joined: "2023-01-05" },
  { id: "U004", name: "Priya Perera", role: "farmer", email: "priya@farm.lk", farm: "Perera Poultry Farm", district: "Polonnaruwa", status: "Active", joined: "2024-06-18" },
  { id: "U005", name: "Dr. Suresh Kumar", role: "veterinarian", email: "suresh@vet.gov.lk", farm: "\u2014", district: "Kurunegala", status: "Inactive", joined: "2024-01-10" },
  { id: "U006", name: "R. Silva", role: "farmer", email: "silva@farm.lk", farm: "Silva Integrated Farm", district: "Kurunegala", status: "Active", joined: "2024-09-01" }
];
const allFarms = [
  { id: "F001", name: "Kumari Pig Farm", owner: "Nimal Kumari", district: "Anuradhapura", animals: 480, status: "Alert", biosecurity: 78, compliance: 91 },
  { id: "F002", name: "Perera Poultry Farm", owner: "Priya Perera", district: "Polonnaruwa", animals: 18500, status: "Warning", biosecurity: 65, compliance: 84 },
  { id: "F003", name: "Silva Integrated Farm", owner: "R. Silva", district: "Kurunegala", animals: 9200, status: "Healthy", biosecurity: 92, compliance: 97 },
  { id: "F004", name: "Rajapaksa Broiler Farm", owner: "K. Rajapaksa", district: "Gampaha", animals: 22e3, status: "Healthy", biosecurity: 88, compliance: 94 },
  { id: "F005", name: "Jayawardena Pig & Poultry", owner: "M. Jayawardena", district: "Ampara", animals: 7800, status: "Alert", biosecurity: 45, compliance: 72 }
];
const outbreakDistricts = [
  { district: "Anuradhapura", cases: 14, severity: "high", disease: "ASF", farms: 6, contained: false },
  { district: "Polonnaruwa", cases: 7, severity: "medium", disease: "Newcastle Disease", farms: 3, contained: false },
  { district: "Kurunegala", cases: 3, severity: "low", disease: "PRRS", farms: 2, contained: true },
  { district: "Ampara", cases: 9, severity: "high", disease: "HPAI", farms: 4, contained: false },
  { district: "Gampaha", cases: 1, severity: "low", disease: "IBD", farms: 1, contained: true }
];
const alerts = [
  { id: 1, type: "danger", title: "ASF Outbreak Alert", farm: "Kumari Pig Farm \u2013 Anuradhapura", time: "2 hrs ago", icon: AlertTriangle, disease: "ASF", read: false },
  { id: 2, type: "danger", title: "HPAI Suspected \u2013 Immediate Action", farm: "Jayawardena Pig & Poultry \u2013 Ampara", time: "4 hrs ago", icon: AlertTriangle, disease: "HPAI", read: false },
  { id: 3, type: "warning", title: "Vaccination Due: Newcastle Disease", farm: "Perera Poultry Farm \u2013 Polonnaruwa", time: "5 hrs ago", icon: Syringe, disease: "ND", read: false },
  { id: 4, type: "info", title: "Inspection Scheduled", farm: "Silva Integrated Farm \u2013 Kurunegala", time: "Yesterday", icon: Calendar, disease: "\u2014", read: true },
  { id: 5, type: "success", title: "Biosecurity Check Passed", farm: "Rajapaksa Broiler Farm \u2013 Gampaha", time: "2 days ago", icon: CheckCircle, disease: "\u2014", read: true },
  { id: 6, type: "warning", title: "AI: Respiratory Symptoms Detected", farm: "Kumari Pig Farm \u2013 Finisher Pen", time: "3 days ago", icon: Zap, disease: "Suspected PRRS", read: true }
];
const inspections = [
  { id: "INS-001", farm: "Kumari Pig Farm", date: "2025-07-10", vet: "Dr. Nimal W.", score: 78, status: "Completed", findings: "Minor sanitation issues in Finisher Pen, PRRS screening needed", followup: "2025-07-24" },
  { id: "INS-002", farm: "Perera Poultry Farm", date: "2025-07-08", vet: "Dr. Priya S.", score: 65, status: "Completed", findings: "Newcastle Disease suspected in Broiler House 2 \u2013 samples sent", followup: "2025-07-15" },
  { id: "INS-003", farm: "Silva Integrated Farm", date: "2025-07-15", vet: "Dr. Nimal W.", score: 0, status: "Scheduled", findings: "\u2014", followup: "\u2014" },
  { id: "INS-004", farm: "Jayawardena Pig & Poultry", date: "2025-07-05", vet: "Dr. Suresh K.", score: 45, status: "Completed", findings: "HPAI suspected \u2013 immediate quarantine and depopulation protocol initiated", followup: "2025-07-12" }
];
const advisories = [
  { id: "ADV-001", title: "ASF Movement Restriction \u2013 Anuradhapura District", date: "2025-07-10", district: "Anuradhapura", priority: "Critical", status: "Active", issued: "Ministry of Agriculture" },
  { id: "ADV-002", title: "HPAI (H5N1) Heightened Surveillance \u2013 Ampara", date: "2025-07-08", district: "Ampara, Batticaloa", priority: "Critical", status: "Active", issued: "DAPH" },
  { id: "ADV-003", title: "Newcastle Disease Vaccination Drive \u2013 Q3 2025", date: "2025-07-01", district: "All Districts", priority: "High", status: "Active", issued: "DAPH" },
  { id: "ADV-004", title: "Mandatory All-In All-Out Protocol for Broiler Farms", date: "2025-06-28", district: "All Districts", priority: "Medium", status: "Active", issued: "Ministry of Agriculture" },
  { id: "ADV-005", title: "PRRS Biosecurity Update \u2013 Pig Farms", date: "2025-06-15", district: "Kurunegala, Anuradhapura", priority: "High", status: "Resolved", issued: "DAPH" }
];
const aiMessages = [
  { role: "ai", text: "Hello! I am BioSecure AI, your intelligent pig and poultry farm health assistant. I can help you with disease risk assessment (ASF, HPAI, PRRS, Newcastle Disease, and more), vaccination planning, biosecurity recommendations, and GIS-based analysis for your pig and poultry operations. How can I help you today?", time: "10:00 AM" },
  { role: "user", text: "What is the current disease risk for my pigs in the Finisher Pen?", time: "10:02 AM" },
  { role: "ai", text: "Based on real-time sensor data and your farm's location in Anuradhapura district, I've identified an elevated risk for PRRS (Porcine Reproductive & Respiratory Syndrome) in your Finisher Pen. Here's my analysis:\n\n\u2022 **Risk Level:** High (74/100)\n\u2022 **Key Factors:** Nearby ASF outbreak (3.2 km radius), recent pig movements from external sources, high stocking density detected in Finisher Pen\n\u2022 **ASF Status:** CRITICAL \u2013 movement restriction advisory in your district. Do NOT move pigs off-farm.\n\u2022 **Recommended Actions:**\n  1. Immediately restrict entry to Finisher Pen \u2013 dedicated boots and PPE required\n  2. Schedule PRRS screening and vaccination booster within 5 days\n  3. Monitor for symptoms: respiratory distress, coughing, reproductive failure in sows\n  4. Apply all-in all-out management \u2013 do not mix new batches\n  5. Report any sudden deaths to your veterinarian immediately for ASF rule-out\n\nShall I schedule a farm inspection or vaccination appointment for you?", time: "10:02 AM" },
  { role: "user", text: "What about my poultry? Is there an HPAI risk?", time: "10:05 AM" },
  { role: "ai", text: "Yes \u2014 your Broiler House 2 and Layer House are in an HPAI surveillance zone. Key findings:\n\n\u2022 **HPAI Risk Level:** Very High (88/100) \u2013 Ampara district outbreak 45 km away, migratory bird activity elevated\n\u2022 **Immediate Actions:**\n  1. Implement strict biosecurity \u2013 no wild bird contact, net all open housing\n  2. Monitor for sudden high mortality, respiratory signs, and drop in egg production\n  3. Any flock mortality >2% in 24 hours \u2013 call the government veterinary hotline\n  4. Do NOT sell live birds to markets until surveillance clearance is received\n\u2022 **Newcastle Disease:** Vaccination due in 12 days \u2013 I recommend advancing the schedule given current risk levels.\n\nWould you like me to notify your assigned veterinarian and generate an HPAI biosecurity action plan?", time: "10:05 AM" }
];
const biosecurityChecklist = [
  { category: "Entry & Movement Control", items: [
    { check: "Vehicle disinfection bay operational (all farm vehicles)", done: true },
    { check: "Visitor log maintained \u2013 no unauthorized entry to pig/poultry houses", done: true },
    { check: "Dedicated PPE (boots, coveralls, gloves) at all house entries", done: false },
    { check: "All-in all-out (AIAO) policy enforced for each batch", done: true },
    { check: "Pig/poultry movement records updated for government traceability", done: false }
  ] },
  { category: "Pig Health Management", items: [
    { check: "Daily health observation of all pig pens completed", done: true },
    { check: "Sick pig isolation protocol followed (dedicated sick pen)", done: true },
    { check: "Dead pig disposal records maintained (rendering/burial log)", done: false },
    { check: "ASF early warning checklist completed this week", done: true },
    { check: "Sow reproductive records up to date (farrowing, returns to service)", done: true }
  ] },
  { category: "Poultry Health Management", items: [
    { check: "Daily flock mortality and feed consumption recorded", done: true },
    { check: "HPAI surveillance \u2013 wild bird exclusion netting intact", done: false },
    { check: "Litter management \u2013 dry litter maintained, no caking", done: true },
    { check: "Water line sanitization completed this week", done: true },
    { check: "Egg production records up to date (layer/breeder flocks)", done: true }
  ] },
  { category: "Sanitation & Hygiene", items: [
    { check: "Disinfectant footbaths cleaned and recharged (all houses)", done: false },
    { check: "Waste management and manure disposal records up to date", done: true },
    { check: "Rodent and wild bird pest control measures active", done: true },
    { check: "Cleaning and disinfection (C&D) records maintained post-depopulation", done: false }
  ] },
  { category: "Vaccination & Traceability", items: [
    { check: "Pig vaccination schedule posted and followed (CSF, PRRS, PCV2, MHP)", done: true },
    { check: "Poultry vaccination schedule followed (ND, IBD, Marek's, IB)", done: true },
    { check: "Cold chain maintained for all vaccines (2\u20138\xB0C verified)", done: true },
    { check: "Post-vaccination monitoring records complete", done: false },
    { check: "Government-mandated HPAI and ASF surveillance samples submitted", done: false }
  ] }
];
const sc = (score) => score >= 80 ? P.success : score >= 60 ? P.warning : P.danger;
const alertBorder = { danger: P.danger, warning: P.warning, info: P.info, success: P.success };
const alertBg = { danger: "#fef2f2", warning: "#fff7ed", info: "#eff6ff", success: "#f0fdf4" };
const severityColor = { high: P.danger, medium: P.warning, low: P.success, critical: "#7B1FA2" };
const healthColor = { Healthy: P.success, "At Risk": P.warning, Sick: P.danger };
const statusColor = { Active: P.success, Inactive: P.light, Alert: P.danger, Warning: P.warning, Healthy: P.success };
const priorityColor = { Critical: P.danger, High: P.warning, Medium: P.info, Low: P.success };
function Badge({ text, color, bg }) {
  return /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold px-2.5 py-0.5 rounded-full", style: { color, background: bg }, children: text });
}
function SectionHeader({ title, sub, action }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-5", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", style: { fontFamily: "Poppins", color: P.dark }, children: title }),
      sub && /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: P.mid }, children: sub })
    ] }),
    action
  ] });
}
function Card({ children, className = "", style = {} }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `rounded-2xl ${className}`,
      style: { background: P.white, border: `1px solid rgba(128,128,52,0.1)`, boxShadow: "0 2px 16px rgba(128,128,52,0.06)", ...style },
      children
    }
  );
}
function KPICard({ label, value, sub, icon: Icon, color, trend }) {
  return /* @__PURE__ */ jsxs(Card, { className: "p-5 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center", style: { background: `${color}14` }, children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5", style: { color } }) }),
      trend && /* @__PURE__ */ jsx(
        "span",
        {
          className: "text-xs font-medium px-2 py-0.5 rounded-full",
          style: { background: trend === "up" ? "#f0fdf4" : trend === "down" ? "#fef2f2" : P.ivoryDark, color: trend === "up" ? P.success : trend === "down" ? P.danger : P.olive },
          children: sub
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", style: { color: P.dark, fontFamily: "Poppins" }, children: value }),
      /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: P.mid }, children: label }),
      !trend && /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5 font-medium", style: { color: P.mid }, children: sub })
    ] })
  ] });
}
function GISMap({ height = 280, showControls = true, title = "" }) {
  const [layer, setLayer] = useState("Heatmap");
  const farms = [
    { x: 180, y: 120, name: "Kumari Pig Farm", status: "alert" },
    { x: 320, y: 180, name: "Perera Poultry", status: "warning" },
    { x: 240, y: 250, name: "Silva Integrated", status: "healthy" },
    { x: 420, y: 140, name: "Rajapaksa Broiler", status: "healthy" },
    { x: 130, y: 220, name: "Jayawardena P&P", status: "alert" },
    { x: 370, y: 280, name: "Fernando Layers", status: "healthy" },
    { x: 490, y: 200, name: "Gamage Pig Farm", status: "warning" },
    { x: 80, y: 160, name: "Bandara Broilers", status: "healthy" }
  ];
  const sColors = { alert: P.danger, warning: P.warning, healthy: P.success };
  return /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl overflow-hidden", style: { background: "#1a2810", height }, children: [
    /* @__PURE__ */ jsxs("svg", { className: "absolute inset-0 w-full h-full opacity-10", children: [
      [...Array(10)].map((_, i) => /* @__PURE__ */ jsx("line", { x1: "0", y1: i * 35, x2: "600", y2: i * 35, stroke: "#4CAF50", strokeWidth: "0.5" }, `grid-h${i}`)),
      [...Array(14)].map((_, i) => /* @__PURE__ */ jsx("line", { x1: i * 42, y1: "0", x2: i * 42, y2: height, stroke: "#4CAF50", strokeWidth: "0.5" }, `grid-v${i}`))
    ] }),
    /* @__PURE__ */ jsxs("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 560 320", preserveAspectRatio: "xMidYMid slice", children: [
      /* @__PURE__ */ jsxs("defs", { children: [
        /* @__PURE__ */ jsxs("radialGradient", { id: "hm1", cx: "50%", cy: "50%", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: P.danger, stopOpacity: "0.5" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: P.danger, stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ jsxs("radialGradient", { id: "hm2", cx: "50%", cy: "50%", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: P.warning, stopOpacity: "0.4" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: P.warning, stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ jsxs("radialGradient", { id: "hm3", cx: "50%", cy: "50%", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: P.danger, stopOpacity: "0.35" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: P.danger, stopOpacity: "0" })
        ] })
      ] }),
      layer === "Heatmap" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("ellipse", { cx: "180", cy: "130", rx: "70", ry: "55", fill: "url(#hm1)" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "130", cy: "220", rx: "55", ry: "45", fill: "url(#hm3)" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "320", cy: "180", rx: "45", ry: "38", fill: "url(#hm2)" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "490", cy: "200", rx: "40", ry: "32", fill: "url(#hm2)" })
      ] }),
      /* @__PURE__ */ jsx("path", { d: "M50 300 Q200 210 320 185 Q430 162 560 125", stroke: "rgba(255,255,255,0.12)", strokeWidth: "2", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M100 50 Q245 155 300 300", stroke: "rgba(255,255,255,0.08)", strokeWidth: "1.5", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M200 0 Q280 80 350 200 Q400 280 420 320", stroke: "rgba(255,255,255,0.06)", strokeWidth: "1", fill: "none" }),
      farms.map((f, i) => /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("circle", { cx: f.x, cy: f.y, r: "14", fill: sColors[f.status], opacity: "0.15" }),
        /* @__PURE__ */ jsx("circle", { cx: f.x, cy: f.y, r: "7", fill: sColors[f.status] }),
        /* @__PURE__ */ jsx("circle", { cx: f.x, cy: f.y, r: "3", fill: "white", opacity: "0.5" })
      ] }, `farm-marker-${i}`))
    ] }),
    showControls && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3 flex gap-1.5", children: ["Satellite", "Heatmap", "Zones", "Roads"].map((l) => /* @__PURE__ */ jsx(
        "span",
        {
          onClick: () => setLayer(l),
          className: "text-xs px-2.5 py-1 rounded-md font-medium cursor-pointer",
          style: { background: l === layer ? P.olive : "rgba(255,255,255,0.1)", color: "#fff", backdropFilter: "blur(8px)" },
          children: l
        },
        l
      )) }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 flex flex-col gap-1", children: ["+", "\u2212"].map((b) => /* @__PURE__ */ jsx("button", { className: "w-7 h-7 rounded-lg text-white font-bold text-sm flex items-center justify-center", style: { background: "rgba(255,255,255,0.15)" }, children: b }, b)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-3 right-3 flex flex-col gap-1.5", children: [["alert", "Outbreak"], ["warning", "At Risk"], ["healthy", "Healthy"]].map(([s, l]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs", style: { color: "rgba(255,255,255,0.8)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full", style: { background: sColors[s] } }),
      l
    ] }, l)) }),
    title && /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full", style: { background: "rgba(0,0,0,0.4)", color: "#fff" }, children: title }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-3 left-3 text-xs", style: { color: "rgba(255,255,255,0.35)" }, children: "WGS84 \xB7 India" })
  ] });
}
function BiosecurityGauge({ score }) {
  const angle = score / 100 * 180 - 90;
  const color = sc(score);
  const label = score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Fair" : "Critical";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 160 100", className: "w-40 h-24", children: [
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "gaugeGrad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
        /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: P.danger }),
        /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: P.warning }),
        /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: P.success })
      ] }) }),
      /* @__PURE__ */ jsx("path", { d: "M 20 90 A 60 60 0 0 1 140 90", stroke: "#e0e0c0", strokeWidth: "12", fill: "none", strokeLinecap: "round" }),
      /* @__PURE__ */ jsx("path", { d: "M 20 90 A 60 60 0 0 1 140 90", stroke: "url(#gaugeGrad)", strokeWidth: "12", fill: "none", strokeLinecap: "round", strokeDasharray: `${score * 1.885} 999` }),
      /* @__PURE__ */ jsxs("g", { transform: `translate(80, 90) rotate(${angle})`, children: [
        /* @__PURE__ */ jsx("line", { x1: "0", y1: "0", x2: "0", y2: "-45", stroke: "#1a1a0e", strokeWidth: "2.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("circle", { cx: "0", cy: "0", r: "5", fill: "#1a1a0e" })
      ] }),
      /* @__PURE__ */ jsx("text", { x: "80", y: "88", textAnchor: "middle", fontSize: "20", fontWeight: "700", fill: color, fontFamily: "Poppins", children: score }),
      /* @__PURE__ */ jsx("text", { x: "80", y: "98", textAnchor: "middle", fontSize: "7", fill: P.mid, children: "/ 100" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold px-3 py-1 rounded-full", style: { background: `${color}18`, color }, children: label })
  ] });
}
function WeatherWidget() {
  return /* @__PURE__ */ jsxs(Card, { className: "p-4", style: { background: "linear-gradient(135deg, #1a5276 0%, #2980b9 100%)", border: "none" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-white text-xs opacity-70", children: "Anuradhapura" }),
        /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-2xl", style: { fontFamily: "Poppins" }, children: "28\xB0C" }),
        /* @__PURE__ */ jsx("p", { className: "text-white text-xs opacity-80 mt-0.5", children: "Partly Cloudy \xB7 High UV" })
      ] }),
      /* @__PURE__ */ jsx(Sun, { className: "w-12 h-12 text-yellow-300 opacity-90" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 pt-2", style: { borderTop: "1px solid rgba(255,255,255,0.2)" }, children: [[Droplets, "Humidity", "68%"], [Wind, "Wind", "12 km/h"], [Thermometer, "Feels", "31\xB0C"]].map(([Icon, label, val]) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
      /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5 text-white opacity-70" }),
      /* @__PURE__ */ jsx("p", { className: "text-white opacity-60", style: { fontSize: "10px" }, children: String(label) }),
      /* @__PURE__ */ jsx("p", { className: "text-white text-xs font-medium", children: String(val) })
    ] }, String(label))) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-between mt-3 pt-2", style: { borderTop: "1px solid rgba(255,255,255,0.15)" }, children: [["Mon", "31\xB0"], ["Tue", "29\xB0"], ["Wed", "27\xB0"], ["Thu", "30\xB0"]].map(([d, t]) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
      /* @__PURE__ */ jsx("span", { className: "text-white opacity-60", style: { fontSize: "10px" }, children: d }),
      /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-semibold", children: t })
    ] }, d)) })
  ] });
}
function AIRecommendationCard() {
  const recs = [
    { priority: "High", text: "Schedule PRRS booster vaccinations for pigs in Finisher Pen within 72 hours", action: "Schedule" },
    { priority: "Medium", text: "Increase ventilation in Zone B \u2014 ambient humidity exceeds safe threshold", action: "Review" },
    { priority: "Low", text: "3 animals in Herd B show early signs of respiratory distress \u2014 monitor closely", action: "Monitor" }
  ];
  const colors = { High: P.danger, Medium: P.warning, Low: P.info };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl overflow-hidden", style: { background: "linear-gradient(135deg, #1e1040, #2d1a4a)", border: "1px solid rgba(114,52,128,0.4)" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 pb-3", style: { borderBottom: "1px solid rgba(219,212,255,0.1)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center", style: { background: "rgba(219,212,255,0.15)" }, children: /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4", style: { color: P.lavender } }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-white", children: "AI Recommendations" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: "rgba(219,212,255,0.6)" }, children: "Updated 12 minutes ago" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs px-2 py-0.5 rounded-full font-medium", style: { background: "rgba(212,47,47,0.2)", color: "#ff8080" }, children: "3 New" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-4 flex flex-col gap-3", children: recs.map((r, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 rounded-xl", style: { background: "rgba(255,255,255,0.05)" }, children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs font-bold px-2 py-0.5 rounded-md mt-0.5 flex-shrink-0", style: { background: `${colors[r.priority]}22`, color: colors[r.priority] }, children: r.priority }),
      /* @__PURE__ */ jsx("p", { className: "text-xs flex-1 leading-relaxed", style: { color: "rgba(219,212,255,0.85)" }, children: r.text }),
      /* @__PURE__ */ jsx("button", { className: "text-xs font-medium px-2.5 py-1 rounded-lg flex-shrink-0", style: { background: "rgba(219,212,255,0.12)", color: P.lavender }, children: r.action })
    ] }, i)) })
  ] });
}
function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress((p) => {
      if (p >= 100) {
        clearInterval(t);
        setTimeout(onDone, 300);
        return 100;
      }
      return p + 2;
    }), 40);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col items-center justify-center relative overflow-hidden",
      style: { background: "linear-gradient(145deg, #1a2010 0%, #2d3d1a 40%, #808034 100%)" },
      children: [
        /* @__PURE__ */ jsxs("svg", { className: "absolute bottom-0 left-0 w-full opacity-10", viewBox: "0 0 1440 300", fill: "none", children: [
          /* @__PURE__ */ jsx("path", { d: "M0 200 Q360 100 720 180 Q1080 260 1440 150 L1440 300 L0 300Z", fill: "#ffffff" }),
          /* @__PURE__ */ jsx("rect", { x: "100", y: "160", width: "80", height: "60", fill: "#ffffff" }),
          /* @__PURE__ */ jsx("polygon", { points: "100,160 140,120 180,160", fill: "#ffffff" }),
          /* @__PURE__ */ jsx("rect", { x: "300", y: "140", width: "120", height: "80", fill: "#ffffff" }),
          /* @__PURE__ */ jsx("polygon", { points: "300,140 360,90 420,140", fill: "#ffffff" }),
          /* @__PURE__ */ jsx("rect", { x: "900", y: "155", width: "60", height: "45", fill: "#ffffff" }),
          /* @__PURE__ */ jsx("polygon", { points: "900,155 930,125 960,155", fill: "#ffffff" })
        ] }),
        [...Array(12)].map((_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute rounded-full opacity-20 animate-pulse",
            style: { width: `${6 + i % 4 * 4}px`, height: `${6 + i % 4 * 4}px`, background: i % 3 === 0 ? P.lavender : i % 3 === 1 ? P.olive : "#fff", left: `${8 + i * 7.5}%`, top: `${10 + i % 5 * 15}%`, animationDelay: `${i * 0.3}s` }
          },
          i
        )),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center gap-6 px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl",
                style: { background: "rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.2)" },
                children: /* @__PURE__ */ jsx("img", { src: "/picsvg_download.png", alt: "BioSecure Farm", className: "w-16 h-16 rounded-2xl" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center", style: { background: P.success }, children: /* @__PURE__ */ jsx(Leaf, { className: "w-3 h-3 text-white" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-white tracking-tight", style: { fontFamily: "Poppins" }, children: "BioSecure Farm" }),
            /* @__PURE__ */ jsx("p", { className: "text-base mt-2 font-light", style: { color: P.lavender, fontFamily: "Inter" }, children: "Protecting Pig & Poultry Farms Through AI & GIS Intelligence" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap justify-center", children: ["AI-Powered", "GIS Mapping", "Real-time Alerts", "Gov't Compliant"].map((t) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-xs px-3 py-1 rounded-full font-medium",
              style: { background: "rgba(219,212,255,0.15)", color: P.lavender, border: "1px solid rgba(219,212,255,0.3)" },
              children: t
            },
            t
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "w-48 mt-4", children: [
            /* @__PURE__ */ jsx("div", { className: "h-1 rounded-full overflow-hidden", style: { background: "rgba(255,255,255,0.15)" }, children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full transition-all duration-75", style: { width: `${progress}%`, background: `linear-gradient(90deg, ${P.lavender}, ${P.olive})` } }) }),
            /* @__PURE__ */ jsx("p", { className: "text-center text-xs mt-2", style: { color: "rgba(255,255,255,0.4)" }, children: "Initialising platform\u2026" })
          ] })
        ] })
      ]
    }
  );
}
const slides = [
  { title: "Welcome to BioSecure Farm", sub: "Pig & Poultry Farm Management", body: "A unified platform to monitor pig and poultry health, biosecurity, and government compliance \u2014 all in one intelligent dashboard.", icon: Shield, color: P.olive },
  { title: "AI Disease Prediction", sub: "Smart Health Intelligence", body: "Our AI engine predicts ASF, HPAI, PRRS, Newcastle Disease, and 12+ pig and poultry diseases before they spread \u2014 powered by real-time sensor and GIS data.", icon: Zap, color: P.purple },
  { title: "GIS Disease Monitoring", sub: "Geospatial Intelligence", body: "Visualise outbreak heatmaps, farm boundaries, and disease spread across districts on an interactive GIS-linked map.", icon: Map, color: P.info },
  { title: "Biosecurity & Compliance", sub: "Government-Ready Platform", body: "Automated pig and poultry biosecurity scoring, HPAI/ASF surveillance checklists, vaccination tracking, and compliance reporting aligned with national veterinary standards.", icon: CheckCircle, color: P.success }
];
function OnboardingScreen({ onDone, language, onLanguageChange }) {
  const [slide, setSlide] = useState(0);
  const s = slides[slide];
  const Icon = s.icon;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center justify-between p-8", style: { background: P.ivory, fontFamily: "Inter" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full flex justify-between items-center", children: [
      /* @__PURE__ */ jsx(LanguageToggle, { language, onChange: onLanguageChange }),
      /* @__PURE__ */ jsx("button", { onClick: onDone, className: "self-end text-sm font-medium px-4 py-2 rounded-lg", style: { color: P.olive, background: `${P.olive}12` }, children: t(language, "skip", "Skip") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-8 flex-1 justify-center max-w-sm text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-40 h-40 rounded-3xl flex items-center justify-center shadow-xl", style: { background: `linear-gradient(135deg, ${s.color}22, ${s.color}44)`, border: `1.5px solid ${s.color}33` }, children: /* @__PURE__ */ jsx(Icon, { className: "w-20 h-20", style: { color: s.color }, strokeWidth: 1.5 }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-widest mb-2", style: { color: s.color }, children: s.sub }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-3", style: { fontFamily: "Poppins" }, children: s.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed", style: { color: P.mid }, children: s.body })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: slides.map((_, i) => /* @__PURE__ */ jsx("div", { onClick: () => setSlide(i), className: "rounded-full cursor-pointer transition-all", style: { width: i === slide ? "24px" : "8px", height: "8px", background: i === slide ? P.olive : "#c8c8a0" } }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm flex gap-3", children: [
      slide > 0 && /* @__PURE__ */ jsx("button", { onClick: () => setSlide((s2) => s2 - 1), className: "flex-1 py-3 rounded-xl font-medium border text-sm", style: { borderColor: P.olive, color: P.olive }, children: t(language, "back", "Back") }),
      /* @__PURE__ */ jsxs("button", { onClick: () => slide < slides.length - 1 ? setSlide((s2) => s2 + 1) : onDone(), className: "flex-1 py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2", style: { background: `linear-gradient(135deg, ${P.olive}, ${P.oliveDark})` }, children: [
        slide < slides.length - 1 ? t(language, "next", "Next") : t(language, "getStarted", "Get Started"),
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] })
  ] });
}
function LoginScreen({ onLogin, onRegister, language, onLanguageChange }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("farmer");
  const [fieldErrs, setFieldErrs] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const roles = [{ id: "farmer", label: "Farmer", icon: Leaf }, { id: "veterinarian", label: "Vet", icon: Heart }, { id: "government", label: "Gov't", icon: Building2 }, { id: "admin", label: "Admin", icon: Settings }];

  const validateLogin = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleLogin = async () => {
    const e = validateLogin();
    setFieldErrs(e);
    if (Object.keys(e).length) return;
    setLoading(true); setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Login failed"); return; }
      const ROLE_MAP = { "Farmer": "farmer", "Veterinarian": "veterinarian", "Government Officer": "government", "Admin": "admin" };
      onLogin(ROLE_MAP[data.user.role] || "farmer", data.user, data.token);
    } catch (e) { setError("Cannot connect to server"); }
    finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
      const { getAuth, GoogleAuthProvider, signInWithPopup } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
      const firebaseConfig = window.__FIREBASE_CONFIG__ || {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      };
      if (!firebaseConfig) { setError("Google Sign-In not configured. See setup instructions."); return; }
      const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const { displayName, email: gEmail, uid, photoURL } = result.user;
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: gEmail, name: displayName, googleId: uid, picture: photoURL })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Google login failed"); return; }
      const ROLE_MAP = { "Farmer": "farmer", "Veterinarian": "veterinarian", "Government Officer": "government", "Admin": "admin" };
      onLogin(ROLE_MAP[data.user.role] || "farmer", data.user, data.token);
    } catch (e) { setError(e.message || "Google Sign-In failed"); }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex", style: { background: P.ivory, fontFamily: "Inter" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex flex-col justify-between p-12 flex-1", style: { background: "linear-gradient(160deg, #1a2010 0%, #2d3d1a 50%, #808034 100%)" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("img", { src: "/picsvg_download.png", alt: "BioSecure Farm", className: "w-10 h-10 rounded-xl" }),
        /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-lg", style: { fontFamily: "Poppins" }, children: "BioSecure Farm" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl font-bold text-white leading-tight mb-4", style: { fontFamily: "Poppins" }, children: [
          "Protecting Pig & Poultry",
          /* @__PURE__ */ jsx("br", {}),
          "Through Intelligence"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", style: { color: "rgba(219,212,255,0.8)" }, children: "AI-powered disease prediction \xB7 GIS outbreak mapping \xB7 Biosecurity compliance" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4 mt-10", children: [["2,847", "Registered Farms"], ["1.2M+", "Animals Monitored"], ["91.3%", "Compliance Rate"]].map(([val, lab]) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl", style: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }, children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-white mb-1", style: { fontFamily: "Poppins" }, children: val }),
          /* @__PURE__ */ jsx("div", { className: "text-xs", style: { color: "rgba(219,212,255,0.7)" }, children: lab })
        ] }, lab)) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.3)" }, children: "\xA9 2025 BioSecure Farm \xB7 Ministry of Agriculture, India" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col justify-center p-8 lg:p-16 w-full lg:w-[480px]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-6 right-8", children: /* @__PURE__ */ jsx(LanguageToggle, { language, onChange: onLanguageChange }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsx("img", { src: "/picsvg_download.png", alt: "BioSecure Farm", className: "w-6 h-6 rounded-md" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-lg", style: { color: P.olive, fontFamily: "Poppins" }, children: "BioSecure Farm" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-1", style: { fontFamily: "Poppins", color: P.dark }, children: UI_TEXT[language].welcome }),
      /* @__PURE__ */ jsx("p", { className: "text-sm mb-8", style: { color: P.mid }, children: UI_TEXT[language].loginSub }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2 mb-6 p-1.5 rounded-xl", style: { background: P.ivoryDark }, children: roles.map((r) => {
        const Icon = r.icon;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setSelectedRole(r.id),
            className: "flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium transition-all",
            style: { background: selectedRole === r.id ? P.olive : "transparent", color: selectedRole === r.id ? "#fff" : P.mid },
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }),
              r.label
            ]
          },
          r.id
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* Email field */
        jsxs("div", { children: [
          jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: UI_TEXT[language].email }),
          jsx("input", {
            value: email, onChange: (e) => { setEmail(e.target.value); setFieldErrs(fe => ({ ...fe, email: "" })); },
            placeholder: "farmer@biosecure.gov.lk", type: "email",
            className: "w-full px-4 py-3 rounded-xl text-sm outline-none",
            style: { background: P.ivoryDark, border: `1.5px solid ${fieldErrs.email ? P.danger : "transparent"}`, color: P.dark },
            onBlur: () => { const e = validateLogin(); setFieldErrs(fe => ({ ...fe, email: e.email || "" })); }
          }),
          fieldErrs.email && jsx("p", { style: { color: P.danger, fontSize: 11, marginTop: 4 }, children: fieldErrs.email })
        ] }),
        /* Password field */
        jsxs("div", { children: [
          jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: UI_TEXT[language].password }),
          jsxs("div", { style: { position: "relative" }, children: [
            jsx("input", {
              value: password, onChange: (e) => { setPassword(e.target.value); setFieldErrs(fe => ({ ...fe, password: "" })); },
              placeholder: "Min. 6 characters", type: showPwd ? "text" : "password",
              className: "w-full px-4 py-3 rounded-xl text-sm outline-none",
              style: { background: P.ivoryDark, border: `1.5px solid ${fieldErrs.password ? P.danger : "transparent"}`, color: P.dark, paddingRight: 44 },
              onBlur: () => { const e = validateLogin(); setFieldErrs(fe => ({ ...fe, password: e.password || "" })); }
            }),
            jsx("button", { type: "button", onClick: () => setShowPwd(s => !s), style: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: P.mid, fontSize: 11, fontWeight: 600 }, children: showPwd ? t(language, "hide", "Hide") : t(language, "show", "Show") })
          ] }),
          fieldErrs.password && jsx("p", { style: { color: P.danger, fontSize: 11, marginTop: 4 }, children: fieldErrs.password })
        ] }),
        /* Remember me + forgot */
        jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          jsxs("label", { className: "flex items-center gap-2 cursor-pointer", style: { color: P.mid }, children: [
            jsx("input", { type: "checkbox", style: { accentColor: P.olive } }),
            UI_TEXT[language].remember
          ] }),
          jsx("button", { className: "font-medium", style: { color: P.olive }, children: UI_TEXT[language].forgot })
        ] }),
        error && jsx("p", { className: "text-xs text-center font-medium", style: { color: P.danger }, children: error }),
        /* @__PURE__ */ jsx("button", { onClick: handleLogin, disabled: loading, className: "w-full py-3.5 rounded-xl font-semibold text-white text-sm mt-2", style: { background: `linear-gradient(135deg, ${P.olive}, ${P.oliveDark})`, opacity: loading ? 0.7 : 1 }, children: loading ? `${UI_TEXT[language].signIn}…` : UI_TEXT[language].signIn }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1 h-px", style: { background: "#e0e0c0" } }),
          /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: "#a0a080" }, children: UI_TEXT[language].or }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 h-px", style: { background: "#e0e0c0" } })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: handleGoogle, className: "w-full py-3 rounded-xl text-sm font-medium border flex items-center justify-center gap-2", style: { borderColor: "#c8c8a0", color: P.dark }, children: [
          /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 48 48", children: [
            /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" }, "red"),
            /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" }, "blue"),
            /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" }, "yellow"),
            /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" }, "green")
          ] }),
          UI_TEXT[language].google
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-center text-sm", style: { color: P.mid }, children: [
          `${UI_TEXT[language].noAccount} `,
          /* @__PURE__ */ jsx("button", { onClick: onRegister, className: "font-semibold", style: { color: P.olive }, children: UI_TEXT[language].createAccount })
        ] })
      ] })
    ] })
  ] });
}
const REG_ROLES = [
  {
    id: "farmer",
    label: "Farmer",
    subtitle: "Pig & Poultry Farm Owner",
    icon: Leaf,
    color: P.olive,
    fields: ["Farm Name", "Farm Type", "Number of Farms"]
  },
  {
    id: "veterinarian",
    label: "Veterinarian",
    subtitle: "Licensed Animal Health Professional",
    icon: Stethoscope,
    color: P.purple,
    fields: ["Vet Licence No.", "Specialisation", "Employer / Clinic Name", "Service District(s)", "Years of Experience"]
  },
  {
    id: "government",
    label: "Government Officer",
    subtitle: "Ministry / Department Official",
    icon: Building2,
    color: P.info,
    fields: ["Employee ID", "Department / Ministry", "Designation", "District / Division", "Official Email Domain"]
  },
  {
    id: "admin",
    label: "Admin",
    subtitle: "BioSecure Farm System Administrator",
    icon: Settings,
    color: P.olive,
    fields: ["Department", "Designation", "Access Level", "Office Location"]
  }
];
function RegisterScreen({ onBack, onSuccess, language, onLanguageChange }) {
  const [selectedRole, setSelectedRole] = useState("farmer");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirm: "", extra: {} });
  const [fieldErrs, setFieldErrs] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const role = REG_ROLES.find((r) => r.id === selectedRole);
  const RoleIcon = role.icon;
  const setField = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setFieldErrs(e => ({ ...e, [k]: "" })); };
  const setExtra = (k, v) => setForm((f) => ({ ...f, extra: { ...f.extra, [k]: v } }));

  const captureLocation = () => {
    if (!navigator.geolocation) { setError("Location is not supported by this browser"); return; }
    setLocating(true); setError("");
    navigator.geolocation.getCurrentPosition(
      (position) => { setForm((f) => ({ ...f, location: { latitude: position.coords.latitude, longitude: position.coords.longitude } })); setLocating(false); },
      () => { setError("Location permission was not granted"); setLocating(false); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    else if (form.firstName.trim().length < 2) e.firstName = "Min 2 characters";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    else if (form.lastName.trim().length < 2) e.lastName = "Min 2 characters";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address";
    if (form.phone && !/^[\d\s\+\-\(\)]{7,20}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Min 8 characters";
    else if (!/[A-Z]/.test(form.password)) e.password = "Include at least one uppercase letter";
    else if (!/[0-9]/.test(form.password)) e.password = "Include at least one number";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const steps = ["Account Details", "Role Selection", "Role Details"];

  const handleStep1Continue = () => {
    const e = validateStep1();
    setFieldErrs(e);
    if (Object.keys(e).length) return;
    setError(""); setStep(2);
  };

  const handleRegister = async () => {
    if (!agreedTerms) { setError("Please agree to the Terms of Service to continue"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, password: form.password, role: selectedRole, extra: form.extra, location: form.location || null })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Registration failed"); return; }
      onSuccess(data.user, data.token);
    } catch (e) { setError("Cannot connect to server"); }
    finally { setLoading(false); }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex", style: { background: P.ivory, fontFamily: "Inter" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex flex-col justify-between p-12 w-[420px] flex-shrink-0", style: { background: "linear-gradient(160deg, #1a2010 0%, #2d3d1a 50%, #808034 100%)" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("img", { src: "/picsvg_download.png", alt: "BioSecure Farm", className: "w-10 h-10 rounded-xl" }),
        /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-lg", style: { fontFamily: "Poppins" }, children: "BioSecure Farm" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white leading-tight mb-4", style: { fontFamily: "Poppins" }, children: "Join the Pig & Poultry Intelligence Network" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mb-8", style: { color: "rgba(219,212,255,0.7)" }, children: "Register as a Farmer, Veterinarian, or Government Officer to access AI-powered disease monitoring and GIS biosecurity tools." }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: REG_ROLES.map((r) => {
          const Icon = r.icon;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => {
                setSelectedRole(r.id);
                setStep(1);
              },
              className: "flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all",
              style: { background: selectedRole === r.id ? `${r.color}30` : "rgba(255,255,255,0.05)", border: `1.5px solid ${selectedRole === r.id ? r.color : "rgba(255,255,255,0.1)"}` },
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", style: { background: `${r.color}25` }, children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5", style: { color: r.color } }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-white text-sm font-semibold", style: { fontFamily: "Poppins" }, children: r.label }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: "rgba(219,212,255,0.6)" }, children: r.subtitle })
                ] }),
                selectedRole === r.id && /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 ml-auto flex-shrink-0", style: { color: r.color } })
              ]
            },
            r.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.3)" }, children: "\xA9 2025 BioSecure Farm \xB7 Ministry of Agriculture, India" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col overflow-y-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-8 py-5 border-b", style: { borderColor: "rgba(128,128,52,0.1)" }, children: [
        /* @__PURE__ */ jsxs("button", { onClick: onBack, className: "flex items-center gap-2 text-sm font-medium", style: { color: P.mid }, children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
          ` ${UI_TEXT[language].backLogin}`
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(LanguageToggle, { language, onChange: onLanguageChange }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: steps.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                style: { background: step > i + 1 ? P.success : step === i + 1 ? role.color : P.ivoryDark, color: step >= i + 1 ? "#fff" : P.light },
                children: step > i + 1 ? /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" }) : i + 1
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium hidden sm:block", style: { color: step === i + 1 ? role.color : P.light }, children: s })
          ] }),
          i < steps.length - 1 && /* @__PURE__ */ jsx("div", { className: "w-8 h-px", style: { background: step > i + 1 ? P.success : P.ivoryDark } })
          ] }, s)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-start justify-center py-10 px-6", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-lg", children: [
        step === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-1", style: { fontFamily: "Poppins", color: P.dark }, children: UI_TEXT[language].registerTitle }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", style: { color: P.mid }, children: UI_TEXT[language].registerSub })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:hidden", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold mb-2", style: { color: P.mid }, children: "Register as" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2 p-1.5 rounded-xl", style: { background: P.ivoryDark }, children: REG_ROLES.map((r) => {
              const Icon = r.icon;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setSelectedRole(r.id),
                  className: "flex flex-col items-center gap-1 py-2.5 rounded-lg text-xs font-semibold transition-all",
                  style: { background: selectedRole === r.id ? r.color : "transparent", color: selectedRole === r.id ? "#fff" : P.mid },
                  children: [
                    /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }),
                    r.label
                  ]
                },
                r.id
              );
            }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: [["First Name", "firstName", "text", "e.g. Nimal"], ["Last Name", "lastName", "text", "e.g. Kumari"]].map(([lbl, key, type, ph]) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: lbl }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: form[key],
                onChange: (e) => setField(key, e.target.value),
                placeholder: ph,
                type,
                className: "w-full px-4 py-3 rounded-xl text-sm outline-none",
                style: { background: P.ivoryDark, border: `1.5px solid ${fieldErrs[key] ? P.danger : "transparent"}`, color: P.dark },
                onFocus: (e) => e.target.style.borderColor = role.color,
                onBlur: (e) => { e.target.style.borderColor = fieldErrs[key] ? P.danger : "transparent"; }
              }
            ),
            fieldErrs[key] && /* @__PURE__ */ jsx("p", { style: { color: P.danger, fontSize: 11, marginTop: 4 }, children: fieldErrs[key] })
          ] }, key)) }),
          [["Email Address", "email", "email", "you@example.com"], ["Phone Number", "phone", "tel", "+91 98765 43210"]].map(([lbl, key, type, ph]) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: lbl }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: form[key],
                onChange: (e) => setField(key, e.target.value),
                placeholder: ph,
                type,
                className: "w-full px-4 py-3 rounded-xl text-sm outline-none",
                style: { background: P.ivoryDark, border: `1.5px solid ${fieldErrs[key] ? P.danger : "transparent"}`, color: P.dark },
                onFocus: (e) => e.target.style.borderColor = role.color,
                onBlur: (e) => { e.target.style.borderColor = fieldErrs[key] ? P.danger : "transparent"; }
              }
            ),
            fieldErrs[key] && /* @__PURE__ */ jsx("p", { style: { color: P.danger, fontSize: 11, marginTop: 4 }, children: fieldErrs[key] })
          ] }, key)),
          /* Password */
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Password" }),
            /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
              /* @__PURE__ */ jsx("input", { value: form.password, onChange: (e) => setField("password", e.target.value), placeholder: "Min 8 chars, 1 uppercase, 1 number", type: showPwd ? "text" : "password", className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, border: `1.5px solid ${fieldErrs.password ? P.danger : "transparent"}`, color: P.dark, paddingRight: 52 } }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowPwd(s => !s), style: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: P.mid, fontSize: 11, fontWeight: 600 }, children: showPwd ? t(language, "hide", "Hide") : t(language, "show", "Show") })
            ] }),
            fieldErrs.password && /* @__PURE__ */ jsx("p", { style: { color: P.danger, fontSize: 11, marginTop: 4 }, children: fieldErrs.password }),
            form.password && !fieldErrs.password && /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 4, marginTop: 6 }, children: [
              [form.password.length >= 8, form.password.length >= 12, /[A-Z]/.test(form.password) && /[0-9]/.test(form.password)].map((ok, i) =>
                /* @__PURE__ */ jsx("div", { style: { flex: 1, height: 3, borderRadius: 4, background: ok ? P.success : P.ivoryDark } }, i)
              )
            ] })
          ] }),
          /* Confirm Password */
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: t(language, "confirmPassword", "Confirm Password") }),
            /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
              /* @__PURE__ */ jsx("input", { value: form.confirm, onChange: (e) => setField("confirm", e.target.value), placeholder: t(language, "confirmPassword", "Confirm Password"), type: showConfirm ? "text" : "password", className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, border: `1.5px solid ${fieldErrs.confirm ? P.danger : "transparent"}`, color: P.dark, paddingRight: 52 } }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowConfirm(s => !s), style: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: P.mid, fontSize: 11, fontWeight: 600 }, children: showConfirm ? t(language, "hide", "Hide") : t(language, "show", "Show") })
            ] }),
            fieldErrs.confirm && /* @__PURE__ */ jsx("p", { style: { color: P.danger, fontSize: 11, marginTop: 4 }, children: fieldErrs.confirm }),
            form.confirm && form.password === form.confirm && /* @__PURE__ */ jsx("p", { style: { color: P.success, fontSize: 11, marginTop: 4 }, children: `✓ ${t(language, "passwordsMatch", "Passwords match")}` })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: handleStep1Continue, className: "w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2", style: { background: `linear-gradient(135deg, ${role.color}, ${role.color}cc)` }, children: [
            "Continue ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-1", style: { fontFamily: "Poppins", color: P.dark }, children: "Select your role" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", style: { color: P.mid }, children: "Choose the role that best describes your position in the system." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: REG_ROLES.map((r) => {
            const Icon = r.icon;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => setSelectedRole(r.id),
                className: "flex items-center gap-5 p-5 rounded-2xl cursor-pointer transition-all",
                style: { background: selectedRole === r.id ? `${r.color}0e` : P.white, border: `2px solid ${selectedRole === r.id ? r.color : "rgba(128,128,52,0.12)"}`, boxShadow: selectedRole === r.id ? `0 0 0 4px ${r.color}12` : "none" },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0", style: { background: `${r.color}18` }, children: /* @__PURE__ */ jsx(Icon, { className: "w-7 h-7", style: { color: r.color } }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-bold text-base mb-0.5", style: { fontFamily: "Poppins", color: P.dark }, children: r.label }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm", style: { color: P.mid }, children: r.subtitle }),
                    /* @__PURE__ */ jsxs("p", { className: "text-xs mt-2 font-medium", style: { color: r.color }, children: [
                      r.id === "farmer" && "Access farm dashboard, livestock records, GIS maps & AI alerts",
                      r.id === "veterinarian" && "Manage inspections, health records, disease reports & AI recommendations",
                      r.id === "government" && "Monitor district compliance, outbreaks, analytics & advisories"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                      style: { borderColor: selectedRole === r.id ? r.color : "#c8c8a0", background: selectedRole === r.id ? r.color : "transparent" },
                      children: selectedRole === r.id && /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-white" })
                    }
                  )
                ]
              },
              r.id
            );
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setStep(1), className: "flex-1 py-3.5 rounded-xl font-semibold text-sm border", style: { borderColor: "#c8c8a0", color: P.dark }, children: t(language, "back", "Back") }),
            /* @__PURE__ */ jsxs("button", { onClick: () => setStep(3), className: "flex-1 py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2", style: { background: `linear-gradient(135deg, ${role.color}, ${role.color}cc)` }, children: [
              `${t(language, "continue", "Continue")} `,
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-5 rounded-2xl", style: { background: `${role.color}0e`, border: `1.5px solid ${role.color}30` }, children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl flex items-center justify-center", style: { background: `${role.color}20` }, children: /* @__PURE__ */ jsx(RoleIcon, { className: "w-6 h-6", style: { color: role.color } }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "font-bold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: [
                "Registering as ",
                role.label
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: P.mid }, children: [
                role.subtitle,
                " \u2014 please fill in your professional details."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-1", style: { fontFamily: "Poppins", color: P.dark }, children: "Professional Details" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", style: { color: P.mid }, children: "Required for verification by the system administrator." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [/* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: t(language, "currentLocation", "Current Location") }),
            /* @__PURE__ */ jsxs("button", { type: "button", onClick: captureLocation, className: "w-full px-4 py-3 rounded-xl text-sm text-left", style: { background: P.ivoryDark, color: P.dark, border: "1.5px solid transparent" }, children: [locating ? "Getting location…" : form.location ? `${form.location.latitude.toFixed(6)}, ${form.location.longitude.toFixed(6)}` : t(language, "useLocation", "Use my current location")] })
          ] }), role.fields.map((field) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: field }),
            /* @__PURE__ */ jsx(
              "input",
              {
                value: form.extra[field] ?? "",
                onChange: (e) => setExtra(field, e.target.value),
                placeholder: `Enter ${field.toLowerCase()}`,
                className: "w-full px-4 py-3 rounded-xl text-sm outline-none",
                style: { background: P.ivoryDark, border: "1.5px solid transparent", color: P.dark },
                onFocus: (e) => e.target.style.borderColor = role.color,
                onBlur: (e) => e.target.style.borderColor = "transparent"
              }
            )
          ] }, field))] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: agreedTerms, onChange: e => setAgreedTerms(e.target.checked), className: "mt-0.5", style: { accentColor: role.color } }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs", style: { color: P.mid }, children: [
              "I agree to the ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold", style: { color: role.color }, children: "Terms of Service" }),
              " and ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold", style: { color: role.color }, children: "Privacy Policy" }),
              " of BioSecure Farm and the Ministry of Agriculture."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setStep(2), className: "flex-1 py-3.5 rounded-xl font-semibold text-sm border", style: { borderColor: "#c8c8a0", color: P.dark }, children: t(language, "back", "Back") }),
            /* @__PURE__ */ jsxs("button", { onClick: handleRegister, disabled: loading, className: "flex-1 py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2", style: { background: `linear-gradient(135deg, ${role.color}, ${role.color}cc)`, opacity: loading ? 0.7 : 1 }, children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4" }),
              loading ? ` ${t(language, "register", "Register")}…` : ` ${t(language, "register", "Register")}`
            ] })
          ] }),
          error && /* @__PURE__ */ jsx("p", { className: "text-xs text-center font-medium", style: { color: P.danger }, children: error })
        ] })
      ] }) })
    ] })
  ] });
}
function FarmerDashboardPage({ user, farms = [], livestock = [], vaccinations = [], alerts = [], biosecurity = [] }) {
  const vaccineData = [{ name: "CSF", coverage: 88, color: P.olive }, { name: "PRRS", coverage: 72, color: P.purple }, { name: "Newcastle", coverage: 95, color: P.success }, { name: "IBD", coverage: 61, color: P.warning }];
  const recentActivity = [
    { action: "AI Alert: Respiratory symptoms detected in Finisher Pen \u2013 PRRS suspected", time: "10:24 AM", type: "ai" },
    { action: "Vaccination record updated \u2013 320 pigs vaccinated for CSF", time: "09:15 AM", type: "vaccine" },
    { action: "GIS boundary review completed by Dr. Nimal W.", time: "Yesterday", type: "gis" },
    { action: "Dr. Nimal Wickramasinghe conducted farm visit", time: "2 days ago", type: "visit" },
    { action: "Biosecurity assessment score updated to 78/100", time: "3 days ago", type: "check" }
  ];
  const typeColors = { ai: P.purple, vaccine: P.olive, gis: P.info, visit: P.success, check: P.warning };
  const totalAnimals = farms.reduce((total, farm) => total + (Number(farm.animalCount) || 0), 0) || livestock.length;
  const latestScore = biosecurity[0]?.overallScore ?? biosecurity[0]?.score ?? "-";
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Total Animals", value: totalAnimals.toLocaleString(), sub: `${farms.length} registered farm${farms.length === 1 ? "" : "s"}`, icon: Activity, color: P.olive, trend: "up" }),
      /* @__PURE__ */ jsx(KPICard, { label: "Health Alerts", value: alerts.length.toLocaleString(), sub: "From MongoDB", icon: AlertTriangle, color: P.danger, trend: alerts.length ? "down" : "neutral" }),
      /* @__PURE__ */ jsx(KPICard, { label: "Biosecurity Score", value: latestScore === "-" ? "-" : `${latestScore}/100`, sub: latestScore === "-" ? "No assessment yet" : "Latest assessment", icon: Shield, color: P.success, trend: "up" }),
      /* @__PURE__ */ jsx(KPICard, { label: "Vaccinations", value: vaccinations.length.toLocaleString(), sub: "Records in MongoDB", icon: Syringe, color: P.warning, trend: "neutral" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Animal Health Trend" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: P.mid }, children: "Jan \u2013 Jun 2025" })
        ] }) }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxs(AreaChart, { data: healthTrend, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: P.ivoryDark }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "month", tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: { borderRadius: "12px", border: `1px solid #e0e0c0`, fontSize: 12 } }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "healthy", stroke: P.success, fill: P.success, fillOpacity: 0.12, strokeWidth: 2, name: "Healthy" }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "at_risk", stroke: P.warning, fill: "none", fillOpacity: 0, strokeWidth: 2, strokeDasharray: "4 2", name: "At Risk" }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "sick", stroke: P.danger, fill: "none", fillOpacity: 0, strokeWidth: 2, name: "Sick" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-3", style: { fontFamily: "Poppins", color: P.dark }, children: "Biosecurity Score" }),
          /* @__PURE__ */ jsx(BiosecurityGauge, { score: 78 })
        ] }),
        /* @__PURE__ */ jsx(WeatherWidget, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Recent Activity" }) }),
        /* @__PURE__ */ jsx("div", { className: "p-5 flex flex-col gap-0", children: recentActivity.map((a, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full mt-0.5", style: { background: typeColors[a.type] } }),
            i < recentActivity.length - 1 && /* @__PURE__ */ jsx("div", { className: "w-px flex-1 mt-1", style: { background: P.ivoryDark } })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 pb-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.dark }, children: a.action }),
            /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: P.light }, children: a.time })
          ] })
        ] }, i)) })
      ] })
    ] })
  ] });
}
function FarmManagementPage() {
  const zones = [
    { name: "Farrowing House", animals: 48, area: "0.8 ha", health: "Healthy", risk: "Low", capacity: 60 },
    { name: "Grower Pen", animals: 120, area: "1.2 ha", health: "Healthy", risk: "Low", capacity: 150 },
    { name: "Finisher Pen", animals: 180, area: "2.0 ha", health: "At Risk", risk: "High", capacity: 200 },
    { name: "Boar Stall", animals: 8, area: "0.3 ha", health: "Healthy", risk: "Low", capacity: 10 },
    { name: "Broiler House 1", animals: 12e3, area: "1.5 ha", health: "Healthy", risk: "Low", capacity: 15e3 },
    { name: "Broiler House 2", animals: 9800, area: "1.2 ha", health: "At Risk", risk: "Medium", capacity: 12e3 },
    { name: "Layer House", animals: 8e3, area: "1.0 ha", health: "Healthy", risk: "Low", capacity: 1e4 },
    { name: "Breeder House", animals: 4200, area: "0.9 ha", health: "Healthy", risk: "Low", capacity: 5e3 },
    { name: "Zone D \u2013 Small Ruminants", animals: 55, area: "1.5 ha", health: "Healthy", risk: "Low", capacity: 80 }
  ];
  const infrastructure = [
    { item: "Water Troughs", count: 12, status: "Good" },
    { item: "Feed Stores", count: 3, status: "Good" },
    { item: "Isolation Pen", count: 2, status: "Good" },
    { item: "Milking Parlour", count: 1, status: "Needs Service" },
    { item: "Disinfection Bay", count: 2, status: "Good" },
    { item: "Veterinary Room", count: 1, status: "Good" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Total Farm Area", value: "11.6 ha", sub: "Across 4 zones", icon: Leaf, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Total Animals", value: "480", sub: "92% capacity", icon: Activity, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Active Zones", value: "4 / 4", sub: "All operational", icon: CheckCircle, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "Infrastructure Items", value: "21", sub: "1 needs service", icon: Building2, color: P.warning })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Farm Zones" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: P.mid }, children: "Kumari Pig Farm \xB7 Anuradhapura" })
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg", style: { background: `${P.olive}14`, color: P.olive }, children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
            "Add Zone"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divide-y", style: { borderColor: P.ivoryDark }, children: zones.map((z, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 hover:bg-amber-50/20 transition-colors", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", style: { color: P.dark }, children: z.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs mt-0.5", style: { color: P.mid }, children: [
                z.area,
                " \xB7 Capacity: ",
                z.capacity
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { text: z.health, color: healthColor[z.health], bg: `${healthColor[z.health]}15` }),
              /* @__PURE__ */ jsx(Badge, { text: `Risk: ${z.risk}`, color: z.risk === "Low" ? P.success : P.warning, bg: `${z.risk === "Low" ? P.success : P.warning}15` })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mb-1", style: { color: P.mid }, children: [
              /* @__PURE__ */ jsxs("span", { children: [
                z.animals,
                " animals"
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                Math.round(z.animals / z.capacity * 100),
                "% capacity"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full", style: { background: P.ivoryDark }, children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full", style: { width: `${z.animals / z.capacity * 100}%`, background: z.animals / z.capacity > 0.85 ? P.warning : P.olive } }) })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Infrastructure Status" }) }),
          /* @__PURE__ */ jsx("div", { className: "divide-y", style: { borderColor: P.ivoryDark }, children: infrastructure.map((it, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-5 py-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-medium", style: { color: P.dark }, children: it.item }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: P.light }, children: [
                "Count: ",
                it.count
              ] })
            ] }),
            /* @__PURE__ */ jsx(Badge, { text: it.status, color: it.status === "Good" ? P.success : P.warning, bg: it.status === "Good" ? "#f0fdf4" : "#fff7ed" })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-3", style: { fontFamily: "Poppins", color: P.dark }, children: "Farm Details" }),
          [["Registration No.", "LK-FARM-4821"], ["Established", "2018"], ["Main Product", "Pig Farming + Broiler Poultry"], ["Owner", "Nimal Kumari"], ["Phone", "+94 71 234 5678"]].map(([k, v]) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-2", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.mid }, children: String(k) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", style: { color: P.dark }, children: String(v) })
          ] }, String(k)))
        ] })
      ] })
    ] })
  ] });
}
function LivestockManagementPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const speciesCounts = [{ name: "Broiler", value: 21800, color: P.olive }, { name: "Layer", value: 8e3, color: P.purple }, { name: "Pig (Herd)", value: 356, color: P.warning }, { name: "Breeder", value: 4200, color: P.info }];
  const filtered = livestock.filter((a) => (filter === "All" || a.health === filter) && (a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase())));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Total Animals", value: "34,356", sub: "Pigs + Poultry", icon: Activity, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Healthy", value: "463", sub: "96.5%", icon: CheckCircle, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "At Risk", value: "11", sub: "2.3%", icon: AlertTriangle, color: P.warning }),
      /* @__PURE__ */ jsx(KPICard, { label: "Sick", value: "6", sub: "1.2%", icon: AlertCircle, color: P.danger })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-1 px-3 py-2 rounded-xl min-w-48", style: { background: P.ivoryDark }, children: [
            /* @__PURE__ */ jsx(Search, { className: "w-4 h-4", style: { color: P.mid } }),
            /* @__PURE__ */ jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search by name or tag\u2026", className: "bg-transparent text-sm outline-none flex-1", style: { color: P.dark } })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["All", "Healthy", "At Risk", "Sick"].map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(f), className: "text-xs px-3 py-1.5 rounded-lg font-medium transition-all", style: { background: filter === f ? P.olive : P.ivoryDark, color: filter === f ? "#fff" : P.mid }, children: f }, f)) }),
          /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg", style: { background: P.olive, color: "#fff" }, children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
            "Add Animal"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { style: { background: P.ivoryDark }, children: ["ID", "Name", "Species/Breed", "Age/Weight", "Paddock", "Vaccinated", "Health", ""].map((h) => /* @__PURE__ */ jsx("th", { className: "text-left text-xs font-semibold px-4 py-3", style: { color: P.mid }, children: h }, h)) }) }),
          /* @__PURE__ */ jsx("tbody", { children: filtered.map((a) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-amber-50/30 cursor-pointer transition-colors", onClick: () => setSelectedAnimal(a), style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs font-mono", style: { color: P.mid }, children: a.id }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: a.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.light }, children: a.tag })
            ] }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-medium", style: { color: P.dark }, children: a.species }),
              /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.mid }, children: a.breed })
            ] }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.dark }, children: a.age }),
              /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.mid }, children: a.weight })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.mid }, children: a.paddock }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: a.vaccinated ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4", style: { color: P.success } }) : /* @__PURE__ */ jsx(X, { className: "w-4 h-4", style: { color: P.danger } }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Badge, { text: a.health, color: healthColor[a.health], bg: `${healthColor[a.health]}15` }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("button", { className: "p-1 rounded-lg hover:bg-gray-100", children: /* @__PURE__ */ jsx(MoreVertical, { className: "w-4 h-4", style: { color: P.light } }) }) })
          ] }, a.id)) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Species Breakdown" }),
          /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 140, children: /* @__PURE__ */ jsx(PieChart, { children: /* @__PURE__ */ jsx(Pie, { data: speciesCounts, cx: "50%", cy: "50%", innerRadius: 40, outerRadius: 60, dataKey: "value", paddingAngle: 3, children: speciesCounts.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: speciesCounts[i].color }, i)) }) }) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 mt-2", children: speciesCounts.map((s) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-sm", style: { background: s.color } }),
              /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.mid }, children: s.name })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold", style: { color: P.dark }, children: s.value })
          ] }, s.name)) })
        ] }),
        selectedAnimal && /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Animal Detail" }),
            /* @__PURE__ */ jsx("button", { onClick: () => setSelectedAnimal(null), children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4", style: { color: P.mid } }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl mb-3 flex items-center justify-center", style: { background: `${P.olive}14` }, children: /* @__PURE__ */ jsx(Activity, { className: "w-6 h-6", style: { color: P.olive } }) }),
          /* @__PURE__ */ jsx("p", { className: "font-bold", style: { color: P.dark, fontFamily: "Poppins" }, children: selectedAnimal.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs mb-3", style: { color: P.mid }, children: selectedAnimal.tag }),
          [["Species", selectedAnimal.species], ["Breed", selectedAnimal.breed], ["Age", selectedAnimal.age], ["Weight", selectedAnimal.weight], ["Paddock", selectedAnimal.paddock], ["Vaccinated", selectedAnimal.vaccinated ? "Yes" : "No"]].map(([k, v]) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-1.5", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.mid }, children: String(k) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", style: { color: P.dark }, children: String(v) })
          ] }, String(k))),
          /* @__PURE__ */ jsx(Badge, { text: selectedAnimal.health, color: healthColor[selectedAnimal.health], bg: `${healthColor[selectedAnimal.health]}15` })
        ] })
      ] })
    ] })
  ] });
}
function BiosecurityAssessmentPage() {
  const [checklist, setChecklist] = useState(biosecurityChecklist);
  const totalItems = checklist.flatMap((c) => c.items).length;
  const doneItems = checklist.flatMap((c) => c.items).filter((i) => i.done).length;
  const score = Math.round(doneItems / totalItems * 100);
  const toggle = (ci, ii) => {
    const next = checklist.map((c, ci2) => ci2 !== ci ? c : { ...c, items: c.items.map((item, ii2) => ii2 !== ii ? item : { ...item, done: !item.done }) });
    setChecklist(next);
  };
  const zoneScores = [{ zone: "Zone A", score: 94 }, { zone: "Zone B", score: 78 }, { zone: "Zone C", score: 52 }, { zone: "Zone D", score: 88 }];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Overall Score", value: `${score}/100`, sub: score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Improvement", icon: Shield, color: sc(score) }),
      /* @__PURE__ */ jsx(KPICard, { label: "Checklist Progress", value: `${doneItems}/${totalItems}`, sub: "Items completed", icon: CheckCircle, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Last Assessment", value: "July 10", sub: "12 days ago", icon: Calendar, color: P.info }),
      /* @__PURE__ */ jsx(KPICard, { label: "Next Due", value: "July 24", sub: "In 12 days", icon: Clock, color: P.warning })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        checklist.map((cat, ci) => {
          const catDone = cat.items.filter((i) => i.done).length;
          return /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: cat.category }),
              /* @__PURE__ */ jsx(Badge, { text: `${catDone}/${cat.items.length}`, color: catDone === cat.items.length ? P.success : P.warning, bg: catDone === cat.items.length ? "#f0fdf4" : "#fff7ed" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "divide-y", style: { borderColor: P.ivoryDark }, children: cat.items.map((item, ii) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-5 py-3 hover:bg-amber-50/20 cursor-pointer", onClick: () => toggle(ci, ii), children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all`,
                  style: { borderColor: item.done ? P.success : "#c8c8a0", background: item.done ? P.success : "transparent" },
                  children: item.done && /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-white" })
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs flex-1", style: { color: item.done ? P.mid : P.dark, textDecoration: item.done ? "line-through" : "none" }, children: item.check })
            ] }, ii)) })
          ] }, cat.category);
        }),
        /* @__PURE__ */ jsx("button", { className: "w-full py-3.5 rounded-xl font-semibold text-white text-sm", style: { background: `linear-gradient(135deg, ${P.olive}, ${P.oliveDark})` }, children: "Submit Biosecurity Assessment" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Overall Score" }),
          /* @__PURE__ */ jsx(BiosecurityGauge, { score }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 rounded-xl", style: { background: `${sc(score)}10` }, children: /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: sc(score) }, children: score >= 80 ? "Excellent biosecurity standards maintained." : score >= 60 ? "Some areas need attention." : "Critical issues require immediate action." }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-3", style: { fontFamily: "Poppins", color: P.dark }, children: "Zone Scores" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: zoneScores.map((z) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
              /* @__PURE__ */ jsx("span", { style: { color: P.dark }, children: z.zone }),
              /* @__PURE__ */ jsxs("span", { className: "font-semibold", style: { color: sc(z.score) }, children: [
                z.score,
                "/100"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full", style: { background: P.ivoryDark }, children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full", style: { width: `${z.score}%`, background: sc(z.score) } }) })
          ] }, z.zone)) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-3", style: { fontFamily: "Poppins", color: P.dark }, children: "Risk Factors" }),
          [["Entry control gaps", "Medium"], ["Waste disposal records", "Low"], ["Post-vaccination monitoring", "Low"]].map(([r, sev]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.dark }, children: String(r) }),
            /* @__PURE__ */ jsx(Badge, { text: String(sev), color: sev === "Medium" ? P.warning : P.info, bg: sev === "Medium" ? "#fff7ed" : "#eff6ff" })
          ] }, String(r)))
        ] })
      ] })
    ] })
  ] });
}
function GISModulePage() {
  const [activeLayer, setActiveLayer] = useState("Heatmap");
  const farms2 = [
    { name: "Kumari Farm", lat: "8.3215\xB0N", lng: "80.4025\xB0E", status: "Alert", distance: "0 km (this farm)" },
    { name: "Bandara Farm", lat: "8.3340\xB0N", lng: "80.3980\xB0E", status: "Healthy", distance: "1.8 km" },
    { name: "Gamage Farm", lat: "8.3050\xB0N", lng: "80.4190\xB0E", status: "Warning", distance: "3.2 km" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Nearby Farms", value: "8", sub: "Within 10 km", icon: MapPin, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Outbreak Farms", value: "2", sub: "Within 10 km", icon: AlertTriangle, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "Nearest Alert", value: "3.2 km", sub: "Gamage Farm", icon: Navigation, color: P.warning }),
      /* @__PURE__ */ jsx(KPICard, { label: "Your Boundary", value: "11.6 ha", sub: "4 zones mapped", icon: Compass, color: P.info })
    ] }),
    /* @__PURE__ */ jsx(GISMap, { height: 380 }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Nearby Farms & Risk Assessment" }) }),
        /* @__PURE__ */ jsx("div", { className: "divide-y", style: { borderColor: P.ivoryDark }, children: farms2.map((f, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-5 py-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full flex-shrink-0", style: { background: f.status === "Alert" ? P.danger : f.status === "Warning" ? P.warning : P.success } }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: f.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: P.mid }, children: [
              f.lat,
              " \xB7 ",
              f.lng
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.light }, children: f.distance }),
          /* @__PURE__ */ jsx(Badge, { text: f.status, color: f.status === "Alert" ? P.danger : f.status === "Warning" ? P.warning : P.success, bg: f.status === "Alert" ? "#fef2f2" : f.status === "Warning" ? "#fff7ed" : "#f0fdf4" })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-3", style: { fontFamily: "Poppins", color: P.dark }, children: "GIS Layers" }),
        [["Heatmap", true], ["Farm Boundaries", true], ["Disease Zones", true], ["Water Sources", false], ["Roads/Access", true], ["Weather Overlay", false]].map(([l, active]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2.5", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Layers, { className: "w-3.5 h-3.5", style: { color: P.mid } }),
            /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.dark }, children: String(l) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `w-9 h-5 rounded-full transition-all cursor-pointer flex items-center px-0.5`, style: { background: active ? P.olive : "#c8c8a0" }, children: /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-white transition-all", style: { transform: active ? "translateX(16px)" : "translateX(0)" } }) })
        ] }, String(l)))
      ] })
    ] })
  ] });
}
function DiseaseAlertsPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? alerts : alerts.filter((a) => a.type === filter.toLowerCase() || filter === "Unread" && !a.read);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Active Alerts", value: "5", sub: "2 critical", icon: AlertTriangle, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "Unread", value: "2", sub: "Require action", icon: Bell, color: P.warning }),
      /* @__PURE__ */ jsx(KPICard, { label: "Disease Events", value: "3", sub: "Open events", icon: Activity, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Resolved (30d)", value: "12", sub: "Closed alerts", icon: CheckCircle, color: P.success })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
      ["All", "Danger", "Warning", "Info", "Success", "Unread"].map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(f), className: "text-xs px-3 py-1.5 rounded-lg font-medium transition-all", style: { background: filter === f ? P.olive : P.ivoryDark, color: filter === f ? "#fff" : P.mid }, children: f }, f)),
      /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg ml-auto", style: { background: P.danger, color: "#fff" }, children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
        "Report New Alert"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: filtered.map((a) => {
      const Icon = a.icon;
      return /* @__PURE__ */ jsxs(Card, { className: "p-5", style: { borderLeftWidth: "4px", borderLeftColor: alertBorder[a.type] }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", style: { background: alertBg[a.type] }, children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5", style: { color: alertBorder[a.type] } }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", style: { color: P.dark }, children: a.title }),
              !a.read && /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0", style: { background: P.danger, color: "#fff" }, children: "New" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs mt-1", style: { color: P.mid }, children: a.farm }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs mt-1", style: { color: P.light }, children: [
              "Disease: ",
              a.disease,
              " \xB7 ",
              a.time
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-4", children: [
          /* @__PURE__ */ jsx("button", { className: "flex-1 text-xs py-2 rounded-lg font-medium", style: { background: alertBg[a.type], color: alertBorder[a.type] }, children: "View Details" }),
          /* @__PURE__ */ jsx("button", { className: "flex-1 text-xs py-2 rounded-lg font-medium", style: { background: P.ivoryDark, color: P.mid }, children: "Dismiss" })
        ] })
      ] }, a.id);
    }) })
  ] });
}
function VaccinationPage() {
  const [tab, setTab] = useState("schedule");
  const upcoming = vaccinations.filter((v) => v.status !== "Completed");
  const history = vaccinations.filter((v) => v.status === "Completed");
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Scheduled", value: "3", sub: "Next 30 days", icon: Calendar, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Animals Due", value: "80", sub: "Across 2 vaccines", icon: Syringe, color: P.warning }),
      /* @__PURE__ */ jsx(KPICard, { label: "Coverage (Avg)", value: "81.2%", sub: "All vaccines", icon: TrendingUp, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "Completed (90d)", value: "2", sub: "570 animals", icon: CheckCircle, color: P.info })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      [["schedule", "Upcoming & Scheduled"], ["history", "Vaccination History"]].map(([t, l]) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setTab(t),
          className: "text-sm font-semibold px-5 py-2.5 rounded-xl transition-all",
          style: { background: tab === t ? P.olive : P.ivoryDark, color: tab === t ? "#fff" : P.mid },
          children: String(l)
        },
        t
      )),
      /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl ml-auto", style: { background: P.olive, color: "#fff" }, children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
        "Add Record"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { style: { background: P.ivoryDark }, children: ["ID", "Disease", "Animals", "Date", "Vet", "Coverage", "Status", ""].map((h) => /* @__PURE__ */ jsx("th", { className: "text-left text-xs font-semibold px-4 py-3", style: { color: P.mid }, children: h }, h)) }) }),
      /* @__PURE__ */ jsx("tbody", { children: (tab === "schedule" ? upcoming : history).map((v) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-amber-50/30 cursor-pointer", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs font-mono", style: { color: P.mid }, children: v.id }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs font-semibold", style: { color: P.dark }, children: v.disease }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.dark }, children: v.animals }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.dark }, children: v.date }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.mid }, children: v.vet }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-1.5 w-16 rounded-full", style: { background: P.ivoryDark }, children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full", style: { width: `${v.coverage}%`, background: sc(v.coverage) } }) }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs", style: { color: P.mid }, children: [
            v.coverage,
            "%"
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Badge, { text: v.status, color: v.status === "Completed" ? P.success : v.status === "Scheduled" ? P.info : P.warning, bg: v.status === "Completed" ? "#f0fdf4" : v.status === "Scheduled" ? "#eff6ff" : "#fff7ed" }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("button", { className: "p-1 rounded-lg hover:bg-gray-100", children: /* @__PURE__ */ jsx(MoreVertical, { className: "w-4 h-4", style: { color: P.light } }) }) })
      ] }, v.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Coverage by Disease" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxs(BarChart, { data: vaccinations.map((v) => ({ name: v.disease, coverage: v.coverage })), barSize: 32, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: P.ivoryDark, vertical: false }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "name", tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false, domain: [0, 100] }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: { borderRadius: "12px", fontSize: 12 } }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "coverage", radius: [6, 6, 0, 0], name: "Coverage %", children: vaccinations.map((v, i) => /* @__PURE__ */ jsx(Cell, { fill: sc(v.coverage) }, i)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-3", style: { fontFamily: "Poppins", color: P.dark }, children: "Upcoming Schedule" }),
        upcoming.map((v) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl flex items-center justify-center", style: { background: `${P.olive}14` }, children: /* @__PURE__ */ jsx(Syringe, { className: "w-4 h-4", style: { color: P.olive } }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: [
              v.disease,
              " Vaccination"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: P.mid }, children: [
              v.date,
              " \xB7 ",
              v.animals,
              " animals"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Badge, { text: v.status, color: v.status === "Scheduled" ? P.info : P.warning, bg: v.status === "Scheduled" ? "#eff6ff" : "#fff7ed" })
        ] }, v.id))
      ] })
    ] })
  ] });
}
function AIAssistantPage() {
  const [messages, setMessages] = useState(aiMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const quickPrompts = ["Check disease risk for my farm", "Plan next vaccination schedule", "Analyse biosecurity gaps", "Nearest outbreak status", "AI health report summary"];
  const send = (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text, time: formatTime(new Date()) }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: "Based on current farm data and GIS analysis, I'm continuously monitoring your pig and poultry operations. Your Finisher Pen shows elevated PRRS risk factors, and Broiler House 2 is in an active HPAI surveillance zone. I recommend scheduling a veterinary inspection within the next 48 hours and applying strict biosecurity (all-in all-out, no wild bird contact). Shall I draft an inspection request to Dr. Nimal Wickramasinghe?", time: formatTime(new Date()) }]);
      setLoading(false);
    }, 1200);
  };
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "AI Recommendations", value: "3", sub: "Active insights", icon: Zap, color: P.purple }),
      /* @__PURE__ */ jsx(KPICard, { label: "Risk Score", value: "74/100", sub: "PRRS \u2013 Finisher Pen", icon: AlertTriangle, color: P.warning }),
      /* @__PURE__ */ jsx(KPICard, { label: "AI Model", value: "BioAI v2.2", sub: "Pig & Poultry \u2013 July 8", icon: Cpu, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Predictions (30d)", value: "94.3%", sub: "Accuracy rate", icon: Target, color: P.success })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl overflow-hidden flex flex-col", style: { background: "#1e1040", border: "1px solid rgba(114,52,128,0.4)", height: "500px" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4", style: { borderBottom: "1px solid rgba(219,212,255,0.1)" }, children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl flex items-center justify-center", style: { background: "rgba(219,212,255,0.15)" }, children: /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5", style: { color: P.lavender } }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-white text-sm", children: "BioSecure AI Assistant" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: "rgba(219,212,255,0.5)" }, children: "Powered by BioAI v2.1 \xB7 Online" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "ml-auto w-2 h-2 rounded-full", style: { background: P.success } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-4", children: [
          messages.map((m, i) => /* @__PURE__ */ jsxs("div", { className: `flex ${m.role === "user" ? "justify-end" : "justify-start"}`, children: [
            m.role === "ai" && /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 self-end", style: { background: "rgba(219,212,255,0.15)" }, children: /* @__PURE__ */ jsx(Zap, { className: "w-3.5 h-3.5", style: { color: P.lavender } }) }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-xs lg:max-w-sm", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap",
                  style: { background: m.role === "user" ? P.olive : "rgba(255,255,255,0.08)", color: m.role === "user" ? "#fff" : "rgba(219,212,255,0.9)", borderBottomRightRadius: m.role === "user" ? "4px" : "16px", borderBottomLeftRadius: m.role === "ai" ? "4px" : "16px" },
                  children: m.text
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs mt-1 px-1", style: { color: "rgba(219,212,255,0.3)", textAlign: m.role === "user" ? "right" : "left" }, children: m.time })
            ] })
          ] }, i)),
          loading && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx("div", { className: "px-4 py-3 rounded-2xl", style: { background: "rgba(255,255,255,0.08)" }, children: /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full animate-bounce", style: { background: P.lavender, animationDelay: `${i * 0.15}s` } }, i)) }) }) }),
          /* @__PURE__ */ jsx("div", { ref: bottomRef })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4", style: { borderTop: "1px solid rgba(219,212,255,0.1)" }, children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              value: input,
              onChange: (e) => setInput(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && send(input),
              placeholder: "Ask BioSecure AI\u2026",
              className: "flex-1 px-4 py-2.5 rounded-xl text-sm outline-none",
              style: { background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(219,212,255,0.15)" }
            }
          ),
          /* @__PURE__ */ jsx("button", { onClick: () => send(input), className: "w-10 h-10 rounded-xl flex items-center justify-center", style: { background: P.purple }, children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 text-white" }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-3", style: { fontFamily: "Poppins", color: P.dark }, children: "Quick Prompts" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: quickPrompts.map((q) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => send(q),
              className: "text-xs text-left px-3 py-2.5 rounded-xl transition-all hover:scale-[1.01]",
              style: { background: P.ivoryDark, color: P.mid, border: `1px solid rgba(128,128,52,0.1)` },
              children: q
            },
            q
          )) })
        ] }),
        /* @__PURE__ */ jsx(AIRecommendationCard, {})
      ] })
    ] })
  ] });
}
function ReportsPage() {
  const reports = [
    { id: "RPT-001", title: "Monthly Pig & Poultry Health Report", date: "2025-07-01", type: "Health", status: "Ready", pages: 14 },
    { id: "RPT-002", title: "Biosecurity Assessment Q2 2025", date: "2025-06-30", type: "Biosecurity", status: "Ready", pages: 8 },
    { id: "RPT-003", title: "Vaccination Coverage Report \u2013 June", date: "2025-06-15", type: "Vaccination", status: "Ready", pages: 5 },
    { id: "RPT-004", title: "GIS Disease Risk Summary", date: "2025-07-08", type: "GIS", status: "Processing", pages: 0 },
    { id: "RPT-005", title: "Government Compliance Report", date: "2025-07-10", type: "Compliance", status: "Ready", pages: 18 }
  ];
  const typeColor = { Health: P.success, Biosecurity: P.olive, Vaccination: P.purple, GIS: P.info, Compliance: P.warning };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Total Reports", value: "5", sub: "July 2025", icon: FileText, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Ready to Download", value: "4", sub: "Available now", icon: Download, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "Processing", value: "1", sub: "GIS report", icon: RefreshCw, color: P.warning }),
      /* @__PURE__ */ jsx(KPICard, { label: "Gov't Submitted", value: "2", sub: "This month", icon: CheckCircle, color: P.info })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["All", "Health", "Vaccination", "Biosecurity", "Compliance"].map((f) => /* @__PURE__ */ jsx("button", { className: "text-xs px-3 py-1.5 rounded-lg font-medium", style: { background: f === "All" ? P.olive : P.ivoryDark, color: f === "All" ? "#fff" : P.mid }, children: f }, f)) }),
      /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl", style: { background: P.olive, color: "#fff" }, children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
        "Generate Report"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-3", children: reports.map((r) => /* @__PURE__ */ jsxs(Card, { className: "flex items-center gap-4 p-5", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", style: { background: `${typeColor[r.type]}14` }, children: /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5", style: { color: typeColor[r.type] } }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", style: { color: P.dark }, children: r.title }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs mt-0.5", style: { color: P.mid }, children: [
          r.id,
          " \xB7 ",
          r.date,
          " \xB7 ",
          r.pages > 0 ? `${r.pages} pages` : "Generating\u2026"
        ] })
      ] }),
      /* @__PURE__ */ jsx(Badge, { text: r.type, color: typeColor[r.type], bg: `${typeColor[r.type]}14` }),
      r.status === "Ready" ? /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg", style: { background: P.ivoryDark, color: P.olive }, children: [
        /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5" }),
        "Download"
      ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs font-medium px-3 py-2 rounded-lg", style: { color: P.warning, background: "#fff7ed" }, children: "Processing\u2026" })
    ] }, r.id)) })
  ] });
}
function NotificationsPage() {
  const [notifications] = useState([...alerts, ...alerts.map((a) => ({ ...a, id: a.id + 10, read: true, time: `${a.id + 3} days ago` }))]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "All Notifications", value: "10", sub: "Total", icon: Bell, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Unread", value: "2", sub: "Requires attention", icon: AlertCircle, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "Alerts", value: "3", sub: "Active alerts", icon: AlertTriangle, color: P.warning }),
      /* @__PURE__ */ jsx(KPICard, { label: "Info", value: "5", sub: "General updates", icon: Info, color: P.info })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["All", "Unread", "Alerts", "Info"].map((f) => /* @__PURE__ */ jsx("button", { className: "text-xs px-3 py-1.5 rounded-lg font-medium", style: { background: f === "All" ? P.olive : P.ivoryDark, color: f === "All" ? "#fff" : P.mid }, children: f }, f)) }),
      /* @__PURE__ */ jsx("button", { className: "text-xs font-medium px-3 py-1.5 rounded-lg", style: { color: P.olive, background: `${P.olive}10` }, children: "Mark all read" })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "divide-y", style: { borderColor: P.ivoryDark }, children: notifications.map((n) => {
      const Icon = n.icon;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-start gap-3 p-4 hover:bg-amber-50/20 transition-colors cursor-pointer",
          style: { background: !n.read ? `${alertBg[n.type]}` : "transparent" },
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", style: { background: alertBg[n.type] }, children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4", style: { color: alertBorder[n.type] } }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: n.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: P.mid }, children: n.farm })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end gap-1.5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.light }, children: n.time }),
              !n.read && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full", style: { background: P.danger } })
            ] })
          ]
        },
        n.id
      );
    }) }) })
  ] });
}
function LiveProfilePage({ role, user, language = "en" }) {
  const [form, setForm] = useState({
    name: user?.name || user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || user?.mobile || "",
    extra: user?.extra || {},
    location: user?.location || null,
  });
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const hasLocalPassword = Boolean(user?.passwordHash || user?.provider === "local");
  const roleFields = {
    farmer: ["Farm Name", "Farm Registration No.", "Farm Type", "Total Animals (approx.)", "District", "Village / Address", "Number of Farms"],
    veterinarian: ["Vet Licence No.", "Specialisation", "Employer / Clinic Name", "Service District(s)", "Years of Experience"],
    government: ["Employee ID", "Department / Ministry", "Designation", "District / Division", "Official Email Domain"],
    admin: ["Department", "Designation", "Access Level", "Office Location"],
  };
  const fields = roleFields[role] || roleFields.farmer;
  const isFarmer = role === "farmer";
  const farmerEditableFields = new Set(["Farm Name", "Farm Type", "Number of Farms"]);
  const initials = form.name.split(/\s+/).filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "U";
  const setExtra = (key, value) => setForm((current) => ({ ...current, extra: { ...current.extra, [key]: value } }));
  const refreshLocation = () => navigator.geolocation?.getCurrentPosition((position) => setForm((current) => ({ ...current, location: { latitude: position.coords.latitude, longitude: position.coords.longitude } })));
  const save = async () => {
    setStatus("");
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.userId}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save profile");
      setEditing(false); setStatus("Profile saved");
    } catch (error) { setStatus(error.message); }
  };
  const changePassword = async () => {
    setStatus("");
    if (passwordForm.newPassword.length < 8) return setStatus(t(language, "passwordMin", "Min 8 characters"));
    if (passwordForm.newPassword !== passwordForm.confirmPassword) return setStatus(t(language, "passwordsMismatch", "Passwords do not match"));
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.userId}/password`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(passwordForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not change password");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setChangingPassword(false); setStatus(t(language, hasLocalPassword ? "passwordChanged" : "passwordSet", hasLocalPassword ? "Password changed successfully" : "Password set successfully"));
    } catch (error) { setStatus(error.message); }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold", style: { background: `${P.olive}18`, color: P.olive, fontFamily: "Poppins" }, children: initials }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", style: { fontFamily: "Poppins", color: P.dark }, children: form.name || "User" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm mt-1", style: { color: P.mid }, children: `${user?.role || role} · ID: ${user?.userId || "Not assigned"}` }),
          /* @__PURE__ */ jsx("p", { className: "text-xs mt-1", style: { color: P.light }, children: user?.email || "" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs mt-1", style: { color: P.light }, children: `Member since ${user?.createdAt ? formatDate(user.createdAt) : "Not recorded"}` })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setEditing((value) => !value), className: "ml-auto flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg", style: { background: `${P.olive}14`, color: P.olive }, children: [/* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5" }), editing ? "Cancel" : "Edit Profile"] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-6", children: [
        ["Full Name", "name", User], ["Email Address", "email", Mail], ["Phone Number", "phone", Phone]
      ].map(([label, key, Icon]) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: label }),
        editing && (isFarmer || key !== "email") ? /* @__PURE__ */ jsx("input", { value: form[key], onChange: (event) => setForm((current) => ({ ...current, [key]: event.target.value })), className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark } }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4 py-3 rounded-xl", style: { background: P.ivoryDark }, children: [/* @__PURE__ */ jsx(Icon, { className: "w-4 h-4", style: { color: P.mid } }), /* @__PURE__ */ jsx("span", { className: "text-sm", style: { color: P.dark }, children: form[key] || user?.email || "" })] })
      ] }, label)) }),
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mt-6 mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Role Details" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: fields.map((field) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: field }),
        editing && (!isFarmer || farmerEditableFields.has(field)) ? /* @__PURE__ */ jsx("input", { value: form.extra[field] || "", onChange: (event) => setExtra(field, event.target.value), className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark } }) : /* @__PURE__ */ jsx("div", { className: "px-4 py-3 rounded-xl text-sm", style: { background: P.ivoryDark, color: P.dark }, children: form.extra[field] || "Not provided" })
      ] }, field)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Location" }),
        editing && !isFarmer ? /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("input", { type: "number", step: "any", value: form.location?.latitude ?? "", onChange: (event) => setForm((current) => ({ ...current, location: { ...(current.location || {}), latitude: event.target.value } })), placeholder: "Latitude", className: "min-w-0 flex-1 px-3 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark } }),
          /* @__PURE__ */ jsx("input", { type: "number", step: "any", value: form.location?.longitude ?? "", onChange: (event) => setForm((current) => ({ ...current, location: { ...(current.location || {}), longitude: event.target.value } })), placeholder: "Longitude", className: "min-w-0 flex-1 px-3 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark } }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: refreshLocation, title: "Detect current location", className: "px-3 rounded-xl", style: { background: P.olive, color: "#fff" }, children: /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4" }) })
        ] }) : /* @__PURE__ */ jsx("div", { className: "px-4 py-3 rounded-xl text-sm", style: { background: P.ivoryDark, color: P.dark }, children: form.location ? `${form.location.latitude}, ${form.location.longitude}` : "Not provided" })
      ] }),
      editing && /* @__PURE__ */ jsxs("button", { onClick: save, className: "mt-5 w-full py-3 rounded-xl font-semibold text-white text-sm", style: { background: `linear-gradient(135deg, ${P.olive}, ${P.oliveDark})` }, children: ["Save Changes"] }),
      status && /* @__PURE__ */ jsx("p", { className: "text-xs mt-3 text-center", style: { color: status === "Profile saved" ? P.success : P.danger }, children: status })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Security" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setChangingPassword(value => !value), className: "w-full flex items-center justify-between py-3", style: { border: "none", borderBottom: `1px solid ${P.ivoryDark}`, background: "transparent", cursor: "pointer" }, children: [/* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [/* @__PURE__ */ jsx(Lock, { className: "w-4 h-4", style: { color: P.mid } }), /* @__PURE__ */ jsx("span", { className: "text-sm", style: { color: P.dark }, children: t(language, "changePassword", "Change Password") })] }), /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4", style: { color: P.light } })] }),
          changingPassword && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 pt-4", children: [
            hasLocalPassword && /* @__PURE__ */ jsx("input", { type: "password", value: passwordForm.currentPassword, onChange: event => setPasswordForm(current => ({ ...current, currentPassword: event.target.value })), placeholder: t(language, "currentPassword", "Current password"), className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark } }),
            /* @__PURE__ */ jsx("input", { type: "password", value: passwordForm.newPassword, onChange: event => setPasswordForm(current => ({ ...current, newPassword: event.target.value })), placeholder: t(language, "newPassword", "New password"), className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark } }),
            /* @__PURE__ */ jsx("input", { type: "password", value: passwordForm.confirmPassword, onChange: event => setPasswordForm(current => ({ ...current, confirmPassword: event.target.value })), placeholder: t(language, "confirmPassword", "Confirm Password"), className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark } }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: changePassword, className: "w-full py-3 rounded-xl font-semibold text-white text-sm", style: { background: `linear-gradient(135deg, ${P.olive}, ${P.oliveDark})` }, children: t(language, hasLocalPassword ? "updatePassword" : "setPassword", hasLocalPassword ? "Update Password" : "Set Password") })
          ] })
        ] })
      ] }),
    ] })
  ] });
}
function ProfilePage({ role }) {
  const profiles = {
    farmer: { name: "Nimal Kumari", email: "nimal@farm.lk", phone: "+94 71 234 5678", id: "LK-F-4821", since: "March 2024" },
    veterinarian: { name: "Dr. Nimal Wickramasinghe", email: "nimal.w@vet.gov.lk", phone: "+94 77 345 6789", id: "VET-0042", since: "August 2023" },
    government: { name: "S. Rathnayake", email: "rathnayake@moa.gov.lk", phone: "+94 11 456 7890", id: "GOV-0018", since: "January 2023" },
    admin: { name: "System Administrator", email: "admin@biosecure.gov.lk", phone: "+94 11 999 0000", id: "ADM-0001", since: "January 2023" }
  };
  const p = profiles[role];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-6 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4", style: { background: `${P.olive}18`, color: P.olive, fontFamily: "Poppins" }, children: p.name.split(" ").map((n) => n[0]).join("").slice(0, 2) }),
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", style: { fontFamily: "Poppins", color: P.dark }, children: p.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm mt-1", style: { color: P.mid }, children: [
          role.charAt(0).toUpperCase() + role.slice(1),
          " \xB7 ID: ",
          p.id
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs mt-1", style: { color: P.light }, children: [
          "Member since ",
          p.since
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "mt-4 flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg", style: { background: `${P.olive}14`, color: P.olive }, children: [
          /* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5" }),
          "Edit Profile"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Account Information" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: [["Full Name", p.name, User], ["Email Address", p.email, Mail], ["Phone Number", p.phone, Phone], ["Member ID", p.id, Shield]].map(([l, v, Icon]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: String(l) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4 py-3 rounded-xl", style: { background: P.ivoryDark }, children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 flex-shrink-0", style: { color: P.mid } }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", style: { color: P.dark }, children: String(v) })
          ] })
        ] }, String(l))) }),
        /* @__PURE__ */ jsx("button", { className: "mt-4 w-full py-3 rounded-xl font-semibold text-white text-sm", style: { background: `linear-gradient(135deg, ${P.olive}, ${P.oliveDark})` }, children: "Save Changes" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Security" }),
        [["Change Password", Lock], ["Two-Factor Authentication", Shield], ["Login Activity", Eye]].map(([l, Icon]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3 cursor-pointer hover:bg-amber-50/30 px-2 rounded-xl -mx-2", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4", style: { color: P.mid } }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", style: { color: P.dark }, children: String(l) })
          ] }),
          /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4", style: { color: P.light } })
        ] }, String(l)))
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Notifications Settings" }),
        [["Disease Alerts", true], ["Vaccination Reminders", true], ["GIS Updates", false], ["Government Advisories", true], ["AI Recommendations", true]].map(([l, on]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm", style: { color: P.dark }, children: String(l) }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-5.5 rounded-full flex items-center px-0.5 cursor-pointer", style: { background: on ? P.olive : "#c8c8a0", padding: "2px" }, children: /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-white", style: { transform: on ? "translateX(18px)" : "translateX(0)", transition: "transform 0.2s" } }) })
        ] }, String(l)))
      ] })
    ] })
  ] });
}
function VetDashboardPage() {
  const todaySchedule = [
    { time: "09:00", farm: "Silva Integrated Farm", type: "Inspection (Poultry Houses)", status: "Scheduled" },
    { time: "11:30", farm: "Kumari Pig Farm", type: "PRRS Follow-up Visit", status: "Confirmed" },
    { time: "14:00", farm: "Perera Poultry Farm", type: "Newcastle Vaccination Drive", status: "Scheduled" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Assigned Farms", value: "14", sub: "3 require visits", icon: Leaf, color: P.purple }),
      /* @__PURE__ */ jsx(KPICard, { label: "Pending Inspections", value: "3", sub: "Due this week", icon: ClipboardList, color: P.warning }),
      /* @__PURE__ */ jsx(KPICard, { label: "Animals Examined", value: "892", sub: "This month", icon: Stethoscope, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "Open Cases", value: "4", sub: "Requires follow-up", icon: AlertTriangle, color: P.danger })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Today's Schedule" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: P.mid }, children: "Saturday, 12 July 2025" })
        ] }),
        todaySchedule.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3 p-4", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsx("div", { className: "text-right flex-shrink-0 w-12", children: /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: P.purple }, children: s.time }) }),
          /* @__PURE__ */ jsx("div", { className: "w-px", style: { background: P.purple } }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: s.farm }),
            /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: P.mid }, children: s.type })
          ] }),
          /* @__PURE__ */ jsx(Badge, { text: s.status, color: P.info, bg: "#eff6ff" })
        ] }, i))
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Farm Health Overview" }),
        /* @__PURE__ */ jsx("div", { className: "divide-y", style: { borderColor: P.ivoryDark }, children: allFarms.map((f) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 py-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full flex-shrink-0", style: { background: statusColor[f.status] } }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: f.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: P.mid }, children: [
              f.district,
              " \xB7 ",
              f.animals,
              " animals"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold", style: { color: sc(f.biosecurity) }, children: [
              f.biosecurity,
              "/100"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.light }, children: "biosecurity" })
          ] }),
          /* @__PURE__ */ jsx(Badge, { text: f.status, color: statusColor[f.status], bg: `${statusColor[f.status]}15` })
        ] }, f.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(AIRecommendationCard, {})
  ] });
}
function AssignedFarmsPage() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Assigned Farms", value: "14", sub: "All districts", icon: Leaf, color: P.purple }),
      /* @__PURE__ */ jsx(KPICard, { label: "Alert Status", value: "2", sub: "Require urgent visit", icon: AlertTriangle, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "Last Visit Avg", value: "4.2 days", sub: "Across all farms", icon: Clock, color: P.info }),
      /* @__PURE__ */ jsx(KPICard, { label: "Compliance Avg", value: "89.6%", sub: "Good standing", icon: CheckCircle, color: P.success })
    ] }),
    /* @__PURE__ */ jsx(GISMap, { height: 260 }),
    /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "All Assigned Farms" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-xl", style: { background: P.ivoryDark }, children: [
          /* @__PURE__ */ jsx(Search, { className: "w-3.5 h-3.5", style: { color: P.mid } }),
          /* @__PURE__ */ jsx("input", { placeholder: "Search farms\u2026", className: "bg-transparent text-xs outline-none", style: { color: P.dark } })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y", style: { borderColor: P.ivoryDark }, children: allFarms.map((f) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-5 py-4 hover:bg-amber-50/20 cursor-pointer", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center", style: { background: `${statusColor[f.status]}14` }, children: /* @__PURE__ */ jsx(Leaf, { className: "w-5 h-5", style: { color: statusColor[f.status] } }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", style: { color: P.dark }, children: f.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs mt-0.5", style: { color: P.mid }, children: [
            f.owner,
            " \xB7 ",
            f.district,
            " \xB7 ",
            f.animals,
            " animals"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right mr-4", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold", style: { color: sc(f.biosecurity) }, children: [
            f.biosecurity,
            "/100"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.light }, children: "biosecurity" })
        ] }),
        /* @__PURE__ */ jsx(Badge, { text: f.status, color: statusColor[f.status], bg: `${statusColor[f.status]}15` }),
        /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg", style: { background: `${P.purple}14`, color: P.purple }, children: [
          "Visit ",
          /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3" })
        ] })
      ] }, f.id)) })
    ] })
  ] });
}
function InspectionPage() {
  const [step, setStep] = useState(0);
  const [selectedFarm, setSelectedFarm] = useState("Kumari Pig Farm");
  const [formData, setFormData] = useState({ temperature: "", symptoms: "", samplesCollected: false, quarantine: false, notes: "" });
  const steps = ["Select Farm", "Clinical Examination", "Lab Samples", "Biosecurity Check", "Submit Report"];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0 mb-6", children: steps.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", style: { flex: "none" }, children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all`,
              style: { background: i < step ? P.success : i === step ? P.purple : P.ivoryDark, color: i <= step ? "#fff" : P.mid },
              children: i < step ? /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }) : i + 1
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs mt-1 text-center hidden lg:block", style: { color: i === step ? P.dark : P.mid, width: "80px" }, children: s })
        ] }),
        i < steps.length - 1 && /* @__PURE__ */ jsx("div", { className: "flex-1 h-0.5 mx-2", style: { background: i < step ? P.success : P.ivoryDark } })
      ] }, i)) }),
      step === 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Select Farm for Inspection" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-3", children: allFarms.map((f) => /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => setSelectedFarm(f.name),
            className: "flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all",
            style: { border: `2px solid ${selectedFarm === f.name ? P.purple : P.ivoryDark}`, background: selectedFarm === f.name ? `${P.purple}08` : P.white },
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full flex-shrink-0", style: { background: statusColor[f.status] } }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", style: { color: P.dark }, children: f.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: P.mid }, children: [
                  f.district,
                  " \xB7 ",
                  f.animals,
                  " animals"
                ] })
              ] }),
              /* @__PURE__ */ jsx(Badge, { text: f.status, color: statusColor[f.status], bg: `${statusColor[f.status]}15` })
            ]
          },
          f.id
        )) })
      ] }),
      step === 1 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: [
          "Clinical Examination \u2013 ",
          selectedFarm
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
          [["Body Temperature (\xB0C)", "temperature", "38.5"], ["Number of Animals Examined", "examined", "48"], ["Symptomatic Animals", "symptomatic", "3"]].map(([l, k, ph]) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: l }),
            /* @__PURE__ */ jsx(
              "input",
              {
                placeholder: ph,
                className: "w-full px-4 py-3 rounded-xl text-sm outline-none",
                style: { background: P.ivoryDark, color: P.dark, border: "1.5px solid transparent" },
                onFocus: (e) => e.target.style.borderColor = P.purple,
                onBlur: (e) => e.target.style.borderColor = "transparent"
              }
            )
          ] }, k)),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Primary Symptom" }),
            /* @__PURE__ */ jsx("select", { className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark, border: "1.5px solid transparent" }, children: ["None observed", "Fever", "Respiratory distress", "Skin lesions", "Lameness", "Nasal discharge"].map((o) => /* @__PURE__ */ jsx("option", { children: o }, o)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Clinical Notes" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              placeholder: "Describe observations, findings, and recommendations\u2026",
              rows: 4,
              className: "w-full px-4 py-3 rounded-xl text-sm outline-none resize-none",
              style: { background: P.ivoryDark, color: P.dark, border: "1.5px solid transparent" },
              onFocus: (e) => e.target.style.borderColor = P.purple,
              onBlur: (e) => e.target.style.borderColor = "transparent"
            }
          )
        ] })
      ] }),
      step === 2 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Lab Samples Collection" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-3 mb-4", children: [["Blood Sample", "Hematology & serology"], ["Nasal Swab", "PCR viral detection"], ["Tissue Sample", "Histopathology"], ["Fecal Sample", "Parasitology"]].map(([l, d]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl", style: { background: P.ivoryDark }, children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", style: { accentColor: P.purple }, className: "w-4 h-4" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: l }),
            /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.mid }, children: d })
          ] }),
          /* @__PURE__ */ jsx(FlaskConical, { className: "w-4 h-4 ml-auto", style: { color: P.mid } })
        ] }, String(l))) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Lab Reference Number" }),
          /* @__PURE__ */ jsx("input", { placeholder: "LAB-2025-XXXX", className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark, border: "1.5px solid transparent" } })
        ] })
      ] }),
      step === 3 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Biosecurity Check" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-3", children: biosecurityChecklist.slice(0, 2).flatMap((c) => c.items).map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl cursor-pointer", style: { background: P.ivoryDark }, children: [
          /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0", style: { borderColor: item.done ? P.success : "#c8c8a0", background: item.done ? P.success : "transparent" }, children: item.done && /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-white" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.dark }, children: item.check })
        ] }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-3 p-4 rounded-xl", style: { background: "#fff7ed" }, children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", style: { accentColor: P.danger }, className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold", style: { color: P.danger }, children: "Recommend quarantine for this farm" })
        ] })
      ] }),
      step === 4 && /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4", style: { background: "#f0fdf4" }, children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8", style: { color: P.success } }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", style: { fontFamily: "Poppins", color: P.dark }, children: "Inspection Report Submitted" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm mb-6", style: { color: P.mid }, children: [
          "Report INS-",
          Date.now().toString().slice(-4),
          " submitted for ",
          selectedFarm
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-center", children: [
          /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl", style: { background: P.ivoryDark, color: P.mid }, children: [
            /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
            "Download PDF"
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => setStep(0), className: "text-sm font-semibold px-5 py-2.5 rounded-xl text-white", style: { background: P.purple }, children: "New Inspection" })
        ] })
      ] }),
      step < 4 && /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-6", children: [
        step > 0 && /* @__PURE__ */ jsx("button", { onClick: () => setStep((s) => s - 1), className: "px-6 py-2.5 rounded-xl font-medium text-sm border", style: { borderColor: P.purple, color: P.purple }, children: "Back" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setStep((s) => s + 1), className: "flex-1 py-2.5 rounded-xl font-semibold text-sm text-white", style: { background: P.purple }, children: step < steps.length - 2 ? "Continue" : "Submit Inspection Report" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Recent Inspections" }) }),
        /* @__PURE__ */ jsx("div", { className: "divide-y", style: { borderColor: P.ivoryDark }, children: inspections.filter((i) => i.status === "Completed").map((ins) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-5 py-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center", style: { background: `${sc(ins.score)}14` }, children: /* @__PURE__ */ jsx(ClipboardList, { className: "w-4 h-4", style: { color: sc(ins.score) } }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold truncate", style: { color: P.dark }, children: ins.farm }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: P.mid }, children: [
              ins.date,
              " \xB7 Score: ",
              ins.score,
              "/100"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Badge, { text: String(ins.score), color: sc(ins.score), bg: `${sc(ins.score)}15` })
        ] }, ins.id)) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Inspection Score Trend" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxs(LineChart, { data: [{ farm: "Kumari", score: 78 }, { farm: "Perera", score: 65 }, { farm: "Jayawardena", score: 45 }, { farm: "Silva", score: 92 }], children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: P.ivoryDark }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "farm", tick: { fontSize: 10, fill: P.mid }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 10, fill: P.mid }, axisLine: false, tickLine: false, domain: [0, 100] }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: { borderRadius: "12px", fontSize: 12 } }),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "score", stroke: P.purple, strokeWidth: 2, dot: { fill: P.purple, r: 4 }, name: "Score" })
        ] }) })
      ] })
    ] })
  ] });
}
function HealthRecordsPage() {
  const records = [
    { id: "HR-001", animal: "Sudu (LV-001)", farm: "Kumari Farm", condition: "Routine Check", date: "2025-07-10", vet: "Dr. Nimal W.", treatment: "None", followup: "\u2014" },
    { id: "HR-002", animal: "Batch F-07 (Finisher Pen)", farm: "Kumari Pig Farm", condition: "Suspected PRRS", date: "2025-07-09", vet: "Dr. Nimal W.", treatment: "Antivirals + Isolation", followup: "2025-07-16" },
    { id: "HR-003", animal: "Broiler House 2 (Flock B2-A)", farm: "Perera Poultry Farm", condition: "Newcastle Disease Suspected", date: "2025-07-08", vet: "Dr. Priya S.", treatment: "ND Vaccine Emergency", followup: "2025-07-15" },
    { id: "HR-004", animal: "Sow #12 (AN-001)", farm: "Kumari Pig Farm", condition: "CSF Booster Vaccination", date: "2025-06-10", vet: "Dr. Nimal W.", treatment: "Vaccine", followup: "\u2014" },
    { id: "HR-005", animal: "Flock (4500 birds)", farm: "Jayawardena Pig & Poultry", condition: "HPAI Confirmed \u2013 Depopulation", date: "2025-07-05", vet: "Dr. Suresh K.", treatment: "Quarantine + Depopulation Protocol", followup: "2025-07-12" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Total Records", value: "248", sub: "This year", icon: FileText, color: P.purple }),
      /* @__PURE__ */ jsx(KPICard, { label: "Open Cases", value: "4", sub: "Requires follow-up", icon: AlertTriangle, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "Resolved", value: "244", sub: "Closed cases", icon: CheckCircle, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "This Week", value: "12", sub: "New records", icon: Activity, color: P.info })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-48", style: { background: P.ivoryDark }, children: [
        /* @__PURE__ */ jsx(Search, { className: "w-4 h-4", style: { color: P.mid } }),
        /* @__PURE__ */ jsx("input", { placeholder: "Search records, animals, conditions\u2026", className: "bg-transparent text-sm outline-none flex-1", style: { color: P.dark } })
      ] }),
      /* @__PURE__ */ jsxs("select", { className: "px-3 py-2 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.mid }, children: [
        /* @__PURE__ */ jsx("option", { children: "All Farms" }),
        allFarms.map((f) => /* @__PURE__ */ jsx("option", { children: f.name }, f.id))
      ] }),
      /* @__PURE__ */ jsx("select", { className: "px-3 py-2 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.mid }, children: /* @__PURE__ */ jsx("option", { children: "All Conditions" }) }),
      /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl", style: { background: P.purple, color: "#fff" }, children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
        "Add Record"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { style: { background: P.ivoryDark }, children: ["Record ID", "Animal / Group", "Farm", "Condition", "Date", "Vet", "Treatment", "Follow-up", ""].map((h) => /* @__PURE__ */ jsx("th", { className: "text-left text-xs font-semibold px-4 py-3", style: { color: P.mid }, children: h }, h)) }) }),
      /* @__PURE__ */ jsx("tbody", { children: records.map((r) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-amber-50/30 cursor-pointer", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs font-mono", style: { color: P.mid }, children: r.id }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs font-semibold", style: { color: P.dark }, children: r.animal }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.mid }, children: r.farm }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.dark }, children: r.condition }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.mid }, children: r.date }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.mid }, children: r.vet }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.dark }, children: r.treatment }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: r.followup !== "\u2014" ? P.warning : P.light }, children: r.followup }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("button", { className: "p-1 rounded-lg hover:bg-gray-100", children: /* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5", style: { color: P.light } }) }) })
      ] }, r.id)) })
    ] }) }) })
  ] });
}
function DiseaseReportPage() {
  const [step, setStep] = useState(0);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Reports Filed", value: "8", sub: "This month", icon: FileText, color: P.purple }),
      /* @__PURE__ */ jsx(KPICard, { label: "Confirmed Cases", value: "3", sub: "Government notified", icon: AlertTriangle, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "Suspected Cases", value: "5", sub: "Under investigation", icon: Microscope, color: P.warning }),
      /* @__PURE__ */ jsx(KPICard, { label: "GIS Linked", value: "8/8", sub: "All reports mapped", icon: Map, color: P.success })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 p-5", children: [
        /* @__PURE__ */ jsx(SectionHeader, { title: "File Disease Report", sub: "Notifiable disease event documentation" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
          [["Farm", "select"], ["Disease Suspected", "select"], ["Number of Animals Affected", "number"], ["Date of First Observation", "date"]].map(([l, t]) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: String(l) }),
            t === "select" ? /* @__PURE__ */ jsxs("select", { className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark }, children: [
              /* @__PURE__ */ jsx("option", { children: "Select\u2026" }),
              String(l).includes("Farm") ? allFarms.map((f) => /* @__PURE__ */ jsx("option", { children: f.name }, f.id)) : diseases.map((d) => /* @__PURE__ */ jsxs("option", { children: [
                d.name,
                " (",
                d.code,
                ")"
              ] }, d.id))
            ] }) : /* @__PURE__ */ jsx(
              "input",
              {
                type: t,
                className: "w-full px-4 py-3 rounded-xl text-sm outline-none",
                style: { background: P.ivoryDark, color: P.dark, border: "1.5px solid transparent" },
                onFocus: (e) => e.target.style.borderColor = P.purple,
                onBlur: (e) => e.target.style.borderColor = "transparent"
              }
            )
          ] }, String(l))),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Severity Assessment" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: ["Low", "Medium", "High", "Critical"].map((s) => /* @__PURE__ */ jsx(
              "button",
              {
                className: "py-2.5 rounded-xl text-xs font-semibold border-2 transition-all",
                style: { borderColor: s === "High" ? P.danger : P.ivoryDark, background: s === "High" ? `${P.danger}10` : "transparent", color: s === "High" ? P.danger : P.mid },
                children: s
              },
              s
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Clinical Description" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 4,
                placeholder: "Describe symptoms, affected areas, mortality rate\u2026",
                className: "w-full px-4 py-3 rounded-xl text-sm outline-none resize-none",
                style: { background: P.ivoryDark, color: P.dark, border: "1.5px solid transparent" },
                onFocus: (e) => e.target.style.borderColor = P.purple,
                onBlur: (e) => e.target.style.borderColor = "transparent"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-4 p-3 rounded-xl", style: { background: "#fef2f2" }, children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", style: { accentColor: P.danger } }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", style: { color: P.danger }, children: "Mark as notifiable disease \u2013 automatically notify government officials" })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "w-full mt-4 py-3.5 rounded-xl font-semibold text-white text-sm", style: { background: `linear-gradient(135deg, ${P.purple}, ${P.purpleDark})` }, children: "Submit Disease Report" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Filed Reports" }) }),
          [{ disease: "ASF", farm: "Kumari Pig Farm", date: "Jul 10", status: "Confirmed" }, { disease: "HPAI", farm: "Jayawardena P&P", date: "Jul 05", status: "Confirmed" }, { disease: "Newcastle", farm: "Perera Poultry", date: "Jul 08", status: "Suspected" }].map((r, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-5 py-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center", style: { background: `${r.status === "Confirmed" ? P.danger : P.warning}14` }, children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4", style: { color: r.status === "Confirmed" ? P.danger : P.warning } }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: [
                r.disease,
                " \u2013 ",
                r.farm
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.mid }, children: r.date })
            ] }),
            /* @__PURE__ */ jsx(Badge, { text: r.status, color: r.status === "Confirmed" ? P.danger : P.warning, bg: r.status === "Confirmed" ? "#fef2f2" : "#fff7ed" })
          ] }, i))
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-3", style: { fontFamily: "Poppins", color: P.dark }, children: "GIS Linkage" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs mb-3", style: { color: P.mid }, children: "All reports are automatically plotted on the national disease surveillance map." }),
          /* @__PURE__ */ jsx(GISMap, { height: 160, showControls: false })
        ] })
      ] })
    ] })
  ] });
}
function GovDashboardPage() {
  const districtData = [{ name: "Anuradhapura", cases: 14 }, { name: "Polonnaruwa", cases: 7 }, { name: "Kurunegala", cases: 3 }, { name: "Ampara", cases: 9 }, { name: "Gampaha", cases: 1 }, { name: "Kandy", cases: 5 }];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl p-4 flex items-center gap-4", style: { background: "linear-gradient(135deg, #fef2f2, #fee2e2)", border: `1.5px solid ${P.danger}22` }, children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", style: { background: P.danger }, children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-white" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", style: { color: P.danger }, children: "ALERT: ASF Outbreak Escalation \u2014 Anuradhapura District \xB7 HPAI Confirmed \u2014 Ampara" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: "#991b1b" }, children: "14 confirmed cases across 6 farms \xB7 Containment protocol activated \xB7 45 min ago" })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "text-xs font-semibold px-4 py-2 rounded-xl flex-shrink-0", style: { background: P.danger, color: "#fff" }, children: "Respond" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [["2,847", "Active Farms", "+12", "up", Leaf], ["34", "Disease Alerts", "-8", "down", AlertTriangle], ["91.3%", "Compliance Rate", "+2.1%", "up", CheckCircle], ["1.2M", "Animals Monitored", "+45K", "up", Activity]].map(([v, l, ch, tr, Icon]) => /* @__PURE__ */ jsx(KPICard, { label: String(l), value: String(v), sub: `${ch} vs last month`, icon: Icon, color: tr === "up" ? P.success : P.danger, trend: tr }, String(l))) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Active Cases by District" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxs(BarChart, { data: districtData, barSize: 28, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: P.ivoryDark, vertical: false }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "name", tick: { fontSize: 10, fill: P.mid }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 10, fill: P.mid }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: { borderRadius: "12px", fontSize: 12 } }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "cases", fill: P.olive, radius: [6, 6, 0, 0], name: "Cases" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "National Compliance" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsx(ResponsiveContainer, { width: 140, height: 140, children: /* @__PURE__ */ jsx(PieChart, { children: /* @__PURE__ */ jsx(Pie, { data: [{ value: 91.3 }, { value: 6.2 }, { value: 2.5 }], cx: "50%", cy: "50%", innerRadius: 45, outerRadius: 65, dataKey: "value", paddingAngle: 3, children: [P.success, P.warning, P.danger].map((c, i) => /* @__PURE__ */ jsx(Cell, { fill: c }, i)) }) }) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: [[P.success, "Compliant", "91.3%"], [P.warning, "Partial", "6.2%"], [P.danger, "Non-compliant", "2.5%"]].map(([c, l, v]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-sm", style: { background: String(c) } }),
            /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.mid }, children: String(l) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold ml-auto", style: { color: P.dark }, children: String(v) })
          ] }, String(l))) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx(GISMap, { height: 280 }) }),
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Outbreak Districts" }) }),
        outbreakDistricts.map((d) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-5 py-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full", style: { background: severityColor[d.severity] } }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: d.district }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: P.mid }, children: [
              d.disease,
              " \xB7 ",
              d.farms,
              " farms"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Badge, { text: `${d.cases} cases`, color: severityColor[d.severity], bg: `${severityColor[d.severity]}15` })
        ] }, d.district))
      ] })
    ] })
  ] });
}
function FarmMonitoringPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? allFarms : allFarms.filter((f) => f.status === filter);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Total Farms", value: "2,847", sub: "Nationally registered", icon: Leaf, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Alert Status", value: "34", sub: "Active alerts", icon: AlertTriangle, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "Healthy Farms", value: "2,780", sub: "97.6%", icon: CheckCircle, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "Pending Registration", value: "23", sub: "Awaiting approval", icon: Clock, color: P.warning })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-48", style: { background: P.ivoryDark }, children: [
        /* @__PURE__ */ jsx(Search, { className: "w-4 h-4", style: { color: P.mid } }),
        /* @__PURE__ */ jsx("input", { placeholder: "Search farms by name, district, owner\u2026", className: "bg-transparent text-sm outline-none flex-1", style: { color: P.dark } })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["All", "Alert", "Warning", "Healthy"].map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(f), className: "text-xs px-3 py-1.5 rounded-lg font-medium", style: { background: filter === f ? P.olive : P.ivoryDark, color: filter === f ? "#fff" : P.mid }, children: f }, f)) })
    ] }),
    /* @__PURE__ */ jsx(GISMap, { height: 240 }),
    /* @__PURE__ */ jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { style: { background: P.ivoryDark }, children: ["Farm ID", "Farm Name", "Owner", "District", "Animals", "Biosecurity", "Compliance", "Status", "Action"].map((h) => /* @__PURE__ */ jsx("th", { className: "text-left text-xs font-semibold px-4 py-3", style: { color: P.mid }, children: h }, h)) }) }),
      /* @__PURE__ */ jsx("tbody", { children: filtered.map((f) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-amber-50/30 cursor-pointer", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs font-mono", style: { color: P.mid }, children: f.id }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs font-semibold", style: { color: P.dark }, children: f.name }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.mid }, children: f.owner }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.dark }, children: f.district }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.dark }, children: f.animals }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-1.5 w-14 rounded-full", style: { background: P.ivoryDark }, children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full", style: { width: `${f.biosecurity}%`, background: sc(f.biosecurity) } }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.mid }, children: f.biosecurity })
        ] }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-xs font-semibold", style: { color: sc(f.compliance) }, children: [
          f.compliance,
          "%"
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Badge, { text: f.status, color: statusColor[f.status], bg: `${statusColor[f.status]}15` }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("button", { className: "text-xs px-3 py-1.5 rounded-lg font-medium", style: { background: `${P.olive}14`, color: P.olive }, children: "View" }) })
      ] }, f.id)) })
    ] }) }) })
  ] });
}
function DiseaseSurveillancePage() {
  const timelineData = [
    { date: "Jul 1", asf: 8, hpai: 4, prrs: 6 },
    { date: "Jul 3", asf: 10, hpai: 5, prrs: 7 },
    { date: "Jul 5", asf: 11, hpai: 6, prrs: 9 },
    { date: "Jul 7", asf: 13, hpai: 7, prrs: 9 },
    { date: "Jul 9", asf: 14, hpai: 7, prrs: 9 },
    { date: "Jul 11", asf: 14, hpai: 9, prrs: 9 }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Active Disease Events", value: "5", sub: "ASF, HPAI, PRRS, ND, IBD", icon: Activity, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "Total Cases (30d)", value: "39", sub: "Across 5 districts", icon: AlertTriangle, color: P.warning }),
      /* @__PURE__ */ jsx(KPICard, { label: "Under Investigation", value: "12", sub: "Pending lab results", icon: Microscope, color: P.info }),
      /* @__PURE__ */ jsx(KPICard, { label: "Contained Events", value: "2", sub: "PRRS, IBD resolved", icon: CheckCircle, color: P.success })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Disease Case Timeline \u2013 July 2025" }),
      /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxs(LineChart, { data: timelineData, children: [
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: P.ivoryDark }),
        /* @__PURE__ */ jsx(XAxis, { dataKey: "date", tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsx(Tooltip, { contentStyle: { borderRadius: "12px", fontSize: 12 } }),
        /* @__PURE__ */ jsx(Legend, {}),
        /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "asf", stroke: P.danger, strokeWidth: 2, name: "ASF", dot: { r: 3 } }),
        /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "hpai", stroke: P.warning, strokeWidth: 2, name: "HPAI", dot: { r: 3 } }),
        /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "prrs", stroke: P.purple, strokeWidth: 2, name: "PRRS", dot: { r: 3 } })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Active Outbreaks" }) }),
        outbreakDistricts.map((d) => /* @__PURE__ */ jsxs("div", { className: "p-5", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold", style: { color: P.dark }, children: [
                d.disease,
                " \u2013 ",
                d.district
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs mt-0.5", style: { color: P.mid }, children: [
                d.farms,
                " farms affected \xB7 ",
                d.cases,
                " confirmed cases"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { text: d.severity.toUpperCase(), color: severityColor[d.severity], bg: `${severityColor[d.severity]}15` }),
              /* @__PURE__ */ jsx(Badge, { text: d.contained ? "Contained" : "Active", color: d.contained ? P.success : P.danger, bg: d.contained ? "#f0fdf4" : "#fef2f2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-3", children: [
            /* @__PURE__ */ jsx("button", { className: "text-xs px-3 py-1.5 rounded-lg font-medium", style: { background: `${P.danger}10`, color: P.danger }, children: "Issue Advisory" }),
            /* @__PURE__ */ jsx("button", { className: "text-xs px-3 py-1.5 rounded-lg font-medium", style: { background: P.ivoryDark, color: P.mid }, children: "View on GIS" })
          ] })
        ] }, d.district))
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsx(GISMap, { height: 240 }),
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-3", style: { fontFamily: "Poppins", color: P.dark }, children: "Case Distribution by Disease" }),
          /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 140, children: /* @__PURE__ */ jsxs(PieChart, { children: [
            /* @__PURE__ */ jsx(
              Pie,
              {
                data: [{ name: "ASF", value: 14 }, { name: "HPAI", value: 9 }, { name: "PRRS", value: 7 }, { name: "Newcastle", value: 5 }, { name: "IBD", value: 3 }],
                cx: "50%",
                cy: "50%",
                outerRadius: 60,
                dataKey: "value",
                label: ({ name, value }) => `${name}: ${value}`,
                labelLine: false,
                children: [P.danger, P.warning, P.purple, P.info, P.success].map((c, i) => /* @__PURE__ */ jsx(Cell, { fill: c }, i))
              }
            ),
            /* @__PURE__ */ jsx(Tooltip, { contentStyle: { borderRadius: "12px", fontSize: 12 } })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
function ComplianceDashboardPage() {
  const complianceData = [
    { district: "Colombo", rate: 97, farms: 248 },
    { district: "Gampaha", rate: 94, farms: 312 },
    { district: "Kurunegala", rate: 89, farms: 421 },
    { district: "Anuradhapura", rate: 81, farms: 387 },
    { district: "Ampara", rate: 72, farms: 198 },
    { district: "Polonnaruwa", rate: 76, farms: 245 }
  ];
  const nonCompliant = allFarms.filter((f) => f.compliance < 85);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "National Rate", value: "91.3%", sub: "+2.1% this month", icon: Award, color: P.success, trend: "up" }),
      /* @__PURE__ */ jsx(KPICard, { label: "Non-Compliant Farms", value: "71", sub: "Require action", icon: AlertTriangle, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "Inspections Due", value: "34", sub: "July 2025", icon: ClipboardList, color: P.warning }),
      /* @__PURE__ */ jsx(KPICard, { label: "Audit Completed", value: "128", sub: "This quarter", icon: CheckCircle, color: P.info })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Compliance Rate by District" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxs(BarChart, { data: complianceData, layout: "vertical", barSize: 16, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: P.ivoryDark, horizontal: false }),
          /* @__PURE__ */ jsx(XAxis, { type: "number", tick: { fontSize: 10, fill: P.mid }, axisLine: false, tickLine: false, domain: [0, 100], tickFormatter: (v) => `${v}%` }),
          /* @__PURE__ */ jsx(YAxis, { type: "category", dataKey: "district", tick: { fontSize: 10, fill: P.mid }, axisLine: false, tickLine: false, width: 80 }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: { borderRadius: "12px", fontSize: 12 }, formatter: (v) => [`${v}%`, "Compliance"] }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "rate", radius: [0, 6, 6, 0], name: "Compliance", children: complianceData.map((d, i) => /* @__PURE__ */ jsx(Cell, { fill: sc(d.rate) }, i)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Non-Compliant Farms" }) }),
        nonCompliant.map((f) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-5 py-3.5", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 flex-shrink-0", style: { color: P.warning } }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: f.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.mid }, children: f.district })
          ] }),
          /* @__PURE__ */ jsx(Badge, { text: `${f.compliance}%`, color: sc(f.compliance), bg: `${sc(f.compliance)}15` }),
          /* @__PURE__ */ jsx("button", { className: "text-xs px-3 py-1.5 rounded-lg font-medium", style: { background: `${P.danger}10`, color: P.danger }, children: "Flag" })
        ] }, f.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Compliance Trend \u2013 National (Jan\u2013Jun 2025)" }),
      /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 160, children: /* @__PURE__ */ jsxs(AreaChart, { data: [{ month: "Jan", rate: 87 }, { month: "Feb", rate: 88.5 }, { month: "Mar", rate: 89.1 }, { month: "Apr", rate: 90.2 }, { month: "May", rate: 91 }, { month: "Jun", rate: 91.3 }], children: [
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: P.ivoryDark }),
        /* @__PURE__ */ jsx(XAxis, { dataKey: "month", tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false, domain: [85, 95] }),
        /* @__PURE__ */ jsx(Tooltip, { contentStyle: { borderRadius: "12px", fontSize: 12 } }),
        /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "rate", stroke: P.success, fill: P.success, fillOpacity: 0.12, strokeWidth: 2, name: "Compliance %" })
      ] }) })
    ] })
  ] });
}
function GovAnalyticsPage() {
  const radarData = [
    { subject: "Biosecurity", A: 87, fullMark: 100 },
    { subject: "Vaccination", A: 81, fullMark: 100 },
    { subject: "Compliance", A: 91, fullMark: 100 },
    { subject: "Surveillance", A: 78, fullMark: 100 },
    { subject: "Response Time", A: 84, fullMark: 100 },
    { subject: "Reporting", A: 92, fullMark: 100 }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Platform Uptime", value: "99.8%", sub: "30-day SLA", icon: Server, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "Data Accuracy", value: "97.3%", sub: "AI verified", icon: Target, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Report Generation", value: "2,140", sub: "This quarter", icon: FileText, color: P.info }),
      /* @__PURE__ */ jsx(KPICard, { label: "Active Users", value: "4,211", sub: "+8% MoM", icon: Users, color: P.purple })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Platform Performance Radar" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxs(RadarChart, { data: radarData, children: [
          /* @__PURE__ */ jsx(PolarGrid, { stroke: P.ivoryDark }),
          /* @__PURE__ */ jsx(PolarAngleAxis, { dataKey: "subject", tick: { fontSize: 10, fill: P.mid } }),
          /* @__PURE__ */ jsx(Radar, { name: "Score", dataKey: "A", stroke: P.olive, fill: P.olive, fillOpacity: 0.3 })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Monthly Registration vs Alerts (2025)" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxs(BarChart, { data: [{ m: "Jan", reg: 48, alerts: 12 }, { m: "Feb", reg: 62, alerts: 8 }, { m: "Mar", reg: 55, alerts: 15 }, { m: "Apr", reg: 71, alerts: 22 }, { m: "May", reg: 84, alerts: 18 }, { m: "Jun", reg: 92, alerts: 34 }], barSize: 20, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: P.ivoryDark, vertical: false }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "m", tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: { borderRadius: "12px", fontSize: 12 } }),
          /* @__PURE__ */ jsx(Legend, {}),
          /* @__PURE__ */ jsx(Bar, { dataKey: "reg", fill: P.olive, radius: [4, 4, 0, 0], name: "New Farms" }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "alerts", fill: P.danger, radius: [4, 4, 0, 0], name: "Alerts" })
        ] }) })
      ] })
    ] })
  ] });
}
function AdvisoriesPage() {
  const [showForm, setShowForm] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Active Advisories", value: "3", sub: "In force", icon: Flag, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "Farms Notified", value: "2,847", sub: "100% reach", icon: Bell, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "Resolved (90d)", value: "12", sub: "Closed", icon: CheckCircle, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Pending Review", value: "2", sub: "Awaiting approval", icon: Clock, color: P.warning })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "All Advisories" }),
      /* @__PURE__ */ jsx("button", { onClick: () => setShowForm((s) => !s), className: "flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl", style: { background: P.olive, color: "#fff" }, children: showForm ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }),
        "Cancel"
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
        "Issue Advisory"
      ] }) })
    ] }),
    showForm && /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "Issue New Advisory" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
        [["Advisory Title", "text"], ["Target District", "text"], ["Effective Date", "date"], ["Expiry Date", "date"]].map(([l, t]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: String(l) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: t,
              className: "w-full px-4 py-3 rounded-xl text-sm outline-none",
              style: { background: P.ivoryDark, color: P.dark, border: "1.5px solid transparent" },
              onFocus: (e) => e.target.style.borderColor = P.olive,
              onBlur: (e) => e.target.style.borderColor = "transparent"
            }
          )
        ] }, String(l))),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Priority" }),
          /* @__PURE__ */ jsx("select", { className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark }, children: ["Critical", "High", "Medium", "Low"].map((p) => /* @__PURE__ */ jsx("option", { children: p }, p)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Advisory Content" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 4,
              className: "w-full px-4 py-3 rounded-xl text-sm outline-none resize-none",
              style: { background: P.ivoryDark, color: P.dark, border: "1.5px solid transparent" },
              placeholder: "Write the full advisory text\u2026",
              onFocus: (e) => e.target.style.borderColor = P.olive,
              onBlur: (e) => e.target.style.borderColor = "transparent"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "mt-4 px-6 py-3 rounded-xl font-semibold text-white text-sm", style: { background: `linear-gradient(135deg, ${P.olive}, ${P.oliveDark})` }, children: "Issue Advisory" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: advisories.map((a) => /* @__PURE__ */ jsx(Card, { className: "p-5", style: { borderLeftWidth: "4px", borderLeftColor: priorityColor[a.priority] }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", style: { background: `${priorityColor[a.priority]}14` }, children: /* @__PURE__ */ jsx(Flag, { className: "w-5 h-5", style: { color: priorityColor[a.priority] } }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", style: { color: P.dark }, children: a.title }),
          /* @__PURE__ */ jsx(Badge, { text: a.priority, color: priorityColor[a.priority], bg: `${priorityColor[a.priority]}14` }),
          /* @__PURE__ */ jsx(Badge, { text: a.status, color: a.status === "Active" ? P.success : P.mid, bg: a.status === "Active" ? "#f0fdf4" : P.ivoryDark })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs mt-1", style: { color: P.mid }, children: [
          "Issued by ",
          a.issued,
          " \xB7 ",
          a.district,
          " \xB7 ",
          a.date
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsx("button", { className: "text-xs px-3 py-1.5 rounded-lg font-medium", style: { background: P.ivoryDark, color: P.mid }, children: "View" }),
        /* @__PURE__ */ jsx("button", { className: "text-xs px-3 py-1.5 rounded-lg font-medium", style: { background: P.ivoryDark, color: P.mid }, children: /* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5" }) })
      ] })
    ] }) }, a.id)) })
  ] });
}
function AdminDashboardPage() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Total Users", value: "4,211", sub: "+28 this week", icon: Users, color: P.olive, trend: "up" }),
      /* @__PURE__ */ jsx(KPICard, { label: "Registered Farms", value: "2,847", sub: "Nationwide", icon: Leaf, color: P.info }),
      /* @__PURE__ */ jsx(KPICard, { label: "System Uptime", value: "99.8%", sub: "30-day average", icon: Server, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "Open Alerts", value: "34", sub: "Requires review", icon: AlertTriangle, color: P.danger })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [["Farmers", "3,142", Users], ["Veterinarians", "284", Stethoscope], ["Gov't Officers", "96", Building2], ["Admins", "12", Settings]].map(([l, v, Icon]) => /* @__PURE__ */ jsx(Card, { className: "p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5", style: { color: P.olive } }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xl font-bold", style: { fontFamily: "Poppins", color: P.dark }, children: String(v) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.mid }, children: String(l) })
      ] })
    ] }) }, String(l))) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "User Growth (2025)" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxs(AreaChart, { data: [{ m: "Jan", users: 3800 }, { m: "Feb", users: 3920 }, { m: "Mar", users: 4010 }, { m: "Apr", users: 4080 }, { m: "May", users: 4160 }, { m: "Jun", users: 4211 }], children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: P.ivoryDark }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "m", tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: { borderRadius: "12px", fontSize: 12 } }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "users", stroke: P.olive, fill: P.olive, fillOpacity: 0.12, strokeWidth: 2, name: "Users" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Recent System Activity" }) }),
        [["New user registered: Priya Perera (Poultry Farmer)", "10:30 AM"], ["Disease report filed: ASF \u2013 Anuradhapura (Pig Farm)", "09:45 AM"], ["Advisory issued: HPAI Movement Restriction \u2013 Ampara", "09:00 AM"], ["Inspection report submitted: Kumari Pig Farm", "Yesterday"], ["System backup completed successfully", "Yesterday"], ["AI model updated: BioAI v2.2 \u2013 Pig & Poultry deployed", "2 days ago"]].map(([msg, t], i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-5 py-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full flex-shrink-0", style: { background: i === 0 ? P.success : i < 3 ? P.warning : P.mid } }),
          /* @__PURE__ */ jsx("p", { className: "text-xs flex-1", style: { color: P.dark }, children: String(msg) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs flex-shrink-0", style: { color: P.light }, children: String(t) })
        ] }, i))
      ] })
    ] })
  ] });
}
function UserManagementPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? allUsers : allUsers.filter((u) => u.role === filter.toLowerCase() || u.status === filter);
  const roleColor = { farmer: P.olive, veterinarian: P.purple, government: P.info, admin: P.dark };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Total Users", value: "4,211", sub: "All roles", icon: Users, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Active", value: "4,182", sub: "99.3%", icon: UserCheck, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "Inactive / Suspended", value: "29", sub: "0.7%", icon: UserX, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "New This Month", value: "28", sub: "+0.7% growth", icon: UserPlus, color: P.info })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-48", style: { background: P.ivoryDark }, children: [
        /* @__PURE__ */ jsx(Search, { className: "w-4 h-4", style: { color: P.mid } }),
        /* @__PURE__ */ jsx("input", { placeholder: "Search by name, email, ID\u2026", className: "bg-transparent text-sm outline-none flex-1", style: { color: P.dark } })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap", children: ["All", "Farmer", "Veterinarian", "Government", "Admin", "Active", "Inactive"].map((f) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(f), className: "text-xs px-3 py-1.5 rounded-lg font-medium", style: { background: filter === f ? P.olive : P.ivoryDark, color: filter === f ? "#fff" : P.mid }, children: f }, f)) }),
      /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl", style: { background: P.olive, color: "#fff" }, children: [
        /* @__PURE__ */ jsx(UserPlus, { className: "w-3.5 h-3.5" }),
        "Add User"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { style: { background: P.ivoryDark }, children: ["User ID", "Name", "Role", "Email", "Farm/Org", "District", "Status", "Joined", "Actions"].map((h) => /* @__PURE__ */ jsx("th", { className: "text-left text-xs font-semibold px-4 py-3", style: { color: P.mid }, children: h }, h)) }) }),
      /* @__PURE__ */ jsx("tbody", { children: filtered.map((u) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-amber-50/30 cursor-pointer", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs font-mono", style: { color: P.mid }, children: u.id }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold", style: { background: `${roleColor[u.role]}18`, color: roleColor[u.role] }, children: u.name.split(" ").map((n) => n[0]).join("").slice(0, 2) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold", style: { color: P.dark }, children: u.name })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Badge, { text: u.role.charAt(0).toUpperCase() + u.role.slice(1), color: roleColor[u.role], bg: `${roleColor[u.role]}14` }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.mid }, children: u.email }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.dark }, children: u.farm }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.mid }, children: u.district }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(Badge, { text: u.status, color: u.status === "Active" ? P.success : P.light, bg: u.status === "Active" ? "#f0fdf4" : P.ivoryDark }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-xs", style: { color: P.mid }, children: u.joined }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsx("button", { className: "p-1.5 rounded-lg hover:bg-gray-100", children: /* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5", style: { color: P.mid } }) }),
          /* @__PURE__ */ jsx("button", { className: "p-1.5 rounded-lg hover:bg-gray-100", children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5", style: { color: P.danger } }) })
        ] }) })
      ] }, u.id)) })
    ] }) }) })
  ] });
}
function DiseaseDatabasePage() {
  const [selected, setSelected] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Disease Records", value: "24", sub: "In database", icon: Database, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Notifiable", value: "18", sub: "Require reporting", icon: Flag, color: P.danger }),
      /* @__PURE__ */ jsx(KPICard, { label: "Vaccine Available", value: "16", sub: "67% coverage", icon: Syringe, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "Recently Updated", value: "3", sub: "This month", icon: RefreshCw, color: P.info })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Disease Library" }),
          /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg", style: { background: `${P.olive}14`, color: P.olive }, children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" }),
            "Add"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divide-y", style: { borderColor: P.ivoryDark }, children: diseases.map((d) => /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => setSelected(d),
            className: "flex items-center gap-3 px-5 py-3.5 cursor-pointer hover:bg-amber-50/20 transition-colors",
            style: { background: selected?.id === d.id ? `${P.olive}08` : "transparent" },
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center", style: { background: `${d.severity === "High" ? P.danger : P.warning}14` }, children: /* @__PURE__ */ jsx(Microscope, { className: "w-4 h-4", style: { color: d.severity === "High" ? P.danger : P.warning } }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: d.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: P.mid }, children: [
                  d.code,
                  " \xB7 ",
                  d.type
                ] })
              ] }),
              /* @__PURE__ */ jsx(Badge, { text: d.severity, color: d.severity === "High" ? P.danger : P.warning, bg: d.severity === "High" ? "#fef2f2" : "#fff7ed" })
            ]
          },
          d.id
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: selected ? /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl", style: { fontFamily: "Poppins", color: P.dark }, children: selected.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm mt-1", style: { color: P.mid }, children: [
              "Code: ",
              selected.code,
              " \xB7 ",
              selected.type
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Badge, { text: selected.severity, color: selected.severity === "High" ? P.danger : P.warning, bg: selected.severity === "High" ? "#fef2f2" : "#fff7ed" }),
            selected.notifiable && /* @__PURE__ */ jsx(Badge, { text: "Notifiable", color: P.danger, bg: "#fef2f2" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [["Disease Code", selected.code], ["Type", selected.type], ["Host Species", selected.host], ["Severity", selected.severity], ["Notifiable", selected.notifiable ? "Yes" : "No"], ["Vaccine", selected.vaccine]].map(([k, v]) => /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl", style: { background: P.ivoryDark }, children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.mid }, children: String(k) }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold mt-0.5", style: { color: P.dark }, children: String(v) })
        ] }, String(k))) }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl mb-4", style: { background: `${P.danger}08`, border: `1px solid ${P.danger}20` }, children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold mb-1", style: { color: P.danger }, children: "Clinical Signs" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.dark }, children: "Fever, blistering lesions on mouth and feet, salivation, lameness, and reduced milk production. Spreads rapidly through direct contact and contaminated materials." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg", style: { background: P.ivoryDark, color: P.mid }, children: [
            /* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5" }),
            "Edit"
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg", style: { background: P.ivoryDark, color: P.mid }, children: [
            /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5" }),
            "Export"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxs(Card, { className: "p-10 flex flex-col items-center justify-center text-center h-64", children: [
        /* @__PURE__ */ jsx(Database, { className: "w-12 h-12 mb-3", style: { color: P.ivoryDark } }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", style: { color: P.mid }, children: "Select a disease to view details" })
      ] }) })
    ] })
  ] });
}
function NotificationManagementPage() {
  const templates = [
    { id: "TMP-001", name: "Disease Outbreak Alert", type: "Alert", channels: ["App", "SMS", "Email"], lastUsed: "Jul 10" },
    { id: "TMP-002", name: "Vaccination Reminder", type: "Reminder", channels: ["App", "SMS"], lastUsed: "Jul 5" },
    { id: "TMP-003", name: "Inspection Schedule", type: "Info", channels: ["App", "Email"], lastUsed: "Jul 3" },
    { id: "TMP-004", name: "Advisory Notification", type: "Advisory", channels: ["App", "SMS", "Email"], lastUsed: "Jul 1" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "Sent Today", value: "1,248", sub: "Across all channels", icon: Bell, color: P.olive }),
      /* @__PURE__ */ jsx(KPICard, { label: "Delivery Rate", value: "99.1%", sub: "Last 30 days", icon: CheckCircle, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "Templates", value: "4", sub: "Active templates", icon: FileText, color: P.info }),
      /* @__PURE__ */ jsx(KPICard, { label: "Failed", value: "11", sub: "Today", icon: AlertCircle, color: P.danger })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsx(SectionHeader, { title: "Send Notification", sub: "Broadcast to selected user groups" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Select Template" }),
            /* @__PURE__ */ jsx("select", { className: "w-full px-4 py-3 rounded-xl text-sm outline-none", style: { background: P.ivoryDark, color: P.dark }, children: templates.map((t) => /* @__PURE__ */ jsx("option", { children: t.name }, t.id)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Target Audience" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: ["All Farmers", "All Veterinarians", "Government Officers", "Specific District", "All Users"].map((a) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-xs cursor-pointer p-2 rounded-lg", style: { background: P.ivoryDark }, children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", style: { accentColor: P.olive } }),
              /* @__PURE__ */ jsx("span", { style: { color: P.dark }, children: a })
            ] }, a)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Channels" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [["App Push", true], ["SMS", true], ["Email", false]].map(([ch, on]) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 text-xs cursor-pointer px-3 py-2 rounded-lg", style: { background: on ? `${P.olive}14` : P.ivoryDark }, children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", defaultChecked: Boolean(on), style: { accentColor: P.olive } }),
              /* @__PURE__ */ jsx("span", { style: { color: P.dark }, children: String(ch) })
            ] }, String(ch))) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold mb-1.5 block", style: { color: P.mid }, children: "Message" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 3,
                className: "w-full px-4 py-3 rounded-xl text-sm outline-none resize-none",
                style: { background: P.ivoryDark, color: P.dark, border: "1.5px solid transparent" },
                placeholder: "Write notification message\u2026",
                onFocus: (e) => e.target.style.borderColor = P.olive,
                onBlur: (e) => e.target.style.borderColor = "transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2", style: { background: `linear-gradient(135deg, ${P.olive}, ${P.oliveDark})` }, children: [
            /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
            "Send Notification"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "p-5 pb-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", style: { fontFamily: "Poppins", color: P.dark }, children: "Templates" }) }),
          templates.map((t) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-5 py-3.5", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center", style: { background: `${P.olive}14` }, children: /* @__PURE__ */ jsx(Bell, { className: "w-4 h-4", style: { color: P.olive } }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold", style: { color: P.dark }, children: t.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: P.mid }, children: [
                t.channels.join(", "),
                " \xB7 Last used: ",
                t.lastUsed
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { className: "p-1.5 rounded-lg hover:bg-gray-100", children: /* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5", style: { color: P.mid } }) })
          ] }, t.id))
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-3", style: { fontFamily: "Poppins", color: P.dark }, children: "Delivery Stats (Today)" }),
          /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 140, children: /* @__PURE__ */ jsxs(BarChart, { data: [{ ch: "App", sent: 920 }, { ch: "SMS", sent: 248 }, { ch: "Email", sent: 80 }], barSize: 40, children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: P.ivoryDark, vertical: false }),
            /* @__PURE__ */ jsx(XAxis, { dataKey: "ch", tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
            /* @__PURE__ */ jsx(YAxis, { tick: { fontSize: 11, fill: P.mid }, axisLine: false, tickLine: false }),
            /* @__PURE__ */ jsx(Tooltip, { contentStyle: { borderRadius: "12px", fontSize: 12 } }),
            /* @__PURE__ */ jsx(Bar, { dataKey: "sent", fill: P.olive, radius: [6, 6, 0, 0], name: "Sent" })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
function SystemSettingsPage() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [gisLive, setGisLive] = useState(true);
  const [autoAlerts, setAutoAlerts] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(KPICard, { label: "AI Model", value: "BioAI v2.1", sub: "Active", icon: Cpu, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "GIS Layers", value: "8 Active", sub: "All regions", icon: Layers, color: P.info }),
      /* @__PURE__ */ jsx(KPICard, { label: "API Health", value: "Healthy", sub: "All endpoints", icon: Wifi, color: P.success }),
      /* @__PURE__ */ jsx(KPICard, { label: "DB Storage", value: "2.4 TB", sub: "68% used", icon: Database, color: P.warning })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "AI & System Toggles" }),
        [
          ["AI Disease Prediction", "BioAI v2.1 model active", aiEnabled, setAiEnabled],
          ["GIS Live Updates", "Real-time satellite sync", gisLive, setGisLive],
          ["Auto Alerts", "Automatic outbreak notifications", autoAlerts, setAutoAlerts],
          ["Maintenance Mode", "Restrict platform access", maintenance, setMaintenance]
        ].map(([l, d, on, set]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3.5", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", style: { color: P.dark }, children: String(l) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.mid }, children: String(d) })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-all",
              onClick: () => set(!Boolean(on)),
              style: { background: Boolean(on) ? String(l) === "Maintenance Mode" ? P.danger : P.olive : "#c8c8a0", padding: "2px" },
              children: /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-white transition-all", style: { transform: Boolean(on) ? "translateX(20px)" : "translateX(0)" } })
            }
          )
        ] }, String(l)))
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "AI Model Configuration" }),
        [["Model Version", "BioAI v2.2 (Pig & Poultry)"], ["Training Data", "India 2019\u20132025"], ["Prediction Accuracy", "94.3%"], ["Update Frequency", "Weekly"], ["Disease Models", "ASF, CSF, PRRS, PED, HPAI, ND, IBD, Marek's, IB, PCV2"]].map(([k, v]) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-3", style: { borderBottom: `1px solid ${P.ivoryDark}` }, children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.mid }, children: String(k) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold", style: { color: P.dark }, children: String(v) })
        ] }, String(k))),
        /* @__PURE__ */ jsx("button", { className: "mt-4 w-full py-3 rounded-xl font-semibold text-white text-sm", style: { background: `linear-gradient(135deg, ${P.olive}, ${P.oliveDark})` }, children: "Trigger Model Update" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm mb-4", style: { fontFamily: "Poppins", color: P.dark }, children: "GIS Layer Management" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: [["Disease Heatmap", true], ["Farm Boundaries", true], ["District Zones", true], ["Water Sources", false], ["Road Network", true], ["Weather Overlay", false], ["Elevation Map", false], ["Vegetation Index", true]].map(([l, on]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl", style: { background: P.ivoryDark }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Layers, { className: "w-3.5 h-3.5", style: { color: P.mid } }),
          /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: P.dark }, children: String(l) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-8 h-4.5 rounded-full flex items-center cursor-pointer", style: { background: Boolean(on) ? P.olive : "#c8c8a0", padding: "2px" }, children: /* @__PURE__ */ jsx("div", { className: "w-3.5 h-3.5 rounded-full bg-white", style: { transform: Boolean(on) ? "translateX(14px)" : "translateX(0)", transition: "transform 0.2s" } }) })
      ] }, String(l))) })
    ] })
  ] });
}
const navConfig = {
  farmer: {
    color: "#1a2010",
    accent: P.olive,
    title: "BioSecure Farm",
    items: [{ key: "Dashboard", labelKey: "dashboard", label: "Dashboard", icon: Home }, { key: "Farm Management", labelKey: "farmManagement", label: "Farm Management", icon: Leaf }, { key: "Animals", labelKey: "animals", label: "Animals", icon: Activity }, { key: "Biosecurity", labelKey: "biosecurity", label: "Biosecurity", icon: Shield }, { key: "GIS Map", labelKey: "gisMap", label: "GIS Map", icon: Map }, { key: "Disease Alerts", labelKey: "diseaseAlerts", label: "Disease Alerts", icon: AlertTriangle }, { key: "Vaccination", labelKey: "vaccination", label: "Vaccination", icon: Syringe }, { key: "AI Assistant", labelKey: "aiAssistant", label: "AI Assistant", icon: Zap }, { key: "Reports", labelKey: "reports", label: "Reports", icon: FileText }, { key: "Notifications", labelKey: "notifications", label: "Notifications", icon: Bell }, { key: "Profile", labelKey: "profile", label: "Profile", icon: User }]
  },
  veterinarian: {
    color: "#1e0838",
    accent: P.purple,
    title: "Vet Portal",
    items: [{ key: "Dashboard", labelKey: "dashboard", label: "Dashboard", icon: Home }, { key: "Assigned Farms", labelKey: "assignedFarms", label: "Assigned Farms", icon: Leaf }, { key: "Inspection", labelKey: "inspection", label: "Inspection", icon: ClipboardList }, { key: "Health Records", labelKey: "healthRecords", label: "Health Records", icon: FileText }, { key: "Vaccination", labelKey: "vaccination", label: "Vaccination", icon: Syringe }, { key: "Disease Report", labelKey: "diseaseReport", label: "Disease Report", icon: AlertTriangle }, { key: "AI Recommendation", labelKey: "aiRecommendation", label: "AI Recommendation", icon: Zap }, { key: "Reports", labelKey: "reports", label: "Reports", icon: BarChart2 }, { key: "Profile", labelKey: "profile", label: "Profile", icon: User }]
  },
  government: {
    color: "#0d1a2d",
    accent: P.info,
    title: "Gov't Portal",
    items: [{ key: "Dashboard", labelKey: "dashboard", label: "Dashboard", icon: Home }, { key: "Farm Monitoring", labelKey: "farmMonitoring", label: "Farm Monitoring", icon: Eye }, { key: "Disease Surveillance", labelKey: "diseaseSurveillance", label: "Disease Surveillance", icon: Activity }, { key: "GIS Dashboard", labelKey: "gisDashboard", label: "GIS Dashboard", icon: Map }, { key: "Compliance", labelKey: "compliance", label: "Compliance", icon: CheckCircle }, { key: "Analytics", labelKey: "analytics", label: "Analytics", icon: BarChart2 }, { key: "Reports", labelKey: "reports", label: "Reports", icon: FileText }, { key: "Advisories", labelKey: "advisories", label: "Advisories", icon: Flag }, { key: "Profile", labelKey: "profile", label: "Profile", icon: User }]
  },
  admin: {
    color: "#1a2010",
    accent: P.olive,
    title: "Admin Panel",
    items: [{ key: "Dashboard", labelKey: "dashboard", label: "Dashboard", icon: Home }, { key: "User Management", labelKey: "userManagement", label: "User Management", icon: Users }, { key: "Farm Management", labelKey: "farmManagement", label: "Farm Management", icon: Leaf }, { key: "Disease Database", labelKey: "diseaseDatabase", label: "Disease Database", icon: Database }, { key: "Notifications", labelKey: "notifications", label: "Notifications", icon: Bell }, { key: "Analytics", labelKey: "analytics", label: "Analytics", icon: BarChart2 }, { key: "System Settings", labelKey: "systemSettings", label: "System Settings", icon: Settings }, { key: "Profile", labelKey: "profile", label: "Profile", icon: User }]
  }
};
function renderPage(role, module, user, data = {}, language = "en") {
  if (role === "farmer") {
    switch (module) {
      case "Dashboard":
        return /* @__PURE__ */ jsx(FarmerDashboardPage, { user, farms: data.farms, livestock: data.livestock, vaccinations: data.vaccinations, alerts: data.alerts, biosecurity: data.biosecurity });
      case "Farm Management":
        return /* @__PURE__ */ jsx(FarmManagementPage, {});
      case "Animals":
        return /* @__PURE__ */ jsx(LivestockManagementPage, {});
      case "Biosecurity":
        return /* @__PURE__ */ jsx(BiosecurityAssessmentPage, {});
      case "GIS Map":
        return /* @__PURE__ */ jsx(GISModulePage, {});
      case "Disease Alerts":
        return /* @__PURE__ */ jsx(DiseaseAlertsPage, {});
      case "Vaccination":
        return /* @__PURE__ */ jsx(VaccinationPage, {});
      case "AI Assistant":
        return /* @__PURE__ */ jsx(AIAssistantPage, {});
      case "Reports":
        return /* @__PURE__ */ jsx(ReportsPage, {});
      case "Notifications":
        return /* @__PURE__ */ jsx(NotificationsPage, {});
      case "Profile":
        return /* @__PURE__ */ jsx(LiveProfilePage, { role, user, language });
    }
  }
  if (role === "veterinarian") {
    switch (module) {
      case "Dashboard":
        return /* @__PURE__ */ jsx(VetDashboardPage, {});
      case "Assigned Farms":
        return /* @__PURE__ */ jsx(AssignedFarmsPage, {});
      case "Inspection":
        return /* @__PURE__ */ jsx(InspectionPage, {});
      case "Health Records":
        return /* @__PURE__ */ jsx(HealthRecordsPage, {});
      case "Vaccination":
        return /* @__PURE__ */ jsx(VaccinationPage, {});
      case "Disease Report":
        return /* @__PURE__ */ jsx(DiseaseReportPage, {});
      case "AI Recommendation":
        return /* @__PURE__ */ jsx(AIAssistantPage, {});
      case "Reports":
        return /* @__PURE__ */ jsx(ReportsPage, {});
      case "Profile":
        return /* @__PURE__ */ jsx(LiveProfilePage, { role, user, language });
    }
  }
  if (role === "government") {
    switch (module) {
      case "Dashboard":
        return /* @__PURE__ */ jsx(GovDashboardPage, {});
      case "Farm Monitoring":
        return /* @__PURE__ */ jsx(FarmMonitoringPage, {});
      case "Disease Surveillance":
        return /* @__PURE__ */ jsx(DiseaseSurveillancePage, {});
      case "GIS Dashboard":
        return /* @__PURE__ */ jsx(GISModulePage, {});
      case "Compliance":
        return /* @__PURE__ */ jsx(ComplianceDashboardPage, {});
      case "Analytics":
        return /* @__PURE__ */ jsx(GovAnalyticsPage, {});
      case "Reports":
        return /* @__PURE__ */ jsx(ReportsPage, {});
      case "Advisories":
        return /* @__PURE__ */ jsx(AdvisoriesPage, {});
      case "Profile":
        return /* @__PURE__ */ jsx(LiveProfilePage, { role, user, language });
    }
  }
  if (role === "admin") {
    switch (module) {
      case "Dashboard":
        return /* @__PURE__ */ jsx(AdminDashboardPage, {});
      case "User Management":
        return /* @__PURE__ */ jsx(UserManagementPage, {});
      case "Farm Management":
        return /* @__PURE__ */ jsx(FarmMonitoringPage, {});
      case "Disease Database":
        return /* @__PURE__ */ jsx(DiseaseDatabasePage, {});
      case "Notifications":
        return /* @__PURE__ */ jsx(NotificationManagementPage, {});
      case "Analytics":
        return /* @__PURE__ */ jsx(GovAnalyticsPage, {});
      case "System Settings":
        return /* @__PURE__ */ jsx(SystemSettingsPage, {});
      case "Profile":
        return /* @__PURE__ */ jsx(LiveProfilePage, { role, user, language });
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "p-6 text-sm", style: { color: P.mid }, children: "Page coming soon\u2026" });
}
function DashboardShell({ role, onLogout, user, data = {}, language = "en" }) {
  const [activeModule, setActiveModule] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const cfg = navConfig[role];
  const profileName = user?.name || user?.fullName || "User";
  const profileInitials = profileName.split(/\s+/).filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const roleLabel = user?.role || role;
  const moduleKeyMap = {
    Dashboard: "dashboard",
    "Farm Management": "farmManagement",
    Animals: "animals",
    Biosecurity: "biosecurity",
    "GIS Map": "gisMap",
    "Disease Alerts": "diseaseAlerts",
    Vaccination: "vaccination",
    "AI Assistant": "aiAssistant",
    Reports: "reports",
    Notifications: "notifications",
    Profile: "profile",
    "Assigned Farms": "assignedFarms",
    Inspection: "inspection",
    "Health Records": "healthRecords",
    "Disease Report": "diseaseReport",
    "AI Recommendation": "aiRecommendation",
    "Farm Monitoring": "farmMonitoring",
    "Disease Surveillance": "diseaseSurveillance",
    "GIS Dashboard": "gisDashboard",
    Compliance: "compliance",
    Analytics: "analytics",
    Advisories: "advisories",
    "User Management": "userManagement",
    "Disease Database": "diseaseDatabase",
    "System Settings": "systemSettings"
  };
  const activeModuleLabel = t(language, moduleKeyMap[activeModule] || activeModule, activeModule);
  const navItems = cfg.items.map((item) => ({ ...item, label: t(language, item.labelKey || moduleKeyMap[item.label] || item.label, item.label) }));
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen overflow-hidden", style: { background: P.ivory, fontFamily: "Inter" }, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex flex-col transition-all duration-300 flex-shrink-0 ${sidebarOpen ? "w-56" : "w-14"}`, style: { background: cfg.color }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 mb-2", children: [
        /* @__PURE__ */ jsx("img", { src: "/picsvg_download.png", alt: "BioSecure Farm", className: "w-8 h-8 rounded-xl flex-shrink-0" }),
        sidebarOpen && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-white text-sm font-bold leading-none", style: { fontFamily: "Poppins" }, children: "BioSecure" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.45)" }, children: cfg.title })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setSidebarOpen((o) => !o), className: "ml-auto flex-shrink-0", style: { color: "rgba(255,255,255,0.4)" }, children: /* @__PURE__ */ jsx(Menu, { className: "w-4 h-4" }) })
      ] }),
      sidebarOpen && role === "farmer" && /* @__PURE__ */ jsxs("div", { className: "mx-3 mb-3 p-3 rounded-xl", style: { background: `${cfg.accent}22` }, children: [
        /* @__PURE__ */ jsx("p", { className: "text-white text-xs font-semibold truncate", children: user?.extra?.["Farm Name"] || "My Farm" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: "rgba(255,255,255,0.5)" }, children: `${user?.extra?.["Total Animals (approx.)"] || 0} animals \xB7 ${user?.extra?.District || "Location not set"}` })
      ] }),
      sidebarOpen && role === "government" && /* @__PURE__ */ jsxs("div", { className: "mx-3 mb-3 p-3 rounded-xl", style: { background: `${cfg.accent}22` }, children: [
        /* @__PURE__ */ jsx("p", { className: "text-white text-xs font-semibold truncate", children: user?.extra?.["Department / Ministry"] || "Government Office" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs mt-0.5", style: { color: "rgba(255,255,255,0.5)" }, children: user?.extra?.["District / Division"] || "Command Center" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "flex-1 px-2 overflow-y-auto", children: navItems.map((item) => {
        const Icon = item.icon;
        const active = activeModule === item.key;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveModule(item.key),
            className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-left transition-all",
            title: !sidebarOpen ? item.label : void 0,
            style: { background: active ? `${cfg.accent}35` : "transparent", color: active ? cfg.accent : "rgba(255,255,255,0.55)" },
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 flex-shrink-0" }),
              sidebarOpen && /* @__PURE__ */ jsx("span", { className: "text-sm truncate", children: item.label }),
              sidebarOpen && active && /* @__PURE__ */ jsx(ChevronRight, { className: "w-3 h-3 ml-auto opacity-60" })
            ]
          },
          item.key
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "p-3 m-2 rounded-xl", style: { background: "rgba(255,255,255,0.06)" }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0", style: { background: cfg.accent, color: "#fff" }, children: profileInitials }),
        sidebarOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-white text-xs font-medium truncate", children: profileName }),
            /* @__PURE__ */ jsx("p", { className: "text-xs truncate", style: { color: "rgba(255,255,255,0.45)" }, children: roleLabel })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: onLogout, style: { color: "rgba(255,255,255,0.4)" }, children: /* @__PURE__ */ jsx(LogOut, { className: "w-3.5 h-3.5" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "sticky top-0 z-10 flex items-center gap-4 px-6 py-3",
          style: { background: "rgba(255,255,227,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(128,128,52,0.1)" },
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold", style: { fontFamily: "Poppins", color: P.dark }, children: activeModuleLabel }),
              /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: P.mid }, children: "Saturday, 12 July 2025" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1" }),
            /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl", style: { background: P.ivoryDark }, children: [
              /* @__PURE__ */ jsx(Search, { className: "w-4 h-4", style: { color: P.mid } }),
              /* @__PURE__ */ jsx("input", { placeholder: "Search\u2026", className: "bg-transparent text-sm outline-none w-32", style: { color: P.dark } })
            ] }),
            /* @__PURE__ */ jsxs("button", { className: "relative p-2.5 rounded-xl", style: { background: P.ivoryDark }, children: [
              /* @__PURE__ */ jsx(Bell, { className: "w-4 h-4", style: { color: P.olive } }),
              /* @__PURE__ */ jsx("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 rounded-full", style: { background: P.danger } })
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: onLogout, className: "hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl", style: { background: P.ivoryDark, color: P.mid }, children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-3.5 h-3.5" }),
              "Logout"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        renderPage(role, activeModule, user, data)
      ] })
    ] })
  ] });
}
function App({
  onMongoLogin,
  mongoRole, mongoUser, mongoFarms, mongoLivestock, mongoVaccinations,
  mongoDiseases, mongoBiosecurity, mongoVetReports, mongoAlerts,
  mongoGIS, mongoNotifications, mongoAnalytics, mongoAllUsers,
  onLogout: mongoLogout,
} = {}) {
  const [screen, setScreen] = useState("splash");
  const [role, setRole] = useState("farmer");
  const [registrationNotice, setRegistrationNotice] = useState("");
  const [language, setLanguage] = useState(() => window.localStorage.getItem("biosecure-language") || "en");
  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("biosecure-language", nextLanguage);
    window.dispatchEvent(new CustomEvent("biosecure-language-change", { detail: nextLanguage }));
  };

  // If MongoDB data is already loaded (passed from AppWithData), go straight to dashboard
  if (mongoRole && mongoUser) {
    return /* @__PURE__ */ jsx(DashboardShell, {
      role: mongoRole.toLowerCase().replace(" officer", "").replace("veterinarian", "veterinarian"),
      onLogout: mongoLogout || (() => {}),
      user: mongoUser,
      language,
      data: { farms: mongoFarms, livestock: mongoLivestock, vaccinations: mongoVaccinations, alerts: mongoAlerts, biosecurity: mongoBiosecurity },
      mongoFarms, mongoLivestock, mongoVaccinations, mongoDiseases,
      mongoBiosecurity, mongoVetReports, mongoAlerts, mongoGIS,
      mongoNotifications, mongoAnalytics, mongoAllUsers, mongoUser,
    });
  }

  if (screen === "splash") return /* @__PURE__ */ jsx(SplashScreen, { onDone: () => setScreen("onboarding") });
  if (screen === "onboarding") return /* @__PURE__ */ jsx(OnboardingScreen, { onDone: () => setScreen("login"), language, onLanguageChange: changeLanguage });
  if (screen === "login") return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(LoginScreen, { language, onLanguageChange: changeLanguage, onLogin: (r, user) => {
    setRole(r);
    if (onMongoLogin) {
      onMongoLogin(r, user);
    } else {
      setScreen("dashboard");
    }
  }, onRegister: () => setScreen("register") }), registrationNotice && /* @__PURE__ */ jsx("div", { className: "fixed top-5 right-5 z-50 px-5 py-4 rounded-xl text-sm font-semibold text-white shadow-lg", style: { background: P.success }, children: registrationNotice })] });
  if (screen === "register") return /* @__PURE__ */ jsx(RegisterScreen, { language, onLanguageChange: changeLanguage, onBack: () => setScreen("login"), onSuccess: () => {
    setRegistrationNotice("Account created successfully");
    setScreen("login");
    window.setTimeout(() => setRegistrationNotice(""), 5000);
  } });
  return /* @__PURE__ */ jsx(DashboardShell, { role, user: null, onLogout: () => setScreen("login"), language });
}
export {
  App as default,
  renderPage
};
