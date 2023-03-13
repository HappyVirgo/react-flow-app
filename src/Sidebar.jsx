import React from 'react';
import { Background } from 'react-flow-renderer';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sideBar">
      <div className="dndnode1" onDragStart={(event) => onDragStart(event, 'entity')} draggable>
        Entity
      </div>
      <div className="dndnode2" onDragStart={(event) => onDragStart(event, 'event')} draggable>
        Event
      </div>
      <div className="dndnode3" onDragStart={(event) => onDragStart(event, 'test')} draggable>
        Test
      </div>
      <div className="dndnode4" onDragStart={(event) => onDragStart(event, 'cause')} draggable>
        Cause
      </div>
    </aside>
  );
};
