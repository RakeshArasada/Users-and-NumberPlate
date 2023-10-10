import React, { useState, useEffect } from "react";
import { Pagination } from 'react-bootstrap';

function UsersList({ navigateToNumberPlate }) {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 11;

  const filteredItems = Object.keys(userData).filter(id => userData[id].name.toLowerCase().includes(search.toLowerCase()));

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
      const apiKey = "AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs"; // Replace with your actual Firebase API key
      const databaseURL = "https://smart-parking-4c79f-default-rtdb.firebaseio.com/"; // Replace with your Firebase project URL
  
      // Construct the URL to fetch "Users" data from Firebase Realtime Database
      const apiUrl = `${'https://smart-parking-4c79f-default-rtdb.firebaseio.com/'}/Users.json?auth=${'AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs'}`;
  
      // Fetch "Users" data from Firebase
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data || []);
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
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
        {i}
      </Pagination.Item>,
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>User Data Table</h1><br/>
      <input className="search-bar-style" type="text" placeholder="Search by NAME" onChange={e => setSearch(e.target.value)} />
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th className="bg-black text-white">ID</th>
            <th className="bg-black text-white">Name</th>
            <th className="bg-black text-white">Email</th>
            <th className="bg-black text-white">Contact No</th>
            <th className="bg-black text-white">User Type</th>
            <th className="bg-black text-white">Is Verified</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((id) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{userData[id].name}</td>
              <td>{userData[id].email}</td>
              <td>{userData[id].contact_no}</td>
              <td>{userData[id].userType}</td>
              <td>{userData[id].isVerified}</td>
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

export default UsersList