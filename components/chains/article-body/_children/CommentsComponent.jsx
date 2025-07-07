import { useEffect } from 'react';

export const CommentsComponent = ({ embed }) => {
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

    const initComments = async () => {
      Array.from(document.scripts).some(s => s.src === new URL('//cdn.viafoura.net/entry/index.js', location.origin).href)
        ? undefined
        : await loadScript('//cdn.viafoura.net/entry/index.js');

      const container = document.getElementById('viafoura-conversation-holder');
      let containerId = data.containerId;
      embedContainerId(containerId);

      if (container) {
          container.innerHTML = `<vf-conversations></vf-conversations><vf-tray-trigger floating="true"></vf-tray-trigger>`;
      }
    };

    const embedContainerId = (containerId) => {
      let meta = document.querySelector('meta[name="vf:container_id"]');
      if (meta) {
        meta.setAttribute('content', containerId);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'vf:container_id');
        meta.setAttribute('content', containerId);
        document.head.appendChild(meta);
      }
    }

    initComments().catch((error) =>
      console.error('Failed to initialize comments:', error)
    );

    return () => {
      const scripts = document.querySelectorAll('script[src*="viafoura.net"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div className="viafoura-container">
      <div id="viafoura-conversation-holder" className="viafoura">
        
      </div>
    </div>
  );
};
