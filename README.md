# LangGraph Multi-Agent System

A comprehensive multi-agent system built with LangGraph that provides a wide range of tools and capabilities through a modular, well-organized architecture.


## 🎥 Demo Video

[![Demo Video](https://img.shields.io/badge/Watch-Demo%20Video-blue?style=for-the-badge&logo=play&logoColor=white)](./demo-video.mov)

> Click the badge above to watch the demo video showcasing the multi-agent system in action.


## 🚀 Features

This project implements a sophisticated agent system with the following capabilities:

### 🔢 Mathematical Operations
- **Addition**: Add two numbers
- **Multiplication**: Multiply two numbers  
- **Division**: Divide two numbers

### 🌤️ Weather Information
- Get current weather data for any city
- Supports multiple countries
- Returns temperature, humidity, wind speed, and weather description

### 📰 News & Information
- Fetch latest news articles by category
- Support for multiple countries
- Categories: business, entertainment, general, health, science, sports, technology

### 💰 Financial Data
- **Cryptocurrency Prices**: Get real-time crypto prices
- Support for major cryptocurrencies (Bitcoin, Ethereum, etc.)
- Price in USD and EUR with 24-hour change

### 🌐 Network & Location
- **IP Information**: Get detailed information about your IP address
- Location data including city, country, timezone
- ISP and network information

### 📚 Dictionary & Language
- **Word Definitions**: Look up word definitions, parts of speech, and examples
- Phonetic pronunciation
- Multiple definitions per word

### 🔍 Web Search & Research
- **Web Search**: Perform comprehensive web searches using Tavily API
- **News Search**: Search for recent news articles from trusted sources
- **Academic Search**: Search for research papers and academic content
- Support for domain filtering and search depth control

### NASA Astronomy Picture of the Day

#### `get_nasa_apod() -> Dict`
Gets NASA Astronomy Picture of the Day (APOD).
```python
apod = get_nasa_apod()
# Returns: {"title": ..., "date": ..., "explanation": ..., "url": ..., ...}
```

### Wikipedia Tools

#### `get_wikipedia_summary(query: str) -> Dict`
Gets a summary for a topic from Wikipedia.
```python
summary = get_wikipedia_summary("Python (programming language)")
# Returns: {"title": ..., "summary": ..., "url": ...}
```

### Public Holidays

#### `get_public_holidays(country_code: str, year: Optional[int] = None) -> List[Dict]`
Gets public holidays for a country and year.
```python
holidays = get_public_holidays("IN", 2024)
# Returns: list of holidays with date, localName, name, etc.
```

### GitHub Trending

#### `get_trending_github_repos(language: str = "python") -> List[Dict]`
Gets trending GitHub repositories for a given language (most starred in the last week).
```python
repos = get_trending_github_repos("javascript")
# Returns: list of repos with name, full_name, html_url, description, stars, etc.
```

### URL Shortener

#### `shorten_url(url: str) -> Dict`
Shortens a URL using TinyURL API.
```python
short = shorten_url("https://example.com")
# Returns: {"short_url": ...}
```

### QR Code Generator

#### `generate_qr_code(data: str) -> Dict`
Generates a QR code for the given data using goqr.me API.
```python
qr = generate_qr_code("hello world")
# Returns: {"qr_code_url": ...}
```

### Timezone Converter

#### `get_current_timezone(timezone: str) -> Dict`
Gets the full current time and timezone info for a given time zone using WorldTimeAPI.
```python
timeinfo = get_current_timezone("Asia/Kolkata")
# Returns: {"datetime": ..., "utc_offset": ..., ...}
```

### Unit Converter

#### `convert_unit(value: float, from_unit: str, to_unit: str) -> Dict`
Converts units (length, mass, temperature, etc.).
```python
result = convert_unit(1000, "meter", "kilometer")
# Returns: {"value": 1000, "from": "meter", "to": "kilometer", "result": 1.0}
```

### Indian Land Unit Converter

#### `convert_land_unit(value: float, from_unit: str, to_unit: str, region: Optional[str] = None) -> Dict`
Converts Indian land units, supporting regional variations for bigha, biswa, katha, etc.
```python
result = convert_land_unit(2, "bigha", "acre", region="up_west")
# Returns: {"value": 2, "from": "bigha", "to": "acre", "region": "up_west", "result": ...}
```

## 🏗️ Architecture

The project follows a modular architecture with tools organized into logical categories:

```
lang-agent-multi-1/
├── tools/                          # Tool modules
│   ├── __init__.py                 # Package initialization
│   ├── math_tools.py               # Mathematical operations
│   ├── weather_tools.py            # Weather information
│   ├── news_tools.py               # News and articles
│   ├── finance_tools.py            # Financial data
│   ├── network_tools.py            # IP and location info
│   ├── dictionary_tools.py         # Word definitions
│   ├── tavily_search.py            # Web search and research
│   ├── nasa_apod.py                # NASA APOD tool
│   ├── wikipedia.py                # Wikipedia summary tool
│   ├── public_holidays.py          # Public holidays lookup
│   ├── github_trending.py          # GitHub trending repos
│   ├── shorten_url.py              # URL shortener
│   ├── qr_code.py                  # QR code generator
│   ├── timezone_converter.py       # Timezone info
│   ├── unit_converter.py           # General unit converter
│   ├── convert_land_unit.py        # Indian land unit converter
├── agents.py                      # Main agent orchestration
├── langgraph.json                 # LangGraph configuration
├── requirements.txt               # Python dependencies
└── README.md                      # This file
```

## 🛠️ Installation

### Prerequisites
- Python 3.11 or higher
- pip package manager
- **LangSmith/LangChain API Keys** (see below)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lang-agent-multi-1
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the project root with the following variables:
   ```env
   # Essential for LangGraph, LangSmith, and LangChain
   LANGCHAIN_API_KEY=your_langchain_api_key_here
   LANGSMITH_API_KEY=your_langsmith_api_key_here
   LANGCHAIN_TRACING_V2=true

   # LLM and tool APIs
   OPENAI_API_KEY=your_openai_api_key_here
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
   NEWS_API_KEY=your_news_api_key_here
   TAVILY_API_KEY=your_tavily_api_key_here
   XRAPID_API_KEY=your_xrapid_api_key_here
   ```
   > **Tip:** You can get your LangSmith/LangChain API key from https://smith.langchain.com/ under your account settings. The same key works for both `LANGCHAIN_API_KEY` and `LANGSMITH_API_KEY`.

### API Keys Required

- **LANGCHAIN_API_KEY**: Required for LangGraph and LangChain functionality (get from LangSmith)
- **LANGSMITH_API_KEY**: Required for LangSmith functionality (same as above)
- **LANGCHAIN_TRACING_V2**: Set to `true` to enable advanced tracing and debugging
- **OpenAI API Key**: Required for the LLM functionality
- **OpenWeatherMap API Key**: Required for weather information (free tier available)
- **News API Key**: Required for news articles (free tier available)
- **Tavily API Key**: Required for web search functionality (free tier available)

## 🚀 Usage

### Running with LangGraph CLI

1. **Start the development server**
   ```bash
   langgraph dev
   ```

2. **Access the interfaces**
   - **API**: http://127.0.0.1:2024
   - **Studio UI**: https://smith.langchain.com/studio/?baseUrl=http://127.0.0.1:2024
   - **API Docs**: http://127.0.0.1:2024/docs

### Using the Agent Programmatically

```python
from agents import graph
from langchain_core.messages import HumanMessage

# Create a message
messages = [HumanMessage(content="What's the weather like in New York?")]

# Invoke the graph
result = graph.invoke({"messages": messages})
print(result["messages"][-1].content)
```

## 🛠️ Tool Reference

### Mathematical Tools

#### `add(a: int, b: int) -> int`
Adds two integers.
```python
result = add(5, 3)  # Returns 8
```

#### `multiply(a: int, b: int) -> int`
Multiplies two integers.
```python
result = multiply(4, 6)  # Returns 24
```

#### `divide(a: int, b: int) -> float`
Divides two integers.
```python
result = divide(10, 2)  # Returns 5.0
```

### Weather Tools

#### `get_weather(city: str, country_code: str = "US") -> Dict`
Gets current weather information for a city.
```python
weather = get_weather("London", "GB")
# Returns: {"city": "London", "temperature": "15°C", "description": "cloudy", ...}
```

### News Tools

#### `get_news(category: str = "general", country: str = "us") -> List[Dict]`
Fetches latest news articles.
```python
news = get_news("technology", "us")
# Returns list of articles with title, description, url, published_at
```

### Entertainment Tools

#### `get_random_quote() -> Dict`
Gets a random inspirational quote.
```python
quote = get_random_quote()
# Returns: {"quote": "...", "author": "...", "tags": [...]}
```

#### `get_joke() -> Dict`
Gets a random joke.
```python
joke = get_joke()
# Returns: {"joke": "..."} or {"setup": "...", "delivery": "..."}
```

### Financial Tools

#### `get_crypto_price(symbol: str = "bitcoin") -> Dict`
Gets current cryptocurrency price.
```python
price = get_crypto_price("ethereum")
# Returns: {"cryptocurrency": "ethereum", "price_usd": "$2,500.00", ...}
```

### Network Tools

#### `get_ip_info() -> Dict`
Gets detailed information about the current IP address.
```python
ip_info = get_ip_info()
# Returns: {"ip": "192.168.1.1", "city": "New York", "country": "United States", ...}
```

### Dictionary Tools

#### `get_word_definition(word: str) -> Dict`
Gets definition and information about a word.
```python
definition = get_word_definition("serendipity")
# Returns: {"word": "serendipity", "phonetic": "...", "definitions": [...]}
```

### Web Search Tools

#### `web_search(query: str, search_depth: str = "basic", include_domains: Optional[List[str]] = None, exclude_domains: Optional[List[str]] = None) -> Dict`
Performs a comprehensive web search using Tavily API.
```python
results = web_search("artificial intelligence trends 2024", search_depth="advanced")
# Returns: {"query": "...", "answer": "...", "results": [...], "total_results": 10}
```

#### `search_news(query: str, include_domains: Optional[List[str]] = None) -> Dict`
Searches for recent news articles from trusted sources.
```python
news = search_news("climate change", include_domains=["bbc.com", "cnn.com"])
# Returns: {"query": "...", "results": [...], "total_results": 5}
```

#### `search_academic(query: str, include_domains: Optional[List[str]] = None) -> Dict`
Searches for academic papers and research content.
```python
papers = search_academic("machine learning applications", include_domains=["arxiv.org"])
# Returns: {"query": "...", "results": [...], "total_results": 8}
```

## 🔧 Configuration

### LangGraph Configuration (`langgraph.json`)
```json
{
    "dockerfile_lines": [],
    "graphs": {
      "agent": "./agents.py:graph"
    },
    "env": "./.env",
    "python_version": "3.11",
    "dependencies": [
      "."
    ]
}
```

### Environment Variables (`.env`)
```env
# Essential for LangGraph, LangSmith, and LangChain
LANGCHAIN_API_KEY=your_langchain_api_key_here
LANGSMITH_API_KEY=your_langsmith_api_key_here
LANGCHAIN_TRACING_V2=true

# LLM and tool APIs
OPENAI_API_KEY=your_openai_api_key_here
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
NEWS_API_KEY=your_news_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
XRAPID_API_KEY=your_xrapid_api_key_here
```

## 🧪 Testing

### Testing Individual Tools
```python
# Test weather tool
from tools.weather_tools import get_weather
result = get_weather("San Francisco", "US")
print(result)

# Test math tools
from tools.math_tools import add, multiply, divide
print(add(10, 5))      # 15
print(multiply(4, 7))  # 28
print(divide(20, 4))   # 5.0

# Test web search tools
from tools.tavily_search import web_search, search_news, search_academic
results = web_search("Python programming best practices")
print(results)
```

### Testing the Complete Agent
```python
from agents import graph
from langchain_core.messages import HumanMessage

# Test various queries
test_messages = [
    "What's 15 + 27?",
    "Tell me a joke",
    "What's the weather in Tokyo?",
    "Get me the latest technology news",
    "What does 'serendipity' mean?",
    "Search for information about renewable energy",
    "Find recent news about artificial intelligence"
]

for message in test_messages:
    result = graph.invoke({"messages": [HumanMessage(content=message)]})
    print(f"Query: {message}")
    print(f"Response: {result['messages'][-1].content}\n")
```

## 🔍 Troubleshooting

### Common Issues

1. **Python Version Error**
   - Ensure you're using Python 3.11 or higher
   - Check with: `python --version`

2. **Missing API Keys**
   - Ensure all required API keys are set in `.env`
   - Some tools will work without API keys (math, quotes, jokes)
   - **LANGCHAIN_API_KEY** and **LANGSMITH_API_KEY** are essential for LangGraph and LangSmith features
   - **LANGCHAIN_TRACING_V2** should be set to `true` for best tracing/debugging
   - Get your LangSmith/LangChain API key from https://smith.langchain.com/

3. **Import Errors**
   - Ensure virtual environment is activated
   - Reinstall dependencies: `pip install -r requirements.txt`

4. **LangGraph CLI Issues**
   - Install LangGraph CLI: `pip install -U "langgraph-cli[inmem]"`
   - Ensure Python 3.11+ is being used

5. **Tavily API Issues**
   - Ensure TAVILY_API_KEY is set in `.env`
   - Check API key validity at https://tavily.com/
   - Verify internet connection for web searches

### Debug Mode

Enable debug output by setting environment variables:
```bash
export LANGCHAIN_TRACING_V2=true
export LANGCHAIN_API_KEY=your_langchain_api_key_here
langgraph dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-tool`
3. Add your tool to the appropriate module in `tools/`
4. Update `tools/__init__.py` to export your tool
5. Add your tool to the tools list in `agents.py`
6. Test your changes
7. Submit a pull request

### Adding New Tools

1. Create a new file in `tools/` (e.g., `tools/calendar_tools.py`)
2. Implement your tool function with proper type hints and docstrings
3. Add the import to `tools/__init__.py`
4. Add the tool to the tools list in `agents.py`
5. Update this README with documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **LangGraph**: For the powerful graph-based agent framework
- **LangChain**: For the LLM integration capabilities
- **LangSmith**: For tracing, observability, and API key management
- **OpenAI**: For the GPT models
- **Tavily**: For the web search API
- **OpenWeatherMap**: For weather data API
- **NewsAPI**: For news articles
- **Various Free APIs**: For quotes, jokes, crypto prices, and dictionary data

## 📞 Support

For issues and questions:
1. Check the troubleshooting section above
2. Review the LangGraph documentation
3. Open an issue on the repository

## 🧑‍💻 CopilotKit Integration & Frontend Spin-Up

This project includes a modern Next.js frontend powered by [CopilotKit](https://copilotkit.ai), which provides a beautiful UI and connects seamlessly to the LangGraph agent backend.

### How It Works
- The frontend (in `web/`) uses CopilotKit to communicate with the LangGraph agent running at `http://localhost:2024` (or `127.0.0.1:2024`).
- The integration is handled via an API route at `/api/copilotkit`, which proxies requests from the frontend to the backend agent.
- The key integration code is in [`web/app/api/copilotkit/route.ts`]:

```ts
import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
  LangGraphAgent
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";

const serviceAdapter = new ExperimentalEmptyAdapter();

const runtime = new CopilotRuntime({
  agents: {
    agent: new LangGraphAgent({
      deploymentUrl: "http://127.0.0.1:2024", // or "http://localhost:2024"
      graphId: "agent"
    })
  }
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
```

### How to Run the Frontend

1. **Install dependencies** (only needed once):
   ```bash
   cd web
   npm install
   ```
2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   This will start the Next.js app at [http://localhost:3000](http://localhost:3000).

> **Note:** The LangGraph backend agent must be running at `http://localhost:2024` for the CopilotKit frontend to function.

### Full Stack Spin-Up (Backend + Frontend)

1. **Start the LangGraph agent backend:**
   ```bash
   langgraph dev --host localhost --port 2024
   ```
2. **Start the CopilotKit Next.js frontend:**
   ```bash
   cd web
   npm install  # only needed once
   npm run dev
   ```

You can now access the full multi-agent system with a modern UI at [http://localhost:3000](http://localhost:3000).

### Frontend Environment Variables

The CopilotKit-powered frontend requires some environment variables to be set in a `.env.local` file in the `web/` directory. You can use the provided `web/.env copy.local` as a template:

```env
# CopilotKit Configuration
# Replace with your actual CopilotKit Cloud API key
NEXT_PUBLIC_COPILOT_API_KEY=

# Your local LangGraph dev server URL
NEXT_PUBLIC_COPILOTKIT_RUNTIME_URL=http://localhost:2024

# Your LangGraph agent name (matches agents.py)
NEXT_PUBLIC_COPILOTKIT_AGENT_NAME=agent
```

- `NEXT_PUBLIC_COPILOT_API_KEY`: (Optional for local/dev) Your CopilotKit Cloud API key, if using CopilotKit Cloud features.
- `NEXT_PUBLIC_COPILOTKIT_RUNTIME_URL`: The URL of your running LangGraph backend (default: `http://localhost:2024`).
- `NEXT_PUBLIC_COPILOTKIT_AGENT_NAME`: The agent name as defined in your backend (default: `agent`).

**To set up:**
1. Copy the template:
   ```bash
   cp .env\ copy.local .env.local
   ```
2. Edit `.env.local` and fill in any required values.

---

**Happy coding! 🚀**
