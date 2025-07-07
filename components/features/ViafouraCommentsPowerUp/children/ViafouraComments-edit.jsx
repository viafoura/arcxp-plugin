import { useState, useEffect } from 'react';
import './ViafouraComments.scss';
import { useContent } from 'fusion:content';
import { Loading } from './components/Loading/Loading';
import { CreateContainer } from './components/CreateContainer';
import { Title } from './components/Title';
import { getStarterPowerUpANS, sendMessage, getPayload } from './ComposerHandler';

const ViafouraCommentsEdit = () => {
  const [firePost, setFirePost] = useState(null);
  const [containerId, setContainerId] = useState(null);
  const [newContainerId, setNewContainerId] = useState(null);
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

    const data = getPayload();
    setContainerId(data?.config?.containerId);
  }, []);

  useEffect(() => {
    if (createContainerData) {
      setIsLoading(false);
      save({
        containerId: newContainerId,
      });
    }
  }, [createContainerData]);

  return (
    <div className="container">
      {isLoading && <Loading />}
      <Title />
      <CreateContainer initialValue={containerId} onCreateContainer={handleCreateContainer} />
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

ViafouraCommentsEdit.lazy = true;
export default ViafouraCommentsEdit;
