import MindElixirReact from './MindElixirReact'
import MindElixir from 'mind-elixir'
import NodeMenu from "@mind-elixir/node-menu";
import React, {useEffect, useRef, useState} from 'react'
import './mindmap.css'
import Button from "react-bootstrap/Button";
import {ButtonGroup, ButtonToolbar} from "react-bootstrap";
import UserService from "../../Services/AuthServices/user.service";
import Loader from "../Loader/Loader";
import {useLocation, useNavigate} from "react-router-dom";
import "./mindmapNodeMenu.css";

export default function MindMap() {
    const plugins = [NodeMenu]
    const location = useLocation();
    const [data, setData] = useState(MindElixir.new('new Topic'))
    const options = useState({
        direction: MindElixir.LEFT,
        mainNodeVerticalGap: 15, // default 25
        mainNodeHorizontalGap: 15,
        allowUndo: true
    });
    const [mappingDBId, setMappingDBId] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const initializeData = (() => {
        if (location.state !== null || location.state !== undefined) {
            if (location.state.mappingDBId !== "" && location.state.mappingJSON) {
                console.log(location.state)
                setData(location.state.mappingJSON)
                setMappingDBId(location.state.mappingDBId)
                location.state.mappingDBId = "";
                location.state.mappingJSON = null;
            }
        }
    });

    useEffect(() => {
        initializeData()
    });

    const ME = useRef(null)

    const handleOperate = (operation) => {
        console.log("current", ME.current.instance)
    }
    const handleSelectNode = (operation) => {
    }
    const handleExpandNode = (operation) => {
    }

    const center = () => {
        ME.current.instance.toCenter()
    }

    const cancel = () => {
        navigate('/userHome')
    }


    const createNewMindMap = (data) => {
        UserService.createMindMap(data).then((response) => {
            if (response.data.hasOwnProperty("messageType")) {
                if (response.data.messageType === "Success") {
                    setIsSuccessful(true);
                    navigate('/userHome');
                } else {
                    setIsError(true);
                }
                setMessage(response.data.message);
            }else{
                setIsError(true)
                setMessage(response.message)
            }
            setTimeout(() => {
                setMessage("")
                setIsSuccessful(false);
                setIsError(false);
            }, 1000)
        }).catch(error => console.log(error));
    }

    const updateExistingMindMap = (data) => {
        UserService.updateMindMap(mappingDBId, data).then((response) => {
            if (response.data.hasOwnProperty("messageType")) {
                if (response.data.messageType === "Success") {
                    setIsSuccessful(true);
                    navigate('/userHome');
                } else {
                    setIsError(true);
                }
                setMessage(response.data.message)
            } else {
                setIsError(true);
                setMessage(response.message)
            }
            setTimeout(() => {
                setMessage("")
                setIsSuccessful(false);
                setIsError(false);

            }, 1000)
        }).catch(error => console.log(error));
    }

    const handleSave = () => {
        setLoading(true);
        const data = {
            direction: ME.current.instance.direction,
            nodeData: ME.current.instance.nodeData,
            linkData: ME.current.instance.linkData
        };
        // const data = {ME.current.instance};
        if (mappingDBId !== "" && mappingDBId !== null && mappingDBId !== undefined) {
            updateExistingMindMap(data);
        } else {
            createNewMindMap(data);
        }
    }

    return (
        <>
            {loading ? <Loader/> :
                <div className="showcase">
                    <ButtonToolbar className="align-items-center" style={{marginLeft: "44%"}}>
                        <ButtonGroup>
                            <Button variant="info" className="m-1" onClick={center}>Center</Button>
                            <Button variant="danger" className="m-1" onClick={cancel}>Cancel</Button>
                            <Button variant="success" className="m-1" onClick={handleSave}>Save</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                    <div className="align-items-center justify-content-center text-center" style={{marginLeft:"40%"}}>
                        {isError ? <div className="alert alert-danger" style={{width: "fit-content"}}>{message}</div> : ""}
                        {isSuccessful ? <div className="alert alert-success" style={{width: "fit-content"}}>{message}</div> : ""}
                    </div>
                    <div className="block">
                        <MindElixirReact
                            ref={ME}
                            data={data}
                            options={options}
                            plugins={plugins}
                            style={{height: '600px', width: '100%'}}
                            onOperate={handleOperate}
                            onSelectNode={handleSelectNode}
                            onExpandNode={handleExpandNode}
                        />
                    </div>
                </div>
            }
        </>
    );
}