import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    email: "",
    city: "",
    zipCode: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const cities = ["Greenville", "Greenwood", "Columbia", "Mauldin"];

  const validateForm = () => {
    let newErrors = {};

    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = "First name must contain only letters.";
    }

    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last name must contain only letters.";
    }

    if (!/^\d+$/.test(formData.id)) {
      newErrors.id = "ID must contain only numbers.";
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.city) {
      newErrors.city = "Please select a city.";
    }

    if (!/^\d+$/.test(formData.zipCode)) {
      newErrors.zipCode = "Zip Code must contain only numbers.";
    }

    if (/^\s|\d|[^A-Za-z0-9]/.test(formData.username)) {
      newErrors.username =
        "Username cannot start with a number or special character and must not contain spaces.";
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}/.test(formData.password)) {
      newErrors.password =
        "Password must be at least 10 characters long, include one uppercase letter, one lowercase letter, and one digit.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

  const host = "https://mini-project2-sigma.vercel.app";
    if (validateForm()) {
      try {
        const res = await axios.post(
          `${host}/users/adduser`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://mini-project1-two.vercel.app",
              "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setSuccessMessage("Registration successful!");
          setFormData({
            firstName: "",
            lastName: "",
            id: "",
            email: "",
            city: "",
            zipCode: "",
            username: "",
            password: "",
          });
        } else {
          setErrorMessage("Failed to register user. Please try again.");
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setErrorMessage("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-400 mt-12">
      <div className="w-full max-w-lg bg-orange-100 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">First Name:</label>
            <input
              type="text"
              className="border-2 p-2 w-full rounded"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-gray-600">Last Name:</label>
            <input
              type="text"
              className="border-2 p-2 w-full rounded"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-gray-600">ID:</label>
            <input
              type="text"
              className="border-2 p-2 w-full rounded"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
            {errors.id && <p className="text-red-500">{errors.id}</p>}
          </div>

          <div>
            <label className="block text-gray-600">Email:</label>
            <input
              type="email"
              className="border-2 p-2 w-full rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-600">City:</label>
            <select
              className="border-2 p-2 w-full rounded"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-gray-600">Zip Code:</label>
            <input
              type="text"
              className="border-2 p-2 w-full rounded"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
            {errors.zipCode && <p className="text-red-500">{errors.zipCode}</p>}
          </div>

          <div>
            <label className="block text-gray-600">Username:</label>
            <input
              type="text"
              className="border-2 p-2 w-full rounded"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-gray-600">Password:</label>
            <input
              type="password"
              className="border-2 p-2 w-full rounded"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Submit
          </button>
        </form>
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
}