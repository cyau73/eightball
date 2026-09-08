import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
}

const ADSENSE_CLIENT_ID = 'ca-pub-1519113587025254';

export const AdBanner: React.FC<AdBannerProps> = ({ slotId = '', format = 'auto' }) => {
  const isPushed = useRef(false);

  useEffect(() => {
    // Ensure the AdSense script tag is in document.head
    if (typeof document !== 'undefined' && !document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    if (isPushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      isPushed.current = true;
    } catch (e) {
      console.error('AdSense push error:', e);
    }
  }, [slotId]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '728px',
        maxHeight: '90px', // Explicitly cap height
        height: '90px',
        margin: '8px auto',
        textAlign: 'center',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'block',
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '100%', height: '90px' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId || undefined}
        data-ad-format={format}
        data-full-width-responsive="false" // Disable vertical expanding
        data-adtest={__DEV__ ? 'on' : undefined}
      />
    </div>
  );
};