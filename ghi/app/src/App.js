import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import SalesList from "./SalesList";
import SaleForm from "./SaleForm";
import SalesPersonForm from "./SalesPersonForm";
import CustomerForm from "./CustomerForm";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import ServiceAppointmentList from "./Service/ServiceAppointmentList";
import ServiceAppointmentForm from "./Service/ServiceAppointmentForm";
import AutomobileList from "./Service/AutomobileList";
import AutomobileForm from "./Service/AutomobileForm";
import VehicleModelForm from "./Service/VehicleModelForm";
import ServiceHistory from "./Service/ServiceHistory";
import VehicleModellist from "./Service/VehicleModelList";

function App(props) {
  if (props.sales === undefined) {
    return null;
  }
  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/sales/" element={<SalesList sales={props.sales} />} />
            <Route path="/sales/new/" element={<SaleForm />} />
            <Route path="/salesperson/new/" element={<SalesPersonForm />} />
            <Route path="/customer/new" element={<CustomerForm />} />
            <Route path="/manufacturers/new" element={<ManufacturerForm />} />
            <Route path="/manufacturers/" element={<ManufacturerList />} />
            <Route path="/services/" element={<ServiceAppointmentList />} />
            <Route
              path="/services/vehicle_history/"
              element={<ServiceHistory vin_id={props.vin_id} />}
            />
            <Route
              path="/services/create/"
              element={<ServiceAppointmentForm />}
            />
            <Route path="/automobiles/" element={<AutomobileList />} />
            <Route path="/automobiles/create/" element={<AutomobileForm />} />
            <Route path="/models/" element={<VehicleModellist />} />
            <Route path="/models/create/" element={<VehicleModelForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
