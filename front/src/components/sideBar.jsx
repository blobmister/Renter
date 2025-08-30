// import ProfilePicture from './profilePicture.jsx'
// import UserName from './userName.jsx'
// import Location from './location.jsx'
// import RateIn from './rateIn.jsx'
// import RateOut from './rateOut.jsx'
// import NumListed from './numListed.jsx'
// import NumRented from './numRented.jsx'
import './styles/sidebar.css'
import Modal from "react-modal";
import { useState } from 'react';

Modal.setAppElement('#root');
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {useUser} from "../UserContext.jsx";


async function fetchUserInfo(userId, setData, setError, setLoading, setRating) {
    try {
        console.log("calling fetch")
        const response = await fetch(`https://renter-production-faad.up.railway.app/api/user/getUserInfo/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (!response.ok) {
            throw new Error("Something went wrong fetching data!");
        }
        else {
            console.log("first response ok")
        }

        const json = await response.json();
        setData(json);

        const response2 = await fetch(`https://renter-production-faad.up.railway.app/api/user/getAveRevScore/${userId}`, {
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
    const [modalOpen, setModalOpen] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemDesc, setItemDesc] = useState("");

    const postItem = async (e) => {
        e.preventDefault();

        const payload = {item_name: itemName, description: itemDesc};

        try {
            const response = await fetch("https://renter-production-faad.up.railway.app/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log("posted item", itemName)
            }
        } catch (err) {
            console.error(err);
        }
    }

    const { user } = useUser();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log("using effect")
        if (user) {
            console.log("user is found");

            fetchUserInfo(user.id, setData, setError, setLoading, setRating);
        }
    }, [user]);

    if (loading) {
        return (
            <div>

            {user && user.id}
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

                <div>
                    <p className='text-body' style={{fontWeight: 'bold'}}>items used</p>
                    <p style={{fontSize: '1.8em'}}>10</p>
                </div>
            </div>

            <div className="edit-profile-container">
                <button className="edit-profile-button">Edit Profile</button>
            <div style={{display: 'flex', alignSelf: 'center', marginTop: '1em'}}>
                <button style={{backgroundColor: '#ffffffff', color: '#000000'}}>Edit Profile</button>
                <button onClick={() => setModalOpen(true)}>Add Item</button>
            </div>
            <Modal
                isOpen={modalOpen}
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <div className='modal-container'>
                <h2>Add an Item</h2>
                <form onSubmit={postItem}>
                    <input type="text" placeholder='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)}></input>
                    <input type="text" placeholder='Item description' value={itemDesc} onChange={(e) => setItemDesc(e.target.value)}></input>
                    <button type="submit">Post Item</button>
                </form>
                <button onClick={() => setModalOpen(false)}>Close</button>

                </div>
            </Modal>

        </div>
    )
}

export default SideBar
