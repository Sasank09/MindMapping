import {Table} from "./Table";
import {useEffect, useState} from "react";
import Loader from "../Loader/Loader";
import UserService from "../../Services/AuthServices/user.service";
import {parse} from 'flatted';
import {useNavigate} from "react-router-dom";
import {confirm} from 'react-bootstrap-confirmation';

const UserDashboard = () => {
    const [allMindMaps, setAllMindMaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("Please wait while we retrieve data");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        getAllMindMaps();
    },[])

    const handleDeleteRow = async (mappingId,title) => {
        const result = await confirm('Are you sure you want to delete "'+title+'"?');
        if (result) {
            deleteRow(mappingId)
        }
    };

    const deleteRow = (mappingDBId) => {
        setLoading(true)
        UserService.deleteMindMap(mappingDBId).then((response) => {
            if (response.data.hasOwnProperty("messageType") && response.data.messageType === "Success") {
                setIsSuccess(true);
            } else {
                setIsError(true);
            }
            setMessage(response.data.message)
            setLoading(false)
            getAllMindMaps();
            setTimeout(() => {
                setMessage("")
                setIsSuccess(false)
                setIsError(false)
            }, 1000)
        }).catch(error => {
            setIsError(true);
            setLoading(false)
            setMessage("UDDELROW: Something Went Wrong")
        });

    };

    const handleEditRow = (mappingDBId) => {
        setLoading(true);
        UserService.getMindMapByDBId(mappingDBId).then((response) => {
            if (response.data.hasOwnProperty("messageType")) {
                if (response.data.messageType === "Success") {
                    //convert to json using Flatted parse - to maintain data integrity of circular json
                    const mappingData = parse(response.data.data.mappingJSON);
                    navigate('/mindmap/update', {state: {'mappingJSON': mappingData, 'mappingDBId': mappingDBId}});
                    setIsSuccess(true)
                } else {
                    setIsError(true);
                }
                setMessage(response.data.message)
            }
            setMessage(response.message)
            setTimeout(() => {
                setMessage("")
                setIsSuccess(false)
                setIsError(false)
            }, 3000)
        }).catch(error => {
            setIsError(true);
            setMessage("UDEDITRW: Something Went Wrong")
        });

    };


    const getAllMindMaps = async () => {
        setLoading(true)
        UserService.getAllMindMaps().then((response) => {
            if (response.data.hasOwnProperty("messageType")) {
                if( response.data.messageType === "Success"){
                    setIsSuccess(true)
                    if (response.data.data !== null && response.data.data !== undefined) {
                        setAllMindMaps(response.data.data);
                    } else {
                        setAllMindMaps("")
                        setMessage("No Mind maps Created yet")
                    }
                    setMessage(response.data.message)
                }else {
                    setIsError(true);
                    setMessage(response.data.message)
                }
            } else {
                setIsError(true);
                setMessage(response.message)
            }
            setTimeout(() => {
                setLoading(false)
                setMessage("")
                setIsSuccess(false)
                setIsError(false)
            }, 3000)
        }).catch(error => {
            setIsError(true);
            setLoading(false)
            setMessage("UDGALMM: Something Went Wrong")
        });
    }


    return (
        <>{loading ? <Loader/> :
            <div className="App">
                <Table rows={allMindMaps} deleteRow={handleDeleteRow} editRow={handleEditRow}/>
                <div className="align-items-center justify-content-center text-center" style={{marginLeft:"40%"}}>
                {isError ? <div className="alert alert-danger" style={{width: "fit-content"}}>{message}</div> : ""}
                {isSuccess ? <div className="alert alert-success" style={{width: "fit-content"}}>{message}</div> : ""}
                </div>
            </div>
        }
        </>
    );
}

export default UserDashboard