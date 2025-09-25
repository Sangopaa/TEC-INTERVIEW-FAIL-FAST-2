import axios from "axios";
import { Rule } from "../types/rule";
import { PersonData } from "../types/personData";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const rulesService = {
  getRules: async (formId: string): Promise<Rule[]> => {
    const response = await apiClient.get(`/rules/${formId}`);
    return response.data;
  }
};

export const personService = {
  createPerson: async (data: PersonData): Promise<PersonData> => {
    const response = await apiClient.post('/person/', data);
    return response.data;
  }
};