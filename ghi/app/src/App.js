import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceAppointmentList from './ServiceAppointmentList';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import VehicleModelForm from './VehicleModelForm';

function App(props) {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/services/" element={<ServiceAppointmentList />} />
          <Route path="/services/vehicle_history/" element={<ServiceAppointmentList vin_id={props.vin_id} />} />
          <Route path="/services/create/" element={<ServiceAppointmentForm />} />
          <Route path="/automobiles/" element={<AutomobileList />}/>
          <Route path="/automobiles/create/" element={<AutomobileForm />}/>
          <Route path="/vehicles/create/" element={<VehicleModelForm />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
