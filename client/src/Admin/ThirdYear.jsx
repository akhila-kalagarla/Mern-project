import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./thirdYear.css";
import { IoMdContact } from "react-icons/io";

const ThirdYears = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Fetch users from the API
  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/getuser");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      setData(users);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Navigate to user's profile stats page
  const handleExplore = (userId) => {
    navigate(`/user/profileStats/${userId}`);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="third-years-container">
      <h3>Third Year Students</h3>
      <ul>
        {data.length > 0 ? (
          data.map((student) => (
            <li key={student._id}> {/* Use unique keys */}
              <span className="student-profile">
                <IoMdContact className="contacticon" />
                <span className="student-name">{student.name}</span>
              </span>
              <span className="student-points">{student.points} Points</span>
              <button
                className="explore-btn"
                onClick={() => handleExplore(student._id)}
              >
                Explore
              </button>
            </li>
          ))
        ) : (
          <li>No students found</li> // Fallback if no data
        )}
      </ul>
    </div>
  );
};

export default ThirdYears;
