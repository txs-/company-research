# Company Research Application

A full-stack application for company, person, and market research using Google's Gemini AI model.

## Features

- Company Research: Deep analysis of companies using AI
- Person Research: Comprehensive research on individuals within companies
- Market Research: In-depth analysis of market trends and opportunities
- Modern UI with split-view layout
- Real-time research results display

## Frontend

A React application built with TypeScript and Material-UI that provides a user interface for company, person, and market research.

### Setup and Development

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Deploy to Google Cloud Storage:
```bash
gsutil -m cp -r dist/* gs://company-research-frontend-2024/
```

## Backend (Cloud Functions)

Google Cloud Functions that provide company, person, and market research using Google's Gemini AI model.

### Setup and Deployment

1. Install the Google Cloud CLI and initialize it:
```bash
gcloud init
```

2. Set up your environment variables in Google Cloud:
```bash
gcloud functions deploy company-research \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_API_KEY=your_api_key_here
```

3. Deploy the functions:
```bash
gcloud functions deploy company-research \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point company_research

gcloud functions deploy person-research \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point person_research

gcloud functions deploy market-research \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point market_research
```

## Testing the Functions

Once deployed, you can test the functions using curl:

```bash
# Company Research
curl -X POST https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/company-research \
  -H "Content-Type: application/json" \
  -d '{"company": "Apple"}'

# Person Research
curl -X POST https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/person-research \
  -H "Content-Type: application/json" \
  -d '{"person": "John Doe", "company": "Apple"}'

# Market Research
curl -X POST https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/market-research \
  -H "Content-Type: application/json" \
  -d '{"market": "AI"}'
```

## Local Development

To test locally:

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set your environment variables:
```bash
export GOOGLE_API_KEY=your_api_key_here
```

3. Run the functions locally:
```bash
functions-framework --target company_research
functions-framework --target person_research
functions-framework --target market_research
```

## API Endpoints

### Company Research
- Endpoint: `/company-research`
- Method: POST
- Body: `{"company": "Company Name"}`
- Returns: Detailed company analysis in markdown format

### Person Research
- Endpoint: `/person-research`
- Method: POST
- Body: `{"person": "Person Name", "company": "Company Name"}`
- Returns: Detailed person analysis in markdown format

### Market Research
- Endpoint: `/market-research`
- Method: POST
- Body: `{"market": "Market Name"}`
- Returns: Detailed market analysis in markdown format

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - Vite

- Backend:
  - Python
  - Google Cloud Functions
  - Google Gemini AI
  - Functions Framework

## Deployment

The application is deployed on Google Cloud Platform:
- Frontend: Google Cloud Storage
- Backend: Google Cloud Functions
- AI: Google Gemini AI
