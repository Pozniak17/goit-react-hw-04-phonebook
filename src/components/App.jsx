import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import { GlobalStyle } from './GlobalStyle.styled';
import { Layout } from './Layout.styled';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [filter, setFilter] = useState('');
  // Зчитуємо або в нас є 'contacts' або якщо пустий рядок, то показати масив
  // також ()=> лінива ініціалізація стану, коли useState викличе фун-ю 1 раз, коли стан залежить від розрахунків, щоб не було кожен раз рендер в localStorage.
  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem('contacts') ?? initialState)
  );

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(savedContacts);
    console.log(contacts);
    if (contacts) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number === number
      )
    ) {
      alert(`${name} or ${number} is already in contacts`);
    } else {
      setContacts(prevState => [contact, ...prevState]);
    }
  };

  // this.setState({ filter: event.target.value });
  const handleChangeFilter = event => {
    setFilter(event.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // було
  //  deleteContact = contactId => {
  //    this.setState(prevState => ({
  //      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  //    }));
  //  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();
  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>

      <Filter value={filter} onSubmit={handleChangeFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      <GlobalStyle />
    </Layout>
  );
};
