import {useState, useEffect} from 'react';

export default function ServiceAppointmentList() {
    const [appointments, setAppointments] = useState([])

    // const getData = async ()=> {
    //     const resp = await fetch('http://localhost:8080/services/', {method: "GET"})
    //     const data = await resp.json()
    //     setAppointments(data.appointments)
    // }
    // const handleDelete = async (vehicle_vin) => {
    //     const resp = await fetch(`http://localhost:8080/services/${vehicle_vin}/`, { method:"DELETE"})
    //     const data = await resp.json()
    //     // getData();
    // }

    // const jar = Object.values(appointments)

    useEffect(() => {
        if (appointments.length === 0) {
            async function testData() {
                const resp = await fetch('http://localhost:8080/services/')
                const data = await resp.json()
                setAppointments(data.appointments)
            }
            testData()
        }
    }, [appointments])

    console.log(appointments)

    return (
        <>
        <table className="table table-striped">
        <thead>
            <tr>
            <th>Vehicle VIN</th>
            <th>Appointment Date & Time</th>
            <th>Appointment Reason</th>
            <th>Owner</th>
            <th>Assigned Technician</th>
            <th>      </th>
            </tr>
        </thead>
        <tbody>
            {appointments.map((appointment) => {
                return (
                    <tr key={appointment.id}>
                        <td>{ appointment.vehicle_vin }</td>
                        <td>{ appointment.appointment_datetime }</td>
                        <td>{ appointment.appointment_reason }</td>
                        <td>{ appointment.owner }</td>
                        <td>{ appointment.technician.name }</td>
                        {/* <td>
                            <button onClick={()=> handleDelete(appointment.id)}>Delete</button>
                        </td> */}
                    </tr>
                );
            })}
        </tbody>
        </table>
        <a href="/services/create/"><button>ADD A NEW SERVICE APPOINTMENT</button> </a>
        </>
    );
}
