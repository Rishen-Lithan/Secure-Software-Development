import { Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useState , useEffect} from "react";
import axios from "axios";

export default function AddShedule() {


    useEffect(() => {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        let currentDate = `${year}-${month}-${day}`;
        console.log(currentDate);
        setDate(`${year}-${month}-${day}`);
        console.log(date);
    }, []);


    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [post, setPost] = useState({
        name: "",
        contact: "",
        date: "",
        time: "",
        service: "",
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
        axios.post("/api/shedu/make", post)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
            event.preventDefault();
        navigate("/shedule");

    };


    return (
        <div className="packages-create">

            <div className="Create-post">
                <h1 className="title">Make An Shedule</h1><br />
                <Form className="Form">
                    <Form.Group className="Form-Group">
                        <Form.Control className="Form-Control"
                            name="name"
                            value={post.name}
                            placeholder="Name"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />
                        <Form.Control className="Form-Control"
                            name="contact"
                            value={post.contact}
                            placeholder="Contact"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />

                        <Form.Control className="Form-Control"
                            name="date"
                            type="date"
                            value={post.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            max={new Date().toISOString().split("T")[0]}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />
                        <Form.Control className="Form-Control"
                            name="time"
                            value={post.time}
                            placeholder="Time"
                            type="time"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required />
                        <Form.Select name="service" className="Form-Control"
                            value={post.service}
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
                    <br />
                    < button style={{
                        borderRadius: "5px", background: "#b30059", padding: "1.5%", width: "45%", fontSize: "17px",
                        paddingLeft: "5px", paddingRight: "5px", border: "#b30059"
                    }} onClick={handleClick}>BOOK NOW</button>
                </Form>
                <br />
                {/* <br />
            <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}} onClick={() => navigate(-1)}> BACK </button>   */}
            </div>
        </div >
    );
}
