import React, {useState,useEffect} from 'react'

export default function CreateServiceAppointment() {
    let [technician, setTechnician] = useState([])

    let [appointment, setAppointment] = useState({
        vehicle_vin: '',
        appointment_datetime: '',
        appointment_reason: '',
        owner: '',
        technician: ''
    })

    useEffect(() => {
        if (technician.length === 0) {
            async function testData() {
                const resp = await fetch(`http://localhost:8080/technicians/`)
                const data = await resp.json()
                console.log(data)
                setTechnician(data)
            }
            testData()
        }
    }, [technician]);



    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...appointment}
        const appointmentUrl = `http://localhost:8080/services/`

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig);

        if (response.ok) {
            const newAppointment = await response.json();

            setAppointment({
                vehicle_vin: '',
                appointment_datetime: '',
                appointment_reason: '',
                owner: '',
                technician: ''
            })
        }
    }

    return (
        <>
            <h1>Create a New Service Appointment</h1>
            <form onSubmit={handleSubmit} id="create-appointment-form">
                <div className="form-floating mb-3">
                    <input value={appointment.vehicle_vin} onChange={(event) => setAppointment({ ...appointment, vehicle_vin: event.target.value })} placeholder="Vehicle_vin" required type="text" name="vehicle_vin" id="vehicle_vin" className="form-control" />
                    <label htmlFor="vehicle_vin">Vehicle VIN</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={appointment.appointment_datetime} onChange={(event) => setAppointment({ ...appointment, appointment_datetime: event.target.value })}placeholder="Appointment_datetime" required type="text" name="appointment_datetime" id="appointment_datetime" className="form-control" />
                    <label htmlFor="appointment_datetime">Appointment Date & time</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={appointment.appointment_reason} onChange={(event) => setAppointment({ ...appointment, appointment_reason: event.target.value })} placeholder="appointment_reason" required type="text" name="Appointment_reason" id="appointment_reason" className="form-control" />
                    <label htmlFor="appointment_reason">Appointment Reason</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={appointment.owner} onChange={(event) => setAppointment({ ...appointment, owner: event.target.value })} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control" />
                    <label htmlFor="owner">Vehicle Owner</label>
                </div>
                <div className="mb-3">
                    <select value={appointment.technician} onChange={(event) => setAppointment({ ...appointment, technician: event.target.value })} placeholder="technician" required name="technician" id="technician" className="form-select">
                        <option value="">Assign a Technician</option>
                        {technician?.map(technician => {
                            return(
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
    )
}
