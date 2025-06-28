"use client";

import React from 'react';
import { BaseCard } from './BaseCard';
import { MathCard } from './MathCard';
import { CryptoCard } from './CryptoCard';
import { SearchCard } from './SearchCard';
import { GitHubCard } from './GitHubCard';
import { NASACard } from './NASACard';
import { WikipediaCard } from './WikipediaCard';
import { TimezoneCard } from './TimezoneCard';
import { QRCodeCard } from './QRCodeCard';
import { URLCard } from './URLCard';
import { UnitConversionCard } from './UnitConversionCard';
import { HolidayCard } from './HolidayCard';
import { DefinitionCard } from './DefinitionCard';
import WeatherCard from './WeatherCard';
import IPCard from './IPCard';

// Re-export BaseCard for backward compatibility
export { BaseCard as ToolCard } from './BaseCard';

interface ToolResultCardProps {
  toolName: string;
  result: any;
  themeColor: string;
}

export function ToolResultCard({ toolName, result, themeColor }: ToolResultCardProps) {
  // Helper for default rendering
  const renderDefault = (data: any) => (
    <BaseCard
      icon={<span className="text-white text-xl">🔧</span>}
      title={toolName.replace(/_/g, ' ')}
      subtitle="Tool Result"
      themeColor={themeColor}
      details={
        <pre className="whitespace-pre-wrap break-words text-white text-sm">
          {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
        </pre>
      }
    />
  );

  switch (toolName) {
    // Math tools
    case 'add':
    case 'multiply':
    case 'divide':
    case 'subtract':
      return (
        <MathCard
          operation={toolName}
          result={result}
          themeColor={themeColor}
        />
      );

    // Weather
    case 'get_weather':
      return (
        <WeatherCard
          location={result.city || result.location || 'Unknown Location'}
          temperature={result.temperature || result.temp}
          description={result.description || result.condition}
          humidity={result.humidity}
          wind={result.wind_speed || result.wind}
          feelsLike={result.temperature}
          themeColor={themeColor}
        />
      );

    // Crypto
    case 'get_crypto_price':
      return (
        <CryptoCard
          symbol={result.symbol || 'Unknown'}
          price={result.price || result.current_price || 'N/A'}
          change24h={result.change_24h}
          themeColor={themeColor}
        />
      );

    // Search results
    case 'web_search':
      return (
        <SearchCard
          type="web"
          query={result.query || 'Search'}
          answer={result.answer}
          results={result.results}
          themeColor={themeColor}
        />
      );
    case 'search_news':
      return (
        <SearchCard
          type="news"
          query={result.query || 'News Search'}
          answer={result.answer}
          results={result.results}
          themeColor={themeColor}
        />
      );
    case 'search_academic':
      return (
        <SearchCard
          type="academic"
          query={result.query || 'Academic Search'}
          answer={result.answer}
          results={result.results}
          themeColor={themeColor}
        />
      );

    // GitHub
    case 'get_trending_github_repos':
      return (
        <GitHubCard
          repos={result.repos || []}
          themeColor={themeColor}
        />
      );

    // NASA
    case 'get_nasa_apod':
      return (
        <NASACard
          title={result.title || 'NASA APOD'}
          date={result.date}
          explanation={result.explanation}
          url={result.url}
          hdurl={result.hdurl}
          mediaType={result.media_type}
          themeColor={themeColor}
        />
      );

    // Wikipedia
    case 'get_wikipedia_summary':
      return (
        <WikipediaCard
          title={result.title || 'Wikipedia'}
          summary={result.summary || 'No summary available'}
          url={result.url}
          themeColor={themeColor}
        />
      );

    // Timezone
    case 'get_current_timezone':
      return (
        <TimezoneCard
          timezone={result.timezone || result.zone || 'Unknown'}
          time={result.time || result.current_time || 'N/A'}
          location={result.location}
          offset={result.offset}
          themeColor={themeColor}
        />
      );

    // QR Code
    case 'generate_qr_code':
      return (
        <QRCodeCard
          qrCodeUrl={result.qr_code_url}
          data={result.data}
          themeColor={themeColor}
        />
      );

    // URL Shortening
    case 'shorten_url':
      return (
        <URLCard
          originalUrl={result.original_url}
          shortUrl={result.short_url || result.shortened}
          themeColor={themeColor}
        />
      );

    // Unit Conversion
    case 'convert_unit':
      return (
        <UnitConversionCard
          fromValue={result.from_value || result.value}
          fromUnit={result.from_unit}
          toValue={result.result || result.converted_value}
          toUnit={result.to_unit}
          type="general"
          themeColor={themeColor}
        />
      );
    case 'convert_land_unit':
      return (
        <UnitConversionCard
          fromValue={result.from_value || result.value}
          fromUnit={result.from_unit}
          toValue={result.result || result.converted_value}
          toUnit={result.to_unit}
          type="land"
          themeColor={themeColor}
        />
      );

    // Public Holidays
    case 'get_public_holidays':
      return (
        <HolidayCard
          country={result.country || 'Unknown Country'}
          holidays={result.holidays || []}
          themeColor={themeColor}
        />
      );

    // IP Info
    case 'get_ip_info':
      return (
        <IPCard
          ip={result.ip || 'Unknown IP'}
          location={result.location || `${result.city || ''}, ${result.country || ''}`}
          isp={result.isp}
          themeColor={themeColor}
        />
      );

    // Word Definition
    case 'get_word_definition':
      return (
        <DefinitionCard
          word={result.word || 'Unknown Word'}
          partOfSpeech={result.part_of_speech}
          definition={result.definition || 'No definition available'}
          example={result.example}
          pronunciation={result.pronunciation}
          themeColor={themeColor}
        />
      );

    // Default fallback
    default:
      return renderDefault(result);
  }
} 