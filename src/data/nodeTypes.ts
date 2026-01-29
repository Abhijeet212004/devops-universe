import { NodeType } from '@/types/workflow';

export const nodeTypes: NodeType[] = [
  // Cloud - AWS
  {
    id: 'aws-ec2',
    name: 'AWS EC2',
    category: 'cloud',
    icon: 'Server',
    description: 'Launch, stop, or manage EC2 instances',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Run Instances', value: 'run' },
        { label: 'Stop Instances', value: 'stop' },
        { label: 'Start Instances', value: 'start' },
        { label: 'Terminate Instances', value: 'terminate' },
      ], required: true },
      { id: 'instanceType', label: 'Instance Type', type: 'select', options: [
        { label: 't3.micro', value: 't3.micro' },
        { label: 't3.small', value: 't3.small' },
        { label: 't3.medium', value: 't3.medium' },
        { label: 'm5.large', value: 'm5.large' },
      ]},
      { id: 'region', label: 'Region', type: 'select', options: [
        { label: 'US East (N. Virginia)', value: 'us-east-1' },
        { label: 'US West (Oregon)', value: 'us-west-2' },
        { label: 'EU (Ireland)', value: 'eu-west-1' },
      ]},
    ]
  },
  {
    id: 'aws-s3',
    name: 'AWS S3',
    category: 'cloud',
    icon: 'Database',
    description: 'Manage S3 buckets and objects',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Create Bucket', value: 'create' },
        { label: 'Upload Object', value: 'put' },
        { label: 'Download Object', value: 'get' },
        { label: 'Delete Object', value: 'delete' },
      ], required: true },
      { id: 'bucket', label: 'Bucket Name', type: 'text', placeholder: 'my-bucket' },
      { id: 'key', label: 'Object Key', type: 'text', placeholder: 'path/to/file.txt' },
    ]
  },
  {
    id: 'aws-lambda',
    name: 'AWS Lambda',
    category: 'cloud',
    icon: 'Zap',
    description: 'Deploy and invoke Lambda functions',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Create Function', value: 'create' },
        { label: 'Update Code', value: 'update' },
        { label: 'Invoke', value: 'invoke' },
      ], required: true },
      { id: 'functionName', label: 'Function Name', type: 'text', placeholder: 'my-function' },
      { id: 'runtime', label: 'Runtime', type: 'select', options: [
        { label: 'Node.js 20.x', value: 'nodejs20.x' },
        { label: 'Python 3.12', value: 'python3.12' },
        { label: 'Go 1.x', value: 'go1.x' },
      ]},
    ]
  },
  {
    id: 'aws-rds',
    name: 'AWS RDS',
    category: 'cloud',
    icon: 'Database',
    description: 'Manage RDS database instances',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Create Instance', value: 'create' },
        { label: 'Modify Instance', value: 'modify' },
        { label: 'Create Snapshot', value: 'snapshot' },
        { label: 'Delete Instance', value: 'delete' },
      ], required: true },
      { id: 'engine', label: 'Engine', type: 'select', options: [
        { label: 'PostgreSQL', value: 'postgres' },
        { label: 'MySQL', value: 'mysql' },
        { label: 'MariaDB', value: 'mariadb' },
      ]},
    ]
  },
  
  // CI/CD
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'cicd',
    icon: 'GitBranch',
    description: 'Trigger and manage GitHub workflows',
    inputs: 1,
    outputs: 2,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Trigger Workflow', value: 'dispatch' },
        { label: 'Get Run Status', value: 'status' },
        { label: 'Download Logs', value: 'logs' },
      ], required: true },
      { id: 'repo', label: 'Repository', type: 'text', placeholder: 'owner/repo' },
      { id: 'workflow', label: 'Workflow File', type: 'text', placeholder: 'ci.yml' },
    ]
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    category: 'cicd',
    icon: 'Hammer',
    description: 'Trigger Jenkins jobs and pipelines',
    inputs: 1,
    outputs: 2,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Build Job', value: 'build' },
        { label: 'Get Status', value: 'status' },
        { label: 'Stop Build', value: 'stop' },
      ], required: true },
      { id: 'jobName', label: 'Job Name', type: 'text', placeholder: 'my-pipeline' },
      { id: 'params', label: 'Parameters (JSON)', type: 'textarea', placeholder: '{"key": "value"}' },
    ]
  },
  {
    id: 'gitlab-ci',
    name: 'GitLab CI',
    category: 'cicd',
    icon: 'GitMerge',
    description: 'Manage GitLab pipelines',
    inputs: 1,
    outputs: 2,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Create Pipeline', value: 'create' },
        { label: 'Cancel Pipeline', value: 'cancel' },
        { label: 'Retry Job', value: 'retry' },
      ], required: true },
      { id: 'project', label: 'Project ID', type: 'text' },
      { id: 'ref', label: 'Branch/Tag', type: 'text', defaultValue: 'main' },
    ]
  },
  {
    id: 'argocd',
    name: 'ArgoCD',
    category: 'cicd',
    icon: 'RefreshCw',
    description: 'Sync and manage ArgoCD applications',
    inputs: 1,
    outputs: 2,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Sync Application', value: 'sync' },
        { label: 'Rollback', value: 'rollback' },
        { label: 'Get Status', value: 'status' },
      ], required: true },
      { id: 'appName', label: 'Application Name', type: 'text' },
    ]
  },
  
  // Container
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'container',
    icon: 'Box',
    description: 'Deploy and manage Kubernetes resources',
    inputs: 1,
    outputs: 2,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Apply', value: 'apply' },
        { label: 'Delete', value: 'delete' },
        { label: 'Scale', value: 'scale' },
        { label: 'Rollout Restart', value: 'restart' },
      ], required: true },
      { id: 'namespace', label: 'Namespace', type: 'text', defaultValue: 'default' },
      { id: 'resource', label: 'Resource Type', type: 'select', options: [
        { label: 'Deployment', value: 'deployment' },
        { label: 'Service', value: 'service' },
        { label: 'ConfigMap', value: 'configmap' },
        { label: 'Secret', value: 'secret' },
      ]},
    ]
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'container',
    icon: 'Container',
    description: 'Build, push, and manage Docker images',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Build Image', value: 'build' },
        { label: 'Push Image', value: 'push' },
        { label: 'Pull Image', value: 'pull' },
      ], required: true },
      { id: 'image', label: 'Image Name', type: 'text', placeholder: 'myapp:latest' },
      { id: 'dockerfile', label: 'Dockerfile Path', type: 'text', defaultValue: './Dockerfile' },
    ]
  },
  {
    id: 'helm',
    name: 'Helm',
    category: 'container',
    icon: 'Anchor',
    description: 'Install and manage Helm charts',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Install', value: 'install' },
        { label: 'Upgrade', value: 'upgrade' },
        { label: 'Uninstall', value: 'uninstall' },
        { label: 'Rollback', value: 'rollback' },
      ], required: true },
      { id: 'release', label: 'Release Name', type: 'text' },
      { id: 'chart', label: 'Chart', type: 'text', placeholder: 'bitnami/nginx' },
    ]
  },
  
  // Monitoring
  {
    id: 'prometheus',
    name: 'Prometheus',
    category: 'monitoring',
    icon: 'Activity',
    description: 'Query metrics and manage alerts',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Query', value: 'query' },
        { label: 'Query Range', value: 'query_range' },
        { label: 'Get Alerts', value: 'alerts' },
      ], required: true },
      { id: 'query', label: 'PromQL Query', type: 'textarea', placeholder: 'up{job="myapp"}' },
    ]
  },
  {
    id: 'grafana',
    name: 'Grafana',
    category: 'monitoring',
    icon: 'BarChart2',
    description: 'Manage dashboards and annotations',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Create Annotation', value: 'annotate' },
        { label: 'Create Dashboard', value: 'dashboard' },
      ], required: true },
      { id: 'tags', label: 'Tags', type: 'text', placeholder: 'deployment, production' },
    ]
  },
  {
    id: 'pagerduty',
    name: 'PagerDuty',
    category: 'monitoring',
    icon: 'Bell',
    description: 'Create incidents and manage on-call',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Create Incident', value: 'create' },
        { label: 'Acknowledge', value: 'ack' },
        { label: 'Resolve', value: 'resolve' },
      ], required: true },
      { id: 'severity', label: 'Severity', type: 'select', options: [
        { label: 'Critical', value: 'critical' },
        { label: 'Error', value: 'error' },
        { label: 'Warning', value: 'warning' },
        { label: 'Info', value: 'info' },
      ]},
    ]
  },
  
  // Security
  {
    id: 'vault',
    name: 'HashiCorp Vault',
    category: 'security',
    icon: 'Lock',
    description: 'Manage secrets and encryption',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Read Secret', value: 'read' },
        { label: 'Write Secret', value: 'write' },
        { label: 'Delete Secret', value: 'delete' },
      ], required: true },
      { id: 'path', label: 'Secret Path', type: 'text', placeholder: 'secret/myapp/config' },
    ]
  },
  {
    id: 'snyk',
    name: 'Snyk',
    category: 'security',
    icon: 'Shield',
    description: 'Scan for vulnerabilities',
    inputs: 1,
    outputs: 2,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Test', value: 'test' },
        { label: 'Monitor', value: 'monitor' },
      ], required: true },
      { id: 'severity', label: 'Min Severity', type: 'select', options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Critical', value: 'critical' },
      ]},
    ]
  },
  
  // Database
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    icon: 'Database',
    description: 'Execute queries and manage databases',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Execute Query', value: 'query' },
        { label: 'Backup', value: 'dump' },
        { label: 'Restore', value: 'restore' },
      ], required: true },
      { id: 'query', label: 'SQL Query', type: 'textarea' },
    ]
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'database',
    icon: 'Layers',
    description: 'Manage Redis cache',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Get', value: 'get' },
        { label: 'Set', value: 'set' },
        { label: 'Delete', value: 'delete' },
        { label: 'Flush', value: 'flush' },
      ], required: true },
      { id: 'key', label: 'Key', type: 'text' },
    ]
  },
  
  // Messaging
  {
    id: 'slack',
    name: 'Slack',
    category: 'messaging',
    icon: 'MessageSquare',
    description: 'Send messages and notifications',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'channel', label: 'Channel', type: 'text', placeholder: '#deployments' },
      { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Deployment completed!' },
    ]
  },
  {
    id: 'kafka',
    name: 'Kafka',
    category: 'messaging',
    icon: 'Radio',
    description: 'Produce and consume messages',
    inputs: 1,
    outputs: 1,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Produce', value: 'produce' },
        { label: 'Create Topic', value: 'create' },
        { label: 'Delete Topic', value: 'delete' },
      ], required: true },
      { id: 'topic', label: 'Topic', type: 'text' },
    ]
  },
  
  // Config
  {
    id: 'terraform',
    name: 'Terraform',
    category: 'config',
    icon: 'Layers',
    description: 'Plan and apply infrastructure changes',
    inputs: 1,
    outputs: 2,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Init', value: 'init' },
        { label: 'Plan', value: 'plan' },
        { label: 'Apply', value: 'apply' },
        { label: 'Destroy', value: 'destroy' },
      ], required: true },
      { id: 'workspace', label: 'Workspace', type: 'text', defaultValue: 'default' },
      { id: 'autoApprove', label: 'Auto Approve', type: 'boolean', defaultValue: false },
    ]
  },
  {
    id: 'ansible',
    name: 'Ansible',
    category: 'config',
    icon: 'Terminal',
    description: 'Run playbooks and ad-hoc commands',
    inputs: 1,
    outputs: 2,
    config: [
      { id: 'action', label: 'Action', type: 'select', options: [
        { label: 'Run Playbook', value: 'playbook' },
        { label: 'Ad-Hoc Command', value: 'adhoc' },
      ], required: true },
      { id: 'playbook', label: 'Playbook Path', type: 'text', placeholder: 'playbooks/deploy.yml' },
      { id: 'inventory', label: 'Inventory', type: 'text', defaultValue: 'inventory.ini' },
    ]
  },
  
  // Trigger nodes
  {
    id: 'manual-trigger',
    name: 'Manual Trigger',
    category: 'config',
    icon: 'Play',
    description: 'Start workflow manually',
    inputs: 0,
    outputs: 1,
    config: []
  },
  {
    id: 'schedule-trigger',
    name: 'Schedule',
    category: 'config',
    icon: 'Clock',
    description: 'Run workflow on a schedule',
    inputs: 0,
    outputs: 1,
    config: [
      { id: 'cron', label: 'Cron Expression', type: 'text', placeholder: '0 * * * *' },
      { id: 'timezone', label: 'Timezone', type: 'select', options: [
        { label: 'UTC', value: 'UTC' },
        { label: 'US/Eastern', value: 'America/New_York' },
        { label: 'US/Pacific', value: 'America/Los_Angeles' },
        { label: 'Europe/London', value: 'Europe/London' },
      ]},
    ]
  },
  {
    id: 'webhook-trigger',
    name: 'Webhook',
    category: 'config',
    icon: 'Webhook',
    description: 'Trigger workflow via HTTP',
    inputs: 0,
    outputs: 1,
    config: [
      { id: 'method', label: 'HTTP Method', type: 'select', options: [
        { label: 'POST', value: 'POST' },
        { label: 'GET', value: 'GET' },
      ]},
      { id: 'auth', label: 'Authentication', type: 'select', options: [
        { label: 'None', value: 'none' },
        { label: 'API Key', value: 'apikey' },
        { label: 'Basic Auth', value: 'basic' },
      ]},
    ]
  },
];

export const nodeCategories = [
  { id: 'cloud', name: 'Cloud', icon: 'Cloud' },
  { id: 'cicd', name: 'CI/CD', icon: 'GitBranch' },
  { id: 'container', name: 'Containers', icon: 'Box' },
  { id: 'monitoring', name: 'Monitoring', icon: 'Activity' },
  { id: 'security', name: 'Security', icon: 'Shield' },
  { id: 'database', name: 'Database', icon: 'Database' },
  { id: 'messaging', name: 'Messaging', icon: 'MessageSquare' },
  { id: 'config', name: 'Config & IaC', icon: 'Settings' },
] as const;
