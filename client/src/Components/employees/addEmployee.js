import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import './Employee.css';

function CreatePost () {
    const navigate = useNavigate();
    const [emp, setEmp] = useState ({
        name: "",
        id: "",
        NIC: "",
        joinedDate: "",
        position: "",
        address: "",
        phoneNo: "",
    });

    const [errorname, seterrorName] = useState("");
    const [errornic, seterrorNic] = useState("");
    const [erroraddress, seterrorAddress] = useState("");
    const [errorphone, seterrorPhone] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setEmp((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleClick = (event) => {
        event.preventDefault();

        if (validateCheck()) {
            axios.post("/api/emp/add", emp)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            navigate("emp");
        }
        
    };

    //validations

    const validateCheck = () => {
        let valid = true;

        const empName = document.getElementById('name');
        if (emp.name === '') {
            empName.setCustomValidity('Please Enter a Name');
            seterrorName("Please Enter a Name");
            valid = false;
        } else {
            empName.setCustomValidity('');
            seterrorName("");
        }

        const empNic = document.getElementById('nic');
        if (emp.NIC === '') {
            empNic.setCustomValidity('Please Enter a NIC');
            seterrorNic("Please Enter a NIC");
            valid = false;
        } else if (emp.NIC.length !== 10) {
            empNic.setCustomValidity('Please Enter a NIC');
            seterrorNic("Please Enter a valid NIC");
            valid = false;
        }else {
            empNic.setCustomValidity('');
            seterrorNic("");
        }

        const empAddress = document.getElementById('address');
        if (emp.address === '') {
            empAddress.setCustomValidity('Please Enter a Address');
            seterrorAddress("Please Enter a Address");
            valid = false;
        } else {
            empAddress.setCustomValidity('Please Enter a Address');
            seterrorAddress("");
        }

        const empContact = document.getElementById('phone');
        if (emp.phoneNo === '') {
            empContact.setCustomValidity('Please Enter a Phone No');
            seterrorPhone("Please Enter a Phone No");
            valid = false;
        } else if(emp.phoneNo.length !== 10) {
            empContact.setCustomValidity('Please Enter a Phone No');
            seterrorPhone("Contact No length should be equals to 10");
            valid = false;
        }else {
            empContact.setCustomValidity('');
            seterrorPhone("");
        }
        return valid;
    }

    return (
        <div className="employee-create">

        <div className="Create-post">
            <h1 className="title">Add New Employee</h1><br />
            <Form className="Form">
                <Form.Group className="Form-Group">
                    <Form.Control className="Form-Control" 
                        id="name"
                        name="name" 
                        value={emp.name}
                        placeholder="Name"
                        onChange={handleChange}
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                        { errorname && <div className="error" style={{marginLeft:"10%"}}>{errorname}</div> }


                    <Form.Control className="Form-Control"
                        name="id" 
                        value={emp.id}
                        placeholder="Employee ID"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                        <Form.Control className="Form-Control"
                        id="nic"
                        name="NIC" 
                        value={emp.NIC}
                        placeholder="NIC"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                        { errornic && <div className="error" style={{marginLeft:"10%"}}>{errornic}</div> }


                    <Form.Control className="Form-Control"
                        name="joinedDate" 
                        value={emp.joinedDate}
                        placeholder="Joined Date"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                    <Form.Select name="position" className="Form-Control"
                        value={emp.position}
                        placeholder="Select Position"
                        onChange={handleChange}
                        style={{ width: "80%", marginLeft: "10%" }}
                        required>
                        <option selected>Select the Position</option>
                        <option>Hair Dresser</option>
                        <option>Nail Technician</option>
                        <option>Wax Specialist</option>
                        <option>Colorist</option>
                    </Form.Select>

                    <Form.Control className="Form-Control"
                        id="address"
                        name="address" 
                        value={emp.address}
                        placeholder="Address"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                        { erroraddress && <div className="error" style={{marginLeft:"10%"}}>{erroraddress}</div> }

                    <Form.Control className="Form-Control"
                        id="phone"
                        name="phoneNo" 
                        value={emp.phoneNo}
                        placeholder="Phone No"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                        { errorphone && <div className="error" style={{marginLeft:"10%"}}>{errorphone}</div> }

                </Form.Group>
                <br />
                < button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"45%", fontSize:"17px", 
                paddingLeft:"5px", paddingRight:"5px", border:"#b30059"}} onClick={handleClick}>Add Employees</button>
            </Form>
            <br />

        </div>
        </div>
    );
}

export default CreatePost;