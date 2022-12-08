import React, { useState, useEffect } from 'react';

export default function AppointmentForm() {
    const [vin, setVinNumber] = useState('');
    const [owner, setOwner] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [technician, setTech] = useState('');
    const [reason, setReason] = useState('');
    const [data, setData] = useState(null);

    const handleVinNumberChange = e => {
        setVinNumber(e.target.value);};
    const handleOwnerChange = e => {
        setOwner(e.target.value);};
    const handleDateChange = e => {
        setDate(e.target.value);};
    const handleTimeChange = e => {
        setTime(e.target.value);};
    const handleTechChange = e => {
        setTech(e.target.value);};
    const handleReasonChange = e => {
        setReason(e.target.value);};

    useEffect (() => {
        const url = 'http://localhost:8080/api/technicians/';
        fetch(url, {method:"GET"})
            .then(response => {
                return (response.json())
            })
            .then(data => {
                setData(data)
            });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const appointment = {
            vin,
            owner,
            date,
            time,
            technician,
            reason,
        }
        console.log(appointment); // delete me later!!!!!!!!!!!!!!!!!!
        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(appointment),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment); // delete me later!!!!!!!!!!!!!!!!!!!!!!!!!!!

            setVinNumber('')
            setOwner('')
            setDate('')
            setTime('')
            setTech('')
            setReason('')
        };
    }
    return ( data &&
        <div className="row">
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Schedule a service appointment</h1>
                    <form onSubmit={handleSubmit} id="create-appointment">
                    <div className="form-floating mb-3">
                        <input onChange={handleVinNumberChange} value={vin} placeholder="VIN number" required type="text" name="vin" id="vin" className="form-control"/>
                        <label htmlFor="vin">VIN Number</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleOwnerChange} value={owner} placeholder="Model name" required type="text" name="model_name" id="model_name" className="form-control"/>
                        <label htmlFor="model_name">Owner</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleDateChange} value={date} placeholder="Date" required type="date" name="date" id="date" className="form-control"/>
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleTimeChange} value={time} placeholder="Time" required type="time" name="time" id="coltimeor" className="form-control"/>
                        <label htmlFor="time">Time</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleTechChange} value={technician} required name="technician" id="technician" className="form-select">
                        <option>Choose a technician</option>
                        {data.techs?.map(tech => {
                            return (
                                <option key={tech.employee_number} value={tech.employee_number}>
                                    {tech.name}
                                </option>
                            );
                        })}
                        </select>
                    </div>
                    <div>
                        <p><label htmlFor="reason">Reason for service:</label></p>
                        <textarea onChange={handleReasonChange} value={reason} name="reason" id="reason" className="form-control"/>
                    </div>
                    <br></br>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                </div>
            </div>
    )
}
