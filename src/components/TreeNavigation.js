import React, { useEffect, useState } from 'react';

function TreeNavigation({ treeData, onItemSelect, selectedItemId }) {
  const [expandedIds, setExpandedIds] = useState({});

  useEffect(() => {
    if (selectedItemId) {
      const path = findPath(treeData, selectedItemId);
      const newExpandedIds = {};
      path.forEach((id, index) => {
        if (index < path.length - 1) {
          newExpandedIds[index] = id;
        }
      });
      setExpandedIds(newExpandedIds);
    }
  }, [selectedItemId]);

  const handleItemClick = (item, level) => {
    if (item.children && item.children.length > 0) {
      const newExpanded = expandedIds[level] === item.id ? null : item.id;
      setExpandedIds({ ...expandedIds, [level]: newExpanded });
    } else {
      onItemSelect(item);
    }
  };

  function findPath(data, itemId, path = [], level = 0) {
    for (let item of data) {
      if (item.id === itemId) {
        return [...path, item.id];
      } else if (item.children) {
        const foundPath = findPath(item.children, itemId, [...path, item.id], level + 1);
        if (foundPath) return foundPath;
      }
    }
    return null;
  }

  const renderTreeItems = (items, level = 0) => items.map((item) => (
    <div key={item.id} className="item-box" style={{ margin: '5px 0'}}>
      <div
        className={`collection ${!item.children && selectedItemId === item.id ? 'active' : ''}`}
        onClick={() => handleItemClick(item, level)}
      >
        {item.children && item.children.length > 0 ? (
          expandedIds[level] === item.id ? <i className="fas fa-angle-down"></i> : <i className="fas fa-angle-right"></i>
        ) : null}
        <span className="category-text">{' '}{item.name}</span>
      </div>
      {expandedIds[level] === item.id && item.children && (
        <div style={{ marginLeft: '20px' }}>
          {renderTreeItems(item.children, level + 1)}
        </div>
      )}
    </div>
  ));

  const treeItems = Array.isArray(treeData) ? treeData : treeData?.children || [];

  return (
    <nav className="bg-light p-3 nav-overlay" style={{ overflowY: 'auto' }}>
      {renderTreeItems(treeItems)}
    </nav>
  );
}

export default TreeNavigation;