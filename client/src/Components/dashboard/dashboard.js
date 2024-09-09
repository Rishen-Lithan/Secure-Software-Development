import "./dashboard.css";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (

    <div className="App">

      <MainLayout>
        <center><h1 style={{fontFamily:"Georgia",fontWeight:"bold"}}>Dashboard</h1></center><br />
      </MainLayout>

      <div className="dash">
        <center>
          <div className="container">
            <button className="btn-func" onClick={() => navigate("/posts")}>Package Management</button>
            <button className="btn-func" onClick={() => navigate("/services")}>Service Management</button>
          </div>
          
        <div className="container">
          <button className="btn-func" onClick={() => navigate("/fin")}>Finance Management</button>
          <button className="btn-func" onClick={() => navigate("/data")}>Schedule Management</button>
        </div>

        <div className="container">
          <button className="btn-func" onClick={() => navigate("/products")}> Inventory Management</button>
          <button className="btn-func" onClick={() => navigate("/appointments")}>Appointment Management</button>
        </div>

        <div className="container">
          <button className="btn-func" onClick={() => navigate("/suporder")}>Supplier Management</button>
          <button className="btn-func" onClick={() => navigate("/emp")}>Employee Management</button>
        </div>
        
        </center>
      </div>
    </div>
  );
}

export default Dashboard;
