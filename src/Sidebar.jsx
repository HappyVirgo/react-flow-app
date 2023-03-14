import React from 'react';
import { Background } from 'react-flow-renderer';

export default ({ toggleMode }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sideBar" style={{ paddingTop: "80px" }}>
      <div>
        <div className="dndnode1" onDragStart={(event) => onDragStart(event, 'entity')} draggable>
          <p style={{color: "white", fontSize: "20px"}}>Entity</p>
        </div>
        <div className="dndnode2" onDragStart={(event) => onDragStart(event, 'event')} draggable>
          <p style={{color: "white", fontSize: "20px"}}>Event</p>
        </div>
        <div className="dndnode3" onDragStart={(event) => onDragStart(event, 'test')} draggable>
          <p style={{color: "white", fontSize: "20px"}}>Test</p>
        </div>
        <div className="dndnode4" onDragStart={(event) => onDragStart(event, 'cause')} draggable>
          <p style={{color: "white", fontSize: "20px"}}>Cause</p>
        </div>
      </div>
      <button className="switchMode" onClick={toggleMode}>
        Switch
      </button>
    </aside>
  );
};
