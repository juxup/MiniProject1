import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [loginSt, setLogin] = useState(
    sessionStorage.getItem("logged") != null ? sessionStorage.getItem("logged") : 0
  );
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem("isAdmin") == 1);

  const host = "https://mini-project2-sigma.vercel.app";
  async function check() {
    if (uname.trim() === "" || pwd.trim() === "") {
      alert("Both fields are required");
      return;
    }

    try {
      const res = await axios.get(
        host + "/users/users",
        {
          headers: {
            "Content-Type": "text/html"
          },
        }
);

      const user = res.data.rows.find(
        (u) => u.username === uname.trim() && u.password === pwd.trim()
      );

      if (user) {
        const isAdmin = user.role_id === 1;

        sessionStorage.setItem("logged", 1);
        sessionStorage.setItem("isAdmin", isAdmin ? 1 : 0);
        sessionStorage.setItem("username", user.username);

        setLogin(1);
        setIsAdmin(isAdmin);

        alert(`Login successful! You are logged in as ${isAdmin ? "Admin" : "User"}.`);
      } else {
        alert("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  }

  function logout() {
    sessionStorage.setItem("logged", 0);
    sessionStorage.setItem("isAdmin", 0);
    sessionStorage.removeItem("username");
    setLogin(0);
    setIsAdmin(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-400">
      <div className="w-full max-w-lg bg-orange-100 shadow-md rounded-lg p-6">
        {loginSt == 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600">Username:</label>
                <input
                  className="border-2 p-2 w-full rounded"
                  type="text"
                  id="uname"
                  value={uname}
                  onChange={(e) => setUname(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-600">Password:</label>
                <input
                  className="border-2 p-2 w-full rounded"
                  type="password"
                  id="pwd"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                onClick={check}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Welcome, {sessionStorage.getItem("username")}
            </h2>
            <p className="text-gray-600 mb-4">
              You are logged in as {isAdmin ? "Admin" : "User"}.
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}