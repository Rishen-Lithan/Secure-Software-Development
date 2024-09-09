import React from 'react'
import { useEffect,useState } from "react";
import axios from "axios";
import {Form, InputGroup } from "react-bootstrap";
// import {useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";

export default function Shedule() {
    // const navigate = useNavigate();
    
    
    // const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [updatedPost, setUpdatedPost] = useState({})
    const [search, setSearch] = useState('');
    const [date, setDate] = useState ({
        date: "2023-5-10"
    });
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
    
        const date = new Date();
    
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${year}-${month}-${day}`;
    
        console.log(currentDate);
    
        const dataSch = { date:"2023-5-10"}
    
    
            axios.get("/api/shedu/shedules")
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);
    
    const deletePost = (id) => {
    axios
    .delete(`/api/shedu/delete/${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
    
    window.location.reload();
    };
    
    const updatePost = (data) => {
    setUpdatedPost(data);
    handleShow();
    }
    
    const handleChange = (e) => {
    const { name, value} = e.target;
    
    setUpdatedPost((prev) => {
        return {
            ...prev,
            [name]: value,
        };
    });
    };
    
    const saveUpdatedPost = () => {
    axios.put(`/api/shedu/update/${updatedPost._id}`, updatedPost)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
    
    handleClose();
    window.location.reload();
    };
    
    
    return (
        <div className="packages">
        <div>
            {/* style={{width:"90%", margin: "auto auto", textAlign: "center"}} */}
            
          <br /><br />
            {/* <button onClick={() => navigate(-1)}>BACK</button> */}
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title style={{color:"#b30059"}}>Shedule Update</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width:"100%", height:"200%"}}>
                    <Form>
                        <Form.Group>

                        <Form.Control className="Form-Control"
                            name="name"
                            value={updatedPost.name ? updatedPost.name : ""}
                            placeholder="Name"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />
                        <Form.Control className="Form-Control"
                            name="contact"
                            value={updatedPost.contact ? updatedPost.contact : ""}
                            placeholder="Contact"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />

                        <Form.Control className="Form-Control"
                            name="date"
                            type="date"
                            value={updatedPost.date ? updatedPost.date : ""}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            max={new Date().toISOString().split("T")[0]}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />
                        <Form.Control className="Form-Control"
                            name="time"
                            value={updatedPost.time ? updatedPost.time : ""}
                            placeholder="Time"
                            type="time"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />
                        <Form.Select name="service" className="Form-Control"
                            value={updatedPost.service ? updatedPost.service : ""}
                            placeholder="Service"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required>
                            <option>Select Service</option>
                            <option>Hair Cutting</option>
                            <option>Hair Coloring</option>
                            <option>Nail Arts</option>
                            <option>Hair Removal And Waxing</option>
                            <option>Tinting Eyelashes</option>
                            <option>Lift And Perm Eyelashes</option>
                            <option>individual Eyelashes</option>
                            <option>Ear piercing</option>
                            <option>Body Care</option>
                            <option>Shaving</option>
                            <option>Menique Pedique</option>
                            <option>Eye Makeup</option>
                            <option>Facial</option>
                        </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"200px", fontSize:"17px", 
                    border:"#b30059", marginRight:"25%"}} onClick={handleClose}>
                        Close
                    </button>
                    <br />
                    <button style={
                        {borderRadius:"5px",
                         background:"#b30059",
                         padding:"1.5%",
                         width:"200px",
                         fontSize:"17px",
                         border:"#b30059",
                         marginRight:"25%"}
                         
                         }
                          onClick={saveUpdatedPost}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
    
            {data ? (
                
                <>
                
                <Form>
                    <InputGroup className="my-1" style={{width:"20%", marginLeft:"75%"}}>
                        <Form.Control 
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search here"/>
                    </InputGroup>
                </Form>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/shedule/add" style={{color:"white", textDecoration:"none"}}>Create Shedule</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
                
                    <br /><br />
                    <center>
                        <h1 style={{color:"#660033", fontWeight:"bolder", fontSize:"50px"}}>Shedule Managemnt</h1>
                    </center>
    
                    <div className="container">

                    </div>
                    <br />
                    
                    <table className="rtable" border='1'>
                    <thead className="theadt">
                        <tr >
                            <th>#</th>
                            <th>Name</th>
                            <th>Date</th>
                            <thh>Time</thh>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
    
                            {data.filter((post) => {
                                return search.toLowerCase() === ''
                                    ? post
                                    : post.name.toLowerCase().includes(search) ||
                                      post.id.toLowerCase().includes(search) ||
                                      post.date.toLowerCase().includes(search) ||
                                      post.state.toLowerCase().includes(search)
                            })
                            .map((post, index) => {
                        return (
                           
                                    <tr>
                                        <td>{index +1}</td>
                                        <td>{post.name}</td>
                                        <td>{post.date}</td>
                                        <td>{post.time}</td>
                                        <td>
                                            <button onClick={() => updatePost(post)}>UPDATE</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button style={{color:"white", background:"#3d3c3c", border:"black"}} onClick={() => deletePost(post._id)}>DELETE</button><br />
                                        </td>
                                        
                                    </tr>       
                        );
                    })}
                    </tbody>
                    </table>
                </>
            ) : (
              ""
            )}
        </div>
        </div>
    );
    }
