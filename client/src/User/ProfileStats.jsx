import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileStats.css";

const ProfileStats = () => {
  const [stats, setStats] = useState({
    rank: "N/A",
    solvedQuestions: 0,
    recentActivity: [],
    streak: 0,
    recentContests: [],
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Axios GET request with credentials
        const response = await axios.get("http://localhost:5000/api/stats/profile", {
          withCredentials: true, // Required to include cookies in the request
        });

        console.log("Fetched stats:", response.data); // Debugging log
        setStats(response.data); // Update stats state
        setError(null); // Reset any previous error
      } catch (err) {
        console.error(
          "Error fetching stats:",
          err.message || err.response?.statusText
        ); // Log the error
        setError(err.message || "Failed to fetch stats."); // Set error state
      }
    };

    fetchStats(); // Call the fetch function
  }, []);

  return (
    <div className="profile-stats">
      <h2>Profile Overview</h2>
      {error ? (
        // Display error message in red
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <div className="stats-section">
          <div className="stat-item">
            <h3>Rank</h3>
            <p>{stats.rank}</p>
          </div>
          <div className="stat-item">
            <h3>Questions Solved</h3>
            <p>{stats.solvedQuestions}</p>
          </div>
          <div className="stat-item">
            <h3>Streak</h3>
            <p>{stats.streak} days</p>
          </div>
          <div className="stat-item">
            <h3>Recent Activity</h3>
            <ul>
              {stats.recentActivity.length > 0 ? (
                stats.recentActivity.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))
              ) : (
                <li>No recent activity</li>
              )}
            </ul>
          </div>
          <div className="stat-item">
            <h3>Recent Contests</h3>
            <ul>
              {stats.recentContests.length > 0 ? (
                stats.recentContests.map((contest, index) => (
                  <li key={index}>{contest}</li>
                ))
              ) : (
                <li>No recent contests</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileStats;
