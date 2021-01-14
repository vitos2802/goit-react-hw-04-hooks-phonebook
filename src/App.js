import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Container from './components/Container';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? [],
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleContactFormSubmit = newContact => {
    setContacts(contacts => [newContact, ...contacts]);
  };

  const handleOnCheckName = newContact => {
    const isfilterName = !!contacts.find(
      contact => contact.name === newContact.name,
    );
    isfilterName && alert(`${newContact.name} is already in contacts`);
    return !isfilterName;
  };

  const handleDeleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={handleContactFormSubmit}
        onCheck={handleOnCheckName}
      />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filterContacts} onDelete={handleDeleteContact} />
    </Container>
  );
};

export default App;
