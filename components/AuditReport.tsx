
import React from 'react';
import { AuditReport as AuditReportType } from '../types';
import Loader from './Loader';
import AuditResultItem from './AuditResultItem';
import { InfoIcon, AlertTriangleIcon } from './Icon';

interface AuditReportProps {
  result: AuditReportType | null;
  isLoading: boolean;
  error: string | null;
}

const WelcomeState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <InfoIcon className="w-16 h-16 text-brand-primary mb-4" />
    <h3 className="text-xl font-bold text-brand-text-primary">Ready to Secure Your Smart Contract?</h3>
    <p className="text-brand-text-secondary mt-2 max-w-md">
      Paste your contract code on the left and click "Audit Contract" to get an instant, AI-powered security analysis.
    </p>
  </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-red-900/20 border border-red-500/50 rounded-lg">
        <AlertTriangleIcon className="w-16 h-16 text-red-400 mb-4" />
        <h3 className="text-xl font-bold text-red-300">Audit Failed</h3>
        <p className="text-red-300/80 mt-2 max-w-md">
            {message}
        </p>
    </div>
);


const AuditReport: React.FC<AuditReportProps> = ({ result, isLoading, error }) => {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-lg shadow-md h-[70vh] lg:h-auto flex flex-col">
       <div className="p-4 border-b border-brand-border">
        <h2 className="text-lg font-semibold text-brand-text-primary">Audit Report</h2>
        <p className="text-sm text-brand-text-secondary">AI-generated analysis of your contract.</p>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {isLoading && <div className="flex items-center justify-center h-full"><Loader size="large" /><span className="ml-4 text-lg">Running analysis...</span></div>}
        {error && <ErrorState message={error} />}
        {!isLoading && !error && !result && <WelcomeState />}
        {result && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-brand-text-secondary uppercase tracking-wider">Verdict</h3>
              <p className="text-xl font-bold mt-1 text-brand-primary">{result.verdict}</p>
            </div>
             <div>
              <h3 className="text-base font-semibold text-brand-text-secondary uppercase tracking-wider">Summary</h3>
              <p className="mt-1 text-brand-text-primary">{result.summary}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-brand-text-secondary uppercase tracking-wider mb-2">Findings ({result.findings.length})</h3>
              <div className="space-y-3">
                {result.findings.length > 0 ? (
                  result.findings.map((finding) => (
                    <AuditResultItem key={finding.id} finding={finding} />
                  ))
                ) : (
                  <div className="text-center py-8 text-brand-text-secondary">No issues found. The contract appears to be secure.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditReport;
