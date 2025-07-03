import { useEffect, useState } from 'react';
import './ViafouraComments.scss';
import { Title } from './components/Title';
import { sendMessage, getPayload } from './ComposerHandler';

//This component is the frame that displays your data in the story in the UI
//It can either display stored data or use a stored search term to get data
//from a third-party API
const ViafouraCommentsView = () => {
  const [containerId, setContainerId] = useState('');

  useEffect(() => {
    //Composer always requires a "ready" message
    sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    //getPayload parses the data from the iFrame URL
    //giving you access to whatever you have stored in config
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
