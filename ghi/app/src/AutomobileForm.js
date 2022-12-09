import React, {useState,useEffect} from 'react'

export default function CreateAutomobile() {
    let [model, setModel] = useState([])

    let [automobile, setAutomobile] = useState({
        color: '',
        year: '',
        vin: '',
        model: ''
    })

    useEffect(() => {
        if (model.length === 0) {
            async function modelData() {
                const res = await fetch(`http://localhost:8100/api/models/`)
                const data = await res.json()
                setModel(data.models)
            }
            modelData()
        }
    }, [model]);


    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {...automobile}
        const autoUrl = `http://localhost:8100/api/automobiles/`

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await fetch(autoUrl, fetchConfig);

        if (res.ok) {
            const newAutomobile = await res.json();

            setAutomobile({
                color: '',
                year: '',
                vin: '',
                model: ''
            })
        }
    }

    return (
        <>
            <h1>Create a New Automobile</h1>
            <form onSubmit={handleSubmit} id="create-automobile-form">
            <div className="form-floating mb-3">
                <input value={automobile.color} onChange={(e) => setAutomobile({ ...automobile, color: e.target.value })} placeholder="Automobile_color" required type="text" name="automobile_color" id="automobile_color" className="form-control" />
                <label htmlFor="automobile_color">Automobile Color</label>
            </div>
            <div className="form-floating mb-3">
                <input value={automobile.year} onChange={(e) => setAutomobile({ ...automobile, year: e.target.value })} placeholder="Automobile_year" required type="text" name="automobile_year" id="automobile_year" className="form-control" />
                <label htmlFor="automobile_color">Automobile Year</label>
            </div>
            <div className="form-floating mb-3">
                <input value={automobile.vin} onChange={(e) => setAutomobile({ ...automobile, vin: e.target.value })} placeholder="Automobile_vin" required type="text" name="automobile_vin" id="automobile_vin" className="form-control" />
                <label htmlFor="automobile_vin">Automobile VIN</label>
            </div>
            <div className="mb-3">
                    <select value={automobile.model} onChange={(e) => setAutomobile({ ...automobile, model: e.target.value })} placeholder="model" required name="model" id="model" className="form-select">
                        <option value="">Assign a Model</option>
                        {model?.map(model => {
                            return(
                                <option key={model.id} value={model.id}>
                                    {model.name}
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
