
import { useEffect, useState } from "react";
import axiosClient from "../service/api";


function Card({ search, refresh, onEdit, onDelete, darkMode }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axiosClient.get('/cars')
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const filteredCars = cars.filter((car) =>
    (car.brand + " " + car.model)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className={`min-h-screen p-4 sm:p-6 transition-colors duration-300 ${darkMode ? "bg-[#111210]" : "bg-[#EAE6DD]"
      }`}>

      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? "text-[#FBF9F4]" : "text-[#191A17]"
        }`}>
        Available Cars
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className={`rounded-xl overflow-hidden border transition-colors duration-300 ${darkMode
              ? "bg-[#1D1E1A] border-[#39382F]"
              : "bg-[#FBF9F4] border-[#DCD6C9]"
              }`}
          >
            <img
              src={car.image}
              alt={car.brand + " " + car.model}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <p className="text-xs tracking-widest text-[#C6A96B] uppercase">
                {car.brand}
              </p>

              <h2 className={`text-xl font-semibold mt-2 ${darkMode ? "text-[#FBF9F4]" : "text-[#191A17]"
                }`}>
                {car.model}
              </h2>

              <h3 className={`text-2xl font-bold mt-2 ${darkMode ? "text-[#FBF9F4]" : "text-[#191A17]"
                }`}>
                ₹{Number(car.price).toLocaleString("en-IN")}
              </h3>

              <div className={`flex flex-wrap gap-3 text-sm mt-4 ${darkMode ? "text-[#B8B5AC]" : "text-[#77756D]"
                }`}>
                <span>{car.builtYear}</span>
                <span>·</span>
                <span>{car.transmission}</span>
                <span>·</span>
                <span>{car.hp} HP</span>
              </div>

              <div className={`border-t mt-4 pt-4 flex justify-between items-center ${darkMode ? "border-[#39382F]" : "border-[#DCD6C9]"
                }`}>
                <span className={`text-sm ${darkMode ? "text-[#B8B5AC]" : "text-[#77756D]"
                  }`}>
                  {car.torque} Nm torque
                </span>

                <button
                  type="button"
                  className="text-[#C6A96B] text-sm font-medium"
                >

                </button>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => onEdit(car)}
                  className="flex-1 border border-[#C6A96B] text-[#C6A96B] py-2 rounded-md hover:bg-[#C6A96B]/15"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(car.id)}
                  className={`flex-1 border py-2 rounded-md ${darkMode
                    ? "border-[#55534A] text-[#B8B5AC] hover:bg-red-900/30"
                    : "border-[#D7D0C4] text-[#77756D] hover:bg-[#FEE2E2]"
                    }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
