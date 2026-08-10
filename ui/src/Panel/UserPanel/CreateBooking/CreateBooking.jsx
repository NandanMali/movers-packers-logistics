import { useState } from "react";
import './CreateBooking.css';

export default function CreateBooking() {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    pickup: "",
    destination: "",
    movingDate: "",
    vehicleType: "Mini Truck",
    workers: 2,
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toLocaleString(),
    };

    existingBookings.push(newBooking);

    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    alert("Booking Created Successfully");

    setFormData({
  customerName: "",
  phone: "",
  pickup: "",
  destination: "",
  movingDate: "",
  vehicleType: "Mini Truck",
  workers: 2,
  status: "Pending",
});

  };

  return (
    <div className="user-page">
      <h2>Create Booking</h2>

      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="pickup"
          placeholder="Pickup Address"
          value={formData.pickup}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination Address"
          value={formData.destination}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="movingDate"
          value={formData.movingDate}
          onChange={handleChange}
          required
        />

        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
        >
          <option>Mini Truck</option>
          <option>Pickup</option>
          <option>Container Truck</option>
          <option>Trailer</option>
        </select>

        <input
          type="number"
          name="workers"
          min="1"
          max="10"
          value={formData.workers}
          onChange={handleChange}
        />

        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
}
