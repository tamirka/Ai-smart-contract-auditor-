
export enum SeverityLevel {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
  Informational = 'Informational',
  Gas = 'Gas Optimization'
}

export enum FindingCategory {
  Security = 'Security',
  GasOptimization = 'Gas Optimization',
  BestPractices = 'Best Practices',
  LogicError = 'Logic Error',
}

export interface AuditFinding {
  id: string;
  severity: SeverityLevel;
  category: FindingCategory;
  description: string;
  recommendation: string;
  codeFix?: string;
}

export interface AuditReport {
  summary: string;
  verdict: string;
  findings: AuditFinding[];
}
