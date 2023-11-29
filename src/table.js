import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './table.css';
function Table() {
  const location = useLocation();
  const apiData = location.state && location.state.apiData;

  useEffect(() => {
    console.log("Data from login component:", apiData);
    
  }, [apiData]);

  const volunteerData = apiData && apiData.data;

  return (
    <div className="table-container">
      <h1>Volnteer Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Location</th>
            <th>Languages</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(volunteerData) && volunteerData.length > 0 ? (
            volunteerData.map((volunteer, index) => (
              <tr key={index}>
                <td>{volunteer.name}</td>
                <td>{volunteer.contact}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.location}</td>
                <td>{volunteer.language ? volunteer.language.join(", ") : null}</td>
                <td>{volunteer.availability ? volunteer.availability.join(", ") : null}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
