import React, { useState, useEffect } from "react";

export default function CreateServiceAppointment() {
  let [technician, setTechnician] = useState([]);

  let [appointment, setAppointment] = useState({
    vehicle_vin: "",
    owner: "",
    appointment_date: "",
    appointment_time: "",
    technician_id: "",
    appointment_reason: "",
    appointment_finish: false,
    is_vip: false,
  });

  useEffect(() => {
    if (technician.length === 0) {
      async function testData() {
        const res = await fetch(`http://localhost:8080/technicians/`);
        const data = await res.json();
        setTechnician(data);
      }
      testData();
    }
  }, [technician]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...appointment };
    const appointmentUrl = `http://localhost:8080/services/`;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(appointmentUrl, fetchConfig);

    if (res.ok) {
      const newAppointment = await res.json();

      setAppointment({
        vehicle_vin: "",
        owner: "",
        appointment_date: "",
        appointment_time: "",
        technician_id: "",
        appointment_reason: "",
        appointment_finish: false,
        is_vip: false,
      });
    }
  };

  return (
    <>
      <h1>Create a New Service Appointment</h1>
      <form onSubmit={handleSubmit} id="create-appointment-form">
        <div className="form-floating mb-3">
          <input
            value={appointment.vehicle_vin}
            onChange={(e) =>
              setAppointment({ ...appointment, vehicle_vin: e.target.value })
            }
            placeholder="Vehicle_vin"
            required
            type="text"
            name="vehicle_vin"
            id="vehicle_vin"
            className="form-control"
          />
          <label htmlFor="vehicle_vin">Vehicle VIN</label>
        </div>
        <div className="form-floating mb-3">
          <input
            value={appointment.appointment_date}
            onChange={(e) =>
              setAppointment({
                ...appointment,
                appointment_date: e.target.value,
              })
            }
            placeholder="Appointment_date"
            required
            type="date"
            name="appointment_date"
            id="appointment_date"
            className="form-control"
          />
          <label htmlFor="appointment_date">Appointment Date</label>
        </div>
        <div className="form-floating mb-3">
          <input
            value={appointment.appointment_date}
            onChange={(e) =>
              setAppointment({
                ...appointment,
                appointment_date: e.target.value,
              })
            }
            placeholder="Appointment_time"
            required
            type="time"
            name="appointment_time"
            id="appointment_time"
            className="form-control"
          />
          <label htmlFor="appointment_time">Appointment Time</label>
        </div>
        <div className="form-floating mb-3">
          <input
            value={appointment.appointment_reason}
            onChange={(e) =>
              setAppointment({
                ...appointment,
                appointment_reason: e.target.value,
              })
            }
            placeholder="Appointment_reason"
            required
            type="text"
            name="Appointment_reason"
            id="appointment_reason"
            className="form-control"
          />
          <label htmlFor="appointment_reason">Appointment Reason</label>
        </div>
        <div className="form-floating mb-3">
          <input
            value={appointment.owner}
            onChange={(e) =>
              setAppointment({ ...appointment, owner: e.target.value })
            }
            placeholder="Owner"
            required
            type="text"
            name="owner"
            id="owner"
            className="form-control"
          />
          <label htmlFor="owner">Vehicle Owner</label>
        </div>
        <div className="mb-3">
          <select
            value={appointment.technician_id}
            onChange={(e) =>
              setAppointment({ ...appointment, technician_id: e.target.value })
            }
            placeholder="Technician_id"
            required
            name="technician_id"
            id="technician_id"
            className="form-select"
          >
            <option value="">Assign a Technician</option>
            {technician?.map((technician) => {
              return (
                <option key={technician.id} value={technician.id}>
                  {technician.name}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
      <div className="alert alert-success d-none mb-0" id="success-message">
        Congratulations! New Appointment Created!
      </div>
    </>
  );
}
