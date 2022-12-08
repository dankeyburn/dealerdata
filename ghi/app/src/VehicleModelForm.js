import React, {useState,useEffect} from 'react'

export default function CreateVehicleModel() {
    let [manufacturer, setManufacturer] = useState([])

    let [vehicleModel, setVehicleModel] = useState({
        name: '',
        picture_url: '',
        manufacturer: '',
    })

    useEffect(() => {
        if (manufacturer === undefined) {             // !== will cause the .map at line 76 to error reading undefined
            fetch(`http://localhost:8100/api/manufacturers/`)
                .then(res => res.json())
                .then(res => setManufacturer(res.manufacturer))
        }
    },[manufacturer])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...vehicleModel}
        const vehicleModelUrl = `http://localhost:8100/api/models/`

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(vehicleModelUrl, fetchConfig);

        if (response.ok) {
            const newVehicleModel = await response.json();

            setVehicleModel({
                name: '',
                picture_url: '',
                manufacturer: '',
            })
        }
    }

    return (
        <>
            <h1>Create a New Vehicle Model</h1>
            <form onSubmit={handleSubmit} id="create-appointment-form">
                <div className="form-floating mb-3">
                    <input value={vehicleModel.name} onChange={(event) => setVehicleModel({ ...vehicleModel, name: event.target.value })} placeholder="Name" required type="text" name="name" id="vehicle_vin" className="form-control" />
                    <label htmlFor="name">Vehicle VIN</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={vehicleModel.appointment_datetime} onChange={(event) => setAppointment({ ...appointment, appointment_datetime: event.target.value })}placeholder="Appointment_datetime" required type="text" name="appointment_datetime" id="appointment_datetime" className="form-control" />
                    <label htmlFor="appointment_datetime">Appointment Date & time</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={vehicleModel.appointment_reason} onChange={(event) => setAppointment({ ...appointment, appointment_reason: event.target.value })} placeholder="appointment_reason" required type="text" name="Appointment_reason" id="appointment_reason" className="form-control" />
                    <label htmlFor="appointment_reason">Appointment Reason</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={appointment.owner} onChange={(event) => setAppointment({ ...appointment, owner: event.target.value })} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control" />
                    <label htmlFor="owner">Vehicle Owner</label>
                </div>
                <div className="mb-3">
                    <select value={appointment.technician} onChange={(event) => setAppointment({ ...appointment, technician: event.target.value })} placeholder="technician" required name="technician" id="technician" className="form-select">
                        <option value="">Assign a Technician</option>
                        {technician.map(technician => {
                            return(
                                <option key={technician.name} value={technician.employee_id}>
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
