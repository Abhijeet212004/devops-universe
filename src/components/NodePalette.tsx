import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Plus, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { nodeTypes, nodeCategories } from '@/data/nodeTypes';
import { NodeType, NodeCategory } from '@/types/workflow';
import { DynamicIcon } from './DynamicIcon';
import { cn } from '@/lib/utils';

interface NodePaletteProps {
  onDragStart: (type: NodeType) => void;
}

export function NodePalette({ onDragStart }: NodePaletteProps) {
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(nodeCategories.map(c => c.id))
  );

  const filteredNodes = nodeTypes.filter(node =>
    node.name.toLowerCase().includes(search.toLowerCase()) ||
    node.description.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const getNodesByCategory = (category: NodeCategory) =>
    filteredNodes.filter(node => node.category === category);

  const getCategoryColorClass = (category: NodeCategory) => {
    const colorMap: Record<NodeCategory, string> = {
      cloud: 'node-badge-cloud',
      cicd: 'node-badge-cicd',
      container: 'node-badge-container',
      monitoring: 'node-badge-monitoring',
      security: 'node-badge-security',
      database: 'node-badge-database',
      messaging: 'node-badge-messaging',
      config: 'node-badge-config',
    };
    return colorMap[category];
  };

  return (
    <div className="flex flex-col h-full bg-sidebar-bg">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-fg">Ops-Flow</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-sidebar-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-sidebar-muted border-sidebar-border text-sidebar-fg placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Node Categories */}
      <ScrollArea className="flex-1 custom-scrollbar">
        <div className="p-2">
          {nodeCategories.map(category => {
            const categoryNodes = getNodesByCategory(category.id as NodeCategory);
            if (categoryNodes.length === 0) return null;
            
            const isExpanded = expandedCategories.has(category.id);

            return (
              <div key={category.id} className="mb-1">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-sidebar-accent transition-colors text-sidebar-fg"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <DynamicIcon name={category.icon} className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {categoryNodes.length}
                  </span>
                </button>

                {isExpanded && (
                  <div className="mt-1 ml-4 space-y-1">
                    {categoryNodes.map(node => (
                      <div
                        key={node.id}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('nodeType', JSON.stringify(node));
                          onDragStart(node);
                        }}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md cursor-grab",
                          "bg-sidebar-muted/50 hover:bg-sidebar-accent",
                          "border border-transparent hover:border-sidebar-border",
                          "transition-all duration-150 group"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded flex items-center justify-center",
                          getCategoryColorClass(node.category)
                        )}>
                          <DynamicIcon name={node.icon} size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-sidebar-fg truncate">
                            {node.name}
                          </p>
                        </div>
                        <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">
          Drag nodes to canvas
        </p>
      </div>
    </div>
  );
}
