import { useState, useEffect } from "react";

export default function ServiceAppointmentList() {
  const [appointments, setAppointments] = useState([]);

  const handleDelete = async (id) => {
    const res = await fetch(
      `http://localhost:8080/services/${appointments.id}/`,
      { method: "DELETE" }
    );
    const data = await res.json();
  };

  const handleFinish = async (id) => {
    const res = await fetch(
      `http://localhost:8080/services/${appointments.id}/`,
      { method: "PUT" }
    );
    const data = await res.json();
  };

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

  const isFinished = (appointment) => {
    if (appointment.appointment_finish === false) {
      return appointment;
    }
  };

  return (
    <>
      <h1>Service appointments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Time</th>
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
                <td>
                  <button onClick={handleDelete}>Cancel</button>
                  <button onClick={handleFinish}>Finished</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <a href="/services/create/">
        <button>ADD A NEW SERVICE APPOINTMENT</button>
      </a>
    </>
  );
}
