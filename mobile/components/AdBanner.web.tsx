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
  // Valid AdSense slot IDs are numeric strings (e.g. "1234567890")
  const hasValidSlot = Boolean(slotId && /^\d+$/.test(slotId) && slotId !== 'YOUR_SLOT_ID');

  useEffect(() => {
    // Ensure the AdSense script tag is in document.head
    if (typeof document !== 'undefined' && !document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    if (!hasValidSlot || isPushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      isPushed.current = true;
    } catch (e) {
      console.warn('AdSense push error:', e);
    }
  }, [hasValidSlot]);

  // If a valid slot ID is configured, render the manual ad unit
  if (hasValidSlot) {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '728px',
          maxHeight: '90px',
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
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="false"
          data-adtest={__DEV__ ? 'on' : undefined}
        />
      </div>
    );
  }

  // When no manual slot is provided (e.g., during AdSense site approval review),
  // Google Auto-Ads dynamically discovers placement spots. We provide a clean container
  // that avoids console errors and layout shifts.
  return (
    <div
      className="adsense-auto-ad-container"
      style={{
        width: '100%',
        maxWidth: '728px',
        minHeight: '1px',
        margin: '4px auto',
        textAlign: 'center',
      }}
    />
  );
};