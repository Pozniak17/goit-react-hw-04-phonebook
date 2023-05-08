import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { Box } from 'utils/Box';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = contactData => {
    const { name, number } = contactData;

    if (isContactInList(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contactItem = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(contacts => [contactItem, ...contacts]);
  };

  const isContactInList = contactName => {
    const lowercaseName = contactName.toLowerCase();
    return contacts.find(({ name }) =>
      name.toLowerCase().includes(lowercaseName)
    );
  };

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box p={4}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList
        filtredContacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </Box>
  );
};
