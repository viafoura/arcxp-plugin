import { useEffect } from 'react';
import './ViafouraEngagementStarter.scss';
import { Title } from './components/Title';
import { getStarterPowerUpANS, sendMessage } from './ComposerHandler';

const ViafouraEngagementStarterSearch = () => {
  const save = (container) => {
    const ansStarter = getStarterPowerUpANS();
    const toInject = container;
    const ansCustomEmbed = {
      ...ansStarter,
      config: {
        ...toInject,
      },
    };
    sendMessage('data', ansCustomEmbed);
  };

  const cancel = () => {
    sendMessage('cancel');
  };

  const handleCreateContainer = () => {
    save({

    });
  };

  useEffect(() => {
    sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  return (
    <div className="container">
      <Title />
      <div className="optionContainer">
      <h2>New engagement starter</h2>
      <button
        className="buttonSecondary"
        onClick={() => handleCreateContainer()}
      >
        Add engagement starter
      </button>
    </div>
      <button
        className="buttonPrimary"
        onClick={cancel}
        style={{
          alignSelf: 'end',
        }}
      >
        Cancel
      </button>
    </div>
  );
};

ViafouraEngagementStarterSearch.lazy = true;
export default ViafouraEngagementStarterSearch;
