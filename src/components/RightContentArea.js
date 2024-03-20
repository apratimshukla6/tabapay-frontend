import React from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

function RightContentArea({ selectedItem, activeCategory, setActiveCategory, graphqlResponse, onSubmitGraphQL }) {
  const handleSubmit = async (e, categoryDetails) => {
    e.preventDefault();
    onSubmitGraphQL(categoryDetails.code.url, categoryDetails.code.requestType, categoryDetails.code.body);
  };

  const renderCategoryForm = (categoryDetails) => {
    if (!categoryDetails.code) {
      return (
        <div className="category-card">
          {categoryDetails.text.split('\n').map((paragraph, index) => (
            <span key={index}>
              {paragraph}
              <br />
            </span>
          ))}
        </div>
      );
    }

    const formattedGraphQL = categoryDetails.code.body.replace(/\\n/g, '\n');

    return (
      <div className="category-card">
        {categoryDetails.text.split('\n').map((paragraph, index) => (
          <span key={index}>
            {paragraph}
            <br />
          </span>
        ))}
        <form className="category-form" onSubmit={(e) => handleSubmit(e, categoryDetails)}>
          <button type="button" disabled className="request-type-button">
            {categoryDetails.code.requestType}
          </button>
          <input type="text" readOnly defaultValue={categoryDetails.code.url} className="url-input" />
          <button type="submit" className="submit-button">Send</button>
        </form>
        <div className="graphql-body-section">
          <div className="graphql-label">GraphQL (Input)</div>
          <pre>{formattedGraphQL}</pre>
        </div>
        <div className="separator"></div>
        {graphqlResponse && (
          <div className="output-section">
            <div className="json-label">JSON (Output)</div>
            <JSONPretty id="json-pretty" data={JSON.stringify(graphqlResponse, null, 2)} theme={JSONPretty.monikai}></JSONPretty>
          </div>
        )}
      </div>
    );
  };

  const renderCategoryDetails = () => {
    if (!selectedItem?.body) {
      return <p>Select an item to see details.</p>;
    }

    return Object.entries(selectedItem.body).map(([category, categoryDetails], index) => (
      <div key={index} onClick={() => setActiveCategory(category)}>
        <h3 className={`category-title ${activeCategory === category ? 'active' : ''}`}>
          {category}
        </h3>
        {activeCategory === category && renderCategoryForm(categoryDetails)}
      </div>
    ));
  };

  return (
    <div className="flex-grow-1 p-3 content-area">
      <h2>{selectedItem ? selectedItem.name : 'Select an Item'}</h2>
      {renderCategoryDetails()}
    </div>
  );
}

export default RightContentArea;
