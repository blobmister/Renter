import './styles/collections.css';

function Conversations() {
  return (
    <div className="minimised-container">
      <button className="collection-title">Conversations &#62;</button>
      <div className="items-container">
        {/* Map through conversations and display them, dummy first */}
        <div className="user-thumbnail">Dummy Conversation 1</div>
        <div className="user-thumbnail">Dummy Conversation 2</div>
        <div className="user-thumbnail">Dummy Conversation 3</div>
      </div>
    </div>
  );
}

export default Conversations;
