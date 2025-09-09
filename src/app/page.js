"use client";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  // Fetch companies
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    api.get("/companies")
       .then(res => setCompanies(res.data))
       .catch(err => console.error(err));
  };

  // Create company
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/companies", {
        company: { name, details }
      });
      setName("");
      setDetails("");
      fetchCompanies(); // refresh list
    } catch (err) {
      console.error("Error creating company:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Companies</h1>

      {/* Form to add new company */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <input
            type="text"
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <button type="submit">Add Company</button>
      </form>

      {/* Company list */}
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <strong>{company.name}</strong>: {company.details}
          </li>
        ))}
      </ul>
    </div>
  );
}
