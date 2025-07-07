import { useEffect } from 'react';
import './ViafouraEngagementStarter.scss';
import { Title } from './components/Title';
import { sendMessage } from './ComposerHandler';

const ViafouraEngagementStarterView = () => {
  useEffect(() => {
    sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  return (
    <div className="container view">
      <Title />
      <div className="channelName">
        <p>Viafoura Engagement Starter</p>
      </div>
      <button
        className='buttonPrimary'
        onClick={() => {
          window.open("https://console.viafoura.co/moderation/workspaces", '_blank');
        }}
      >
        Go to moderation console
      </button>
    </div>
  );
};

ViafouraEngagementStarterView.lazy = true;
export default ViafouraEngagementStarterView;
