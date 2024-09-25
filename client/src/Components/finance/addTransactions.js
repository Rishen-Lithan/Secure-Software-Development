import { Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';  // Import Toast
import 'react-toastify/dist/ReactToastify.css';  // Import Toast CSS
import './create.css';

function CreatePost() {
    useEffect(() => {
        getDate();
    }, []);

    const navigate = useNavigate();
    const [data, setData] = useState({
        amount: "",
        type: "",
        category: "",
        date: "",
        description: "",
        reference: "",
    });
    const [date, setDate] = useState("");
    const [accessToken, setAccessToken] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [backendErrors, setBackendErrors] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

        setAccessToken(accessToken);
        setIsAdmin(isAdmin);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getDate = () => {
        const date = new Date();
        let currentDay = String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
        let currentYear = date.getFullYear();
        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
        setDate(currentDate);

        setData({
            amount: "",
            type: "",
            category: "",
            date: currentDate,
            description: "",
            reference: "",
        });
    };

    const handleClick = async (event) => {
        event.preventDefault();

        console.log('Data : ', data);
        console.log('Test User : ', accessToken, isAdmin);

        try {
            const response = await fetch('/api/Fin/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                // Capture the validation errors from the backend and ensure it is an array
                setBackendErrors(errorData.errors || []);
                
                // Display toast for each error
                errorData.errors.forEach(error => {
                    toast.error(error.msg);  // Show error message using toast
                });
                return;
            }

            const responseData = await response.json(); // Renamed to responseData
            console.log('Response:', responseData);

            // Navigate to the homepage or transaction list page after successful submission
            toast.success('Transaction added successfully!');  // Show success toast
            setTimeout(() => navigate('/fin'), 1500);  // Delay the redirect for the user to see the success message
        } catch (err) {
            console.log('Error:', err);
            toast.error('Failed to add transaction. Please try again.');  // Show general error message
        }
    };

    return (
        <div className="finance-create">
            <div className="Create-post">
                <h3 className="title">Add Transaction Details</h3><br />
                <Form className="Form">
                    <Form.Group className="Form-Group">
                        <Form.Control
                            className="Form-Control"
                            name="amount"
                            value={data.amount}
                            placeholder="Amount (LKR)"
                            onChange={handleChange}
                            required
                        />
                        {/* Display validation error for amount */}
                        {backendErrors.find(error => error.param === 'amount') && (
                            <p className="error-message" style={{ color: 'red' }}>
                                {backendErrors.find(error => error.param === 'amount').msg}
                            </p>
                        )}

                        <Form.Select
                            name="type"
                            className="Form-Control"
                            value={data.type}
                            placeholder="Transaction Type"
                            onChange={handleChange}
                            required
                        >
                            <option>Transaction Type</option>
                            <option>Income</option>
                            <option>Expense</option>
                        </Form.Select>
                        {/* Display validation error for type */}
                        {backendErrors.find(error => error.param === 'type') && (
                            <p className="error-message" style={{ color: 'red' }}>
                                {backendErrors.find(error => error.param === 'type').msg}
                            </p>
                        )}

                        <Form.Select
                            name="category"
                            className="Form-Control"
                            value={data.category}
                            placeholder="Category"
                            onChange={handleChange}
                            required
                        >
                            <option>Select Category</option>
                            <option>Salary</option>
                            <option>Stationery</option>
                            <option>Supplier charges</option>
                            <option>Food</option>
                            <option>Transport</option>
                            <option>Bills</option>
                            <option>Medical</option>
                            <option>TAX</option>
                            <option>Services</option>
                        </Form.Select>
                        {/* Display validation error for category */}
                        {backendErrors.find(error => error.param === 'category') && (
                            <p className="error-message" style={{ color: 'red' }}>
                                {backendErrors.find(error => error.param === 'category').msg}
                            </p>
                        )}

                        <Form.Control
                            className="Form-Control"
                            name="date"
                            value={data.date}
                            placeholder="Date"
                            onChange={handleChange}
                            readOnly={true}
                            required
                        />

                        <Form.Control
                            className="Form-Control"
                            name="description"
                            value={data.description}
                            placeholder="Description"
                            onChange={handleChange}
                            required
                        />
                        {/* Display validation error for description */}
                        {backendErrors.find(error => error.param === 'description') && (
                            <p className="error-message" style={{ color: 'red' }}>
                                {backendErrors.find(error => error.param === 'description').msg}
                            </p>
                        )}

                        <Form.Control
                            className="Form-Control"
                            name="reference"
                            value={data.reference}
                            placeholder="Reference"
                            onChange={handleChange}
                            required
                        />
                        {/* Display validation error for reference */}
                        {backendErrors.find(error => error.param === 'reference') && (
                            <p className="error-message" style={{ color: 'red' }}>
                                {backendErrors.find(error => error.param === 'reference').msg}
                            </p>
                        )}
                    </Form.Group>
                    <br />
                    <button
                        style={{ borderRadius: "5px", background: "#b30059", padding: "1.5%", width: "75%", fontSize: "13px", paddingLeft: "5px", paddingRight: "5px", border: "#b30059" }}
                        onClick={handleClick}
                    >
                        ADD TRANSACTION
                    </button>
                </Form>
                <br />
                {/* Toast container to display the messages */}
                <ToastContainer position="top-right" autoClose={5000} />
            </div>
        </div>
    );
}

export default CreatePost;
