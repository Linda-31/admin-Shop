import React from "react";
import '../Styles/style.css'; 
import AreaChart from "./areachat";
function Home (){
    return (
       
      <div className="d-flex" id="wrapper">
    
        <div className='d-flex gap-2'>
        <div className="col-md-4">
          <div className="card text-white bg-primary h-100">
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
          <div className="card text-white bg-success h-100">
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
          <div className="card text-white bg-warning h-100">
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