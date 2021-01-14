import PropTypes from 'prop-types';
import { useState } from 'react';
import shortid from 'shortid';
import s from './ContactForm.module.css';

const ContactForm = ({ onSubmit, onCheck }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
    // this.setState({ [name]: value });
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = {
      id: shortid.generate(),
      name: name,
      phone: phone,
    };

    if (!onCheck(newContact)) return;

    onSubmit(newContact);
    resetForm();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.formInner}>
        <label className={s.label}>
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </label>

        <label className={s.label}>
          <span>Phone</span>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <button className={s.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default ContactForm;
