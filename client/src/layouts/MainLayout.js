import React from 'react'
import { useNavigate } from 'react-router-dom';



function MainLayout({children}) {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  console.log(user);
  function logout() {
    localStorage.removeItem("currentUser");
    localStorage.clear();
    window.location.href = "/";
  }  

  return (

    <div>
        <header>
        

<nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            {/* <label className="navbar-brand" onClick={()=>navigate("/home")}>
              Service Management
              </label>
             */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <li className="mt-2" style={{marginLeft:'-40%'}}> 
              {location.state.id}
              
              </li> */}
              <li style={{marginRight:'30px'}}> 
              
              <button 
              style={{ borderRadius:'5px', border:'none', width:'120%',height:'35px', fontSize:'18px', color: 'white', marginLeft:"980%", marginTop:'6px',
              background: '#f65365'}}
                onClick={(logout)}
              >
              Logout
              </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        </header>

        <main>
            <div className='container mt-3'>
                <div className='bg-light p-3 mt-4 rounded-3'>
                    {children}
           </div>
                </div>

        </main>

      
    </div>
    
  )
}

export default MainLayout;
