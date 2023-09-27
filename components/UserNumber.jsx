import React, { useEffect, useState } from "react";

function UsersList({ navigateToNumberPlate }) {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    
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
      }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>User Data Table</h1><br/>
        <table className="table table-striped">
        <thead className="thead-dark">
            <tr>
            <th className="bg-black text-white">ID</th>
              <th className="bg-black text-white">Name</th>
              <th className="bg-black text-white">Email</th>
              <th className="bg-black text-white">Contact No</th>
              <th className="bg-black text-white">User Type</th>
              <th className="bg-black text-white">Is Verified</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {Object.keys(userData).map((id) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{userData[id].name}</td>
                <td>{userData[id].email}</td>
                <td>{userData[id].contactno}</td> {/* Display Contact No */}
                <td>{userData[id].usertype}</td> {/* Display User Type */}
                <td>{userData[id].isverified}</td> {/* Display Is Verified */}
                {/* Add more table cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" class="btn btn-success" onClick={navigateToNumberPlate}>Go to NumberPlate</button>
    </div>
  )
}

function NumberPlate({ navigateToUsersList }) {
    const [numberPlateData, setNumberPlateData] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const apiKey = "AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs"; // Replace with your actual Firebase API key
        const databaseURL = "https://smart-parking-4c79f-default-rtdb.firebaseio.com/"; // Replace with your Firebase project URL
    
        // Construct the URL to fetch "NumberPlate" data from Firebase Realtime Database
        const apiUrl = `${'https://smart-parking-4c79f-default-rtdb.firebaseio.com/'}/NumberPlate.json?auth=${'AIzaSyBIwsfU1Ppz-mqFbpuv9-2pslWg0e0MOQs'}`;
    
        // Fetch "NumberPlate" data from Firebase
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            // Check if data is not null or undefined
            if (data) {
              // Update the state with fetched data
              setNumberPlateData(data);
            } else {
              // If data is null or undefined, set an empty array
              setNumberPlateData([]);
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      }, []);

  return (
    <div style={{ textAlign: "center" }}>
    <h1>Number Plate Data</h1><br/>
        <div> 
            <table className="table table-striped">
            <thead className="thead-dark">
            <tr>
                <th className="bg-black text-white">ID</th>
                <th className="bg-black text-white">Number Plate</th>
                <th className="bg-black text-white">Wheeler Type</th>
                <th className="bg-black text-white">Aadhar Front Image</th>
                <th className="bg-black text-white">RC Front Image</th>
                {/* Add more table headers as needed */}
            </tr>
            </thead>
            <tbody>
                {Object.keys(numberPlateData).map((id) => (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{numberPlateData[id].numberplate}</td>
                    <td>{numberPlateData[id].wheelertype}</td>
                    <td>{numberPlateData[id].AadharFrontImageUrl}</td>
                    <td>{numberPlateData[id].RcFrontImageUrl}</td>
                {/* Add more table cells as needed */}
                </tr>
            ))}
            </tbody>
        </table>
        <button type="button" class="btn btn-success" onClick={navigateToUsersList}>Go back to UsersList</button>
    </div>
  </div>
  )
}

function UserNumber() {
  const [currentPage, setCurrentPage] = useState("usersList");

  const navigateToNumberPlate = () => {
    setCurrentPage("numberPlate");
  };

  const navigateToUsersList = () => {
    setCurrentPage("usersList");
  };

  return (
    <div>
      {currentPage === "usersList" && (
        <UsersList navigateToNumberPlate={navigateToNumberPlate} />
      )}
      {currentPage === "numberPlate" && (
        <NumberPlate navigateToUsersList={navigateToUsersList} />
      )}
    </div>
  );
}

export default UserNumber;
