export interface Milestone {
  id: number;
  name: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

export interface Kpi {
  label: string;
  value: string;
  target: string;
  isImpactMetric?: boolean; // Hacer opcional para evitar errores
}

export interface Project {
  id: number;
  name: string;
  team: string[];
  currentStage: string;
  progress: number;
  description: string;
  kpis: Kpi[];
  milestones: Milestone[];
}