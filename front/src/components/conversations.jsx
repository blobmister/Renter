import './styles/collections.css';

function Conversations({ isExpanded, onExpand, onCollapse }) {
  return (
    <div className={isExpanded ? "expanded-container" : "minimised-container"}>
      <button className="collection-title"
        onClick={isExpanded ? onCollapse : onExpand}
      >
        Conversations {isExpanded ? '⌄' : '>'}
      </button>
      <div className="items-container">
        {/* Map through conversations 1-6 and display them, dummy first */}
        <button className="user-thumbnail">C1</button>
        <button className="user-thumbnail">C2</button>
        <button className="user-thumbnail">C3</button>
        <button className="user-thumbnail">C4</button>
        <button className="user-thumbnail">C5</button>
        <button className="user-thumbnail">C6</button>
        <button className="user-thumbnail">C7</button>
        <button className="user-thumbnail">C8</button>
        {/* Map through rest of conversation */}
        {isExpanded && (
          <>
            <button className="user-thumbnail">C7</button>
            <button className="user-thumbnail">C8</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Conversations;
