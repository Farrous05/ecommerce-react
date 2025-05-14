import React from 'react';
import PropTypes from 'prop-types';

const FirebaseIndexMessage = ({ indexUrl }) => (
  <div className="firebase-index-message">
    <h3>Firebase Index Required</h3>
    <p>This search query requires a Firestore index to be created.</p>
    <p>Please click the button below to create the required index in your Firebase console:</p>
    <a 
      href={indexUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="button"
    >
      Create Firebase Index
    </a>
    <p className="firebase-index-note">After creating the index, it might take a few minutes for Firebase to apply the changes.</p>
  </div>
);

FirebaseIndexMessage.propTypes = {
  indexUrl: PropTypes.string.isRequired
};

export default FirebaseIndexMessage; 