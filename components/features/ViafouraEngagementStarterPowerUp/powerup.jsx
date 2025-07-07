import { useEffect, useState } from 'react';
import get from 'lodash.get';
import ViafouraEngagementStarterSearch from './children/ViafouraEngagementStarter-search.jsx';
import ViafouraEngagementStarterView from './children/ViafouraEngagementStarter-view.jsx';
import ViafouraEngagementStarterEdit from './children/ViafouraEngagementStarter-edit.jsx';

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
      {actionID.includes('#SEARCH') && <ViafouraEngagementStarterSearch />}
      {actionID.includes('#VIEW') && <ViafouraEngagementStarterView />}
      {actionID.includes('#EDIT') && <ViafouraEngagementStarterEdit />}
    </div>
  );
};

export default PowerUpTemplate;
