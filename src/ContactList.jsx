import React, { useState, useEffect } from 'react';
import './App.css'

function ContactList () {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // fetch contacts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  // update serach term based on user input
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  // filter contacts based on the search term (by name or email)
  // case-insensitive
  function getFilteredContacts() {
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const filteredContacts = getFilteredContacts();

  // clear the search input and reset the contacts list
  function handleReset() {
    setSearchTerm('');
  }

  return (
    <div>
      <h2>Contacts</h2>
      <div>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleReset}>Reset</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ContactList;
