import './styles/sidebar.css';
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext.jsx";

Modal.setAppElement('#root');

async function fetchUserInfo(userId, setData, setError, setLoading, setRating) {
    console.log("fetching user info with id: " + userId);
    try {
        const response = await fetch(`https://renter-production-faad.up.railway.app/api/users/getUserInfo/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) throw new Error("Failed fetching user info");

        const json = await response.json();
        setData(json);

        const response2 = await fetch(`https://renter-production-faad.up.railway.app/api/users/getAveRevScore/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response2.ok) throw new Error("Failed fetching rating");

        const json2 = await response2.json();
        setRating(parseInt(json2.data, 10));

    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
}

function SideBar() {
    const { user } = useUser();
    const [data, setData] = useState(null);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemDesc, setItemDesc] = useState("");

    useEffect(() => {
        if (!user) return; // wait until user is loaded

        setLoading(true);
        fetchUserInfo(user.id, setData, setError, setLoading, setRating);
    }, [user]);

    const postItem = async (e) => {
        e.preventDefault();
        if (!itemName) return;

        const payload = { item_name: itemName, description: itemDesc };

        try {
            const response = await fetch(`https://renter-production-faad.up.railway.app/api/items/${user.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log("Posted item:", itemName);
                setModalOpen(false); // close modal
                setItemName("");
                setItemDesc("");
            } else {
                console.error("Failed to post item");
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error retrieving profile</h1>;

    return (
        <div className="sidebar-container">
            <div className="pic-name-container">
                <span className="profile-pic"></span>
                <div className="user-info">
                    <p className="user-name">{data?.name || "No Name"}</p>
                    <p className="user-location">{data?.location || "Unknown"}</p>
                </div>
            </div>

            <div className="about-me">
                <p className="section-title">About Me</p>
                <p className="section-text">{data?.description || "No description"}</p>
            </div>

            <div className="ratings-container">
                <div className="rating">
                    <p className="rating-title">Rating</p>
                    <p>{Array.from({ length: rating }, (_, i) => <span key={i}>&#9733;</span>)}</p>
                </div>
            </div>

            <div className="edit-profile-container">
                <button className="edit-profile-button">Edit Profile</button>
                <button onClick={() => setModalOpen(true)}>Add Item</button>
            </div>

            <Modal
                isOpen={modalOpen}
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <div className="modal-container">
                    <h2>Add an Item</h2>
                    <form onSubmit={postItem}>
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Item Description"
                            value={itemDesc}
                            onChange={(e) => setItemDesc(e.target.value)}
                        />
                        <button type="submit">Post Item</button>
                        <button type="button" onClick={() => setModalOpen(false)}>Close</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default SideBar;
