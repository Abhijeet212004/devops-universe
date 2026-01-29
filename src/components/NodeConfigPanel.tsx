import { WorkflowNode } from '@/types/workflow';
import { DynamicIcon } from './DynamicIcon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { X, Trash2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NodeConfigPanelProps {
  node: WorkflowNode;
  onClose: () => void;
  onConfigChange: (config: Record<string, unknown>) => void;
  onDelete: () => void;
}

export function NodeConfigPanel({ 
  node, 
  onClose, 
  onConfigChange, 
  onDelete 
}: NodeConfigPanelProps) {
  const { type, config } = node;

  const handleFieldChange = (fieldId: string, value: unknown) => {
    onConfigChange({ [fieldId]: value });
  };

  const getCategoryBadgeClass = () => {
    const colorMap: Record<string, string> = {
      cloud: 'node-badge-cloud',
      cicd: 'node-badge-cicd',
      container: 'node-badge-container',
      monitoring: 'node-badge-monitoring',
      security: 'node-badge-security',
      database: 'node-badge-database',
      messaging: 'node-badge-messaging',
      config: 'node-badge-config',
    };
    return colorMap[type.category] || 'node-badge-config';
  };

  return (
    <div className="w-80 h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              getCategoryBadgeClass()
            )}>
              <DynamicIcon name={type.icon} size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{type.name}</h3>
              <p className="text-xs text-muted-foreground capitalize">{type.category}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{type.description}</p>
      </div>

      {/* Config Fields */}
      <ScrollArea className="flex-1 custom-scrollbar">
        <div className="p-4 space-y-4">
          {type.config && type.config.length > 0 ? (
            type.config.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                
                {field.type === 'text' && (
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    value={(config[field.id] as string) ?? (typeof field.defaultValue === 'string' ? field.defaultValue : '')}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  />
                )}
                
                {field.type === 'secret' && (
                  <Input
                    id={field.id}
                    type="password"
                    placeholder={field.placeholder}
                    value={(config[field.id] as string) || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  />
                )}
                
                {field.type === 'number' && (
                  <Input
                    id={field.id}
                    type="number"
                    placeholder={field.placeholder}
                    value={(config[field.id] as number) ?? (typeof field.defaultValue === 'number' ? field.defaultValue : '')}
                    onChange={(e) => handleFieldChange(field.id, Number(e.target.value))}
                  />
                )}
                
                {field.type === 'textarea' && (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    value={(config[field.id] as string) || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    rows={3}
                  />
                )}
                
                {field.type === 'boolean' && (
                  <div className="flex items-center gap-2">
                    <Switch
                      id={field.id}
                      checked={config[field.id] === true ? true : (config[field.id] === false ? false : field.defaultValue === true)}
                      onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
                    />
                    <Label htmlFor={field.id} className="text-sm text-muted-foreground">
                      {config[field.id] === true ? 'Enabled' : 'Disabled'}
                    </Label>
                  </div>
                )}
                
                {field.type === 'select' && field.options && (
                  <Select
                    value={(config[field.id] as string) || field.defaultValue?.toString() || ''}
                    onValueChange={(value) => handleFieldChange(field.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground text-center py-8">
              No configuration options for this node.
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Separator className="mb-4" />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            className="flex-1"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
