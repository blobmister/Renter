import { useState } from "react";
import './Catalogue.css'

// Sample data
const items = [
  { id: 1, name: "Product A", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat nulla vitae tellus dictum, eget pellentesque augue sagittis. Curabitur quam risus, commodo at ultrices nec, ultrices a metus. Donec volutpat nulla id ex dignissim vestibulum. Nullam tempus pharetra odio, at rutrum risus luctus sit amet. Lorem ipsum dolor sit amet.", price: "price1", image: "https://via.placeholder.com/150", lister: "lister1" },
  { id: 2, name: "Product B", description: "desc 2", price: "price2", image: "https://via.placeholder.com/150", lister: "lister1" },
  { id: 3, name: "Product C", description: "desc 3", price: "price3", image: "https://via.placeholder.com/150", lister: "lister1" },
  { id: 4, name: "Product D", description: "desc 4", price: "price4", image: "https://via.placeholder.com/150", lister: "lister1" },
  { id: 5, name: "Product E", description: "desc 5", price: "price5", image: "https://via.placeholder.com/150", lister: "lister1" },
  { id: 6, name: "Product F", description: "desc 6", price: "price6", image: "https://via.placeholder.com/150", lister: "lister1" }
];

export default function CataloguePage() {
  const [catalogue] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalItem, setModalItem] = useState(null);

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
      <div className="header-section">
        <h1>Items Available</h1>
      
        {/* Search bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* All items */}
      <div className="grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="card" onClick={() => openModal(item)}>
            <img src={item.image} alt={item.name} />
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
            <img src={modalItem.image} alt={modalItem.name} />
            <h3>Description</h3>
            <p>{modalItem.description}</p>
            <h3>Lister Profile</h3>
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-md"
            />
            <p>{modalItem.lister}</p>
          </div>
        </div>
      )}
    </div>
  </>
    
  );
}