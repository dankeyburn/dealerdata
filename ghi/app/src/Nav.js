import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers">List of Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers/new">Create a Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vehicles/">List of Vehicle Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vehicles/create/">Create a Vehicle Model</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles/">List of Automobiles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles/create/">Create Automobile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services/create/">Enter a Service Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services/list/">List of  Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services/vehicle_history/">View Service History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/">View Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/new">New Sale</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salesperson/new/">New Sales Person</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customer/new">New Customer</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;

