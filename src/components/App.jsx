import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import { GlobalStyle } from './GlobalStyle.styled';
import { Layout } from './Layout.styled';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  // componentDidMount() {
  //   const savedContacts = localStorage.getItem('contacts');
  //   const contacts = JSON.parse(savedContacts);
  //   if (contacts) {
  //     this.setState({ contacts });
  //   }
  // }

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(savedContacts);
    if (contacts) {
      setContacts(contacts);
      console.log('Спряцував componentDidMount 1 раз');
    }
  }, []);

  // componentDidUpdate(_, prevState) {
  //   const { contacts } = this.state;
  //   if (contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  // }

  // const formSubmitApp = data => {
  //   if (
  //     contacts.find(
  //       el => el.name.toLowerCase().trim() === data.name.toLowerCase().trim()
  //     )
  //   ) {
  //     alert(`${data.name} is already in contacts`);
  //     return;
  //   }
  //   setContacts(state => [
  //     ...state,
  //     {
  //       id: idGenerator(),
  //       name: data.name,
  //       numberTel: data.number,
  //     },
  //   ]);
  // };

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => {
      if (
        prevState.contacts.some(
          contact =>
            contact.name.toLowerCase() === name.toLowerCase() ||
            contact.number === number
        )
      ) {
        return alert(`${name} or ${number} is already in contacts`);
      }
      return {
        contacts: [contact, ...prevState.contacts],
      };
    });
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
