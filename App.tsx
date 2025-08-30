
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import AuditReport from './components/AuditReport';
import { auditContract } from './services/geminiService';
import { AuditReport as AuditReportType } from './types';
import { SAMPLE_CONTRACT } from './constants';

const App: React.FC = () => {
  const [contractCode, setContractCode] = useState<string>(SAMPLE_CONTRACT);
  const [auditResult, setAuditResult] = useState<AuditReportType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = useCallback(async () => {
    if (!contractCode.trim()) {
      setError("Contract code cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAuditResult(null);

    try {
      const result = await auditContract(contractCode);
      setAuditResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during the audit.");
    } finally {
      setIsLoading(false);
    }
  }, [contractCode]);

  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      <Header />
      <main className="p-4 md:p-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CodeEditor
              code={contractCode}
              setCode={setContractCode}
              onAudit={handleAudit}
              isLoading={isLoading}
            />
            <AuditReport
              result={auditResult}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
