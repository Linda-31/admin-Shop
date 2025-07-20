import React from "react";
import '../Styles/style.css'; 
import AreaChart from "../Component/areachat";

function Home (){
    return (
       
         <div className="tablewrap">
        <h3 className="text-head">Dashboard </h3>
        
        <div className='d-flex gap-4 dashboard-container'>
        <div className="col-md-4">
          <div className="card text-dark bg-white  h-100 ">
            <div className="card-body d-flex align-items-center">
              <i className="bi bi-cash-coin fs-1 me-3"></i>
              <div>
                <h5 className="card-title">All-Time Revenue</h5>
                <p className="card-text fs-4">$120,500</p>
              </div>
            </div>
          </div>
        </div> 

        {/* Top Sales */}
        <div className="col-md-4">
          <div className="card text-dark bg-white  h-100">
            <div className="card-body d-flex align-items-center">
              <i className="bi bi-bar-chart-line-fill fs-1 me-3"></i>
              <div>
                <h5 className="card-title">Top Sales</h5>
                <p className="card-text fs-4">Nike Air Max</p>
              </div>
            </div>
          </div>
        </div>

        {/* New Customers */}
        <div className="col-md-4">
          <div className="card text-dark bg-white  h-100">
            <div className="card-body d-flex align-items-center">
              <i className="bi bi-people-fill fs-1 me-3"></i>
              <div>
                <h5 className="card-title">New Customers</h5>
                <p className="card-text fs-4">321 This Month</p>
              </div>
            </div>
          </div>
          </div>
     
        </div>
        <AreaChart />
    </div>
         
    )
}
export default Home;