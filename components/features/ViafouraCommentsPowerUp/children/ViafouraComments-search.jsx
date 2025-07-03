import { useState, useEffect } from 'react';
import './ViafouraComments.scss';
import { useContent } from 'fusion:content';
import { Loading } from './components/Loading/Loading';
import { CreateContainer } from './components/CreateContainer';
import { Title } from './components/Title';
import { getStarterPowerUpANS, sendMessage } from './ComposerHandler';

//This component is the first frame you see when you open the Power-Up in the UI
//It captures the message in local state and adds it to the ANS on save
const ViafouraCommentsSearch = () => {
  const [firePost, setFirePost] = useState(null);
  const [newContainerId, setNewContainerId] = useState('');
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
  }, []);

  useEffect(() => {
    if (createContainerData) {
      setIsLoading(false);
      save({
        containerId: newContainerId
      });
    }
  }, [createContainerData]);

  //  ********** RENDER **************  //

  return (
    <div className="container">
      {isLoading && <Loading />}
      <Title />
      <CreateContainer onCreateContainer={handleCreateContainer} />
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

ViafouraCommentsSearch.lazy = true;
export default ViafouraCommentsSearch;
