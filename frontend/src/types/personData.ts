export interface PersonData {
  name: string;
  last_name: string;
  complete_name: string;
  document: string;
  birth_date: string;
  age: string;
  email: string;
  phone: string;
  married: boolean;
  spouse_name: string;
}

export interface FieldState {
  value: any;
  error: string;
  enabled: boolean;
  visible: boolean;
}

export type FormState = Record<string, FieldState>;