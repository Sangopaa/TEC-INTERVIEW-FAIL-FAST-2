// src/hooks/useRuleEngine.ts
import { useState, useCallback, useRef } from 'react';
import { Rule, RuleContext } from '../types/rule';
import { FormState } from '../types/personData';

export const useRuleEngine = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  // mantenemos un ref para evitar closures stale
  const formStateRef = useRef<FormState | null>(null);
  const setFormStateRef = useRef<React.Dispatch<React.SetStateAction<FormState>> | null>(null);

  const _updateRefs = (formState: FormState | null, setFormState?: React.Dispatch<React.SetStateAction<FormState>> | null) => {
    formStateRef.current = formState ?? formStateRef.current;
    if (setFormState) setFormStateRef.current = setFormState;
  };

  const createSafeContext = (
    fieldName: string,
    value: any,
    formState: FormState,
    setFormState: React.Dispatch<React.SetStateAction<FormState>>
  ): RuleContext => {
    // keep refs in sync
    _updateRefs(formState, setFormState);

    const safeSet = <K extends keyof FormState>(name: K, patch: Partial<FormState[K]>) => {
      setFormState(prev => {
        const next = {
          ...prev,
          [name]: { ...prev[name], ...patch }
        };
        formStateRef.current = next;
        return next;
      });
    };

    const ctx: RuleContext = {
      value,
      getFieldValue: (name: keyof FormState) => formState[name]?.value,
      setFieldValue: (name: keyof FormState, newValue: any) => safeSet(name, { value: newValue }),
      getFieldError: (name: keyof FormState) => formState[name]?.error || '',
      setFieldError: (name: keyof FormState, error: string) => safeSet(name, { error }),
      getFieldEnabled: (name: keyof FormState) => formState[name]?.enabled ?? true,
      setFieldEnabled: (name: keyof FormState, enabled: boolean) => safeSet(name, { enabled }),
      getFieldVisible: (name: keyof FormState) => formState[name]?.visible ?? true,
      setFieldVisible: (name: keyof FormState, visible: boolean) => safeSet(name, { visible }),
      formData: Object.fromEntries(Object.entries(formState).map(([k, f]) => [k, f.value])),
      // helper to get the full reactive snapshot (useful for async rules)
      _internal: {
        getFormState: () => formStateRef.current
      }
    };

    return ctx;
  };

  const executeRule = useCallback(
    async (rule: Rule, context: RuleContext): Promise<void> => {
      try {
        // Construimos la función controlada. Parámetros expuestos intencionalmente.
        // IMPORTANTE: new Function sigue siendo poderosa. Controla quién puede editar rules.
        const argNames = [
          'value',
          'getFieldValue',
          'setFieldValue',
          'getFieldError',
          'setFieldError',
          'getFieldEnabled',
          'setFieldEnabled',
          'getFieldVisible',
          'setFieldVisible',
          'formData'
        ];

        const safeFunction = new Function(...argNames, `"use strict";\nreturn (async () => { ${rule.code}\n})();`);

        await safeFunction(
          context.value,
          context.getFieldValue,
          context.setFieldValue,
          context.getFieldError,
          context.setFieldError,
          context.getFieldEnabled,
          context.setFieldEnabled,
          context.getFieldVisible,
          context.setFieldVisible,
          context.formData
        );
      } catch (error) {
        // registramos y continuamos
        console.error(`Error executing rule ${rule.id} (field=${rule.field} event=${rule.event}):`, error);
      }
    },
    []
  );

  const executeRulesForEvent = useCallback(
    async (
      event: Rule['event'],
      fieldName: string,
      value: any,
      formState: FormState,
      setFormState: React.Dispatch<React.SetStateAction<FormState>>
    ) => {
      // sincronizamos refs
      _updateRefs(formState, setFormState);

      const applicableRules = rules
        .filter(rule => rule.enabled && rule.event === event && rule.field === fieldName)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      const context = createSafeContext(fieldName, value, formState, setFormState);

      for (const rule of applicableRules) {
        await executeRule(rule, context);
      }
    },
    [rules, executeRule]
  );

  return {
    rules,
    setRules,
    executeRulesForEvent,
    executeRule,
    createSafeContext,
    // refs helpers para el componente si necesita precisión
    _internal: {
      formStateRef,
      setFormStateRef,
      _updateRefs
    }
  };
};