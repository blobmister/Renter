import './styles/collections.css';

function SavedItems({ isExpanded, onExpand, onCollapse }) {

  const items = [
    "drill.jpg",
    "ladder.jpg",
  ];

  const visibleItems = isExpanded ? items : items.slice(0, Math.min(3, items.length));

  return (
    <div className={isExpanded ? "expanded-container" : "minimised-container"}>
      <button className="collection-title"
        onClick={isExpanded ? onCollapse : onExpand}
      >
        Saved Items {isExpanded ? '⌄' : '>'}
        </button>
      <div className="items-container">
        {visibleItems.map((src, idx) => (
          <button key={idx} className="item-thumbnail">
            <img src={`/assets/${src}`} alt={`Item ${idx + 1}`} className="thumbnail-image" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default SavedItems;
