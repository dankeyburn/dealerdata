import { useState, useEffect } from "react";

export default function VehicleModellist() {
  const [vehicleModels, setVehicleModels] = useState([]);

  // useEffect(() => {
  //   if (vehicleModels.length === 0) {
  //     async function vehicleData() {
  //       const res = await fetch("http://localhost:8100/api/models/");
  //       const data = await res.json();
  //       setVehicleModels(data.models);
  //     }
  //     vehicleData();
  //   }
  // }, [vehicleModels]);

  const getData = async () => {
    const res = await fetch(`http://localhost:8100/api/models/`);
    const data = await res.json();
    setVehicleModels(data.models);
  };

  const carPhotoStyle = {
    height: 150,
    width: 200,
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8100/api/models/${id}/`, {
      method: "DELETE",
    });
    const data = await res.json();
    getData();
  };

  useEffect(() => {
    getData();
  }, [vehicleModels]);

  return (
    <>
      <h1>Vehicle Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Picture URL</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {vehicleModels?.map((model) => {
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
                <td>
                  <button onClick={() => handleDelete(model.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
