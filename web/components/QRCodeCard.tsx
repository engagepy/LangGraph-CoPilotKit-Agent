import React from 'react';
import { QrCode, Download } from 'lucide-react';
import { BaseCard } from './BaseCard';

export interface QRCodeCardProps {
  qrCodeUrl?: string;
  data?: string;
  size?: number;
  themeColor: string;
  textColor?: string;
}

const QRCodeCard: React.FC<QRCodeCardProps> = ({
  qrCodeUrl,
  data,
  size = 150,
  themeColor,
  textColor = "#fff",
}) => {
  return (
    <BaseCard
      icon={<QrCode className="w-12 h-12" style={{ color: textColor, opacity: 0.9 }} />}
      title="QR Code"
      subtitle="Generated Successfully"
      themeColor={themeColor}
      textColor={textColor}
    >
      <div className="mt-4 flex flex-col items-center">
        {qrCodeUrl ? (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={qrCodeUrl}
              alt="QR Code"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
        ) : (
          <div className="bg-white/15 p-8 rounded-lg text-center">
            <QrCode className="w-16 h-16 mx-auto mb-2" style={{ color: textColor, opacity: 0.5 }} />
            <p className="text-sm" style={{ color: textColor, opacity: 0.7 }}>Generating QR Code...</p>
          </div>
        )}

        {data && (
          <div className="mt-3 text-center w-full">
            <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>Encoded Data:</p>
            <p
              className="text-sm font-mono break-all bg-white/10 p-2 rounded mt-1"
              style={{ color: textColor, opacity: 0.92 }}
            >
              {data.slice(0, 50)}{data.length > 50 ? '...' : ''}
            </p>
          </div>
        )}

        {qrCodeUrl && (
          <div className="mt-4 pt-4 border-t w-full flex items-center justify-center"
            style={{ borderColor: textColor, opacity: 0.3 }}>
            <a
              href={qrCodeUrl}
              download="qrcode.png"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-lg"
              style={{ color: textColor, textDecoration: "underline", fontWeight: 500 }}
            >
              <Download className="w-4 h-4" />
              <span>Download QR Code</span>
            </a>
          </div>
        )}
      </div>
    </BaseCard>
  );
};

export default QRCodeCard;