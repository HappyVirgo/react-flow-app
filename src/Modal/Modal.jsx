import React from "react";
import EditMessage from "./EditMessage";

export default ({ isSelected, textRef, nodeName, setNodeName}) => {
      return (
        <aside>
          {isSelected ? (
            <EditMessage
              textRef={textRef}
              nodeName={nodeName}
              setNodeName={setNodeName}
            />
          ) : (
            <div></div>
          )}
        </aside>
      );
};