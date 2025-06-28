import React from 'react';
import { QrCode, Download } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface QRCodeCardProps {
  qrCodeUrl?: string;
  data?: string;
  size?: number;
  themeColor: string;
}

export const QRCodeCard: React.FC<QRCodeCardProps> = ({
  qrCodeUrl,
  data,
  size = 150,
  themeColor
}) => {
  return (
    <BaseCard
      icon={<QrCode className="w-12 h-12 text-gray-200" />}
      title="QR Code"
      subtitle="Generated Successfully"
      themeColor={themeColor}
    >
      <div className="mt-4 flex flex-col items-center">
        {qrCodeUrl ? (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="w-32 h-32"
              style={{ width: `${size}px`, height: `${size}px` }}
            />
          </div>
        ) : (
          <div className="bg-white/15 p-8 rounded-lg text-center">
            <QrCode className="w-16 h-16 text-white/60 mx-auto mb-2" />
            <p className="text-white/80 text-sm">QR Code Generated</p>
          </div>
        )}
        
        {data && (
          <div className="mt-3 text-center">
            <p className="text-white/80 text-xs">Encoded Data:</p>
            <p className="text-white text-sm font-mono break-all bg-white/10 p-2 rounded mt-1">
              {data.slice(0, 50)}{data.length > 50 ? '...' : ''}
            </p>
          </div>
        )}

        {qrCodeUrl && (
          <div className="mt-4 pt-4 border-t border-white/30 w-full">
            <a 
              href={qrCodeUrl} 
              download="qrcode.png"
              className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-lg"
            >
              <Download className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Download QR Code</span>
            </a>
          </div>
        )}
      </div>
    </BaseCard>
  );
}; 