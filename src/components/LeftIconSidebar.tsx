import { 
  Plus, 
  Search, 
  Home, 
  Users, 
  FolderOpen, 
  Workflow, 
  Bell, 
  GitBranch,
  HelpCircle,
  Settings,
  LogOut,
  Bot
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface LeftIconSidebarProps {
  onAddNode: () => void;
  onSearch: () => void;
}

const mainNavItems = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: Users, label: 'Team', id: 'team' },
  { icon: FolderOpen, label: 'Projects', id: 'projects' },
  { icon: Workflow, label: 'Workflows', id: 'workflows', active: true },
  { icon: Bell, label: 'Notifications', id: 'notifications' },
  { icon: GitBranch, label: 'Deployments', id: 'deployments' },
];

const bottomNavItems = [
  { icon: Bot, label: 'AI Assistant', id: 'ai' },
  { icon: HelpCircle, label: 'Help', id: 'help' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export function LeftIconSidebar({ onAddNode, onSearch }: LeftIconSidebarProps) {
  return (
    <div className="w-12 h-full bg-sidebar-bg border-r border-sidebar-border flex flex-col items-center py-2">
      {/* Add button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onAddNode}
            className="w-8 h-8 rounded-md bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors mb-2"
          >
            <Plus className="w-5 h-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Add Node</TooltipContent>
      </Tooltip>

      {/* Search */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onSearch}
            className="w-8 h-8 rounded-md hover:bg-sidebar-accent flex items-center justify-center text-sidebar-fg/60 hover:text-sidebar-fg transition-colors mb-4"
          >
            <Search className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Search</TooltipContent>
      </Tooltip>

      <div className="w-6 h-px bg-sidebar-border mb-4" />

      {/* Main nav */}
      <div className="flex flex-col gap-1">
        {mainNavItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
                  item.active
                    ? "bg-sidebar-accent text-sidebar-fg"
                    : "text-sidebar-fg/60 hover:text-sidebar-fg hover:bg-sidebar-accent"
                )}
              >
                <item.icon className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="flex-1" />

      {/* Bottom nav */}
      <div className="flex flex-col gap-1">
        {bottomNavItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <button
                className="w-8 h-8 rounded-md flex items-center justify-center text-sidebar-fg/60 hover:text-sidebar-fg hover:bg-sidebar-accent transition-colors"
              >
                <item.icon className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
