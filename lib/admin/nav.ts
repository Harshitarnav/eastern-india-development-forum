import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Globe,
  FolderKanban,
  Map,
  Landmark,
  FileText,
  Coins,
  Handshake,
  Users,
  Calendar,
  Newspaper,
  Images,
  Download,
  FormInput,
  Quote,
  Crown,
  UserCog,
  Shield,
  BarChart3,
  Search,
  Settings,
} from "lucide-react";

export interface AdminNavChild {
  label: string;
  href: string;
  underDevelopment?: boolean;
}

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  underDevelopment?: boolean;
  children?: AdminNavChild[];
}

export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    label: "Website CMS",
    href: "/admin/cms",
    icon: Globe,
    children: [
      { label: "General Settings", href: "/admin/cms?tab=general" },
      { label: "Hero Section", href: "/admin/cms?tab=hero" },
      { label: "Impact Stats", href: "/admin/cms?tab=stats" },
      { label: "Tenders", href: "/admin/cms?tab=tenders" },
    ],
  },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban, underDevelopment: true },
  { label: "States", href: "/admin/states", icon: Map, underDevelopment: true },
  { label: "Government Schemes", href: "/admin/schemes", icon: Landmark, underDevelopment: true },
  { label: "Tender Management", href: "/admin/tenders", icon: FileText, underDevelopment: true },
  {
    label: "Investment Opportunities",
    href: "/admin/investments",
    icon: Coins,
    underDevelopment: true,
  },
  { label: "Partners", href: "/admin/partners", icon: Handshake, underDevelopment: true },
  { label: "Members", href: "/admin/members", icon: Users, underDevelopment: true },
  { label: "Events", href: "/admin/events", icon: Calendar, underDevelopment: true },
  { label: "News", href: "/admin/news", icon: Newspaper, underDevelopment: true },
  { label: "Gallery", href: "/admin/gallery", icon: Images, underDevelopment: true },
  { label: "Downloads", href: "/admin/downloads", icon: Download, underDevelopment: true },
  { label: "Forms", href: "/admin/forms", icon: FormInput, underDevelopment: true },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote, underDevelopment: true },
  { label: "Leadership", href: "/admin/leadership", icon: Crown, underDevelopment: true },
  { label: "Users", href: "/admin/users", icon: UserCog, underDevelopment: true },
  { label: "Roles & Permissions", href: "/admin/roles", icon: Shield, underDevelopment: true },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, underDevelopment: true },
  { label: "SEO", href: "/admin/seo", icon: Search, underDevelopment: true },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    children: [
      { label: "Appearance", href: "/admin/settings#appearance" },
      { label: "Profile", href: "/admin/settings#profile" },
      { label: "Security", href: "/admin/settings#security" },
    ],
  },
];

export function isNavItemActive(pathname: string, href: string) {
  const base = href.split("?")[0].split("#")[0];
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function isNavChildActive(pathname: string, href: string, search: string) {
  const [path, query] = href.split("?");
  if (pathname !== path && !pathname.startsWith(`${path}/`)) return false;
  if (!query) return pathname === path || pathname.startsWith(`${path}/`);
  const params = new URLSearchParams(query);
  const current = new URLSearchParams(search);
  for (const [key, value] of params.entries()) {
    if (current.get(key) !== value) return false;
  }
  return true;
}
