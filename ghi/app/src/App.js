import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";

import ServiceAppointmentList from "./Service/ServiceAppointmentList";
import ServiceAppointmentForm from "./Service/ServiceAppointmentForm";
import AutomobileList from "./Service/AutomobileList";
import AutomobileForm from "./Service/AutomobileForm";
import VehicleModelForm from "./Service/VehicleModelForm";
import ServiceHistory from "./Service/ServiceHistory";
import VehicleModellist from "./Service/VehicleModelList";

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
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
          <Route path="/vehicles/" element={<VehicleModellist />} />
          <Route path="/vehicles/create/" element={<VehicleModelForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
