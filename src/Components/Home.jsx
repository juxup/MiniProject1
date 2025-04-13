import { useState, useContext, useEffect } from "react";
import { DataContext } from "../App";
import { GetMovies, DeleteMovie, AddMovie, UpdateMovie } from "../services/MovieService.js";

export default function Movies() {
    const { logStatus } = useContext(DataContext);
    const [movies, setMovies] = useState([]);
    const [length, setLength] = useState(-1);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const isAdmin = sessionStorage.getItem("isAdmin") == 1;
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [newMovie, setNewMovie] = useState({
        title: "",
        release_date: "",
        director: "",
        main_actor: "",
        budget: "",
        runtime: "",
    });
    const [updatedMovie, setUpdatedMovie] = useState({});

    async function getList() {
        var list = await GetMovies();
        setMovies(list);
        setLength(list.length);
    }

    useEffect(() => {
        getList();
    }, [logStatus, length]);

    async function delMovie(id) {
        await DeleteMovie(id, setMovies, setLength);
        alert("Movie deleted successfully!");
    }

    async function addMovie(e) {
        e.preventDefault();
        await AddMovie(newMovie, setMovies, setLength);
        alert("Movie added successfully!");
        setShowAddForm(false);
        setNewMovie({
            title: "",
            release_date: "",
            director: "",
            main_actor: "",
            budget: "",
            runtime: "",
        });
    }

    async function updateMovie(e) {
        e.preventDefault();
        const result = await UpdateMovie(updatedMovie, setMovies, setLength);
        if (result.success) {
            alert("Movie updated successfully!");
            setShowUpdateForm(false);
        } else {
            alert("Failed to update movie: " + result.error);
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-orange-400 min-h-screen">
            {/* Left Column: List of Movies */}
            <div className="w-full md:w-1/2 bg-orange-100 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Movies List</h2>
                <ul className="space-y-2">
                    {movies.map((movie) => (
                        <li
                            key={movie.id}
                            className={`p-4 border rounded-lg hover:bg-gray-100 cursor-pointer ${
                                selectedMovie?.id === movie.id ? "bg-gray-200" : ""
                            }`}
                            onClick={() => setSelectedMovie(movie)}
                        >
                            {movie.title}
                        </li>
                    ))}
                </ul>
                {isAdmin && (
                    <div className="mt-6">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() => setShowAddForm(!showAddForm)}
                        >
                            {showAddForm ? "Cancel" : "Add Movie"}
                        </button>
                    </div>
                )}
                {showAddForm && (
                    <form onSubmit={addMovie} className="mt-6 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700">Add New Movie</h3>
                        <div>
                            <label className="block text-gray-600">Title:</label>
                            <input
                                type="text"
                                className="border-2 p-2 w-full rounded"
                                value={newMovie.title}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, title: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Release Date:</label>
                            <input
                                type="date"
                                className="border-2 p-2 w-full rounded"
                                value={newMovie.release_date}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, release_date: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Director:</label>
                            <input
                                type="text"
                                className="border-2 p-2 w-full rounded"
                                value={newMovie.director}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, director: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Main Actor:</label>
                            <input
                                type="text"
                                className="border-2 p-2 w-full rounded"
                                value={newMovie.main_actor}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, main_actor: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Budget:</label>
                            <input
                                type="number"
                                className="border-2 p-2 w-full rounded"
                                value={newMovie.budget}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, budget: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Runtime (minutes):</label>
                            <input
                                type="number"
                                className="border-2 p-2 w-full rounded"
                                value={newMovie.runtime}
                                onChange={(e) =>
                                    setNewMovie({ ...newMovie, runtime: e.target.value })
                                }
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>

            {/* Right Column: Movie Details */}
            <div className="w-full md:w-1/2 bg-orange-100 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Movie Details</h2>
                {selectedMovie ? (
                    <div>
                        <p><strong>Title:</strong> {selectedMovie.title}</p>
                        <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                        <p><strong>Director:</strong> {selectedMovie.director}</p>
                        <p><strong>Main Actor:</strong> {selectedMovie.main_actor}</p>
                        <p><strong>Budget:</strong> ${selectedMovie.budget}</p>
                        <p><strong>Runtime:</strong> {selectedMovie.runtime} minutes</p>
                        {isAdmin && (
                            <div className="mt-6 flex gap-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => {
                                        setUpdatedMovie(selectedMovie);
                                        setShowUpdateForm(true);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => delMovie(selectedMovie.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                        {showUpdateForm && (
                            <form onSubmit={updateMovie} className="mt-6 space-y-4">
                                <h3 className="text-xl font-semibold text-gray-700">Update Movie</h3>
                                <div>
                                    <label className="block text-gray-600">Title:</label>
                                    <input
                                        type="text"
                                        className="border-2 p-2 w-full rounded"
                                        value={updatedMovie.title}
                                        onChange={(e) =>
                                            setUpdatedMovie({ ...updatedMovie, title: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Release Date:</label>
                                    <input
                                        type="date"
                                        className="border-2 p-2 w-full rounded"
                                        value={updatedMovie.release_date}
                                        onChange={(e) =>
                                            setUpdatedMovie({ ...updatedMovie, release_date: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Director:</label>
                                    <input
                                        type="text"
                                        className="border-2 p-2 w-full rounded"
                                        value={updatedMovie.director}
                                        onChange={(e) =>
                                            setUpdatedMovie({ ...updatedMovie, director: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Main Actor:</label>
                                    <input
                                        type="text"
                                        className="border-2 p-2 w-full rounded"
                                        value={updatedMovie.main_actor}
                                        onChange={(e) =>
                                            setUpdatedMovie({ ...updatedMovie, main_actor: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Budget:</label>
                                    <input
                                        type="number"
                                        className="border-2 p-2 w-full rounded"
                                        value={updatedMovie.budget}
                                        onChange={(e) =>
                                            setUpdatedMovie({ ...updatedMovie, budget: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Runtime (minutes):</label>
                                    <input
                                        type="number"
                                        className="border-2 p-2 w-full rounded"
                                        value={updatedMovie.runtime}
                                        onChange={(e) =>
                                            setUpdatedMovie({ ...updatedMovie, runtime: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            </form>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-600">Select a movie to see details.</p>
                )}
            </div>
        </div>
    );
}