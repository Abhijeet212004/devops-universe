import { 
  Cloud, 
  GitBranch, 
  Box, 
  Activity, 
  Shield, 
  Database, 
  MessageSquare, 
  Settings,
  Server,
  Zap,
  Hammer,
  GitMerge,
  RefreshCw,
  Lock,
  Layers,
  Bell,
  BarChart2,
  Terminal,
  Play,
  Clock,
  Webhook,
  Radio,
  Anchor,
  Container,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  GitBranch,
  Box,
  Activity,
  Shield,
  Database,
  MessageSquare,
  Settings,
  Server,
  Zap,
  Hammer,
  GitMerge,
  RefreshCw,
  Lock,
  Layers,
  Bell,
  BarChart2,
  Terminal,
  Play,
  Clock,
  Webhook,
  Radio,
  Anchor,
  Container,
};

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function DynamicIcon({ name, className, size = 16 }: DynamicIconProps) {
  const IconComponent = iconMap[name] || Box;
  return <IconComponent className={className} size={size} />;
}

export { iconMap };
