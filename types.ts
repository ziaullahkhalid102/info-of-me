import { LucideIcon } from 'lucide-react';

export interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

export enum ToolType {
  NAME_MEANING = 'name_meaning',
  DOB_FACTS = 'dob_facts',
  HISTORY = 'history',
  DAY_GRADE = 'day_grade',
}

export interface ToolDefinition {
  id: ToolType;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

export interface DateValue {
  day: string;
  month: string;
  year: string;
}

export interface GeneratedResult {
  content: string;
  isLoading: boolean;
  error: string | null;
}
