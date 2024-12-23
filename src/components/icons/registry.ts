// Icon loader with dynamic imports
export const iconRegistry = {
    // Auth & User
    Mail: () => import('lucide-react/dist/esm/icons/mail'),
    Lock: () => import('lucide-react/dist/esm/icons/lock'),
    User: () => import('lucide-react/dist/esm/icons/user'),
    LogIn: () => import('lucide-react/dist/esm/icons/log-in'),
    LogOut: () => import('lucide-react/dist/esm/icons/log-out'),
    
    // Navigation & Actions
    ArrowLeft: () => import('lucide-react/dist/esm/icons/arrow-left'),
    ArrowRight: () => import('lucide-react/dist/esm/icons/arrow-right'),
    ChevronLeft: () => import('lucide-react/dist/esm/icons/chevron-left'),
    ChevronRight: () => import('lucide-react/dist/esm/icons/chevron-right'),
    Send: () => import('lucide-react/dist/esm/icons/send'),
    Search: () => import('lucide-react/dist/esm/icons/search'),
    
    // Interface Elements
    Check: () => import('lucide-react/dist/esm/icons/check'),
    Edit2: () => import('lucide-react/dist/esm/icons/edit-2'),
    Save: () => import('lucide-react/dist/esm/icons/save'),
    Globe: () => import('lucide-react/dist/esm/icons/globe'),
    Download: () => import('lucide-react/dist/esm/icons/download'),
    
    // Status & Alerts
    AlertCircle: () => import('lucide-react/dist/esm/icons/alert-circle'),
    AlertTriangle: () => import('lucide-react/dist/esm/icons/alert-triangle'),
    CheckCircle: () => import('lucide-react/dist/esm/icons/check-circle'),
    
    // Features & Categories
    Briefcase: () => import('lucide-react/dist/esm/icons/briefcase'),
    Phone: () => import('lucide-react/dist/esm/icons/phone'),
    Star: () => import('lucide-react/dist/esm/icons/star'),
    Users: () => import('lucide-react/dist/esm/icons/users'),
    Trophy: () => import('lucide-react/dist/esm/icons/trophy'),
    Target: () => import('lucide-react/dist/esm/icons/target'),
    MessageSquare: () => import('lucide-react/dist/esm/icons/message-square'),
    BookOpen: () => import('lucide-react/dist/esm/icons/book-open'),
    Award: () => import('lucide-react/dist/esm/icons/award'),
    TrendingUp: () => import('lucide-react/dist/esm/icons/trending-up'),
    Video: () => import('lucide-react/dist/esm/icons/video'),
    Book: () => import('lucide-react/dist/esm/icons/book'),


    FileText: () => import('lucide-react/dist/esm/icons/file-text'),
    CreditCard: () => import('lucide-react/dist/esm/icons/credit-card'),
  } as const;
  
  export type IconName = keyof typeof iconRegistry;
  
  // Cache for loaded icons
  const iconCache = new Map<IconName, Promise<any>>();
  
  export const loadIcon = (name: IconName) => {
    if (!iconCache.has(name)) {
      iconCache.set(
        name,
        iconRegistry[name]().then(mod => mod.default)
      );
    }
    return iconCache.get(name)!;
  };