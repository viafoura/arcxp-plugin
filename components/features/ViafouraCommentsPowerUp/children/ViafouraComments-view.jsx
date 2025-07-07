import { useEffect, useState } from 'react';
import './ViafouraComments.scss';
import { Title } from './components/Title';
import { sendMessage, getPayload } from './ComposerHandler';

const ViafouraCommentsView = () => {
  const [containerId, setContainerId] = useState('');

  useEffect(() => {
    sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    const data = getPayload();
    console.log(data);
    setContainerId(data?.config?.containerId);
  }, []);

  if (!containerId) {
    return (
      <div>Something went wrong, please edit the PowerUp and try again!</div>
    );
  }

  return (
    <div className="container view">
      <Title />
      <div className="channelName">
        <p>Comments Container ID</p>
        <h2 style={{ color: '#000'}}> {containerId}</h2>
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

ViafouraCommentsView.lazy = true;
export default ViafouraCommentsView;
