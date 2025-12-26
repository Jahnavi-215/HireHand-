import { useState, useEffect } from 'react';
import { postJob } from './services/api';

export default function PostJob() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    // Load selected worker from localStorage
    const worker = localStorage.getItem('selectedWorker');
    if (worker) {
      try {
        const workerData = JSON.parse(worker);
        setSelectedWorker(workerData);
        // Pre-fill form with worker info
        if (workerData.services && workerData.services.length > 0) {
          setTitle(`Book ${workerData.services[0]} - ${workerData.name}`);
        }
        if (workerData.areas && workerData.areas.length > 0) {
          setLocation(workerData.areas[0]);
        }
        // Clear from localStorage after loading
        localStorage.removeItem('selectedWorker');
      } catch (e) {
        console.error('Error loading worker data:', e);
      }
    }
  }, []);

  function validate() {
    const errs = {};
    if (!title) errs.title = 'Title is required';
    if (!description) errs.description = 'Description is required';
    return errs;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      await postJob({ title, description, location });
      setMessage(selectedWorker ? 'Successfully booked' : 'Job posted successfully');
      // Keep the form filled so user can see what they just booked
      setFieldErrors({});
    } catch (err) {
      if (err && err.details && Array.isArray(err.details)) {
        setMessage(err.details.map(d => d.message).join('; '));
      } else {
        setMessage(err.error || 'Failed to post job');
      }
    }
  };

  return (
    <div className="card">
      <h2>{selectedWorker ? 'Booking a Worker' : 'Post a Job'}</h2>
      {selectedWorker && (
        <div style={{background: 'rgba(20, 184, 166, 0.08)', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid rgba(20, 184, 166, 0.2)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
            <span style={{fontSize: '20px', color: '#14b8a6'}}>✓</span>
            <strong style={{color: '#0f766e'}}>Booking: {selectedWorker.name}</strong>
          </div>
          <div style={{fontSize: '14px', color: '#475569'}}>
            <div>Services: {selectedWorker.services?.join(', ')}</div>
            <div>Rating: ⭐ {selectedWorker.rating}</div>
            <div>Areas: {selectedWorker.areas?.join(', ')}</div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          {fieldErrors.title && <div className="field-error">{fieldErrors.title}</div>}
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          {fieldErrors.description && <div className="field-error">{fieldErrors.description}</div>}
        </div>
        <div className="form-row">
          <label>Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        {message && <div className="global-info">{message}</div>}
        <button className="btn" type="submit">{selectedWorker ? 'Book' : 'Post Job'}</button>
      </form>
    </div>
  );
}
