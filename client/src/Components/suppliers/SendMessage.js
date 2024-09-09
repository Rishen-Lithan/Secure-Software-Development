import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import './supplier.css';

function SendMessage () {
    const navigate = useNavigate();
    const [post, setPost] = useState ({
        date: "",
        title: "",
        message: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleClick = (event) => {
        event.preventDefault();

        axios.post("/api/IMsg/add", post)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        navigate("/imsg");
        
    };

    return (
        <div className="packages-create">

        <div className="Create-post">
            <h1 className="title">Send Message to Inventory  Manager</h1><br />
            <Form className="Form">
                <Form.Group className="Form-Group">
                <Form.Control className="Form-Control" 
                        name="date" 
                        value={post.date}
                        placeholder="date"
                        onChange={handleChange}
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                    <Form.Control className="Form-Control" 
                        name="title" 
                        value={post.title}
                        placeholder="Title"
                        onChange={handleChange}
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                    <Form.Control className="Form-Control"
                        name="message" 
                        value={post.message}
                        placeholder="Description"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                </Form.Group>
                <br />
                < button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"45%", fontSize:"17px", 
                paddingLeft:"5px", paddingRight:"5px", border:"#b30059"}} onClick={handleClick}>SEND MESSAGE</button>
            </Form>
            <br />
            {/* <br />
            <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}} onClick={() => navigate(-1)}> BACK </button>   */}
        </div>
        </div>
    );
}

export default SendMessage;