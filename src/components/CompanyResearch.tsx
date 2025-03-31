import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';
import { API_CONFIG } from '../config';
import MarkdownRenderer from './MarkdownRenderer';

interface ResearchResult {
  company: string;
  research: string;
}

export default function CompanyResearch() {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Starting API request...');
      console.log('API endpoint:', API_CONFIG.COMPANY_RESEARCH);
      console.log('Request payload:', { company: companyName });
      
      const response = await axios.post(API_CONFIG.COMPANY_RESEARCH, {
        company: companyName
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 60000 // 60 seconds timeout
      });
      
      console.log('Response received:', response);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      console.log('Response data:', response.data);
      
      if (!response.data) {
        throw new Error('No data received from the server');
      }

      // Log the research content to check if it's valid markdown
      console.log('Research content type:', typeof response.data.research);
      console.log('Research content preview:', response.data.research.substring(0, 100));
      
      setResult(response.data);
    } catch (err) {
      console.error('Error occurred during API call:', err);
      if (axios.isAxiosError(err)) {
        console.error('Axios error details:', {
          message: err.message,
          code: err.code,
          status: err.response?.status,
          statusText: err.response?.statusText,
          headers: err.response?.headers,
          data: err.response?.data
        });
        setError(`Error: ${err.response?.data?.error || err.message}`);
      } else {
        console.error('Non-Axios error:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          disabled={loading}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !companyName}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Research Company'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {result && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Research Results for {result.company}
          </Typography>
          <MarkdownRenderer content={result.research} />
        </Box>
      )}
    </Box>
  );
} 