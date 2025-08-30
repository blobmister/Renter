// import ProfilePicture from './profilePicture.jsx'
// import UserName from './userName.jsx'
// import Location from './location.jsx'
// import RateIn from './rateIn.jsx'
// import RateOut from './rateOut.jsx'
// import NumListed from './numListed.jsx'
// import NumRented from './numRented.jsx'
import './styles/sidebar.css'
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {useUser} from "../UserContext.jsx";


async function fetchUserInfo(userId, setData, setError, setLoading, setRating) {
    try {
        const response = await fetch(`https://renter-production-faad.up.railway.app/api/user/getUserInfo/{userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) {
            throw new Error("Something went wrong fetching data!");
        }

        const json = await response.json();
        setData(json);

        const response2 = await fetch(`https://renter-production-faad.up.railway.app/api/user/getAveRevScore/{userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response2.ok) {
            throw new Error("Something went wrong fetching data!");
        }
        const json2 = await response2.json();
        setRating(parseInt(json2.data, 10));

    } catch(err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
}


function SideBar() {
    const location = useLocation();
    const { user } = useUser();
    const { userId } = location.state || user.id;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (userId) {
            fetchUserInfo(userId, setData, setError, setLoading, setRating);
        }
    }, [userId]);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h1>Error retrieving profile</h1>
            </div>
        );
    }

    return (
        <div className="sidebar-container">
            <div className="pic-name-container">
                <span className="profile-pic"></span>
                <div className="user-info">
                    <p className="user-name">{data.name}</p>
                    <p className="user-location">{data.location}</p>
                </div>
            </div>

            <div className="about-me">
                <p className="section-title">About Me</p>
                <p className="section-text">
                    {data.description || "No description"}
                </p>
            </div>

            <div className="ratings-container">
                <div className="rating">
                    <p className="rating-title">Rating</p>
                    <p>
                        {Array.from({ length: rating }, (_, i) => (
                            <span key={i}>&#9733;</span>
                        ))}
                    </p>
                </div>
            </div>

            <div className="items-container">
                <div className="items">
                    <p className="items-title">Items Listed</p>
                    <p className="items-number">5</p>
                </div>
                <div className="items">
                    <p className="items-title">Items Used</p>
                    <p className="items-number">10</p>
                </div>
            </div>

            <div className="edit-profile-container">
                <button className="edit-profile-button">Edit Profile</button>
            </div>
        </div>
    );
}

export default SideBar
