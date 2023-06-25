import "./Table.css";
import {useState} from "react";
import MindElixir from "mind-elixir";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Moment from 'moment'

export const Table = ({rows, deleteRow, editRow}) => {
    const [message, setMessage] = useState("Please wait while we load data");
    const navigate = useNavigate();
    if (rows.length === 0) {
        setTimeout(() => {
            setMessage("No Mappings created yet")
        }, 2000)
    }

    const handleNewMMBtn = () => navigate('/mindmap/new', {
        state: {
            'mappingJSON': MindElixir.new('new Topic'),
            'mappingDBId': ""
        }
    });

    return (
        <>
            <div className="table-wrapper">

                <table className="table table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th colSpan="4">

                        </th>
                        <th>
                            <Button variant="success" className="me-2" onClick={handleNewMMBtn}><i className="fa fa-plus p-1"></i>New</Button>
                        </th>
                    </tr>
                    <tr>
                        <th>S.No</th>
                        <th className="expand">Title</th>
                        <th>Created Date</th>
                        <th>Modified Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                    {rows.length !== 0 ? rows.map((row, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td className="expand">{row.title}</td>
                                    <td>{Moment(row.createdDate).format('DD MMM @ HH:mm')}</td>
                                    <td>{Moment(row.modifiedDate).format('DD MMM @ HH:mm')}</td>
                                    <td className="fit">
                                <span className="actions">
                                    <i className="delete__icon fas fa-trash" onClick={() => deleteRow(row.mappingId,row.title)}></i>
                                    <i className="row__icon fas fa-pen" onClick={() => editRow(row.mappingId)}></i>
                                </span>
                                    </td>
                                </tr>
                            );
                        }) :
                        <tr>
                            <td className="table-info"></td>
                            <td className="table-info">{message}</td>
                            <td className="table-info"></td>
                            <td className="table-info"></td>
                            <td className="table-info"></td>
                        </tr>
                    }
                    </tbody>
                </table>

            </div>
        </>
    );
};