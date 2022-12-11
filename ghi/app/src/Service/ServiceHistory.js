import { useState, useEffect } from "react";

export default function ServiceHistory() {
  const [searchInput, setSearchInput] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (appointments.length === 0) {
      async function appointmentData() {
        const res = await fetch("http://localhost:8080/services/");
        const data = await res.json();
        setAppointments(data.appointments);
      }
      appointmentData();
    }
  }, [appointments]);

  const handleSubmit = (e) => {
    appointments.filter((vin) => {
      return vin.match(searchInput);
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="search"
          type="text"
          placeholder="Enter VIN"
          onChange={handleChange}
          value={searchInput}
        />
        <button className="btn btn-primary">Search</button>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer name</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.vehicle_vin}</td>
                <td>{appointment.owner}</td>
                <td>{appointment.appointment_datetime}</td>
                <td>{appointment.appointment_datetime}</td>
                <td>{appointment.technician.name}</td>
                <td>{appointment.appointment_reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
