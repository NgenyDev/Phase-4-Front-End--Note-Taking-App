// import React, { useState, useEffect } from 'react'; // Import useState and useEffect for managing carousel visibility
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Signup from './components/Signup';
// import Home from './components/Home';
// import Contact from './components/Contact';
// import Login from './components/Login'; // Import the Login component
// import './App.css';
// import Help from './components/Help';
// import Footer from './components/Footer';
// import Carousel from './components/Carousel';
// import Notes from './components/Notes';

// const App = () => {
//     const [showCarousel, setShowCarousel] = useState(true);

//     // Function to handle clicks anywhere on the page
//     const handleClick = () => {
//         setShowCarousel(false);
//     };

//     // Set up a click event listener when the component mounts
//     useEffect(() => {
//         // Attach event listener
//         document.addEventListener('click', handleClick);

//         // Clean up the event listener on component unmount
//         return () => {
//             document.removeEventListener('click', handleClick);
//         };
//     }, []);

//     return (
//         <Router>
//             <Header />
//             {/* Main content area */}
//             <div className="app-container">
//                 <Routes>
//                     <Route path='/Help' element={<Help />} />
//                     <Route path='/contact' element={<Contact />} />
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/signup" element={<Signup />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path='/blog' element={<Notes />} />
//                     {/* Route for Carousel removed */}
//                 </Routes>
//                 {/* Conditionally render the Swiper carousel */}
//                 {showCarousel && <Carousel />}
//             </div>
//             <Footer />
//         </Router>
//     );
// };

// export default App;

import React, { useState, useEffect } from 'react'; // Import useState and useEffect for managing carousel visibility
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Signup from './components/Signup';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/Login'; // Import the Login component
import Profile from './components/Profile'; // Import the Profile component
import './App.css';
import Help from './components/Help';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Notes from './components/Notes';

const App = () => {
    const [showCarousel, setShowCarousel] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

    // Function to handle clicks anywhere on the page
    const handleClick = () => {
        setShowCarousel(false);
    };

    // Set up a click event listener when the component mounts
    useEffect(() => {
        // Attach event listener
        document.addEventListener('click', handleClick);

        // Check for user token (or similar) in localStorage to set login state
        const userToken = localStorage.getItem('userToken'); // Example token
        setIsLoggedIn(!!userToken); // Set logged in state based on token

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {/* Main content area */}
            <div className="app-container">
                <Routes>
                    <Route path='/help' element={<Help />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/profile" element={<Profile />} /> {/* New Profile Route */}
                    <Route path='/blog' element={<Notes />} />
                </Routes>
                {/* Conditionally render the Swiper carousel */}
                {showCarousel && <Carousel />}
            </div>
            <Footer />
        </Router>
    );
};

export default App;
