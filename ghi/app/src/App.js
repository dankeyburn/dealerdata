import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceAppointmentList from './ServiceAppointmentList';

function App(props) {
  // if (props.hats === undefined) {
  //   return null;
  // }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/services/" element={<ServiceAppointmentList />} />
          <Route path="/services/vehicle_history/" element={<ServiceAppointmentList vin_id={props.vin_id}/>} />
          <Route path="/services/create/" element={<ServiceAppointmentForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
