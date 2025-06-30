// app/api/route.ts
import { NextRequest } from 'next/server'
import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
  LangGraphAgent,
} from '@copilotkit/runtime'

const serviceAdapter = new ExperimentalEmptyAdapter()

export const OPTIONS = () => new Response(null, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Api-Key',
  },
});
// Create runtime with LangGraph agent
const runtime = new CopilotRuntime({
  agents: {
    agent: new LangGraphAgent({
      deploymentUrl: process.env.LANGGRAPH_URL as string,
      graphId: 'agent',
    }) as any,
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