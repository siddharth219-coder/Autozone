import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Card from './Card';
import AddCar from './Addcar';
import axios from 'axios';

const Home = () => {

    const [search, setSearch] = useState("")
    const [searchText, setSearchText] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [editCar, setEditCar] = useState(null)
    const [darkMode, setDarkMode] = useState(true)


    function handlechange() {
        setSearchText(search)
    }

    function handleCarAdded() {
        setRefresh(refresh + 1)
    }

    function handleEdit(car) {
        setEditCar(car)
        setShowForm(true)
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this car?")

        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:7000/cars/${id}`)
                setRefresh(refresh + 1)
            } catch (error) {
                console.log(error);
                alert("Unable to delete car.")
            }
        }
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-[#111210] text-white" : "bg-[#EAE6DD] text-[#111210]"
            }`}>

            <nav className="w-full min-h-20 px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 fixed top-0 z-40 bg-black" >
                <div className="flex flex-col justify-center">
                    <h1 className="text-[#C6A96B] text-xl sm:text-3xl uppercase">
                        Autozone
                    </h1>
                    <p className="text-[#C6A96B] text-[9px] sm:text-sm font-light">
                        THE ART OF AUTOMOTIVE
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <CiSearch color="#C6A96B" size={20} />

                    <input
                        type="text"
                        placeholder="Search cars..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`outline-none w-24 xs:w-32 sm:w-44 md:w-52 px-2 py-2 rounded ${darkMode
                            ? "bg-[#252620] text-white"
                            : "bg-[#EAE6DD] text-[#111210]"
                            }`}
                    />

                    <button type="button" onClick={handlechange}>
                        <FaArrowRight color="#C6A96B" size={20} />
                    </button>

                    <button
                        type="button"
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-[#77756D]/20"
                        aria-label="Toggle theme"
                    >
                        {darkMode ? (
                            <span className="text-[#C6A96B]">☀️</span>
                        ) : (
                            <span>🌙</span>
                        )}
                    </button>
                </div>
            </nav>
            <div className={`pl-6 fixed top-20 w-full h-16 z-30 transition-colors duration-300 ${darkMode
                    ? "bg-[#111210] text-white"
                    : "bg-[#EAE6DD] text-[#111210]"
                }`}>
                <p className="text-2xl font-sans font-medium">
                    The Collection
                </p>
                <p className={darkMode ? "text-[#B8B5AC]" : "text-[#77756D]"}>
                    Discover your next automobile
                </p>
            </div>
            <button onClick={() => {
                setEditCar(null)
                setShowForm(true)
            }}
                className="add w-14 h-14 rounded-full bg-[#C6A96B] flex items-center justify-center fixed right-6 bottom-6 cursor-pointer hover:bg-[#b39556]"><FaPlus color='black' size={25} /></button>
            {
                showForm && (
                    <AddCar
                        key={editCar ? editCar.id : "new"}
                        closeForm={() => {
                            setShowForm(false);
                            setEditCar(null);
                        }}
                        onCarAdded={handleCarAdded}
                        editCar={editCar}
                        darkMode={darkMode}
                    />
                )
            }
            <div className='w-full h-full mt-18'>
                <Card search={searchText} refresh={refresh} onEdit={handleEdit} onDelete={handleDelete} darkMode={darkMode} />
            </div>
        </div>
    )
}

export default Home