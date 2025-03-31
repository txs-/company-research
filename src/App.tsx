import { useState } from 'react'
import { 
  Container, 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  ThemeProvider, 
  createTheme,
  CssBaseline,
} from '@mui/material'
import PersonResearch from './components/PersonResearch'
import CompanyResearch from './components/CompanyResearch'

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`research-tabpanel-${index}`}
      aria-labelledby={`research-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

function App() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ width: '100%', mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Company & Person Research
          </Typography>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              aria-label="research tabs"
              centered
            >
              <Tab label="Company Research" />
              <Tab label="Person Research" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <CompanyResearch />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <PersonResearch />
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
