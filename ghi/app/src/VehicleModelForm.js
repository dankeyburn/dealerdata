import React, {useState, useEffect} from 'react'

export default function CreateVehicleModel() {
    let [manufacturer, setManufacturer] = useState([])

    let [vehicleModel, setVehicleModel] = useState({
        name: '',
        picture_url: '',
        manufacturer_id: '',
    })

    useEffect(() => {
        if (manufacturer.length === 0) {
            async function manufacturerData() {
                const res = await fetch(`http://localhost:8100/api/manufacturers/`)
                const data = await res.json()
                setManufacturer(data.manufacturers)
            }
            manufacturerData()
        }
    }, [manufacturer]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...vehicleModel}
        const vehicleModelUrl = `http://localhost:8100/api/models/`

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await fetch(vehicleModelUrl, fetchConfig);

        if (res.ok) {
            const newVehicleModel = await res.json();
            console.log(newVehicleModel)
            setVehicleModel({
                name: '',
                picture_url: '',
                manufacturer_id: '',
            })
        }
        else {
            console.log(res)
            console.log(`vehiclemodleURL: ${vehicleModelUrl}`)
            console.log(`fetchconfig: ${fetchConfig}`)
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
                    <input value={vehicleModel.picture_url} onChange={(event) => setVehicleModel({ ...vehicleModel, picture_url: event.target.value })} placeholder="Picture_url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                    <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div className="mb-3">
                    <select value={vehicleModel.manufacturer_id} onChange={(event) => setVehicleModel({ ...vehicleModel, manufacturer_id: event.target.value })} placeholder="Manufacturer_id" required name="manufacturer_id" id="manufacturer_id" className="form-select">
                        <option value="">Assign a Manufacturer</option>
                        {manufacturer?.map(manufacturer => {
                            return(
                                <option key={manufacturer.id} value={manufacturer.id}>
                                    {manufacturer.name}
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
