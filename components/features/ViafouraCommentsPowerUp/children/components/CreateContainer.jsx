import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const CreateContainer = ({ initialValue, onCreateContainer }) => {
  const initialId = useMemo(() => initialValue || generateUUID(), [initialValue]);
  const [newContainerId, setNewContainerId] = useState(initialId);
  const [error, setError] = useState(null);

  function handleCreateContainer() {
    if (!newContainerId) {
      setError('Please enter a container ID');
      return;
    }

    onCreateContainer(newContainerId);
  }

  return (
    <div className="optionContainer">
      <h2>New comment container</h2>
      <input
        type="text"
        className="form-control search-input"
        placeholder="Container ID"
        value={newContainerId}
        onChange={(e) => {
          setError(null);
          setNewContainerId(e.target.value);
        }}
      ></input>
      <p style={{ color: 'red' }}>{error}</p>
      <button
        className="buttonSecondary"
        // disabled={!newChannelName}
        onClick={() => handleCreateContainer()}
      >
        Create container
      </button>
    </div>
  );
};
