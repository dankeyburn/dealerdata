import { useState, useEffect } from "react";

export default function VehicleModellist() {
  const [vehicleModels, setVehicleModels] = useState([]);

  const handleDelete = async (id) => {
    const res = await fetch(
      `http://localhost:8100/api/models/${vehicleModels.id}/`,
      { method: "DELETE" }
    );
    const data = await res.json();
  };

  useEffect(() => {
    if (vehicleModels.length === 0) {
      async function vehicleData() {
        const res = await fetch("http://localhost:8100/api/models/");
        const data = await res.json();
        setVehicleModels(data.models);
      }
      vehicleData();
    }
  }, [vehicleModels]);

  const carPhotoStyle = {
    height: 150,
    width: 200,
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Picture URL</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {vehicleModels.map((model) => {
            return (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>
                  <img
                    style={carPhotoStyle}
                    src={model.picture_url}
                    alt={model.name}
                  />
                </td>
                <td>{model.manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
