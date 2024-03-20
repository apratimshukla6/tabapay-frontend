import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import treeData from '../data/treeData.json';
import Modal from './Modal';
import 'react-json-pretty/themes/monikai.css';
import sendGraphQLRequest from '../client'; 
import TreeNavigation from './TreeNavigation';
import RightContentArea from './RightContentArea';

function Body() {
  const { state } = useAppContext();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isNavVisible, setIsNavVisible] = useState(window.innerWidth > 768);
  const [graphqlResponse, setGraphqlResponse] = useState(null);

  useEffect(() => {
    setGraphqlResponse(null);
  }, [activeCategory]);

  useEffect(() => {
    const handleResize = () => {
      setIsNavVisible(window.innerWidth > 768);
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onItemSelect = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
    const firstCategory = item.body ? Object.keys(item.body)[0] : null;
    setActiveCategory(firstCategory);

    if (window.innerWidth <= 768) {
      setIsNavVisible(false);
    }
  };

  const onSubmitGraphQL = async (url, requestType, body) => {
    try {
      const response = await sendGraphQLRequest(url, requestType, body);
      setGraphqlResponse(response);
    } catch (error) {
      console.error('GraphQL request failed:', error);
      setGraphqlResponse({ error: 'Failed to fetch data' });
    }
  };

  return (
    <div>
       <div className="hamburger-menu-container">
        <button className="hamburger-icon" onClick={() => setIsNavVisible(prev => !prev)}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
    <div className="d-flex">
      {isNavVisible && (
        <TreeNavigation 
        treeData={treeData.treeData} 
        onItemSelect={onItemSelect}
        selectedItemId={selectedItem?.id}
        />
      )}

      <RightContentArea
          selectedItem={selectedItem}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          graphqlResponse={graphqlResponse}
          onSubmitGraphQL={onSubmitGraphQL}
      />

      {isModalVisible && !selectedItem.children && (
        <Modal title="Sample Modal Title" onClose={() => setIsModalVisible(false)}>
          <p>{selectedItem?.name} was clicked.</p>
        </Modal>
      )}
    </div>
  </div>
  );
}

export default Body;