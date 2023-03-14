import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    MiniMap
} from 'react-flow-renderer';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme' 
import 'reactflow/dist/style.css';
import './index.css';
import Sidebar from './Sidebar';
import { nodeTypes } from './Nodes';
import Modal from './Modal/Modal';

const initialNodes = [
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.bg};
`;

const ControlsStyled = styled(Controls)`
  button {
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.theme.controlsBg};
    color: ${(props) => props.theme.controlsColor};
    border-bottom: 1px solid ${(props) => props.theme.controlsBorder};
    &:hover {
      background-color: ${(props) => props.theme.controlsBgHover};
    }
    path {
      fill: currentColor;
    }
    span {
        font-size: 30px;
    }
  }
`;

const DnDFlow = ({ toggleMode }) => {
    const reactFlowWrapper = useRef(null);
    const textRef = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)), []);
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const deleteNode = (id) => {
        setNodes((prev) => prev.filter((item) => item.id !== id))
    }
    
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            // console.log(event.dataTransfer)
            if(type == "entity") {
                const newNode = {
                    id: getId(),
                    type: "dottedrectangle",
                    position,
                    data: {content: type, deleteNode:deleteNode},
                };
                setNodes((nds) => nds.concat(newNode));
                setSelectedNode(newNode.id);
            } else if(type == "event") {
                const newNode = {
                    id: getId(),
                    type: "circle1",
                    position,
                    data: {content: type, deleteNode:deleteNode},
                };
                setNodes((nds) => nds.concat(newNode));
                setSelectedNode(newNode.id);
            } else if(type == "test") {
                const newNode = {
                    id: getId(),
                    type: "rectangle",
                    position,
                    data: {content: type, deleteNode:deleteNode},
                };
                setNodes((nds) => nds.concat(newNode));
                setSelectedNode(newNode.id);
            }  else if(type == "cause") {
                const newNode = {
                    id: getId(),
                    type: "circle2",
                    position,
                    data: {
                        content: type, 
                        deleteNode:deleteNode
                    },
                };
                setNodes((nds) => nds.concat(newNode));
                setSelectedNode(newNode.id);
            } 
           
        },
        [reactFlowInstance]
    );

    const nodeViewAll = (e) => {
        window.alert("ALL NODE")
    }

    const clear = (e) => {
        window.alert("CLEAR")
    }

    const save = (e) => {
        window.alert("SAVE")
    }

    const [nodeName, setNodeName] = useState("Node 1");

    useEffect(() =>{
        const node = nodes.filter((node) => {
            if(node.selected) return true;
            return false;
        });
        if(node[0]) {
            setSelectedNode(node[0]);
            setIsSelected(true);
        } else {
            setSelectedNode("");
            setIsSelected(false);
        }
    }, [nodes]);

    useEffect(() => {
        setNodeName(selectedNode?.data?.content || selectedNode);
    }, [selectedNode]);

    useEffect(() => {
        textRef?.current?.focus();
    }, [selectedNode]);

    useEffect(() => {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === selectedNode?.id) {
              node.data = {
                ...node.data,
                content: nodeName || " "
              };
            }
            return node;
          })
        );
      }, [nodeName, setNodes]);
  

    return (
        <div className="dndflow" style={{ height:"100vh" }}>
            <Sidebar toggleMode={toggleMode} />
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <div className="flex-container" style={{ width: "100%", position: "fixed", left: 0,  top: "10px", zIndex: "100" }}>
                            <div>
                                <button style={{padding: "8px 15px", fontSize: "15px", color: "white", backgroundColor: "#404040"}} onClick={() => nodeViewAll()}>
                                    View All
                                </button>
                            </div>
                            <div>
                                <button style={{padding: "8px 15px", fontSize: "15px", color: "white", backgroundColor: "#404040"}} onClick={() => clear()}>
                                    Clear
                                </button>
                            </div>
                            <div>
                                <button style={{padding: "8px 15px", fontSize: "15px", color: "white", backgroundColor: "#404040"}} onClick={() => save()}>
                                    Save
                                </button>
                            </div>
                    </div>
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
                        attributionPosition="top-right"
                        deleteKeyCode="Delete"
                    >
                        <ControlsStyled />
                    </ReactFlowStyled>
                </div>
                <Modal 
                    isSelected={isSelected}
                    textRef={textRef}
                    nodeName={nodeName}
                    setNodeName={setNodeName}
                />
            </ReactFlowProvider>
        </div>
    );
};

export default () => {
    const [mode, setMode] = useState('light');
    const theme = mode === 'light' ? lightTheme : darkTheme;
  
    const toggleMode = () => {
      setMode((m) => (m === 'light' ? 'dark' : 'light'));
    };
  
    return (
      <ThemeProvider theme={theme}>
        <DnDFlow toggleMode={toggleMode} />
      </ThemeProvider>
    );
};
