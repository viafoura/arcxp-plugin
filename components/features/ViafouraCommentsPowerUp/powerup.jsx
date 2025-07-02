import { useEffect, useState } from 'react';
import get from 'lodash.get';
import ViafouraCommentsSearch from './children/ViafouraComments-search.jsx';
import ViafouraCommentsView from './children/ViafouraComments-view.jsx';
import ViafouraCommentsEdit from './children/ViafouraComments-edit.jsx';

//This component is the Block that is added to a page
//and it controls which frame to display based on the URL
const PowerUpTemplate = () => {
  const [actionID, setActionID] = useState('');

  const getActionParam = () => {
    const actionHash = get(window, 'location.hash', 'NONE');
    setActionID(actionHash.toUpperCase());
  };

  useEffect(() => getActionParam(), []);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      {actionID.includes('#SEARCH') && <ViafouraCommentsSearch />}
      {actionID.includes('#VIEW') && <ViafouraCommentsView />}
      {actionID.includes('#EDIT') && <ViafouraCommentsEdit />}
    </div>
  );
};

export default PowerUpTemplate;
