import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root'); 
import Form from './components/Form';  
import Table from './components/Table';
import EditModal from './components/EditModal';
import './App.css';  

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  //Updating Contacts by generating Unique Id's for new row and adding it's data
  const handleFormSubmit = (formData) => {
    const newContact = { ...formData, id: generateUniqueId() };
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  //Handling the Edit button
  const handleEditClick = (contact) => {  //contact contains the data of the row for which edit was clicked
    setShowEditModal(true); //To enable the EditModal
    setSelectedContact(contact); //Passing the Row for Edit
  };

  //Handling the Submit at Edit, updating the data in contacts
  const handleEditSubmit = (editedData) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === editedData.id ? { ...contact, ...editedData } : contact
      )
    );
    setShowEditModal(false);
    setSelectedContact(null);
  };

  //Handling Deletion of Row
  const handleDeleteClick = (contactId) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId)); //Add all the elements except the selected contact(which is to be deleted)
  };

  //Resetting the Modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedContact(null);
  };

  // Helper function to generate unique IDs
  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="app-container">
      <h1>Contact Management System</h1>

      <Form handleFormSubmit={handleFormSubmit} />

      <Table
        data={contacts}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />

      <EditModal
        isOpen={showEditModal}
        onRequestClose={handleCloseEditModal}
        handleEditSubmit={handleEditSubmit}
        initialData={selectedContact}
      />
    </div>
  );
};

export default App;
