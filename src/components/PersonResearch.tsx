import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import MarkdownRenderer from './MarkdownRenderer';
import { API_CONFIG } from '../config';

export default function PersonResearch() {
  const [personName, setPersonName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ research: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(API_CONFIG.personResearchEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ person_name: personName }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch research');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Enter person name"
        value={personName}
        onChange={(e) => setPersonName(e.target.value)}
        disabled={loading}
        sx={{ mb: 2 }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        disabled={loading || !personName.trim()}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Research Person'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {result && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Research Results
          </Typography>
          <MarkdownRenderer content={result.research} />
        </Paper>
      )}
    </Box>
  );
} 