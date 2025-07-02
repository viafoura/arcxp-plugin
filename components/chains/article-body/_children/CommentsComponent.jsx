import { useEffect } from 'react';

/**
 * Handles the composer-driven sidebar component together with the power-up for sidebars
 * @param {*} embed - power-up stored data (custom_embed)
 * @returns
 */
export const CommentsComponent = ({ embed }) => {
  const data = embed.config;

  useEffect(() => {
    // Function to dynamically load scripts
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

    // Load scripts and initialize window.vf
    const initComments = async () => {
      if (!window.vf) {
        await loadScript(
          '//cdn.viafoura.net/entry/index.js'
        )
      }

      const container = document.querySelector('.viafoura');
      let containerId = data.channelId;
      if (container) {
          container.innerHTML = `<vf-conversations vf-container-id="${containerId}"></vf-conversations><vf-tray-trigger floating="true"></vf-tray-trigger>`;
      }
    };

    initComments().catch((error) =>
      console.error('Failed to initialize comments:', error)
    );

    // Cleanup function to remove scripts if component unmounts
    return () => {
      const scripts = document.querySelectorAll('script[src*="viafoura.net"]');

      scripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div className="viafoura-container">
      <div className="viafoura">
        
      </div>
    </div>
  );
};
