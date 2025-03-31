# Company Research Application

A full-stack application for company and person research using Google's Gemini AI model.

## Frontend

A React application built with TypeScript and Material-UI that provides a user interface for company and person research.

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

Google Cloud Functions that provide company and person research using Google's Gemini AI model.

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

3. Deploy the function:
```bash
gcloud functions deploy company-research \
  --runtime python39 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point company_research
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
  -d '{"person": "John Doe"}'
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
```

## API Endpoints

### Company Research
- **URL**: `https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/company-research`
- **Method**: POST
- **Content-Type**: application/json
- **Request Body**:
```json
{
    "company": "Company Name"
}
```

### Person Research
- **URL**: `https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/person-research`
- **Method**: POST
- **Content-Type**: application/json
- **Request Body**:
```json
{
    "person": "Person Name"
}
```

## Response Format

```json
{
    "research": "Detailed research analysis..."
}
``` 