# 🚀 WORKING LangGraph Deployment Setup 

## ⚡ IMMEDIATE STEPS - DO THIS NOW

### 1. Create `.env` file in project root:

```bash
cp ".env copy" .env
```

### 2. Edit `.env` with YOUR deployment details:

```env
LANGGRAPH_URL=https://your-actual-deployment-url.langchain.com
LANGCHAIN_API_KEY=lsv2_pt_your-actual-api-key-here
LANGSMITH_API_KEY=lsv2_pt_your-actual-api-key-here
LANGCHAIN_TRACING_V2=true
OPENAI_API_KEY=sk-your-openai-key
```

### 3. Create `web/.env.local`:

```env
NEXT_PUBLIC_COPILOT_API_KEY=
NEXT_PUBLIC_COPILOTKIT_RUNTIME_URL=https://your-actual-deployment-url.langchain.com
NEXT_PUBLIC_COPILOTKIT_AGENT_NAME=agent
```

### 4. Get Your Real Values:

**From LangSmith (https://smith.langchain.com/):**
- Go to Settings → API Keys  
- Copy key starting with `lsv2_pt_`

**From LangGraph Platform:**
- Copy your deployment URL (ends with `.langchain.com`)

### 5. Run:

```bash
cd web
npm run dev
```

## ⚠️ CRITICAL NOTES:
- API key MUST start with `lsv2_pt_`
- URL MUST be your exact deployment URL 
- Both .env files MUST have the SAME deployment URL

## 🧪 TEST YOUR CONNECTION (DO THIS FIRST!)

```bash
node test-connection.js
```

This will verify your deployment URL and API key work BEFORE starting the frontend.

## 🚀 If Test Passes, Run Frontend:

Once configured, run your frontend:

```bash
# Install dependencies (if not already done)
cd web && npm install

# Start the development server
npm run dev
```

Your app will run at http://localhost:3000 and connect to your deployed LangGraph agent!

## 🔄 How It Works

1. **User Input**: User types in the CopilotKit chat interface
2. **API Route**: Request goes to `/api/copilotkit` (route.ts)  
3. **LangGraph SDK**: Direct connection to your deployed agent using `@langchain/langgraph-sdk`
4. **Streaming Response**: Real-time streaming of agent responses back to the UI

## 🛠️ Key Changes Made

- **Replaced CopilotKit LangGraphAgent**: Now using direct SDK connection
- **Minimal Code Changes**: Only route.ts modified for maximum simplicity
- **Environment-Based**: Easy switching between local and deployed agents

## 📝 Notes

- Your deployed agent on LangGraph Platform is fully managed
- All tools and capabilities from your `agents.py` are available
- Frontend runs locally but connects to your cloud deployment
- Perfect for development while using production agent infrastructure

## 🔧 Troubleshooting

1. **Connection Issues**: Verify `LANGGRAPH_URL` is correct and accessible
2. **Auth Errors**: Check `LANGCHAIN_API_KEY` is valid
3. **Agent Not Found**: Ensure agent name "agent" matches your deployment

Your deployment is ready! 🎉 