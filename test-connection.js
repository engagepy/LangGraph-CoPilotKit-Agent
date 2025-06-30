// Quick test to verify your LangGraph deployment connection
// Run with: node test-connection.js

require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing LangGraph deployment connection...\n');
  
  // Check environment variables
  const url = process.env.LANGGRAPH_URL;
  const apiKey = process.env.LANGCHAIN_API_KEY || process.env.LANGSMITH_API_KEY;
  
  console.log('📋 Configuration:');
  console.log(`   URL: ${url || '❌ MISSING'}`);
  console.log(`   API Key: ${apiKey ? `✅ ${apiKey.substring(0, 12)}...` : '❌ MISSING'}\n`);
  
  if (!url || !apiKey) {
    console.log('❌ Missing required environment variables!\n');
    console.log('💡 Make sure your .env file has:');
    console.log('   LANGGRAPH_URL=https://your-deployment-url.langchain.com');
    console.log('   LANGCHAIN_API_KEY=lsv2_pt_your-api-key-here');
    return;
  }
  
  try {
    // Test basic connectivity
    console.log('🚀 Testing connection...');
    
    const testUrl = `${url.replace(/\/$/, '')}/runs`;
    const response = await fetch(testUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        assistant_id: 'agent',
        input: {
          messages: [{ role: 'human', content: 'Hello test' }]
        }
      })
    });
    
    if (response.ok) {
      console.log('✅ Connection successful! Your deployment is working.\n');
      console.log('🎉 You can now run: cd web && npm run dev');
    } else {
      const error = await response.text();
      console.log(`❌ Connection failed: ${response.status}`);
      console.log(`   Response: ${error}\n`);
      
      if (response.status === 403) {
        console.log('💡 This is likely an API key issue. Make sure:');
        console.log('   - Your API key starts with "lsv2_pt_"');
        console.log('   - Your API key is valid and active');
      } else if (response.status === 404) {
        console.log('💡 This is likely a URL issue. Make sure:');
        console.log('   - Your deployment URL is correct');
        console.log('   - Your agent is named "agent" in the deployment');
      }
    }
  } catch (error) {
    console.log(`❌ Connection error: ${error.message}\n`);
    console.log('💡 Check your internet connection and deployment URL');
  }
}

testConnection(); 