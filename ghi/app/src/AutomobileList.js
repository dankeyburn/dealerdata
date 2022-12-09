import {useState, useEffect} from 'react';

export default function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([])

    useEffect(() => {
        if (automobiles.length === 0) {
            async function testData() {
                const resp = await fetch('http://localhost:8100/api/automobiles/')
                const data = await resp.json()
                setAutomobiles(data.autos)
            }
            testData()
        }
    }, [automobiles])

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Vehicle VIN</th>
                        <th>Model</th>
                        <th>      </th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles.map(auto => {
                        return (
                            <tr key={auto.id}>
                                <td>{ auto.color }</td>
                                <td>{ auto.year }</td>
                                <td>{ auto.vin }</td>
                                <td>{ auto.model.name }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
