"use client";

import { Calculator, Cloud, DollarSign, Calendar, Github, Globe, BookOpen, Clock, QrCode, Link, Search, Rocket, Map, TrendingUp } from 'lucide-react';

interface ToolResultCardProps {
  toolName: string;
  result: any;
  themeColor: string;
}

export function ToolResultCard({ toolName, result, themeColor }: ToolResultCardProps) {
  const cardBaseStyle = {
    backgroundColor: themeColor,
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    marginTop: '1.5rem',
    marginBottom: '1rem',
    maxWidth: '28rem',
    width: '100%',
  };

  const contentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '1rem',
    width: '100%',
  };

  switch (toolName) {
    case 'add':
    case 'multiply':
    case 'divide':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white capitalize">Math Result</h3>
                <p className="text-white text-sm">Calculation: {toolName}</p>
              </div>
              <Calculator className="w-12 h-12 text-yellow-200" />
            </div>
            <div className="text-3xl font-bold text-white">{result}</div>
          </div>
        </div>
      );

    case 'get_weather':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">Weather</h3>
                <p className="text-white text-sm">{result.location || 'Current Location'}</p>
              </div>
              <Cloud className="w-12 h-12 text-blue-200" />
            </div>
            <div className="text-2xl font-bold text-white mb-2">{result.temperature || result.temp || 'N/A'}</div>
            <div className="text-sm text-white opacity-90">{result.description || result.condition || 'Weather info'}</div>
            {result.humidity && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div>
                  <p className="text-white text-xs">Humidity</p>
                  <p className="text-white font-medium">{result.humidity}</p>
                </div>
                <div>
                  <p className="text-white text-xs">Wind</p>
                  <p className="text-white font-medium">{result.wind_speed || 'N/A'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      );

    case 'get_crypto_price':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">Crypto Price</h3>
                <p className="text-white text-sm">{result.symbol || 'Cryptocurrency'}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-200" />
            </div>
            <div className="text-3xl font-bold text-white">${result.price || result.current_price || 'N/A'}</div>
            {result.change_24h && (
              <div className={`text-sm font-medium ${parseFloat(result.change_24h) >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                {parseFloat(result.change_24h) >= 0 ? '+' : ''}{result.change_24h}%
              </div>
            )}
          </div>
        </div>
      );

    case 'get_public_holidays':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">Public Holidays</h3>
                <p className="text-white text-sm">{result.country || 'Holidays'}</p>
              </div>
              <Calendar className="w-12 h-12 text-purple-200" />
            </div>
            <div className="space-y-2">
              {Array.isArray(result.holidays) ? result.holidays.slice(0, 3).map((holiday: any, index: number) => (
                <div key={index} className="bg-white/15 p-2 rounded text-white">
                  <div className="font-medium">{holiday.name}</div>
                  <div className="text-xs opacity-80">{holiday.date}</div>
                </div>
              )) : (
                <div className="text-white">{JSON.stringify(result).slice(0, 100)}...</div>
              )}
            </div>
          </div>
        </div>
      );

    case 'get_trending_github_repos':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">GitHub Trending</h3>
                <p className="text-white text-sm">Popular Repositories</p>
              </div>
              <Github className="w-12 h-12 text-gray-200" />
            </div>
            <div className="space-y-2">
              {Array.isArray(result.repos) ? result.repos.slice(0, 3).map((repo: any, index: number) => (
                <div key={index} className="bg-white/15 p-2 rounded text-white">
                  <div className="font-medium text-sm">{repo.name}</div>
                  <div className="text-xs opacity-80">{repo.language} • ⭐ {repo.stars}</div>
                </div>
              )) : (
                <div className="text-white text-sm">{JSON.stringify(result).slice(0, 120)}...</div>
              )}
            </div>
          </div>
        </div>
      );

    case 'web_search':
    case 'search_news':
    case 'search_academic':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">Search Results</h3>
                <p className="text-white text-sm">{toolName === 'search_news' ? 'News' : toolName === 'search_academic' ? 'Academic' : 'Web'}</p>
              </div>
              <Search className="w-12 h-12 text-blue-200" />
            </div>
            <div className="space-y-2">
              {Array.isArray(result.results) ? result.results.slice(0, 2).map((item: any, index: number) => (
                <div key={index} className="bg-white/15 p-2 rounded text-white">
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs opacity-80">{item.snippet || item.description}</div>
                </div>
              )) : (
                <div className="text-white text-sm">{JSON.stringify(result).slice(0, 120)}...</div>
              )}
            </div>
          </div>
        </div>
      );

    case 'get_nasa_apod':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">NASA APOD</h3>
                <p className="text-white text-sm">Astronomy Picture</p>
              </div>
              <Rocket className="w-12 h-12 text-orange-200" />
            </div>
            <div className="text-white">
              <div className="font-medium mb-1">{result.title}</div>
              <div className="text-xs opacity-80 mb-2">{result.date}</div>
              {result.url && (
                <div className="bg-white/15 p-2 rounded text-xs">
                  <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:underline">
                    View Image
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case 'get_wikipedia_summary':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">Wikipedia</h3>
                <p className="text-white text-sm">Summary</p>
              </div>
              <BookOpen className="w-12 h-12 text-indigo-200" />
            </div>
            <div className="text-white">
              <div className="font-medium mb-2">{result.title}</div>
              <div className="text-sm opacity-90">{result.summary?.slice(0, 150) + '...' || 'No summary available'}</div>
              {result.url && (
                <div className="mt-2">
                  <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-200 text-xs hover:underline">
                    Read more →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case 'get_current_timezone':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">Timezone</h3>
                <p className="text-white text-sm">Current Time</p>
              </div>
              <Clock className="w-12 h-12 text-teal-200" />
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold">{result.time || result.current_time}</div>
              <div className="text-sm opacity-80">{result.timezone || result.zone}</div>
            </div>
          </div>
        </div>
      );

    case 'generate_qr_code':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">QR Code</h3>
                <p className="text-white text-sm">Generated</p>
              </div>
              <QrCode className="w-12 h-12 text-gray-200" />
            </div>
            <div className="text-white">
              {result.qr_code_url ? (
                <img src={result.qr_code_url} alt="QR Code" className="w-24 h-24 mx-auto bg-white p-2 rounded" />
              ) : (
                <div className="bg-white/15 p-4 rounded text-center">QR Code Generated</div>
              )}
            </div>
          </div>
        </div>
      );

    case 'shorten_url':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">Short URL</h3>
                <p className="text-white text-sm">Link Shortened</p>
              </div>
              <Link className="w-12 h-12 text-cyan-200" />
            </div>
            <div className="text-white">
              <div className="bg-white/15 p-2 rounded mb-2">
                <div className="text-xs opacity-80 mb-1">Short URL:</div>
                <div className="font-mono text-sm break-all">{result.short_url || result.shortened}</div>
              </div>
              {result.original_url && (
                <div className="text-xs opacity-70">Original: {result.original_url.slice(0, 40)}...</div>
              )}
            </div>
          </div>
        </div>
      );

    case 'convert_unit':
    case 'convert_land_unit':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">Unit Conversion</h3>
                <p className="text-white text-sm">{toolName === 'convert_land_unit' ? 'Land Units' : 'General Units'}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-emerald-200" />
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold mb-1">{result.result || result.converted_value}</div>
              <div className="text-sm opacity-80">
                {result.from_unit} → {result.to_unit}
              </div>
            </div>
          </div>
        </div>
      );

    case 'get_ip_info':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">IP Information</h3>
                <p className="text-white text-sm">Network Details</p>
              </div>
              <Globe className="w-12 h-12 text-green-200" />
            </div>
            <div className="text-white space-y-1">
              <div><span className="opacity-80">IP:</span> {result.ip}</div>
              <div><span className="opacity-80">Location:</span> {result.city}, {result.country}</div>
              <div><span className="opacity-80">ISP:</span> {result.isp}</div>
            </div>
          </div>
        </div>
      );

    case 'get_word_definition':
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">Definition</h3>
                <p className="text-white text-sm">{result.word}</p>
              </div>
              <BookOpen className="w-12 h-12 text-purple-200" />
            </div>
            <div className="text-white">
              <div className="font-medium mb-1">{result.part_of_speech}</div>
              <div className="text-sm opacity-90">{result.definition}</div>
              {result.example && (
                <div className="mt-2 text-xs italic opacity-75">"{result.example}"</div>
              )}
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div style={cardBaseStyle}>
          <div style={contentStyle}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white capitalize">{toolName.replace(/_/g, ' ')}</h3>
                <p className="text-white text-sm">Tool Result</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🔧</span>
              </div>
            </div>
            <div className="text-white text-sm">
              <pre className="whitespace-pre-wrap break-words">
                {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      );
  }
} 