import React, { useState, useEffect } from "react";
import { Pagination } from 'react-bootstrap';

function NumberPlate({ navigateToUsersList }) {
  const [numberPlateData, setNumberPlateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 4;

  const filteredItems = Object.keys(numberPlateData).filter(id => numberPlateData[id].numberPlate.toLowerCase().includes(search.toLowerCase()));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
      const apiKey = "AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs"; // Replace with your actual Firebase API key
      const databaseURL = "https://smart-parking-4c79f-default-rtdb.firebaseio.com/"; // Replace with your Firebase project URL
  
      // Construct the URL to fetch "NumberPlate" data from Firebase Realtime Database
      const apiUrl = `${'https://smart-parking-4c79f-default-rtdb.firebaseio.com/'}/NumberPlates.json?auth=${'AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs'}`;
  
      // Fetch "NumberPlate" data from Firebase
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setNumberPlateData(data || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
        setCurrentPage(1);
    }, [search]);

  // Calculate the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Generate the Pagination component
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Object.keys(numberPlateData).length / itemsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
        {i}
      </Pagination.Item>,
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Number Plate Data</h1><br/>
      <input className="search-bar-style" type="text" placeholder="Search by NUMBER PLATE" onChange={e => setSearch(e.target.value)} />
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th className="bg-black text-white">ID</th>
            <th className="bg-black text-white">User ID</th>
            <th className="bg-black text-white">Number Plate</th>
            <th className="bg-black text-white">Aadhar Front Image</th>
            <th className="bg-black text-white">RC Front Image</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((id) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{numberPlateData[id].userID}</td>
              <td>{numberPlateData[id].numberPlate}</td>
              <td><img src={numberPlateData[id].aadhaarFrontImageUri} alt="Aadhar Front Image" style={{ width: "300px", height: "500px" }} /></td>
              <td><img src={numberPlateData[id].rcFrontImageUri} alt="RC Front Image" style={{ width: "300px", height: "500px" }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <Pagination className="custom-pagination">{pageNumbers}</Pagination>
      </div>
    </div>
  )
}

export default NumberPlate