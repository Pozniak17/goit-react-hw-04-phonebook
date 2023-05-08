import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyledContactForm,
  StyledLabel,
  StyledInput,
} from 'components/ContactForm/ContactForm.styled';

import { Button } from 'components/Button/Button';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ name, number });

    reset();
  };

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        throw new Error('Not supported type');
    }
  };

  function reset() {
    setName('');
    setNumber('');
  }

  return (
    <StyledContactForm onSubmit={handleSubmit}>
      <StyledLabel>
        Name
        <StyledInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInputChange}
        />
      </StyledLabel>
      <StyledLabel>
        Telephone
        <StyledInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInputChange}
        />
      </StyledLabel>
      <Button title="add contact" type="submit" />
    </StyledContactForm>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
