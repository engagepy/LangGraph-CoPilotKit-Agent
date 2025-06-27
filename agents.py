import os
from dotenv import load_dotenv
from langchain_core.messages import SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import START, StateGraph, MessagesState
from langgraph.prebuilt import tools_condition, ToolNode

# Import all tools from the tools package
from tools import (
    add,
    multiply,
    divide,
    get_weather,
    get_news,
    get_random_quote,
    get_joke,
    get_crypto_price,
    get_ip_info,
    get_word_definition,
    web_search,
    search_news,
    search_academic
)

# Load environment variables from .env file
load_dotenv()

# List of available tools
tools = [
    add,
    multiply,
    divide,
    get_weather,
    get_news,
    get_random_quote,
    get_joke,
    get_crypto_price,
    get_ip_info,
    get_word_definition,
    web_search,
    search_news,
    search_academic
]

# Define LLM with bound tools
llm = ChatOpenAI()
llm_with_tools = llm.bind_tools(tools)

# System message
sys_msg = SystemMessage(content="""You are the world most helpful AI assistant. Created by Zorawar Purohit.
                         Remove markdown and emdash and ** from responses including ones from tools before presenting them to the user.
                         Always use good bullet points and formatting to present your responses.
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