
import React from 'react';
import { ScanIcon } from './Icon';
import Loader from './Loader';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onAudit: () => void;
  isLoading: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, onAudit, isLoading }) => {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-lg shadow-md flex flex-col h-[70vh] lg:h-auto">
      <div className="p-4 border-b border-brand-border">
        <h2 className="text-lg font-semibold text-brand-text-primary">Contract Code</h2>
        <p className="text-sm text-brand-text-secondary">Paste your Solidity code below to begin the audit.</p>
      </div>
      <div className="flex-grow p-1">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="pragma solidity ^0.8.0;"
          className="w-full h-full p-3 bg-brand-bg text-brand-text-primary border-0 rounded-md resize-none focus:ring-2 focus:ring-brand-primary font-mono text-sm leading-relaxed"
          spellCheck="false"
        />
      </div>
      <div className="p-4 border-t border-brand-border">
        <button
          onClick={onAudit}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-md transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader />
              Auditing...
            </>
          ) : (
            <>
              <ScanIcon className="w-5 h-5" />
              Audit Contract
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
