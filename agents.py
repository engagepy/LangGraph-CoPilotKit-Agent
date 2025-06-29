import os
from dotenv import load_dotenv
from langchain_core.messages import SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import START, StateGraph, MessagesState
from langgraph.prebuilt import tools_condition, ToolNode

# Import all tools from the tools package
from tools import (
    add, multiply, divide,
    get_weather,
    get_crypto_price, get_ip_info, get_word_definition,
    web_search, search_news, search_academic,
    get_nasa_apod, get_wikipedia_summary, get_public_holidays,
    get_trending_github_repos, shorten_url, generate_qr_code,
    get_current_timezone, convert_unit, convert_land_unit
)



# Load environment variables from .env file
load_dotenv()

# List of available tools
tools = [
    add, multiply, divide,
    get_weather,
    get_crypto_price, get_ip_info, get_word_definition,
    web_search, search_news, search_academic,
    get_nasa_apod, get_wikipedia_summary, get_public_holidays,
    get_trending_github_repos, shorten_url, generate_qr_code,
    get_current_timezone, convert_unit, convert_land_unit
]

# Define LLM with bound tools
llm = ChatOpenAI(model="gpt-4o")
llm_with_tools = llm.bind_tools(tools)

# System message
sys_msg = SystemMessage(content="""
                                You are Turtl AI, the world's most helpful AI assistant, created by Zorawar Purohit.

                                At the beginning of every new thread, always introduce yourself and briefly list your main capabilities, such as:
                                - Math operations
                                - Weather, news, and quotes
                                - Crypto and stock prices
                                - Web, Wikipedia, and news search
                                - Public holidays, exchange rates,
                                - GitHub trends, URL shortener, QR code, 
                                - Time zone and unit conversion, and more

                                After your introduction, answer the user's query. 
                                Remove markdown, emdash, and ** from all responses, including tool outputs. 
                                Always use clear bullet points and formatting for readability.
                        
                                Always render citation and link from web search results.
                        
                                Always use web search tool for stock price enquiry.
                                Always use web search tool for news enquiry.
                                Always use web search tool for academic enquiry.
                                Always use web search tool for wikipedia enquiry.
                                Always use web search tool for any external information you need, esepcially when another tool is not available.
                                Use web search when a tool call fails as backup to answer the user's query.
                        
                                Note these donts :

                                - Do not call QR code tool along with any other tool.
                                - Do not call URL shortener tool along with any other tool.
                                - Do not call Wikipedia tool along with any other tool.
                                - Do not call NASA APOD tool along with any other tool.
                                - Do not call Public holidays tool along with any other tool.
                                - Do not call GitHub trends tool along with any other tool.
                                - Do not call Timezone tool along with any other tool.
                        
                                Always one at a time. 
                                """)

# Node
def assistant(state: MessagesState):
   return {"messages": [llm_with_tools.invoke([sys_msg] + state["messages"])]}



# Build graph
builder = StateGraph(MessagesState)
builder.add_node("assistant", assistant)
builder.add_node("tools", ToolNode(tools))
builder.add_edge(START, "assistant")
builder.add_conditional_edges(
    "assistant",
    # If the latest message (result) from assistant is a tool call -> tools_condition routes to tools
    # If the latest message (result) from assistant is a not a tool call -> tools_condition routes to END
    tools_condition,
)
builder.add_edge("tools", "assistant")

# Compile graph
graph = builder.compile() 