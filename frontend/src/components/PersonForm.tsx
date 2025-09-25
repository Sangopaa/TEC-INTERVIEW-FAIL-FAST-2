import React, { useState, useEffect, useCallback } from 'react';
import { DynamicField } from './DynamicField';
import { useRuleEngine } from '../hooks/useRuleEngine';
import { rulesService, personService } from '../services/request';
import { FormState, PersonData } from '../types/personData';

const FORM_ID = '2';

const initialFormState: FormState = {
  name: { value: '', error: '', enabled: true, visible: true },
  last_name: { value: '', error: '', enabled: true, visible: true },
  complete_name: { value: '', error: '', enabled: false, visible: true },
  document: { value: '', error: '', enabled: true, visible: true },
  birth_date: { value: '', error: '', enabled: true, visible: true },
  age: { value: '', error: '', enabled: false, visible: true },
  email: { value: '', error: '', enabled: true, visible: true },
  phone: { value: '', error: '', enabled: true, visible: true },
  married: { value: false, error: '', enabled: true, visible: true },
  spouse_name: { value: '', error: '', enabled: false, visible: false }
};

export const PersonForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const { rules, setRules, executeRulesForEvent, createSafeContext, executeRule } = useRuleEngine();

  useEffect(() => {
    const loadRules = async () => {
      try {
        const fetchedRules = await rulesService.getRules(FORM_ID);
        setRules(fetchedRules);
      } catch (error) {
        console.error('Error loading rules:', error);
      }
    };

    loadRules();
  }, [setRules]);

  const handleFieldChange = useCallback(async (fieldName: string, value: any) => {
    setFormState(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], value }
    }));

    await executeRulesForEvent('onChange', fieldName, value, formState, setFormState);
  }, [executeRulesForEvent, formState]);

  const handleFieldBlur = useCallback(async (fieldName: string, value: any) => {
    await executeRulesForEvent('onBlur', fieldName, value, formState, setFormState);
  }, [executeRulesForEvent, formState]);

  const handleFieldFocus = useCallback(async (fieldName: string, value: any) => {
    await executeRulesForEvent('onFocus', fieldName, value, formState, setFormState);
  }, [executeRulesForEvent, formState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitMessage('');

    try {
      const submitRules = rules
        .filter(rule => rule.enabled && rule.event === 'onClick' && rule.field === 'submit')
        .sort((a, b) => a.order - b.order);

      if (submitRules.length > 0) {
        const context = createSafeContext('submit', null, formState, setFormState);
        
        for (const rule of submitRules) {
          await executeRule(rule, context);
        }
      } else {
        const personData: PersonData = Object.fromEntries(
          Object.entries(formState).map(([key, field]) => [key, field.value])
        ) as PersonData;

        await personService.createPerson(personData);
        setSubmitMessage('Person data saved successfully!');
        console.log('Person data saved:', personData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Error saving person data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Person Information Form</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DynamicField
            name="name"
            label="Name"
            type="text"
            fieldState={formState.name}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            onFocus={handleFieldFocus}
          />
          
          <DynamicField
            name="last_name"
            label="Last Name"
            type="text"
            fieldState={formState.last_name}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            onFocus={handleFieldFocus}
          />
        </div>

        <DynamicField
          name="complete_name"
          label="Complete Name"
          type="text"
          fieldState={formState.complete_name}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          onFocus={handleFieldFocus}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DynamicField
            name="document"
            label="Document"
            type="text"
            fieldState={formState.document}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            onFocus={handleFieldFocus}
          />
          
          <DynamicField
            name="birth_date"
            label="Birth Date"
            type="date"
            fieldState={formState.birth_date}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            onFocus={handleFieldFocus}
          />
        </div>

        <DynamicField
          name="age"
          label="Age"
          type="text"
          fieldState={formState.age}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          onFocus={handleFieldFocus}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DynamicField
            name="email"
            label="Email"
            type="email"
            fieldState={formState.email}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            onFocus={handleFieldFocus}
          />
          
          <DynamicField
            name="phone"
            label="Phone"
            type="tel"
            fieldState={formState.phone}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            onFocus={handleFieldFocus}
          />
        </div>

        <DynamicField
          name="married"
          label="Married"
          type="checkbox"
          fieldState={formState.married}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          onFocus={handleFieldFocus}
        />

        <DynamicField
          name="spouse_name"
          label="Spouse Name"
          type="text"
          fieldState={formState.spouse_name}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          onFocus={handleFieldFocus}
        />

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Person'}
          </button>
        </div>

        {submitMessage && (
          <div className={`mt-4 p-3 rounded-md ${
            submitMessage.includes('Error') 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {submitMessage}
          </div>
        )}
      </form>

      {/* Debug info - puedes eliminar esto en producción */}
      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p className="text-sm">Active Rules: {rules.filter(r => r.enabled).length}</p>
        <details className="mt-2">
          <summary className="cursor-pointer text-sm font-medium">Form State</summary>
          <pre className="mt-2 text-xs overflow-auto">
            {JSON.stringify(formState, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};