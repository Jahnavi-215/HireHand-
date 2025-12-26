import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

export default function Hero({ onPrimary, onSecondary, onFind, serviceQuery = '', locationQuery = '' }) {
  const [service, setService] = useState(serviceQuery);
  const [location, setLocation] = useState(locationQuery);

  useEffect(() => { setService(serviceQuery); }, [serviceQuery]);
  useEffect(() => { setLocation(locationQuery); }, [locationQuery]);
  return (
    <div className="hero hero-shell v2-hero light-hero">
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={6}>
            {/* Brand title with badge */}
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap'}}>
              <div className="brand-title" style={{fontSize: '48px', fontWeight: '800', color: '#0f172a', letterSpacing: '-1px', marginBottom: '0'}}>HireHand</div>
              <div className="hero-badge" style={{display: 'inline-block', background: 'rgba(20, 184, 166, 0.1)', color: '#0f766e', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.3px'}}>✓ Trusted local services</div>
            </div>
            
            <h1 className="mb-2" style={{fontSize: '40px', fontWeight: '700', lineHeight: '1.15', color: '#0f172a'}}>Local workers, booked instantly</h1>
            
            {/* Subline under heading */}
            <p className="text-muted" style={{fontSize: '16px', marginBottom: '8px', color: '#475569', lineHeight: '1.5'}}>Verified professionals for cleaning, repairs, and home services</p>
            <p className="text-muted hero-subline" style={{fontSize: '15px', marginBottom: '24px', color: '#64748b'}}>Connect with skilled workers in your area within minutes</p>

            {/* CTA Buttons */}
            <div className="hero-cta-inline" style={{gap: '12px', marginBottom: '28px'}}>
              <Button variant="primary" size="lg" onClick={onPrimary} style={{paddingLeft: '32px', paddingRight: '32px', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'}}>Post a job</Button>
              <Button variant="primary" size="lg" onClick={onSecondary} style={{paddingLeft: '32px', paddingRight: '32px', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'}}>Find a worker</Button>
            </div>
            
            {/* Trust features integrated into hero */}
            <div className="hero-trust-features" style={{display: 'flex', gap: '24px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid rgba(15, 23, 42, 0.08)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{fontSize: '20px', color: '#14b8a6'}}>✓</span>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>Verified workers</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{fontSize: '20px'}}>🔒</span>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>Secure booking</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <span style={{fontSize: '20px'}}>⏰</span>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#0f172a'}}>24/7 support</span>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="hero-image-wrap hero-soft">
              <img alt="Professional service workers" src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1500&q=80" />
            </div>
          </Col>
        </Row>
      </Container>

    </div>
  );
}
