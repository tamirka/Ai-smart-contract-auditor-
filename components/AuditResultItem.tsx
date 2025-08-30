
import React from 'react';
import { AuditFinding, SeverityLevel } from '../types';
import { ChevronDownIcon, CodeIcon } from './Icon';

interface AuditResultItemProps {
  finding: AuditFinding;
}

const severityStyles: Record<SeverityLevel, { bg: string; text: string; border: string }> = {
  [SeverityLevel.Critical]: { bg: 'bg-severity-critical/20', text: 'text-severity-critical', border: 'border-severity-critical/50' },
  [SeverityLevel.High]: { bg: 'bg-severity-high/20', text: 'text-severity-high', border: 'border-severity-high/50' },
  [SeverityLevel.Medium]: { bg: 'bg-severity-medium/20', text: 'text-severity-medium', border: 'border-severity-medium/50' },
  [SeverityLevel.Low]: { bg: 'bg-severity-low/20', text: 'text-severity-low', border: 'border-severity-low/50' },
  [SeverityLevel.Informational]: { bg: 'bg-severity-info/20', text: 'text-severity-info', border: 'border-severity-info/50' },
  [SeverityLevel.Gas]: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50' },
};


const AuditResultItem: React.FC<AuditResultItemProps> = ({ finding }) => {
  const styles = severityStyles[finding.severity] || severityStyles[SeverityLevel.Informational];

  return (
    <details className="bg-brand-bg/50 border rounded-lg overflow-hidden group" open={finding.severity === SeverityLevel.Critical || finding.severity === SeverityLevel.High}>
      <summary className={`flex items-center justify-between p-3 cursor-pointer ${styles.border} border-l-4`}>
        <div className="flex items-center gap-3">
           <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${styles.bg} ${styles.text}`}>
             {finding.severity}
           </span>
          <span className="font-medium text-brand-text-primary">{finding.description.substring(0, 60)}{finding.description.length > 60 ? '...' : ''}</span>
        </div>
        <ChevronDownIcon className="w-5 h-5 text-brand-text-secondary group-open:rotate-180 transition-transform"/>
      </summary>
      <div className="p-4 border-t border-brand-border space-y-4">
        <div>
          <h4 className="font-semibold text-brand-text-secondary">Description</h4>
          <p className="text-sm text-brand-text-primary mt-1">{finding.description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-brand-text-secondary">Recommendation</h4>
          <p className="text-sm text-brand-text-primary mt-1">{finding.recommendation}</p>
        </div>
        {finding.codeFix && (
          <div>
            <h4 className="font-semibold text-brand-text-secondary flex items-center gap-2"><CodeIcon className="w-4 h-4" /> Suggested Fix</h4>
            <pre className="mt-2 p-3 bg-brand-bg rounded-md overflow-x-auto">
              <code className="text-sm font-mono text-green-400">
                {finding.codeFix}
              </code>
            </pre>
          </div>
        )}
      </div>
    </details>
  );
};

export default AuditResultItem;
