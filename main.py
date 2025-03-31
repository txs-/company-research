import functions_framework
import google.generativeai as genai
import os
import json

# Configure Gemini
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

# Use Gemini 1.5 Pro model
MODEL_NAME = 'models/gemini-1.5-pro'

def research_company(company_name):
    """Conduct deep research on a company using Gemini."""
    model = genai.GenerativeModel(MODEL_NAME)
    
    prompt = f"""
    Conduct a comprehensive analysis of {company_name}. Please provide a detailed analysis in the following format, using proper markdown syntax:

    # {company_name} - Company Analysis

    ## 1. Executive Summary
    - Brief overview of the company
    - Key business lines
    - Notable achievements
    - Current market position

    ## 2. Business Model & Revenue Streams
    - Primary revenue sources
    - Business model evolution
    - Key partnerships
    - Distribution channels

    ## 3. Market Analysis
    - Market size and growth potential
    - Market share in key segments
    - Target customer demographics
    - Geographic presence
    - Competitive advantages

    ## 4. Financial Performance
    - Recent revenue trends
    - Profitability metrics
    - Key financial ratios
    - Cash flow analysis
    - Investment and R&D spending

    ## 5. Technology & Innovation
    - Core technologies
    - R&D capabilities
    - Intellectual property
    - Innovation pipeline
    - Digital transformation initiatives

    ## 6. Operational Strengths & Challenges
    - Supply chain management
    - Manufacturing capabilities
    - Quality control
    - Operational efficiency
    - Risk management

    ## 7. Strategic Initiatives
    - Growth strategies
    - Market expansion plans
    - Product development roadmap
    - M&A activities
    - Strategic partnerships

    ## 8. Risks & Opportunities
    - Market risks
    - Regulatory challenges
    - Technological risks
    - Growth opportunities
    - Industry trends

    ## 9. Future Outlook
    - Growth projections
    - Industry trends
    - Technological advancements
    - Market opportunities
    - Potential challenges

    Please provide specific data points, metrics, and recent developments where available. 
    Use proper markdown formatting with:
    - H1 (#) for the title
    - H2 (##) for main sections
    - H3 (###) for subsections if needed
    - Bullet points (-) for lists
    - Bold (**) for emphasis on key points
    - Tables (|) for structured data if applicable
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error conducting research: {str(e)}"

def research_person(person_name, company_name):
    """Conduct research on a person using Gemini."""
    model = genai.GenerativeModel(MODEL_NAME)
    
    prompt = f"""
    Research {person_name} who works at {company_name}. Please provide information in the following format:

    # {person_name} - Professional Profile

    ## Current Position
    - Title: [Current job title]
    - Company: {company_name}
    - Location: [City, State/Country]

    ## Contact Information
    - Email: [Email address if available]
    - Phone: [Phone number if available]

    Please note: If any information is not available, mark it as "Unknown". Focus on publicly available information only.
    """
    
    response = model.generate_content(prompt)
    return response.text

def get_cors_headers():
    """Get CORS headers for the response."""
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Content-Type': 'application/json',
    }

@functions_framework.http
def company_research(request):
    """Cloud Function to handle company research requests."""
    # Handle preflight request
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    headers = get_cors_headers()

    try:
        request_json = request.get_json(silent=True)
        
        if not request_json or 'company' not in request_json:
            return (json.dumps({'error': 'Company name is required'}), 400, headers)
        
        company_name = request_json['company']
        research_result = research_company(company_name)
        
        return (json.dumps({
            'company': company_name,
            'research': research_result
        }), 200, headers)
        
    except Exception as e:
        return (json.dumps({'error': str(e)}), 500, headers)

@functions_framework.http
def person_research(request):
    """Cloud Function to handle person research requests."""
    # Handle preflight request
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    headers = get_cors_headers()

    try:
        request_json = request.get_json(silent=True)
        
        if not request_json or 'person' not in request_json or 'company' not in request_json:
            return (json.dumps({'error': 'Person name and company name are required'}), 400, headers)
        
        person_name = request_json['person']
        company_name = request_json['company']
        research_result = research_person(person_name, company_name)
        
        return (json.dumps({
            'person': person_name,
            'company': company_name,
            'research': research_result
        }), 200, headers)
        
    except Exception as e:
        return (json.dumps({'error': str(e)}), 500, headers)

def research_market(market_name):
    """Conduct deep research on a market using Gemini."""
    model = genai.GenerativeModel(MODEL_NAME)
    
    prompt = f"""
    Conduct a comprehensive analysis of the {market_name} market. Please provide a detailed analysis in the following format, using proper markdown syntax:

    # {market_name} Market Analysis

    ## 1. Market Overview
    - Market size and growth rate
    - Key market segments
    - Geographic distribution
    - Market maturity stage

    ## 2. Market Drivers
    - Key growth drivers
    - Technological factors
    - Regulatory environment
    - Economic factors
    - Social and demographic trends

    ## 3. Market Challenges
    - Major barriers to entry
    - Regulatory challenges
    - Technological limitations
    - Economic constraints
    - Competitive pressures

    ## 4. Key Players
    - Market leaders
    - Emerging players
    - Market share distribution
    - Strategic alliances
    - M&A activities

    ## 5. Technology Landscape
    - Key technologies
    - Innovation trends
    - R&D focus areas
    - Digital transformation
    - Future technological developments

    ## 6. Market Opportunities
    - Growth opportunities
    - Emerging segments
    - Untapped markets
    - Innovation potential
    - Strategic opportunities

    ## 7. Future Outlook
    - Market projections
    - Growth forecasts
    - Industry trends
    - Technological advancements
    - Regulatory changes

    ## 8. Investment Landscape
    - Investment trends
    - Funding patterns
    - Venture capital activity
    - Public market performance
    - Investment opportunities

    Please provide specific data points, metrics, and recent developments where available. 
    Use proper markdown formatting with:
    - H1 (#) for the title
    - H2 (##) for main sections
    - H3 (###) for subsections if needed
    - Bullet points (-) for lists
    - Bold (**) for emphasis on key points
    - Tables (|) for structured data if applicable
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error conducting research: {str(e)}"

@functions_framework.http
def market_research(request):
    """Cloud Function to handle market research requests."""
    # Handle preflight request
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    headers = get_cors_headers()

    try:
        request_json = request.get_json(silent=True)
        
        if not request_json or 'market' not in request_json:
            return (json.dumps({'error': 'Market name is required'}), 400, headers)
        
        market_name = request_json['market']
        research_result = research_market(market_name)
        
        return (json.dumps({
            'market': market_name,
            'research': research_result
        }), 200, headers)
        
    except Exception as e:
        return (json.dumps({'error': str(e)}), 500, headers) 