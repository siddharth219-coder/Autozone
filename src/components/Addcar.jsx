
import { useState } from "react";
import axios from "axios";

function AddCar({ closeForm, onCarAdded, editCar, darkMode }) {
    const [car, setCar] = useState({
        brand: editCar?.brand || "",
        model: editCar?.model || "",
        price: editCar?.price || "",
        builtYear: editCar?.builtYear || "",
        transmission: editCar?.transmission || "",
        hp: editCar?.hp || "",
        torque: editCar?.torque || "",
        image: editCar?.image || ""
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setCar({
            ...car,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();


        const carData = {
            ...car,
            price: Number(car.price),
            builtYear: Number(car.builtYear),
            hp: Number(car.hp),
            torque: Number(car.torque)
        }

        try {
            if (editCar) {
                await axios.put(`http://localhost:7000/cars/${editCar.id}`, carData)
            } else {
                await axios.post(
                    "http://localhost:7000/cars",
                    carData
                )
            }

            onCarAdded();
            closeForm();
        } catch (error) {
            console.log(error);
            alert("Unable to add car. Please try again.");
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <form onSubmit={handleSubmit} className={`p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto transition-colors duration-300 ${darkMode
                    ? "bg-[#1D1E1A] text-white"
                    : "bg-[#FBF9F4] text-[#111210]"
                }`}>
                <h2 className="text-2xl font-bold mb-5 text-[#C6A96B]">{editCar ? "Edit Car" : "Add New Car"}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="brand" placeholder="Brand (e.g. BMW)" value={car.brand} onChange={handleChange} className="border p-3 rounded" required />

                    <input name="model" placeholder="Model (e.g. M4 Competition)" value={car.model} onChange={handleChange} className="border p-3 rounded" required />

                    <input name="price" type="number" placeholder="Price" value={car.price} onChange={handleChange} className="border p-3 rounded" min="1" required />

                    <input name="builtYear" type="number" placeholder="Built Year" value={car.builtYear} onChange={handleChange} className="border p-3 rounded" required />

                    <select name="transmission" value={car.transmission} onChange={handleChange} className="border p-3 rounded" required>
                        <option value="">Select Transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>

                    <input name="hp" type="number" placeholder="Horsepower (HP)" value={car.hp} onChange={handleChange} className="border p-3 rounded" min="1" required />

                    <input name="torque" type="number" placeholder="Torque (Nm)" value={car.torque} onChange={handleChange} className="border p-3 rounded" min="1" required />

                    <input name="image" type="url" placeholder="Car Image URL" value={car.image} onChange={handleChange} className="border p-3 rounded" required />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button type="button" onClick={closeForm} className="px-4 py-2 rounded bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded bg-[#C6A96B] text-black font-semibold">{editCar ? "Update Car : " : "Add Car"}</button>
                </div>
            </form>
        </div>
    );
}

export default AddCar;
