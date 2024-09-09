import { Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

//create function
function CreatePost() {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        name: "",
        contact: "",
        email: "",
        date: "",
        time: "",
        package: "",
    });

    const [nameError, setNameError] = useState("");
    const [contactError, setContactError] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    // const handleClick = (event) => {
    //     event.preventDefault();

    //     axios.post("/api/Book/make", post)
    //         .then((res) => console.log(res))
    //         .catch((err) => console.log(err));

    //     navigate("ViewAppointment");

    // };

    const handleClick = (event) => {
        event.preventDefault();

        if (validateCheck()) {
            axios.post("/api/PBook/make", post)
                .then((res) => {
                    const appointmentData = res.data;
                    const appointmentUrl = `/ViewAppointment?name=${appointmentData.name}&contact=${appointmentData.contact}&email=${appointmentData.email}&date=${appointmentData.date}&time=${appointmentData.time}&service=${appointmentData.service}`;
                    navigate(appointmentUrl);
                })
                .catch((err) => console.log(err));

            navigate("ViewAppointment");
        }

    };

    const validateCheck = () => {
        let valid = true;

        const UserName = document.getElementById('name');
        if (post.name === '') {

            UserName.setCustomValidity('Please Enter a Name');
            setNameError("Please Enter a Name");
            valid = false;
        } else {
            UserName.setCustomValidity('');
            setNameError("");
        }

        //contactNumber validation
        const contact = document.getElementById('contact');
        if (post.contact === '') {
            contact.setCustomValidity('Please Enter a Phone No');
            setContactError("Please Enter a Phone No");
            valid = false;
        } else if (post.contact.length !== 10) {
            contact.setCustomValidity('Phone Number Length should be equals to 10');
            setContactError("Phone Number Length should be equals to 10");
            valid = false;
        } else {
            contact.setCustomValidity('');
            setContactError("");
        }

        //Email validation
        const email = document.getElementById('email');
        if (post.email === '') {
            email.setCustomValidity('Please Enter a Email');
            setEmailError("Please Enter a Email");
            valid = false;
        } else {
            email.setCustomValidity('');
            setEmailError("");
        }
        return valid;
    }



    return (
        <div className="appointments-create">

            <div className="Create-post">
                <h1 className="title">Make Your Appointments!!</h1><br />
                <Form className="Form">
                    <Form.Group className="Form-Group">
                        <Form.Control className="Form-Control"
                            id="name"
                            name="name"
                            value={post.name}
                            placeholder="Name"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />
                        {nameError && <div className="error" style={{ marginRight: "10%" }}>{nameError}</div>}

                        <Form.Control className="Form-Control"
                            id="contact"
                            name="contact"
                            value={post.contact}
                            placeholder="Contact"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />
                        {contactError && <div className="error" style={{ marginRight: "10%" }}>{contactError}</div>}



                        <Form.Control className="Form-Control"
                            id="email"
                            name="email"
                            value={post.email}
                            placeholder="Email"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />
                        {emailError && <div className="error" style={{ marginRight: "10%" }}>{emailError}</div>}


                        <Form.Control className="Form-Control"
                            name="date"
                            value={post.date}
                            placeholder="Choose Date"
                            type="date"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />
                        <Form.Control className="Form-Control"
                            name="time"
                            value={post.time}
                            placeholder="Choose Time"
                            type="time"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />
                        <Form.Select name="service" className="Form-Control"
                            value={post.package}
                            placeholder="Select Service"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required>
                            <option>Hair cut</option>
                            <option>Hair Colour</option>
                        </Form.Select>
                    </Form.Group>

                    < button style={{
                        borderRadius: "5px",
                        background: "#b30059",
                        padding: "1.5%",
                        width: "45%",
                        fontSize: "17px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        border: "#b30059",
                        color: "#ffffff"

                    }} onClick={handleClick}>Make Appointment</button>
                </Form>

                {/* <br />
            <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}} onClick={() => navigate(-1)}> BACK </button>   */}
            </div>
        </div >
    );
}

export default CreatePost;
