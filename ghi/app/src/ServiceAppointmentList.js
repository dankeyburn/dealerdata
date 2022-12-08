import {useState, useEffect} from 'react';

function ServiceAppointmentList(props) {
    const [appointments, setAppointments] = useState([])

    const getData = async ()=> {
        const resp = await fetch('http://localhost:8080/services/')
        const data = await resp.json()

        setAppointments(data)
    }

    const handleDelete = async (vehicle_vin) => {
        const resp = await fetch(`http://localhost:8080/services/${vehicle_vin}/`, { method:"DELETE"})
        const data = await resp.json()
        getData();
    }

    useEffect(() => {
        getData();
    }, [])

console.log(props)
return (
    <>
    <table className="table table-striped">
      <thead>
        <tr>
        <th>Vehicle VIN</th>
        <th>Appointment Date & Time</th>
        <th>Appointment Reason</th>
        <th>Assigned Technician</th>
        <th>      </th>
        </tr>
      </thead>
      <tbody>
          {props.appointments?.map(appointment => {
              return (
                  <tr key={appointment.id}>
                      <td>{ appointment.vehicle_vin }</td>
                      <td>{ appointment.appointment_datetime }</td>
                      <td>{ appointment.appointment_reason }</td>
                      <td>{ appointment.owner }</td>
                      <td>{ appointment.assigned_technician }</td>
                      <td>
                        <button onClick={()=> handleDelete(appointment.id)}>Delete</button>
                    </td>
                  </tr>
              );
          })}
      </tbody>
    </table>
    <a href="http://localhost:3000/services/create/"><button>ADD A NEW SERVICE APPOINTMENT</button> </a>
    </>
);
}

export default ServiceAppointmentList;
