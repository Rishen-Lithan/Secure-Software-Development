import { Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
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
        service: "",
    });

    const [nameError, setNameError] = useState("");
    const [contactError, setContactError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [date, setDate] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    useEffect(() => {
        getdate();
    }, []);

    const getdate = () => {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate = `${year}-${month}-${day}`;
        console.log(currentDate)
        setDate(currentDate);
    }
    // const handleClick = (event) => {
    //     event.preventDefault();

    //     axios.post("/api/Book/make", post)
    //         .then((res) => console.log(res))
    //         .catch((err) => console.log(err));

    //     navigate("ViewAppointment");

    // };

    const handleClick = (event) => {

        if (validateCheck()) {
            createAppoimnt();
        }
        event.preventDefault();

    };

    const createAppoimnt = () => {

        axios.post("/api/Book/make2", post)
            .then((res) => {

                if (res.status) {
                    console.log(res.data);
                    const appointmentData = res.data;
                    const appointmentUrl = `/ViewAppointment/${appointmentData.appoiment._id}`;
                    navigate(appointmentUrl);
                }
                else {
                    navigate("ViewAppointment");
                }


            })


    }

    const [time, setTime] = useState('');



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
        const emailRegex = /\S+@\S+\.\S+/; // regular expression for validating email address
        if (post.email === '') {
            email.setCustomValidity('Please enter an email');
            setEmailError("Please enter an email");
            valid = false;
        } else if (!emailRegex.test(post.email)) {
            email.setCustomValidity('Please enter a valid email address');
            setEmailError("Please enter a valid email address");
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
                            min={new Date().toISOString().split("T")[0]}
                            required />
                        <Form.Control className="Form-Control"
                            name="time"
                            value={post.time}
                            placeholder="Choose Time"
                            type="time"
                            onChange={handleChange}
                            style={{
                                width: "80%", marginLeft: "10%"
                            }}
                            required />
                        <Form.Select name="service" className="Form-Control"
                            value={post.service}
                            placeholder="Select Service"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required>
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

                        </Form.Select >
                    </Form.Group >

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
                </Form >

                {/* <br />
            <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}} onClick={() => navigate(-1)}> BACK </button>   */}
            </div >
        </div >
    );
}

export default CreatePost;
