import { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(`Registration Successful!\n\n${JSON.stringify(formData, null, 2)}`);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>First Name: </label>
          <input type="text" className="border-2 p-2" value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>

        <div>
          <label>Last Name: </label>
          <input type="text" className="border-2 p-2" value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>

        <div>
          <label>ID: </label>
          <input type="text" className="border-2 p-2" value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
          {errors.id && <p>{errors.id}</p>}
        </div>

        <div>
          <label>Email: </label>
          <input type="email" className="border-2 p-2" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>City: </label>
          <select className="border-2 p-2" value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <p>{errors.city}</p>}
        </div>

        <div>
          <label>Zip Code: </label>
          <input type="text" className="border-2 p-2" value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
          />
          {errors.zipCode && <p>{errors.zipCode}</p>}
        </div>

        <div>
          <label>Username: </label>
          <input type="text" className="border-2 p-2" value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div>
          <label>Password: </label>
          <input type="password" className="border-2 p-2 " value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button type="submit" className="bg-black text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
