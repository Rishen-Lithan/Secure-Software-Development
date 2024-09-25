import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CreateService() {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: "",
        type: "",
        description: "",
        price:"",
    });
    const [TitleerrorMessage, setTitleErrorMessage] = useState("");
    const [TypeerrorMessage, setTypeErrorMessage] = useState("");
    const [DescriptionerrorMessage, setDescriptionErrorMessage] = useState("");
    const [PriceerrorMessage, setPriceErrorMessage] = useState("");
    const [accessToken, setAccessToken] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    
        setAccessToken(accessToken);
        setIsAdmin(isAdmin);
    
        console.log('User Data : ', accessToken, isAdmin);
        
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };   

    const handleClick = async (event) => {
        event.preventDefault(); 
        
        if (validateForm()) {
          try {
            const response = await fetch('/api/Post/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              },
              body: JSON.stringify(post),
            });
      
            if (!response.ok) {
                console.log('Error');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
      
            const data = await response.json();
            console.log('Response:', data);
      
            navigate('/posts');
          } catch (err) {
            console.log('Error:', err);
          }
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
        <div className="packages-create">
            <div className="create-post">
                <h1 className="title">Create New Package</h1>
                <Form className="form">
                <Form.Group className="form-group">
                    <Form.Control
                        className="form-control"
                        id="title"
                        name="title"
                        value={post.title}
                        placeholder="Title"
                        onChange={handleChange}
                    />

                    {TitleerrorMessage && <div className="error">{TitleerrorMessage}</div>}

                    <Form.Select
                        id="type"
                        name="type"
                        className="form-control"
                        value={post.type}
                        onChange={handleChange}
                        required
                    >
                    <option selected>Select Package</option>
                    <option>Daily Package</option>
                    <option>Event Package</option>
                    <option>Seasonal Package</option>
                    </Form.Select>
                    <br />

                    {TypeerrorMessage && <div className="error">{TypeerrorMessage}</div>}

                    <Form.Control
                        id="description"
                        className="form-control"
                        name="description"
                        value={post.description}
                        placeholder="Description"
                        onChange={handleChange}
                    />

                    {DescriptionerrorMessage && (
                    <div className="error">{DescriptionerrorMessage}</div>
                    )}

                    <Form.Control
                        id="price"
                        className="form-control"
                        name="price"
                        value={post.price}
                        placeholder="Price"
                        onChange={handleChange}
                    />

                    {PriceerrorMessage && <div className="error">{PriceerrorMessage}</div>}
                </Form.Group>

                <button className="create-button" onClick={handleClick}>CREATE PACKAGE</button>
                </Form>
            </div>
        </div>

    );
};

export default CreateService;
