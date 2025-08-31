import { useState } from "react";
import { useNavigate } from 'react-router'
import './Catalogue.css'
import TopBar from './components/topBar.jsx'

// Sample data
const items = [
  { id: 1, name: "Claw Hammer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$29", image: "hammer.jpg", lister: "John Doe" },

  { id: 2, name: "Zero Turn Mower", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$175", image: "mower4.png", lister: "Jessica Smith" },

  { id: 3, name: "Inco ladder", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$70", image: "ladder.jpg", lister: "Stanley Johnson" },

  { id: 4, name: "Electric Drill", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$20", image: "drill.jpg", lister: "Zhitian Mai" },

  { id: 5, name: "fibreglass ladder", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$90", image: "ladder4.jpg", lister: "Ashley Riley" },

  { id: 6, name: "Cordless Drill", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$30", image: "drilll4.jpeg", lister: "Krish Gupta" },

  { id: 7, name: "Chair", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$20", image: "chair.png", lister: "Bobby Lowe" },

  { id: 8, name: "Lawn Mower", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$200", image: "mower.jpeg", lister: "Benny Cook" },

  { id: 9, name: "Table", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$70", image: "table.jpeg", lister: "Michael Adams" },

  { id: 10, name: "Step ladder", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$75", image: "ladder2.jpg", lister: "Jacob Veloso" },

  { id: 11, name: "Sofa", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$120", image: "couch.jpeg", lister: "Baily Ryan" },
  
  { id: 12, name: "Hammer in good condition", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$25", image: "hammer2.jpg", lister: "Marsya Amanda" },
  
  { id: 13, name: "brushless lawn mower", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$350", image: "mower2.jpg", lister: "Andy Jones" },

  { id: 14, name: "lawn mower", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$260", image: "mower3.jpeg", lister: "Paul Jackson" },

  { id: 15, name: "Framing hammer", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$30", image: "hammer3.jpg", lister: "Declan Schulz" },
  
  { id: 16, name: "Fibreglass step ladder", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "$100", image: "ladder3.jpeg", lister: "Angela Jackson" },
  
];

export default function CataloguePage() {
  const [catalogue] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalItem, setModalItem] = useState(null);
  let navigate = useNavigate();

  // Open popup
  const openModal = (item) => setModalItem(item);

  // Close popup
  const closeModal = (e) => {
    if (e.target.className === "modal") {
      setModalItem(null);
    }
  };

  // Filtered items (currently filtered based on directly matching keywords)
  const filteredItems = catalogue.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <>
    <div className="container">
      <TopBar align-self="flex-start"/>
      {/*<div className="header-section">
        
      </div>

      <h1>Items Available</h1>*/}
      
        {/* Search bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      {/* All items */}
      <div className="grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="card" onClick={() => openModal(item)}>
            <img src={`/assets/${item.image}`} alt={item.name} />
            <div className="card-content">
              <h2>{item.name}</h2>
              <p>{item.price || "Price not listed"}</p>  
            </div>
          </div>
        ))}
      </div>
      
      {/* Pop up */}
      {modalItem && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>{modalItem.name}</h2>
            <img 
              src={`/assets/${modalItem.image}`}
              alt={modalItem.name}
              className="product-img"
            />
            <h3>Description</h3>
            <p>{modalItem.description}</p>
            <h3>Lister Profile</h3>
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="profile-img"
            />
            <button onClick={() => {navigate("/dashboard")}}>{modalItem.lister}</button>
          </div>
        </div>
      )}
    </div>
  </>
    
  );
}