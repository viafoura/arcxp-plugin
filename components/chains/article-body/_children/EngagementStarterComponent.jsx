import { useEffect } from 'react';

export const EngagementStarterComponent = ({ embed }) => {
  const data = embed.config;

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');

        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () =>
          reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
      });
    };

    const initEngagementStarter = async () => {
      Array.from(document.scripts).some(s => s.src === new URL('//cdn.viafoura.net/entry/index.js', location.origin).href)
        ? undefined
        : await loadScript('//cdn.viafoura.net/entry/index.js');

        const container = document.getElementById('viafoura-engagement-holder');
        if (container) {
            container.innerHTML = `<vf-conversation-starter target="viafoura-conversation-holder"></vf-conversation-starter>`;
        }
    };

    initEngagementStarter().catch((error) =>
      console.error('Failed to initialize engagement starter:', error)
    );

    return () => {
      const scripts = document.querySelectorAll('script[src*="viafoura.net"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div className="viafoura-container">
      <div id="viafoura-engagement-holder" className="viafoura">
        
      </div>
    </div>
  );
};
