import React from 'react';


class ServiceAppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vehicle_vin: '',
            appointment_datetime: '',
            appointment_reason: '',
            owner: '',
            technician: []
        };

        this.handleVINChange = this.handleVINChange.bind(this);
        this.handleAppointmentDateTimeChange = this.handleAppointmentDateTimeChange.bind(this);
        this.handleAppointmentReasonChange = this.handleAppointmentReasonChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);

    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log(data);


        const serviceAppointmentUrl = `http://localhost:8080/services/create/`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(serviceAppointmentUrl, fetchConfig);
        if (response.ok) {
            const newServiceAppointment = await response.json();
            console.log(newServiceAppointment);

            const cleared = {
                vehicle_vin: '',
                appointment_datetime: '',
                appointment_reason: '',
                owner: '',
                technician: []
            };
            this.setState(cleared);
        }
    }

    handleVINChange(event) {
        const value = event.target.value;
        this.setState({vehicle_vin: value})
    }

    handleAppointmentDateTimeChange(event) {
        const value = event.target.value;
        this.setState({appointment_datetime: value})
    }

    handleAppointmentReasonChange(event) {
        const value = event.target.value;
        this.setState({appointment_reason: value})
    }

    handleOwnerChange(event) {
        const value = event.target.value;
        this.setState({owner: value})
    }

    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({technician: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/technicians/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();  // must parse!
            console.log(`data: ${data["name"]}`) // [object Object],[object Object],[object Object]
            this.setState({technician: data});  // error: trying to set state to multiple things
            }
          }



    render() {

        console.log(`this.state.technician: ${this.state.technician}`)
        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create a New Service Appointment</h1>
                  <form onSubmit={this.handleSubmit} id="create-hat-form">
                    <div className="form-floating mb-3">
                      <input value={this.state.vehicle_vin} onChange={this.handleVINChange} placeholder="vehicle_vin" required type="text" name="vehicle_vin" id="vehicle_vin" className="form-control" />
                      <label htmlFor="vehicle_vin">vehicle vin</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input value={this.state.appointment_datetime} onChange={this.handleAppointmentDateTimeChange} placeholder="appointment_datetime" required type="text" name="appointment_datetime" id="appointment_datetime" className="form-control" />
                      <label htmlFor="appointment_datetime">appointment datetime</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input value={this.state.appointment_reason} onChange={this.handleAppointmentReasonChange} placeholder="appointment_reason" required type="text" name="appointment_reason" id="appointment_reason" className="form-control" />
                      <label htmlFor="appointment_reason">appointment reason</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input value={this.state.owner} onChange={this.handleOwnerChange} placeholder="owner" required type="text" name="owner" id="owner" className="form-control" />
                      <label htmlFor="owner">owner</label>
                    </div>
                    <div className="mb-3">
                        <select value={this.state.technician} onChange={this.handleTechnicianChange} required name="technician" id="technician" className="form-select">
                            <option value="">assign a technician</option>
                            {/* {this.state.technician.map(technician => {
                                return(
                                    <option key={technician.id} value={technician.id}>
                                        {technician.name}
                                    </option>
                                );

                            })} */}
                            {console.log(`this.state: ${this.state}`)}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create Service Appointment</button>
                  </form>
                </div>
              </div>
            </div>
          );
        }

}
export default ServiceAppointmentForm;
