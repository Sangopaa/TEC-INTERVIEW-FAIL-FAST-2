export interface Rule {
  id: number;
  event: 'onChange' | 'onBlur' | 'onFocus' | 'onClick';
  field: string;
  code: string;
  enabled: boolean;
  order: number;
}

export interface RuleContext {
  value: any;
  getFieldValue: (fieldName: string) => any;
  setFieldValue: (fieldName: string, value: any) => void;
  getFieldError: (fieldName: string) => string;
  setFieldError: (fieldName: string, error: string) => void;
  getFieldEnabled: (fieldName: string) => boolean;
  setFieldEnabled: (fieldName: string, enabled: boolean) => void;
  getFieldVisible: (fieldName: string) => boolean;
  setFieldVisible: (fieldName: string, visible: boolean) => void;
  formData: Record<string, any>;
  _internal?: any;
}