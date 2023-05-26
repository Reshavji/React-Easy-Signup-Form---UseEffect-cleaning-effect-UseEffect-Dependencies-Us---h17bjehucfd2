import React, { useState } from 'react';
import '../styles/App.css';
import { validateFields } from '../utils/validation';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value, checked, type } = e.target;

    if (type === 'checkbox') {
      setConsent(checked);
    } else {
      if (id === 'name') setName(value);
      else if (id === 'email') setEmail(value);
      else if (id === 'password') setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    const validationErrors = validateFields(fields);

    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      // Form submission logic goes here
      // Reset the form and errors
      setName('');
      setEmail('');
      setPassword('');
      setConsent(false);
      setErrors({});
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleInputChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div>
          <label htmlFor="consent">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={handleInputChange}
            />
            I agree to the terms and conditions
          </label>
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default App;
