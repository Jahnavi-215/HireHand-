import { useState } from 'react';
import { login } from './services/api';

export default function Login({ onAuth, notice }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  function validate() {
    const errs = {};
    if (!email) errs.email = 'Email is required';
    if (!password) errs.password = 'Password is required';
    return errs;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      const res = await login({ email, password });
      onAuth(res);
    } catch (err) {
      if (err && err.details && Array.isArray(err.details)) {
        setError(err.details.map(d => d.message).join('; '));
      } else {
        setError(err.error || 'Login failed');
      }
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      {notice && <div className="notice">{notice}</div>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-row">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="new-email" name="email-field" />
          {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
        </div>
        <div className="form-row">
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="new-password" name="password-field" />
          {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
        </div>
        {error && <div className="global-error">{error}</div>}
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}
