import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [accessToken, setAccessToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

    setAccessToken(accessToken);
    setIsAdmin(isAdmin);

    console.log('User Data : ', accessToken, isAdmin);
    
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(`${JSON.parse(errorText).message}`); // Display error message
        return;
      }

      const responseJson = await response.json();

      console.log('Logout Response : ', responseJson);

      toast.success('User Logged Out Successfully');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isAdmin');

      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (error) {
      console.log('Logout Failed : ', error);
    }
  }

  return (
    <div className="App">
      <center>
        <h1 style={{fontFamily:"Georgia",fontWeight:"bold"}}>Dashboard</h1>
      </center>

      <div className="dash">
        {isAdmin ? (
          <center>
            <div className="container">
              <button className="btn-func" onClick={() => navigate("/posts")}>Package Management</button>
              <button className="btn-func" onClick={() => navigate("/fin")}>Finance Management</button>
            </div>

            <div className="container">
              <button className="logout" onClick={handleLogout}>Log Out</button>
            </div>
          </center>
        ) : (
          <div className="container">
            <button className="btn-func" onClick={() => navigate("/products")}> Inventory Management</button>
            <div className="container">
              <button className="logout" onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
