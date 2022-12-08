import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceAppointmentList from './ServiceAppointmentList';
import ServiceAppointmentFormHook from './ServiceAppointmentFormHook';

function App(props) {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/services/" element={<ServiceAppointmentList />} />
          <Route path="/services/vehicle_history/" element={<ServiceAppointmentList vin_id={props.vin_id} />} />
          <Route path="/services/create/" element={<ServiceAppointmentFormHook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
