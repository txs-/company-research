const isDevelopment = import.meta.env.DEV;

export const API_CONFIG = {
  COMPANY_RESEARCH: isDevelopment 
    ? '/api/company-research'
    : 'https://us-central1-company-research-2024.cloudfunctions.net/company-research',
  PERSON_RESEARCH: isDevelopment
    ? '/api/person-research'
    : 'https://us-central1-company-research-2024.cloudfunctions.net/person-research'
}; 