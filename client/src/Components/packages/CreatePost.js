import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; //deleted the (, useEffect )
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";


function CreateService() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    type: "",
    description: "",
    price:"",
  });

  const handleChange = (event) => {
    const { name, value } = event.target; //handleChange function is use to get input value

    setPost((prev) => {
      return {
        ...prev,
        [name]: value, //save the values and change the next value
      };
    });
  };


    const [TitleerrorMessage, setTitleErrorMessage] = useState("");
    const [TypeerrorMessage, setTypeErrorMessage] = useState("");
    const [DescriptionerrorMessage, setDescriptionErrorMessage] = useState("");
    const [PriceerrorMessage, setPriceErrorMessage] = useState("");   



  const handleClick = (event) => {
        if (validateForm()) {
            axios.post("/api/Post/create", post)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            navigate("posts");
        }
    };
 


    const validateForm = () => {
        let valid = true;

        const packageTitle = document.getElementById('title');
        if(post.title === '') {
            packageTitle.setCustomValidity('Please enter a title');
            setTitleErrorMessage("Please enter a title");
            valid = false;
        } else {
            packageTitle.setCustomValidity('');
            setTitleErrorMessage("");
        }

        const packageType = document.getElementById('type');
        if (post.type === 'Package Type') {
            packageType.setCustomValidity('Please select a package type');
            setTypeErrorMessage("Please select a package type.");
            valid = false;
        } else {
            packageType.setCustomValidity('');
            setTypeErrorMessage("");
        }

        const packageDescription = document.getElementById('description');
        if(post.description === '') {
            packageDescription.setCustomValidity('Please enter a description');
            setDescriptionErrorMessage("Please enter a description.");
            valid = false;
        } else {
            packageDescription.setCustomValidity('');
            setDescriptionErrorMessage("");
        }

        const packagePrice = document.getElementById('price');
        if(post.price === '') {
            packagePrice.setCustomValidity('Please enter a price.');
            setPriceErrorMessage("Please enter a price");
            valid = false;
        }else if (isNaN(post.price)) {
            packagePrice.setCustomValidity('Please enter a valid price. ');
            setPriceErrorMessage("Please enter a valid price.")
            valid = false;
            
        } else {
            packagePrice.setCustomValidity('');
            setPriceErrorMessage("");
        }

        return valid;
    }

    return (
        <div className="packages-create" style={{height:"140%"}}>

        <div className="Create-post" style={{height:"85%"}}>
            <h1 className="title">Create New Package</h1><br />
            <Form className="Form">
                <Form.Group className="Form-Group">
                    <Form.Control className="Form-Control" 
                        id="title"
                        name="title" 
                        value={post.title}
                        placeholder="Title"
                        onChange={handleChange}
                        style={{width:"80%", marginLeft:"10%"}}
                         />

                    { TitleerrorMessage && <div className="error" style={{marginLeft:"10%"}}>{TitleerrorMessage}</div> }

                    
                    <Form.Select id="type" name="type" className="Form-Control" 
                        value={post.type} 
                        placeholder="Package Type"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required>
                            <option selected>Select Package</option>
                            <option>Daily Package</option>
                            <option>Event Package</option>
                            <option>Seasonal Package</option>
                    </Form.Select>

                    { TypeerrorMessage && <div className="error" style={{marginLeft:"10%"}}>{TypeerrorMessage}</div> }


                    <Form.Control id="description" className="Form-Control"
                        name="description" 
                        value={post.description}
                        placeholder="Description"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                         />

                    { DescriptionerrorMessage && <div className="error" style={{marginLeft:"10%"}}>{DescriptionerrorMessage}</div> }

                    <Form.Control id="price" className="Form-Control"
                        name="price" 
                        value={post.price}
                        placeholder="Price"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                         />
                                           
                    { PriceerrorMessage && <div className="error" style={{marginLeft:"10%"}}>{PriceerrorMessage}</div> }

                </Form.Group>
                <br />
                < button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"45%", fontSize:"17px", 
                paddingLeft:"5px", paddingRight:"5px", border:"#b30059"}} onClick={handleClick}>CREATE PACKAGE</button>
            </Form>
            <br />
            {/* <br />
            <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}} onClick={() => navigate(-1)}> BACK </button>   */}
        </div>
        </div>
    );
};

export default CreateService;
