import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography, Paper } from '@mui/material';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Typography variant="h4" component="h1" gutterBottom>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography paragraph>
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <Box component="ul" sx={{ pl: 2 }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" sx={{ pl: 2 }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Typography component="li" sx={{ mb: 1 }}>
              {children}
            </Typography>
          ),
          strong: ({ children }) => (
            <Typography component="strong" sx={{ fontWeight: 'bold' }}>
              {children}
            </Typography>
          ),
          em: ({ children }) => (
            <Typography component="em" sx={{ fontStyle: 'italic' }}>
              {children}
            </Typography>
          ),
          code: ({ children }) => (
            <Typography
              component="code"
              sx={{
                backgroundColor: 'grey.100',
                p: 0.5,
                borderRadius: 1,
                fontFamily: 'monospace',
              }}
            >
              {children}
            </Typography>
          ),
          pre: ({ children }) => (
            <Box
              component="pre"
              sx={{
                backgroundColor: 'grey.100',
                p: 2,
                borderRadius: 1,
                overflow: 'auto',
                my: 2,
              }}
            >
              {children}
            </Box>
          ),
          blockquote: ({ children }) => (
            <Box
              component="blockquote"
              sx={{
                borderLeft: 4,
                borderColor: 'primary.main',
                pl: 2,
                my: 2,
                fontStyle: 'italic',
              }}
            >
              {children}
            </Box>
          ),
          table: ({ children }) => (
            <Box
              component="table"
              sx={{
                width: '100%',
                borderCollapse: 'collapse',
                my: 2,
              }}
            >
              {children}
            </Box>
          ),
          th: ({ children }) => (
            <Box
              component="th"
              sx={{
                border: 1,
                borderColor: 'grey.300',
                p: 1,
                backgroundColor: 'grey.100',
                fontWeight: 'bold',
              }}
            >
              {children}
            </Box>
          ),
          td: ({ children }) => (
            <Box
              component="td"
              sx={{
                border: 1,
                borderColor: 'grey.300',
                p: 1,
              }}
            >
              {children}
            </Box>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Paper>
  );
} 