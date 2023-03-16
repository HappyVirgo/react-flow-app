import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
  MiniMap,
} from "react-flow-renderer";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import Sidebar from "./Sidebar";
import { nodeTypes } from "./Nodes";
import Modal from "./Modal";
import "reactflow/dist/style.css";
import "./index.css";
import MenuBar from "./MenuBar";

let id = 0;
const getId = () => `dndnode_${id++}`;

let entityNodeCount = 0;
let eventNodeCount = 0;
let testNodeCount = 0;
let causeNodeCount = 0;

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.bg};
`;

const ControlsStyled = styled(Controls)`
  button {
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.theme.controlsBg};
    color: ${(props) => props.theme.controlsColor};
    border: 1px solid ${(props) => props.theme.controlsBorder};
    &:hover {
      background-color: ${(props) => props.theme.controlsBgHover};
    }
    path {
      fill: currentColor;
    }
  }
`;

const defaultEdgeOptions = {
  style: { strokeWidth: 2 },
  type: "default",
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

const DnDFlow = ({ toggleMode }) => {
  const reactFlowWrapper = useRef(null);
  const textRef = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [nodeName, setNodeName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const node = nodes.filter((node) => {
      if (node.selected) return true;
      return false;
    });
    if (node[0]) {
      setSelectedNode(node[0]);
    } else {
      setSelectedNode("");
      setIsSelected(false);
    }
  }, [nodes]);

  useEffect(() => {
    setNodeName(selectedNode?.data?.name || "");
    setDescription(selectedNode?.data?.description || "");
    setContent(selectedNode?.data?.content || "");
    setColor(selectedNode?.data?.color || "");
    // textRef?.current?.focus();
  }, [selectedNode]);

  const onConnect = (params) => {
    if (edges.some((edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle)) {
      window.alert("Only one link can be setup from an output anchor.");
      return;
    }
    let sourceType = "";
    let targetType = "";
    nodes.forEach((node) => {
      if (node.id === params.source) {
        sourceType = node.type;
      }
      if (node.id === params.target) {
        targetType = node.type;
      }
    });
    if (sourceType === "dottedrectangle" && targetType !== "dottedrectangle") {
      window.alert("Entities instances may only link other entities instances.");
      return;
    }
    setEdges((eds) => addEdge({ ...params }, eds));
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onClickNode = () => {
    console.log("nodeClicked");
    setIsSelected(true);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      if (type == "entity") {
        const newNode = {
          id: getId(),
          type: "dottedrectangle",
          position,
          data: {
            name: type,
            deleteNode: deleteNode,
            description: "",
            content: "" + type + ++entityNodeCount,
            color: "",
            onClickNode: onClickNode,
          },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(newNode.id);
      } else if (type == "event") {
        const newNode = {
          id: getId(),
          type: "circle1",
          position,
          data: {
            name: type,
            deleteNode: deleteNode,
            description: "",
            content: "" + type + ++eventNodeCount,
            color: "",
            onClickNode: onClickNode,
          },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(newNode.id);
      } else if (type == "test") {
        const newNode = {
          id: getId(),
          type: "rectangle",
          position,
          data: {
            name: type,
            deleteNode: deleteNode,
            description: "",
            content: "" + type + ++testNodeCount,
            color: "",
            onClickNode: onClickNode,
          },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(newNode.id);
      } else if (type == "cause") {
        const newNode = {
          id: getId(),
          type: "circle2",
          position,
          data: {
            name: type,
            deleteNode: deleteNode,
            description: "",
            content: "" + type + ++causeNodeCount,
            color: "",
            onClickNode: onClickNode,
          },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(newNode.id);
      }
    },
    [reactFlowInstance]
  );

  const viewAll = (e) => {
    document.getElementsByClassName("react-flow__controls-button react-flow__controls-fitview")[0].click();
  };

  const deleteNode = (id) => {
    setNodes((prev) => prev.filter((item) => item.id !== id));
  };

  const clear = (e) => {
    setEdges([]);
    setNodes([]);
  };

  const save = (e) => {
    if (!reactFlowInstance) {
      return;
    }
    const flow = reactFlowInstance.toObject();
    flow.currentId = id;
    flow.entityNodeCount = entityNodeCount;
    flow.eventNodeCount = eventNodeCount;
    flow.testNodeCount = testNodeCount;
    flow.causeNodeCount = causeNodeCount;

    const downloadLink = document.createElement("a");
    const fileBlob = new Blob([JSON.stringify(flow)], {
      type: "application/json",
    });
    let d = new Date();
    let name =
      "node-flow-" +
      d.getFullYear() +
      "-" +
      d.getMonth() +
      "-" +
      d.getDay() +
      "-" +
      d.getHours() +
      "-" +
      d.getMinutes() +
      "-" +
      d.getSeconds() +
      "-" +
      d.getMilliseconds() +
      ".json";
    downloadLink.href = URL.createObjectURL(fileBlob);
    downloadLink.download = name;
    downloadLink.click();
  };

  const load = async (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const flow = JSON.parse(text);
      console.log(flow);

      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        id = flow.currentId;
        entityNodeCount = flow.entityNodeCount;
        eventNodeCount = flow.eventNodeCount;
        testNodeCount = flow.testNodeCount;
        causeNodeCount = flow.causeNodeCount;
      }
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className="dndflow flex h-screen">
      <Sidebar toggleMode={toggleMode} />
      <ReactFlowProvider>
        <div className="flex-grow h-100" ref={reactFlowWrapper}>
          <MenuBar viewAll={viewAll} clear={clear} save={save} load={load} />
          <ReactFlowStyled
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            attributionPosition="top-right"
            deleteKeyCode="Delete"
          >
            <ControlsStyled className="right-2.5 !left-auto" />
          </ReactFlowStyled>
        </div>
        {isSelected && (
          <Modal
            setIsSelected={setIsSelected}
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
            description={description}
            setDescription={setDescription}
            content={content}
            setContent={setContent}
            color={color}
            setColor={setColor}
          />
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default () => {
  const [mode, setMode] = useState("light");
  const theme = mode === "light" ? lightTheme : darkTheme;

  const toggleMode = () => {
    setMode((m) => (m === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <DnDFlow toggleMode={toggleMode} />
    </ThemeProvider>
  );
};
