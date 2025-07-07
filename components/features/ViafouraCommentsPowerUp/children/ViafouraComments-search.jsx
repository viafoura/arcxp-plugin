import { useState, useEffect } from 'react';
import './ViafouraComments.scss';
import { useContent } from 'fusion:content';
import { Loading } from './components/Loading/Loading';
import { CreateContainer } from './components/CreateContainer';
import { Title } from './components/Title';
import { getStarterPowerUpANS, sendMessage } from './ComposerHandler';

const ViafouraCommentsSearch = () => {
  const [firePost, setFirePost] = useState(null);
  const [newContainerId, setNewContainerId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createContainerData = useContent({
    source: firePost,
    query: {
      containerId: newContainerId,
    },
  });

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

  const handleCreateContainer = (containerId) => {
    setNewContainerId(containerId);
    setIsLoading(true);
    setFirePost('viafoura-post-container');
  };

  useEffect(() => {
    sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  useEffect(() => {
    if (createContainerData) {
      setIsLoading(false);
      save({
        containerId: newContainerId
      });
    }
  }, [createContainerData]);

  return (
    <div className="container">
      {isLoading && <Loading />}
      <Title />
      <CreateContainer onCreateContainer={handleCreateContainer} />
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

ViafouraCommentsSearch.lazy = true;
export default ViafouraCommentsSearch;
