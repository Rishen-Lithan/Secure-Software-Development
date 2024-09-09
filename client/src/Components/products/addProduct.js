import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import './products.css';

function CreatePost () {
    const navigate = useNavigate();
    const [product, setProduct] = useState ({
        name: "",
        type: "",
        category: "",
        date: "",
        rquantity: "",
        uquantity: "",
        totalPrice: "",
    });

    const [nameError, setNameError] = useState("");
    const [rquantityError, setRquantityError] = useState("");
    const [uquantityError, setUquantityError] = useState("");
    const [totalpriceError, setTotalPriceError] = useState("");
 

    
    const handleChange = (event) => {
        const { name, value } = event.target;

        setProduct((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleClick = (event) => {
        event.preventDefault();
        if (validateCheck()) {
        axios.post("/api/Product/add", product)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        navigate("products");
        }
    };

    
    const validateCheck = () => {
        let valid = true;

        const ProductName = document.getElementById('name');
        console.log(document.getElementById('name'));
        if (product.name === '') {
            ProductName.setCustomValidity('Please Enter a Name');
            setNameError("Please Enter a Name")
            valid = false;
        } else {
            ProductName.setCustomValidity('');
            setNameError("");
        }

        // const ProductType = document.getElementById('type');
        // if (product.type === '') {
        //     ProductType.setCustomValidity('Please Enter a Type');
        //     setProductError("Please Enter a Type")
        //     valid = false;
        // } else {
        //     ProductType.setCustomValidity('');
        //     setProductError("");
        // }

        // const ProductCategory = document.getElementById('category');
        // if (product.category === '') {
        //     ProductCategory.setCustomValidity('Please Enter a Product');
        //     setProductError("Please Enter a Product")
        //     valid = false;
        // } else {
        //     ProductCategory.setCustomValidity('');
        //     setProductError("");
        // }

        // const ProductDate = document.getElementById('date');
        // if (product.date === '') {
        //     ProductDate.setCustomValidity('Please Enter a Date');
        //     setProductError("Please Enter a Date")
        //     valid = false;
        // } else {
        //     ProductDate.setCustomValidity('');
        //     setProductError("");
        // }

        const ProductRquantity = document.getElementById('rquantity');
        if (product.rquantity === '') {
            ProductRquantity.setCustomValidity('Please Enter a Remaining Quantity');
            setRquantityError("Please Enter a Remaining Quantity")
            valid = false;
        } else {
            ProductRquantity.setCustomValidity('');
            setRquantityError("");
        }

        const ProductUquantity = document.getElementById('uquantity');
        if (product.uquantity === '') {
            ProductUquantity.setCustomValidity('Please Enter a Used Quantity');
            setUquantityError("Please Enter a Used Quantity")
            valid = false;
        } else {
            ProductUquantity.setCustomValidity('');
            setUquantityError("");
        }

        const ProductTotalPrice = document.getElementById('totalPrice');
        if (product.totalPrice === '') {
            ProductTotalPrice.setCustomValidity('Please Enter a Used Total Price');
            setTotalPriceError("Please Enter a Total Price ")
            valid = false;
        } else {
            ProductTotalPrice.setCustomValidity('');
            setTotalPriceError("");
        }

            return valid;

    }

    return (
        <div className="packages-create">

        <div className="Create-post">
            <h1 className="title">Add Products</h1><br />
            <Form className="Form">
                <Form.Group className="Form-Group">
                    
                    <Form.Control className="Form-Control"
                        id="name"  
                        name="name" 
                        value={product.name}
                        placeholder="Name"
                        onChange={handleChange}
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

{ nameError && <div className="error" style={{marginLeft:"10%"}}>{nameError}</div> }
                    
                    <Form.Select className="Form-Control" 
                        id="type" 
                        name="type" 
                        value={product.type}
                        placeholder="Type"
                        onChange={handleChange}
                        style={{width:"80%", marginLeft:"10%"}}
                        required >
                             <option>Product</option>
                            <option>Equipment</option>
                        </Form.Select>

                    <Form.Select className="Form-Control"
                        id="category" 
                        name="category" 
                        value={product.category}
                        placeholder="Category"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required >
                            <option>Scissors</option>
                            <option>Shampoo</option>
                            <option>Conditioner</option>
                            <option>Hair Styling</option>
                            <option>Hair Coloring products</option>
                            <option>Chairs</option>
                            <option>Hair Dryers</option>
                            <option>Hair Straighteners</option>
                            <option>Furniture</option>
                            <option>Curling Irons</option>
                            <option>Brushes</option>
                            <option>Combs</option>
                            <option>Scissors</option>
                            <option>Other</option>
                     </Form.Select>
                    <Form.Control className="Form-Control"
                        id="date" 
                        name="date" 
                        value={product.date}
                        placeholder="Date"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                    <Form.Control className="Form-Control"
                        id="rquantity"
                        name="rquantity" 
                        value={product.rquantity}
                        placeholder="Remaining Quantity"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                         { rquantityError && <div className="error" style={{marginLeft:"10%"}}>{rquantityError}</div> }
                    <Form.Control className="Form-Control"
                        id="uquantity" 
                        name="uquantity" 
                        value={product.uquantity}
                        placeholder="Used Quantity"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                         { uquantityError && <div className="error" style={{marginLeft:"10%"}}>{uquantityError}</div> }
                    <Form.Control className="Form-Control"
                        id="totalPrice" 
                        name="totalPrice" 
                        value={product.totalPrice}
                        placeholder="Total Price"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                         { totalpriceError && <div className="error" style={{marginLeft:"10%"}}>{totalpriceError}</div> }
                </Form.Group>
                <br />
                < button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"45%", fontSize:"17px", 
                paddingLeft:"5px", paddingRight:"5px", border:"#b30059"}} onClick={handleClick}>ADD PRODUCT</button>
            </Form>
            <br />
            {/* <br />
            <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}} onClick={() => navigate(-1)}> BACK </button>   */}
        </div>
        </div>
    );
}

export default CreatePost;