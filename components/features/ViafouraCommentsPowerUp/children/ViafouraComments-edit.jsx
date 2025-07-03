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

  // ********** CONTENT SOURCES **************  //
  const createContainerData = useContent({
    source: firePost,
    query: {
      containerId: newContainerId,
    },
  });

  // ********** FUNCTIONS **************  //

  const save = (container) => {
    //getStarterPowerUpANS creates an object with the necessary ANS keys
    const ansStarter = getStarterPowerUpANS();
    const toInject = container;
    const ansCustomEmbed = {
      ...ansStarter,
      //Your data is stored in the config object
      config: {
        ...toInject,
      },
    };
    //Save the data by sending the ANS object with a "data" message
    sendMessage('data', ansCustomEmbed);
  };

  const cancel = () => {
    //Cancel the iFrame by sending a "cancel" message
    sendMessage('cancel');
  };

  const handleCreateContainer = (containerId) => {
    setNewContainerId(containerId);
    setIsLoading(true);
    setFirePost('viafoura-post-container');
  };

  //  ********** USE EFFECTS **************  //
  useEffect(() => {
    //Composer always requires a "ready" message
    sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    //getPayload parses the data from the iFrame URL
    //giving you access to whatever you have stored in config
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

  //  ********** RENDER **************  //
  return (
    <div className="container">
      {isLoading && <Loading />}
      <Title />
      <CreateContainer initialValue={containerId} onCreateContainer={handleCreateContainer} />
      <button
        className='buttonPrimary'
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
