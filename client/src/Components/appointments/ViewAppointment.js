


import { useLocation, useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import axios from "axios";
// import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./View.css";


function ViewAppointment() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();


    const name = queryParams.get('name');
    const contact = queryParams.get('contact');
    const email = queryParams.get('email');
    const date = queryParams.get('date');
    const time = queryParams.get('time');
    const service = queryParams.get('service');
    const { id } = useParams()


    //Get data from database
    useEffect(() => {
        getAppoimnt();

    }, []);



    const getAppoimnt = () => {
        console.log(id);
        axios.get(`/api/Book/appointment//${id}`)
            .then((res) => {
                console.log(res.data)
                setPosts(res.data);
            })

    }


    const [updatedPost, setUpdatedPost] = useState({})
    const [search, setSearch] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const deletePost = (id) => {
        axios
            .delete(`/api/Book/delete/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        navigate("/appointments/add")
    };

    const updatePost = (post) => {
        setUpdatedPost(post);
        handleShow();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUpdatedPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const saveUpdatedPost = () => {
        axios.put(`/api/Book/update/${updatedPost._id}`, updatedPost)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        handleClose();
        window.location.reload();
    };







    // Render the component
    return (
        <div>
            <div className='view'>
                <MainLayout>
                    <h1>Appointment Details</h1>
                </MainLayout>
            </div>
            <div>
                <div className='view-form  mt-3 bg-light' style={{
                    marginLeft: "30%", padding: "5%", marginRight: "40%", marginBottom: "3%", borderRadius: "5px"
                }}>
                    <p>Name: &nbsp;&nbsp; {posts.name}</p>
                    <p>Contact: &nbsp;&nbsp; {posts.contact}</p>
                    <p>Email: &nbsp;&nbsp; {posts.email}</p>
                    <p>Date: &nbsp;&nbsp; {posts.date}</p>
                    <p>Time: &nbsp;&nbsp; {posts.time}</p>
                    <p>Service: &nbsp;&nbsp; {posts.service}</p>
                </div >



                < button className="btn-update" onClick={() => updatePost(posts)} >UPDATE</button>
                <button className='btn-delete' onClick={() => deletePost(posts._id)}>DELETE</button>
            </div >
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#b30059" }}>Update Your Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ width: "100%", height: "200%" }}>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                style={{
                                    width: "80%",
                                    padding: "6px 10px",
                                    margin: "10px 0",
                                    border: "1px solid #c762a1",
                                    borderRadius: "5px",
                                    boxSizing: "border-box",
                                    display: "block",
                                    marginLeft: "10%"
                                }}
                                placeholder="Name"
                                name="name"
                                value={updatedPost.name ? updatedPost.name : ""}
                                onChange={handleChange} />

                            <Form.Control
                                style={{
                                    width: "80%",
                                    padding: "6px 10px",
                                    margin: "10px 0",
                                    border: "1px solid #c762a1",
                                    borderRadius: "5px",
                                    boxSizing: "border-box",
                                    display: "block",
                                    marginLeft: "10%"
                                }}
                                placeholder="Contact No"
                                name="contact"
                                value={updatedPost.contact ? updatedPost.contact : ""}
                                onChange={handleChange} />
                            <Form.Control
                                style={{
                                    width: "80%",
                                    padding: "6px 10px",
                                    margin: "10px 0",
                                    border: "1px solid #c762a1",
                                    borderRadius: "5px",
                                    boxSizing: "border-box",
                                    display: "block",
                                    marginLeft: "10%"
                                }}
                                placeholder="Email"
                                name="email"
                                value={updatedPost.email ? updatedPost.email : ""}
                                onChange={handleChange} />
                            <Form.Control
                                style={{
                                    width: "80%",
                                    padding: "6px 10px",
                                    margin: "10px 0",
                                    border: "1px solid #c762a1",
                                    borderRadius: "5px",
                                    boxSizing: "border-box",
                                    display: "block",
                                    marginLeft: "10%"
                                }}
                                placeholder="Date"
                                name="date"
                                value={updatedPost.date ? updatedPost.date : ""}
                                onChange={handleChange} />
                            <Form.Control
                                style={{
                                    width: "80%",
                                    padding: "6px 10px",
                                    margin: "10px 0",
                                    border: "1px solid #c762a1",
                                    borderRadius: "5px",
                                    boxSizing: "border-box",
                                    display: "block",
                                    marginLeft: "10%"
                                }}
                                placeholder="Time"
                                name="time"
                                value={updatedPost.time ? updatedPost.time : ""}
                                onChange={handleChange} />
                            <Form.Select
                                style={{
                                    width: "80%",
                                    padding: "6px 10px",
                                    margin: "10px 0",
                                    border: "1px solid #c762a1",
                                    borderRadius: "5px",
                                    boxSizing: "border-box",
                                    display: "block",
                                    marginLeft: "10%"
                                }}
                                placeholder="Select Service"
                                name="service"
                                value={updatedPost.service ? updatedPost.service : ""}
                                onChange={handleChange}>
                                <option>Long Layer </option>
                                <option>Short Layer</option>
                                <option>Ladies Hair Cut</option>
                                <option>Curling </option>
                                <option>Straightening  </option>
                                <option>Keratin Treatment  </option>
                                <option>Colouring </option>
                                <option>Rebonding</option>
                                <option>Head Massage</option>
                                <option>Hair Style </option>
                                <option>Facial</option>
                                <option> Hair Style</option>
                                <option>Body Polishing </option>
                                <option>First Hair Cutting </option>
                                <option>Hair Cut Girls</option>
                                <option>Facial</option>
                                <option> Hair Style</option>
                                <option>Body Polishing </option>
                                <option>First Hair Cutting </option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button style={{
                        borderRadius: "5px", background: "#b30059", padding: "1.5%", width: "200px", fontSize: "17px",
                        border: "#b30059", marginRight: "25%"
                    }} onClick={handleClose}>
                        Close
                    </button>
                    <br />
                    <button style={{
                        borderRadius: "5px", background: "#b30059", padding: "1.5%", width: "200px", fontSize: "17px",
                        border: "#b30059", marginRight: "25%"
                    }} onClick={saveUpdatedPost}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}
export default ViewAppointment;
