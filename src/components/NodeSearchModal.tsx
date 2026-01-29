import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { nodeTypes, nodeCategories } from '@/data/nodeTypes';
import { NodeType, NodeCategory } from '@/types/workflow';
import { DynamicIcon } from './DynamicIcon';
import { cn } from '@/lib/utils';

interface NodeSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (type: NodeType) => void;
}

export function NodeSearchModal({ isOpen, onClose, onSelectNode }: NodeSearchModalProps) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredNodes = nodeTypes.filter(node =>
    node.name.toLowerCase().includes(search.toLowerCase()) ||
    node.description.toLowerCase().includes(search.toLowerCase()) ||
    node.category.toLowerCase().includes(search.toLowerCase())
  );

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
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-lg bg-card rounded-xl shadow-2xl border border-border z-50 overflow-hidden">
        {/* Search input */}
        <div className="relative border-b border-border">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            autoFocus
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-14 pl-12 pr-12 text-lg border-0 focus-visible:ring-0 bg-transparent"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-accent"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Results */}
        <ScrollArea className="max-h-80">
          <div className="p-2">
            {filteredNodes.length === 0 ? (
              <div className="px-4 py-8 text-center text-muted-foreground">
                No nodes found for "{search}"
              </div>
            ) : (
              <div className="space-y-1">
                {filteredNodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => {
                      onSelectNode(node);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-left"
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      getCategoryColorClass(node.category)
                    )}>
                      <DynamicIcon name={node.icon} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{node.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {node.description}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground capitalize px-2 py-1 bg-muted rounded">
                      {node.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span><kbd className="px-1.5 py-0.5 bg-muted rounded">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-muted rounded">Enter</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 bg-muted rounded">Esc</kbd> Close</span>
          </div>
          <span>{filteredNodes.length} nodes</span>
        </div>
      </div>
    </>
  );
}
