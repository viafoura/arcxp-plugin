import { useState, useEffect } from 'react';
import './ViafouraComments.scss';
import { useContent } from 'fusion:content';
import { Loading } from './components/Loading/Loading';
import { CreateContainer } from './components/CreateContainer';
import { Title } from './components/Title';
import { getStarterPowerUpANS, sendMessage } from './ComposerHandler';
import { VIAFOURA_SITE_DOMAIN } from "fusion:environment";

const ViafouraCommentsSearch = () => {
  const [fireLogin, setFireLogin] = useState(null);
  const [firePost, setFirePost] = useState(null);
  const [fireCreateComment, setFireCreateComment] = useState(null);
  const [newContainerId, setNewContainerId] = useState('');
  const [commentContainerUID, setComentContainerUUID] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(false);

  const loginData = useContent({
    source: fireLogin,
    query: {},
  });

  const createContainerData = useContent({
    source: firePost,
    query: {
      containerId: newContainerId,
    },
  });

  useContent({
    source: fireCreateComment,
    query: {
      authToken: accessToken,
      content: commentContent,
      containerId: commentContainerUID,
      articleURL: "https://" + VIAFOURA_SITE_DOMAIN
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

  const handleCreateContainer = (containerId, initialComment) => {
    setNewContainerId(containerId);
    setIsLoading(true);
    setFirePost('viafoura-post-container');
    if(initialComment && initialComment.length > 0){
      setFireLogin('viafoura-login');
      setCommentContent(initialComment);
    }
  };

  useEffect(() => {
    sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  useEffect(() => {
    if (createContainerData) {
      setComentContainerUUID(createContainerData.content_container_uuid);
      setIsLoading(false);
      save({
        containerId: newContainerId
      });
    }
  }, [createContainerData]);

  useEffect(() => {
    if (loginData) {
      setAccessToken(loginData.access_token);
      setFireCreateComment('viafoura-post-comment')
    }
  }, [createContainerData]);

  return (
    <div className="container">
      {isLoading && <Loading />}
      <Title />
      <CreateContainer isCreateMode onCreateContainer={handleCreateContainer} />
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
