import axios from "axios";

var host = "http://localhost:3000";

const GetMovies = async () => {
  const res = await axios.get(host + "/movies/movies", {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  let list = [];
  res.data.rows.map((tmp) => {
    var movie = {
      id: tmp.id,
      title: tmp.title,
      release_date: tmp.release_date,
      director: tmp.director,
      main_actor: tmp.main_actor,
      budget: tmp.budget,
      runtime: tmp.runtime,
    };
    list.push(movie);
  });
  console.log(list);
  return list;
};
async function UpdateMovie(updatedMovie, setMovies, setLength) {
  try {
    const res = await axios.put(
      host + "/movies/updatemovie",
      updatedMovie,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (res.data.success) {
      const updatedMovies = await GetMovies();
      setMovies(updatedMovies);
      setLength(updatedMovies.length);
      return { success: true, movie: res.data.movie };
    } else {
      return { success: false, error: "Failed to update movie" };
    }
  } catch (error) {
    console.error("Error updating movie:", error);
    return { success: false, error: error.message };
  }
}
async function DeleteMovie(id, setMovies, setLength) {
  const res = await axios.delete(`${host}/movies/delmovie?id=${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  if (res.data.ans === 1) {
    const updatedMovies = await GetMovies();
    setMovies(updatedMovies);
    setLength(updatedMovies.length);
  }
}

async function GetMovieById(id) {
  const res = await axios.get(host + "/movies/movies", {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return res.data.rows[0];
}
async function AddMovie(newMovie, setMovies, setLength) {
  try {
    const res = await axios.post(
      `${host}/movies/addmovie`,
      newMovie,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (res.data.success) {
      const updatedMovies = await GetMovies();
      setMovies(updatedMovies);
      setLength(updatedMovies.length);
      return { success: true, movie: res.data.movie };
    } else {
      return { success: false, error: "Failed to add movie" };
    }
  } catch (error) {
    console.error("Error adding movie:", error);
    return { success: false, error: error.message };
  }
}

export { GetMovies, DeleteMovie, GetMovieById, AddMovie, UpdateMovie };