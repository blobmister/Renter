import './styles/collections.css';

function Conversations() {
  return (
    <div className="minimised-container">
      <button className="collection-title">Conversations &#62;</button>
      <div className="items-container">
        {/* Map through conversations and display them, dummy first */}
        <button className="user-thumbnail">C1</button>
        <button className="user-thumbnail">C2</button>
        <button className="user-thumbnail">C3</button>
      </div>
    </div>
  );
}

export default Conversations;
