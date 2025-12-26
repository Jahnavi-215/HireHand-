import { useState } from 'react';
import { register } from './services/api';

export default function Register({ onAuth }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  function validate() {
    const errs = {};
    if (!email) errs.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = 'Invalid email';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (name && name.length > 50) errs.name = 'Name is too long';
    return errs;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      const res = await register({ name, email, password });
      onAuth(res);
    } catch (err) {
      if (err && err.details && Array.isArray(err.details)) {
        setError(err.details.map(d => d.message).join('; '));
      } else {
        setError(err.error || 'Registration failed');
      }
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-row">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" name="name-field" />
          {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}
        </div>
        <div className="form-row">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="new-email" name="email-register" />
          {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
        </div>
        <div className="form-row">
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="new-password" name="password-register" />
          {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
        </div>
        {error && <div className="global-error">{error}</div>}
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
}
