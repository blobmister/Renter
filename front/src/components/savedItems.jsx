import './styles/collections.css';

function SavedItems({ isExpanded, onExpand, onCollapse }) {
  return (
    <div className={isExpanded ? "expanded-container" : "minimised-container"}>
      <button className="collection-title"
        onClick={isExpanded ? onCollapse : onExpand}
      >
        Saved Items {isExpanded ? '⌄' : '>'}
        </button>
      <div className="items-container">
        {/* Map through conversations and display them, dummy first */}
        <button className="item-thumbnail">I1</button>
        <button className="item-thumbnail">I2</button>
        <button className="item-thumbnail">I3</button>
        {isExpanded && (
            <>
              <button className="item-thumbnail">I4</button>
              <button className="item-thumbnail">I5</button>
              <button className="item-thumbnail">I6</button>
              <button className="item-thumbnail">I7</button>
            </>
        )}
      </div>
    </div>
  );
}

export default SavedItems;
