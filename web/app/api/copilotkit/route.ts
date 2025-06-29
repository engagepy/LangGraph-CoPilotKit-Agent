// app/api/route.ts
import { NextRequest } from 'next/server'
import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
  LangGraphAgent,
} from '@copilotkit/runtime'

const serviceAdapter = new ExperimentalEmptyAdapter()

// Create runtime with LangGraph agent
const runtime = new CopilotRuntime({
  agents: {
    agent: new LangGraphAgent({
      deploymentUrl: process.env.LANGGRAPH_URL || 'http://127.0.0.1:2024',
      graphId: 'agent',
    }),
  },
})

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: '/api/copilotkit',
  })

  return handleRequest(req)
}