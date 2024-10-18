import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after logout
import './Profile.css'; // Import your CSS for styling

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from your API or local storage
        const fetchUserData = async () => {
            try {
                // Replace with your actual API call
                const response = await fetch('http://localhost:5000/api/user'); // Example endpoint
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        // Handle logout logic (e.g., clearing tokens, redirecting)
        localStorage.removeItem('userToken'); // Example: remove user token
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {user ? (
                <div className="profile-details">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Add more fields as needed */}
                    <button onClick={handleLogout} className="logout-button">Log Out</button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
