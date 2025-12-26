import { useState, useRef } from 'react';
import './App.css';
import './theme.css';
import './polish.css';
import { Navbar, Container, Nav, Button, Form, Row, Col } from 'react-bootstrap';
import Hero from './components/Hero';
import FeatureCards from './components/FeatureCards';
import HowItWorks from './components/HowItWorks';
import BookingFlow from './components/BookingFlow';
import Login from './Login';
import Register from './Register';
import PostJob from './PostJob';
import { logout as apiLogout } from './services/api';

export default function App() {
  const [workerName, setWorkerName] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingFeedback, setRatingFeedback] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [view, setView] = useState('home');
  const [auth, setAuth] = useState(() => {
    try { return JSON.parse(localStorage.getItem('auth')) || null; } catch { return null; }
  });
  const [notice, setNotice] = useState(null);
  const [serviceQuery, setServiceQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [exploreCategory, setExploreCategory] = useState(null);
  const [navService, setNavService] = useState('');
  const [navLocation, setNavLocation] = useState('');
  const workersRef = useRef(null);
  const servicesRef = useRef(null);
  const howRef = useRef(null);
  const feedbackRef = useRef(null);

  const handleAuth = (res) => {
    const payload = { accessToken: res.accessToken, refreshToken: res.refreshToken, user: res.user };
    setAuth(payload);
    localStorage.setItem('auth', JSON.stringify(payload));
    setNotice(null);
    setView('home');
  };

  const logout = async () => {
    try { await apiLogout(); } catch (e) { /* ignore */ }
    setAuth(null);
    localStorage.removeItem('auth');
    setView('home');
  };

  // helper to navigate to post job with guard
  const goToPostJob = () => {
    if (!auth) {
      setNotice('Please login to post a job');
      setView('login');
      return;
    }
    setNotice(null);
    setView('postjob');
  };

  const handleBookWorker = (worker) => {
    if (!auth) {
      setNotice('Please login to book a worker');
      setView('login');
      return;
    }
    setNotice(null);
    if (worker) {
      localStorage.setItem('selectedWorker', JSON.stringify(worker));
    }
    setView('postjob');
  };

  const scrollToWorkers = () => {
    setView('home');
    if (workersRef.current) workersRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToServices = () => {
    setView('home');
    if (servicesRef.current) servicesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToHow = () => {
    setView('home');
    if (howRef.current) howRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToFeedback = () => {
    setView('home');
    if (feedbackRef.current) feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFindWorker = (service, location) => {
    setServiceQuery(service || '');
    setLocationQuery(location || '');
    scrollToWorkers();
  };

  const handleNavSearch = (e) => {
    e.preventDefault();
    handleFindWorker(navService, navLocation);
  };

  const goToLogin = () => {
    setNotice(null);
    setView('login');
  };

  const goToRegister = () => {
    setNotice(null);
    setView('register');
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className="navbar glassy-nav">
        <Container>
          <Navbar.Brand onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
            <span className="brand-icon" aria-hidden="true">
              <img src="/hirehand-logo.png" alt="HireHand logo" />
            </span>
            HireHand
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" />
            <div className="nav-actions nav-pill d-flex align-items-center gap-2">
              <Button size="sm" variant="link" className="nav-btn nav-link-btn" onClick={() => setView('home')}>Home</Button>
              <Button size="sm" variant="link" className="nav-btn nav-link-btn" onClick={scrollToServices}>Find worker</Button>
              <Button size="sm" variant="link" className="nav-btn nav-link-btn" onClick={goToPostJob}>Post Job</Button>
              {auth ? (
                <Button size="sm" variant="link" className="nav-btn nav-link-btn" onClick={logout}>Logout</Button>
              ) : (
                <>
                  <Button size="sm" variant="link" className="nav-btn nav-link-btn" onClick={goToLogin}>Login</Button>
                  <Button size="sm" variant="link" className="nav-btn nav-link-btn" onClick={goToRegister}>Register</Button>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {view === 'home' && (
        <div className="page-shell">
          <Hero onPrimary={goToPostJob} onSecondary={scrollToWorkers} onFind={handleFindWorker} serviceQuery={serviceQuery} locationQuery={locationQuery} />
          <BookingFlow
            ref={workersRef}
            onBook={handleBookWorker}
            serviceQuery={serviceQuery}
            locationQuery={locationQuery}
            onServiceChange={setServiceQuery}
            onLocationChange={setLocationQuery}
            onFind={handleFindWorker}
          />
          <div ref={servicesRef}>
            <FeatureCards onExplore={(service) => { setExploreCategory(service); setView('explore'); }} />
          </div>
          <div ref={howRef}>
            <HowItWorks />
          </div>
          <div className="section" ref={feedbackRef} style={{background: 'linear-gradient(135deg, #dbeafe 0%, #d1fae5 100%)', padding: '64px 0'}}>
            <Container>
              <div className="text-center mb-4">
                <h3 className="mb-2" style={{fontWeight: '700', fontSize: '32px'}}>⭐ Rate Your Worker</h3>
                <p className="text-muted" style={{fontSize: '16px'}}>Share your experience after job completion.</p>
              </div>
              <div className="d-flex justify-content-center">
                <div className="card" style={{maxWidth: '600px', width: '100%', padding: '40px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.1)', background: 'white', border: 'none'}}>
                  {ratingSubmitted ? (
                    <div className="text-center">
                      <div style={{fontSize: '48px', marginBottom: '16px'}}>✅</div>
                      <h5 style={{fontWeight: '600', marginBottom: '8px'}}>Thank you for your feedback!</h5>
                      <p className="text-muted mb-3">Your review helps us maintain quality service.</p>
                      <Button variant="outline-primary" onClick={() => {
                        setRatingSubmitted(false);
                        setWorkerName('');
                        setRating(0);
                        setRatingFeedback('');
                      }}>Submit Another Review</Button>
                    </div>
                  ) : (
                    <Form onSubmit={(e) => {
                      e.preventDefault();
                      if (!workerName.trim() || rating === 0 || !ratingFeedback.trim()) return;
                      setRatingSubmitted(true);
                    }}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Worker Name</Form.Label>
                        <Form.Control 
                          type="text"
                          value={workerName}
                          onChange={(e) => setWorkerName(e.target.value)}
                          placeholder="e.g., Rahul, Asha, Vikram"
                          required
                          style={{height: '48px', borderRadius: '10px', border: '1.5px solid #e2e8f0'}}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Star Rating</Form.Label>
                        <div className="d-flex gap-2" style={{fontSize: '32px'}}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              onClick={() => setRating(star)}
                              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                              style={{
                                cursor: 'pointer',
                                color: star <= rating ? '#f59e0b' : '#cbd5e1',
                                transition: 'all 0.2s',
                                userSelect: 'none'
                              }}
                            >
                              {star <= rating ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                        {rating > 0 && (
                          <small className="text-muted" style={{display: 'block', marginTop: '8px'}}>
                            You rated {rating} star{rating !== 1 ? 's' : ''}
                          </small>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label style={{fontWeight: '600', marginBottom: '8px'}}>Your Feedback</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={ratingFeedback}
                          onChange={(e) => setRatingFeedback(e.target.value)}
                          placeholder="Tell us about your experience with this worker..."
                          required
                          style={{borderRadius: '10px', border: '1.5px solid #e2e8f0', resize: 'none'}}
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button 
                          type="submit" 
                          variant="primary" 
                          size="lg"
                          disabled={!workerName.trim() || rating === 0 || !ratingFeedback.trim()}
                          style={{height: '52px', fontWeight: '600', borderRadius: '10px'}}
                        >
                          Submit Review
                        </Button>
                      </div>
                    </Form>
                  )}
                </div>
              </div>
            </Container>
          </div>
        </div>
      )}

      {view === 'explore' && exploreCategory && (
        <Container className="py-4 section">
          <Button variant="outline-primary" size="sm" onClick={() => setView('home')} className="mb-3">← Back to Home</Button>
          <BookingFlow
            onBook={handleBookWorker}
            serviceQuery={''}
            locationQuery={''}
            onServiceChange={setServiceQuery}
            onLocationChange={setLocationQuery}
            onFind={(service, location) => {
              setServiceQuery(service);
              setLocationQuery(location);
            }}
            exploreCategory={exploreCategory}
          />
        </Container>
      )}
      {view === 'login' && <Container className="py-4 section"><Login onAuth={handleAuth} notice={notice} /></Container>}
      {view === 'register' && <Container className="py-4 section"><Register onAuth={handleAuth} /></Container>}
      {view === 'postjob' && auth && <Container className="py-4 section"><PostJob /></Container>}

      <footer className="footer" style={{background: '#f8fafb', borderTop: '1px solid rgba(15, 23, 42, 0.08)', padding: '48px 0 24px'}}>
        <Container>
          <Row className="mb-4">
            <Col md={3} className="mb-3">
              <h6 style={{fontWeight: '700', marginBottom: '16px'}}>HireHand</h6>
              <p className="text-muted" style={{fontSize: '14px'}}>Your trusted platform for local service workers.</p>
            </Col>
            <Col md={3} className="mb-3">
              <h6 style={{fontWeight: '600', fontSize: '14px', marginBottom: '16px'}}>Services</h6>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px'}}>
                <a href="#" className="text-muted" style={{textDecoration: 'none'}}>Cleaning</a>
                <a href="#" className="text-muted" style={{textDecoration: 'none'}}>Electrician</a>
                <a href="#" className="text-muted" style={{textDecoration: 'none'}}>Plumbing</a>
                <a href="#" className="text-muted" style={{textDecoration: 'none'}}>Carpentry</a>
              </div>
            </Col>
            <Col md={3} className="mb-3">
              <h6 style={{fontWeight: '600', fontSize: '14px', marginBottom: '16px'}}>Company</h6>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px'}}>
                <a href="#" className="text-muted" style={{textDecoration: 'none'}}>About</a>
                <a href="#" className="text-muted" style={{textDecoration: 'none'}}>Contact</a>
                <a href="#" className="text-muted" style={{textDecoration: 'none'}}>Careers</a>
              </div>
            </Col>
            <Col md={3} className="mb-3">
              <h6 style={{fontWeight: '600', fontSize: '14px', marginBottom: '16px'}}>Support</h6>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px'}}>
                <span className="text-muted" style={{fontSize: '14px'}}>help@hirehand.com</span>
                <span className="text-muted" style={{fontSize: '14px'}}>+1 (555) 123-4567</span>
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2" style={{paddingTop: '24px', borderTop: '1px solid rgba(15, 23, 42, 0.08)'}}>
            <span style={{fontSize: '14px', color: '#64748b'}}>© {new Date().getFullYear()} HireHand. All rights reserved.</span>
            <span className="text-muted" style={{fontSize: '14px'}}>Secure • Trusted • Fast</span>
          </div>
        </Container>
      </footer>
    </div>
  );
}
