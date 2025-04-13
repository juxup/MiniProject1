import axios from "axios";

var host = "https://localhost:3000";

const GetMovies = async () => {
  const res = await axios.get(host+"/movies/movies",{ headers: {
    'Content-Type': 'text/html',"Access-Control-Allow-Origin":host,
    "Access-Control-Allow-Headers": "Origin, X-Requested-With"
 }}, { withCredentials: true });
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
    const json = JSON.stringify(updatedMovie);
       const res = await axios.post(host+"/movies/updatemovie",json,{ headers: {
      'Content-Type': 'text/html',"Access-Control-Allow-Origin":host,
      "Access-Control-Allow-Headers": "Origin, X-Requested-With"
   }}, { withCredentials: true });

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
  const res = await axios.get(host+"/shop/delbook?id="+id1,{ headers: {
    'Content-Type': 'text/html',"Access-Control-Allow-Origin":host,
    "Access-Control-Allow-Headers": "Origin, X-Requested-With"
 }}, { withCredentials: true });
  if (res.data.ans === 1) {
    const updatedMovies = await GetMovies();
    setMovies(updatedMovies);
    setLength(updatedMovies.length);
  }
}
async function AddMovie(newMovie, setMovies, setLength) {
  try {
    const json = JSON.stringify(newMovie);
   const res = await axios.post(host+"/movies/addmovie",json,{ headers: {
  'Content-Type': 'text/html',"Access-Control-Allow-Origin":host,
  "Access-Control-Allow-Headers": "Origin, X-Requested-With"
}}, { withCredentials: true });

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

export { GetMovies, DeleteMovie, AddMovie, UpdateMovie };import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRouter from "./routes/MovieRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import roleRouter from "./routes/RoleRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173", // Local development
    "https://mini-project1-two.vercel.app", // Frontend on Vercel
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin); // Dynamically set the allowed origin
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Handle preflight requests
  }
  next();
});

// Routes
app.use("/movies", movieRouter);
app.use("/users", userRouter);
app.use("/roles", roleRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));