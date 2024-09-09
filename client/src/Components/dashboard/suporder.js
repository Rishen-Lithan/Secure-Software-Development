import "./dashboard.css";
import { useNavigate } from "react-router-dom"; //use to create dynamic application
import MainLayout from "../../layouts/MainLayout";

function SupOrder() {

  const navigate = useNavigate();
  // const location = useLocation()


  return (
    <div className="App">
     
      <MainLayout>
        <center><h1 style={{fontFamily:"mulish,sans-serif"}}>Choose Your Management</h1></center><br />
      </MainLayout>

      <div className="dash">
        <center>
        <div>
          <button className="btn-func" onClick={() => navigate("/sup")}>Supplier Management</button>
          <button className="btn-func" onClick={() => navigate("/ord")}>Order Management</button>
        </div>
        </center>
      </div>
    </div>
  );
}

export default SupOrder;
