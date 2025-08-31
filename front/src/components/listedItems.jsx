import './styles/collections.css';

function ListedItems({ isExpanded, onExpand, onCollapse }) {

  const items = [
    "drill.jpg",
    "hammer.jpg",
    "table.jpeg",
    "mower.jpeg",
    "couch.jpeg",
    "drill2.jpeg",
    "drill3.jpeg"
  ];

  const visibleItems = isExpanded ? items : items.slice(0, 3);

  return (
    <div className={isExpanded ? "expanded-container" : "minimised-container"}>
      <button className="collection-title" onClick={isExpanded ? onCollapse : onExpand}>
        Listed Items {isExpanded ? '⌄' : '>'}
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

export default ListedItems;
