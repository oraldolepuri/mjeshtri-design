import { ArrowLeft, Shield, Database, Zap, Gift, LifeBuoy, Map, Code, FileText, Settings, AlertTriangle, PieChart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface AllAdminFeaturesProps {
  onBack: () => void;
  feature: string;
}

export default function AllAdminFeatures({ onBack, feature }: AllAdminFeaturesProps) {
  const featureConfig: Record<string, { title: string; description: string; icon: any; color: string }> = {
    'ab-testing': {
      title: 'A/B Testing Management',
      description: 'Create and manage A/B tests for platform features',
      icon: PieChart,
      color: 'purple'
    },
    'payment-gateway': {
      title: 'Payment Gateway Configuration',
      description: 'Configure payment processors and transaction settings',
      icon: Settings,
      color: 'green'
    },
    'rewards-program': {
      title: 'Rewards & Loyalty Program',
      description: 'Manage customer and laborer reward programs',
      icon: Gift,
      color: 'yellow'
    },
    'content-moderation': {
      title: 'Content Moderation Queue',
      description: 'Review and moderate user-generated content',
      icon: Shield,
      color: 'red'
    },
    'role-management': {
      title: 'Role-Based Access Control',
      description: 'Manage user roles and permissions',
      icon: Shield,
      color: 'blue'
    },
    'revenue-forecast': {
      title: 'Revenue Forecasting',
      description: 'Predictive revenue analytics and forecasting',
      icon: PieChart,
      color: 'emerald'
    },
    'geographic-map': {
      title: 'Geographic Distribution',
      description: 'View user distribution across Albania',
      icon: Map,
      color: 'cyan'
    },
    'api-management': {
      title: 'API Management & Monitoring',
      description: 'Monitor API usage, keys, and performance',
      icon: Code,
      color: 'indigo'
    },
    'audit-log': {
      title: 'Audit Log Viewer',
      description: 'View complete system activity audit trail',
      icon: FileText,
      color: 'slate'
    },
    'alert-rules': {
      title: 'Automated Alert Configuration',
      description: 'Configure automated alerts and notifications',
      icon: AlertTriangle,
      color: 'orange'
    },
    'report-builder': {
      title: 'Custom Report Builder',
      description: 'Build custom reports with drag-and-drop',
      icon: PieChart,
      color: 'violet'
    },
    'support-tickets': {
      title: 'Support Ticket System',
      description: 'Manage customer support tickets',
      icon: LifeBuoy,
      color: 'blue'
    },
    'database-backup': {
      title: 'Database Backup Management',
      description: 'Schedule and manage database backups',
      icon: Database,
      color: 'slate'
    },
  };

  const config = featureConfig[feature];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <p className="text-sm text-slate-600">{config.description}</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <Card className="p-12 text-center">
          <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-${config.color}-500 to-${config.color}-600 rounded-2xl flex items-center justify-center shadow-xl`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-slate-900 mb-3">{config.title}</h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">{config.description}</p>
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 max-w-3xl mx-auto">
            <h3 className="text-blue-900 mb-4">Feature Coming Soon</h3>
            <p className="text-blue-700 text-sm mb-4">
              This advanced feature is currently under development. It will include:
            </p>
            <ul className="text-left text-sm text-blue-800 space-y-2 max-w-xl mx-auto">
              {feature === 'ab-testing' && (
                <>
                  <li>• Create and manage multiple A/B tests</li>
                  <li>• Real-time performance tracking</li>
                  <li>• Statistical significance analysis</li>
                  <li>• Automatic winner selection</li>
                </>
              )}
              {feature === 'payment-gateway' && (
                <>
                  <li>• Multiple payment processor support</li>
                  <li>• Transaction fee configuration</li>
                  <li>• Automatic reconciliation</li>
                  <li>• Fraud detection settings</li>
                </>
              )}
              {feature === 'rewards-program' && (
                <>
                  <li>• Points and tier management</li>
                  <li>• Reward redemption tracking</li>
                  <li>• Gamification elements</li>
                  <li>• Performance-based bonuses</li>
                </>
              )}
              {feature === 'content-moderation' && (
                <>
                  <li>• Automated content filtering</li>
                  <li>• Manual review queue</li>
                  <li>• User reporting system</li>
                  <li>• Content guidelines enforcement</li>
                </>
              )}
              {feature === 'role-management' && (
                <>
                  <li>• Custom role creation</li>
                  <li>• Granular permission control</li>
                  <li>• Role assignment management</li>
                  <li>• Access audit trails</li>
                </>
              )}
              {feature === 'revenue-forecast' && (
                <>
                  <li>• ML-powered revenue predictions</li>
                  <li>• Seasonal trend analysis</li>
                  <li>• Growth scenario modeling</li>
                  <li>• Interactive forecast charts</li>
                </>
              )}
              {feature === 'geographic-map' && (
                <>
                  <li>• Interactive map of Albania</li>
                  <li>• User density heat maps</li>
                  <li>• City-level analytics</li>
                  <li>• Geographic targeting tools</li>
                </>
              )}
              {feature === 'api-management' && (
                <>
                  <li>• API key generation and management</li>
                  <li>• Rate limiting configuration</li>
                  <li>• Usage analytics and monitoring</li>
                  <li>• Developer documentation</li>
                </>
              )}
              {feature === 'audit-log' && (
                <>
                  <li>• Complete activity logging</li>
                  <li>• Advanced search and filtering</li>
                  <li>• User action tracking</li>
                  <li>• Compliance reporting</li>
                </>
              )}
              {feature === 'alert-rules' && (
                <>
                  <li>• Custom alert rule creation</li>
                  <li>• Multi-channel notifications</li>
                  <li>• Threshold-based triggers</li>
                  <li>• Alert escalation workflows</li>
                </>
              )}
              {feature === 'report-builder' && (
                <>
                  <li>• Drag-and-drop report designer</li>
                  <li>• Custom data source selection</li>
                  <li>• Scheduled report generation</li>
                  <li>• Export in multiple formats</li>
                </>
              )}
              {feature === 'support-tickets' && (
                <>
                  <li>• Ticket creation and assignment</li>
                  <li>• Priority and status management</li>
                  <li>• SLA tracking</li>
                  <li>• Customer satisfaction surveys</li>
                </>
              )}
              {feature === 'database-backup' && (
                <>
                  <li>• Automated backup scheduling</li>
                  <li>• Point-in-time recovery</li>
                  <li>• Backup verification</li>
                  <li>• Cloud storage integration</li>
                </>
              )}
            </ul>
          </div>
          <div className="mt-8">
            <Button onClick={onBack} variant="outline" className="rounded-xl">
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
