import React, { useState, useRef, useCallback } from 'react';
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

const initialNodes = [
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.bg};
`;

const ControlsStyled = styled(Controls)`
  button {
    background-color: ${(props) => props.theme.controlsBg};
    color: ${(props) => props.theme.controlsColor};
    border-bottom: 1px solid ${(props) => props.theme.controlsBorder};
    &:hover {
      background-color: ${(props) => props.theme.controlsBgHover};
    }
    path {
      fill: currentColor;
    }
  }
`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

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
            // console.log(type, nodeTypes)
            if(type == "entity") {
                const newNode = {
                    id: getId(),
                    type: "dottedrectangle",
                    position,
                    data: {},

                };
                setNodes((nds) => nds.concat(newNode));
            } else if(type == "event") {
                const newNode = {
                    id: getId(),
                    type: "circle1",
                    position,
                    data: {},
                };
                setNodes((nds) => nds.concat(newNode));
            } else if(type == "test") {
                const newNode = {
                    id: getId(),
                    type: "rectangle",
                    position,
                    data: {},
                };
                setNodes((nds) => nds.concat(newNode));
            }  else if(type == "cause") {
                const newNode = {
                    id: getId(),
                    type: "circle2",
                    position,
                    data: {},
                };
                setNodes((nds) => nds.concat(newNode));
            } 
           
        },
        [reactFlowInstance]
    );

    return (
        <div className="dndflow" style={{ height: 350 }}>
            <Sidebar />
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
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
                    >
                        <ControlsStyled />
                    </ReactFlowStyled>
                </div>
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
        <DnDFlow />
        <button onClick={toggleMode} style={{ position: 'absolute', zIndex: 100, left: 10, top: 10 }}>
          Switch
        </button>
      </ThemeProvider>
    );
};
