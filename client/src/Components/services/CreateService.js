import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; //deleted the (, useEffect )
import axios from "axios";
import MainLayout from "../../layouts/MainLayout";


function CreateService() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    
    sName: "",
    sPrice: "",
    sCategory:"",
  });

    const [TitleerrorMessage, setTitleErrorMessage] = useState("");
    const [TypeerrorMessage, setTypeErrorMessage] = useState("");
    const [PriceerrorMessage, setPriceErrorMessage] = useState("");



  const handleChange = (event) => {
    const { name, value } = event.target; //handleChange function is use to get input value

    setPost((prev) => {
      return {
        ...prev,
        [name]: value, //save the values and change the next value
      };
    });
  };


  const handleClick = (event) => {
    event.preventDefault();

    //give last part of url insted of the whole URL and send the other part to package.json
    //send data to database using post method
    if (validateForm()) {
      axios
      .post("/api/Serv/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

      navigate("/services"); 
    }
    
  };

  //validation

  const validateForm = () => {
    let valid = true;

    const serviceName = document.getElementById('sName');
    if(post.sName === '') {
        serviceName.setCustomValidity('Please enter name');
        setTitleErrorMessage("Please enter name");
        valid = false;
    } else {
        serviceName.setCustomValidity('');
        setTitleErrorMessage("");
    }

    const serviceCategory = document.getElementById('sCategory');
    if (post.scategory === 'sCategory') {
        serviceCategory.setCustomValidity('Please select Service Category');
        setTypeErrorMessage("Please select a Service type.");
        valid = false;
    } else {
        serviceCategory.setCustomValidity('');
        setTypeErrorMessage("");
    }


    const servicePrice = document.getElementById('sPrice');
    if(post.sPrice === '') {
        servicePrice.setCustomValidity('Please enter a Price');
        setPriceErrorMessage("Please enter a Price");
        valid = false;
    }else if (isNaN(post.sPrice)) {
        servicePrice.setCustomValidity('Please enter a valid Price ');
        setPriceErrorMessage("Please enter a valid Price.")
        valid = false;
        
    } else {
        servicePrice.setCustomValidity('');
        setPriceErrorMessage("");
    }

    return valid;
}

  return (
    <div >
      <MainLayout>
      <h1>Add a Service</h1>
      </MainLayout>

    <div style={{ width: "40%", margin: "auto auto", textAlign: "center" }}>
     
      <Form className="container mt-3">
        <Form.Group className="mb-3">
          

          <Form.Control
            id="sName"
            name="sName" //------------------------Change---------------------------
            value={post.sName}
            placeholder="Enter Service Name"
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
            required
          />
          {TitleerrorMessage && <div className="error" style={{marginLeft:"10%"}}>{TitleerrorMessage}</div>}
        </Form.Group>

<Form.Group>
        <Form.Control
            id="sPrice"
            name="sPrice" //------------------------Change---------------------------
            value={post.sPrice}
            placeholder="Enter Price"
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />

        {PriceerrorMessage && <div className="error" style={{marginLeft:"10%"}}>{PriceerrorMessage}</div>}

        

          <div className="mb-3">
                <select className="form-select form-select-sm" name="sCategory" id="sCategory"
                value={post.sCategory} onChange={handleChange}
                >
                    <option selected>Select the Category</option>
                    <option value="Hair">Hair</option>
                    <option value="Skin">Skin</option>
                    <option value="Body">Body</option>
                    <option value="Nail">Nail</option>
                    <option value="Kids">Kids</option>
                    <option value="Bridal">Bridal</option>
                </select>
            </div> &nbsp;

            {TypeerrorMessage && <div className="error" style={{marginLeft:"10%"}}>{TypeerrorMessage}</div>}


        </Form.Group>

        <button
        className="btn-add"
          style={{ width: "100%", marginBottom: "1rem" }}
          
          onClick={handleClick}
        >
          CREATE SERVICE
        </button>
      
      
      <button
      className="btn-back"
        style={{ width: "100%", marginBottom: "1rem" }}
        
        onClick={() => navigate(-1)}
      >
        BACK
      </button> 
      </Form>
      
      
    </div> </div> //to navigate backward
    


    
  );
}

export default CreateService;