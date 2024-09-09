import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import './salary.css';

function CreatePost () {
    const navigate = useNavigate();
    const [sal, setSal] = useState ({
        id: "",
        workingDays: "",
        payRate: "",
        netSalary: "",
    });


    const handleChange = (event) => {
        const { name, value } = event.target;

        setSal((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleClick = (event) => {
        event.preventDefault();
        sal.netSal = sal.workingDays * sal.payRate


        axios.post("/api/sal/adds", sal)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        navigate("sals");
        
    };


    //calculate salary
    // const handleCal = (event) => {
    //     event.preventDefault();


        
    // };

    return (
        
        <div className="salary-create">
        <div className="Create-post">
            <h1 className="title">Add Salary</h1><br />
            <Form className="Form">
                <Form.Group className="Form-Group">
                    <Form.Control className="Form-Control" 
                        name="id" 
                        value={sal.id}
                        placeholder="Employee ID"
                        onChange={handleChange}
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                    <Form.Control className="Form-Control" 
                        name="month" 
                        value={sal.month}
                        placeholder="Month"
                        onChange={handleChange}
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                    <Form.Control className="Form-Control"
                        name="workingDays" 
                        value={sal.workingDays}
                        placeholder="Working days"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                    <Form.Control className="Form-Control"
                        name="payRate" 
                        value={sal.payRate}
                        placeholder="Pay Rate"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                    
                </Form.Group>
                <br />
               


                < button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"45%", fontSize:"17px", 
                paddingLeft:"5px", paddingRight:"5px", border:"#b30059"}} onClick={handleClick}>Add Salary </button>
            </Form>
            <br />

        </div>
        </div>
    );
}

export default CreatePost;