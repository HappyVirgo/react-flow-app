import React from "react";
import { Handle } from "react-flow-renderer";

const RectangleNode = ({ data }) => {
  return (
    <div style={{ height: "20px", width: "45px", borderColor: "green", borderStyle: "solid", borderRadius: 3 }}>
       <Handle
        type="target"
        position="top"
        id={`${data.id}.top`}
        style={{ 
            opacity: 0,
            borderRadius: 1,
            top: 0,
            height: "1px",
            width: "1px",
            backgroundColor: "white",
            borderColor: "black" 
       }}
      />
      <Handle
        type="source"
        position="left"
        id={`${data.id}.left`}
        style={{ 
            borderRadius: 1,
            left: -3,
            height: "10px",
            backgroundColor: "#FFC000",
            borderStyle: "solid",
            borderColor: "black" 
       }}
      />
      <div id={data.id}>{data.label}</div>
      <Handle
        type="source"
        position="right"
        id={`${data.id}.right`}
        style={{ 
            borderRadius: 1,
            right: -3,
            height: "10px",
            backgroundColor: "#FF0000",
            borderStyle: "solid",
            borderColor: "black" 
        }}
      />
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.bottom`}
        style={{  
            borderRadius: 1, 
            bottom: -3,
            width: "15px",
            backgroundColor: "#70AD47",
            borderStyle: "solid",
            borderColor: "black" 
        }}
      />
    </div>
  );
};

const CircleNode1 = ({ data }) => {
  return (
    <div
      style={{
        borderColor: "yellow",
        borderStyle: "solid",
        borderRadius: "100%",
        height: "20px",
        width: "20px",
      }}
    >
      <div id={data.id}>{data.label}</div>
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.left`}
        style={{ 
            bottom: 0,
            opacity: 0,
            backgroundColor: "white",
            borderColor: "black" 
       }}
      />
    </div>
  );
};

const CircleNode2 = ({ data }) => {
  return (
    <div
      style={{
        borderColor: "green",
        borderStyle: "solid",
        borderRadius: "100%",
        height: "20px",
        width: "20px",
      }}
      >
      <Handle
        type="target"
        position="top"
        id={`${data.id}.left`}
        style={{ 
            opacity: 0,
            top: 0,
            backgroundColor: "white",
            borderColor: "black" 
       }}
      />
      <Handle
        type="target"
        position="left"
        id={`${data.id}.left`}
        style={{ 
            opacity: 0,
            backgroundColor: "white",
            borderColor: "black" 
       }}
      />
      <div id={data.id}>{data.label}</div>
      <Handle
        type="target"
        position="right"
        id={`${data.id}.left`}
        style={{ 
            opacity: 0,
            backgroundColor: "white",
            borderColor: "black" 
       }}
      />
    </div>
  );
};

const DottedRectangleNode = ({ data }) => {
    return (
        <div style={{ height: "250px", width: "200px", borderStyle: "dotted", borderColor: "blue" }}>
           <Handle
            type="source"
            position="top"
            id={`${data.id}.top`}
            style={{ 
                borderRadius: 1,
                height: "10px",
                width: "20px",
                backgroundColor: "white",
                borderStyle: "solid",
                borderColor: "black" 
           }}
          />
          <div id={data.id}>{data.label}</div>
          <Handle
            type="target"
            position="bottom"
            id={`${data.id}.bottom`}
            style={{ 
                borderRadius: 1,
                height: "10px",
                width: "20px",
                backgroundColor: "white",
                borderStyle: "solid",
                borderColor: "black" 
           }}
          />
        </div>
      );
}



export const nodeTypes = {
  circle1: CircleNode1,
  circle2: CircleNode2,
  rectangle: RectangleNode,
  dottedrectangle: DottedRectangleNode
};
