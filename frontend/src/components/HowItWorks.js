import { Container, Row, Col } from 'react-bootstrap';
import { FaSearch, FaHandshake, FaStar } from 'react-icons/fa';

const steps = [
  { 
    icon: <FaSearch size={32} />,
    title: 'Find or Post Jobs', 
    desc: 'Employers post jobs or browse worker profiles nearby.' 
  },
  { 
    icon: <FaHandshake size={32} />,
    title: 'Connect & Work', 
    desc: 'Communicate through our platform and get the job done.' 
  },
  { 
    icon: <FaStar size={32} />,
    title: 'Rate & Improve', 
    desc: 'After completion, rate each other to build reputation.' 
  }
];

export default function HowItWorks() {
  return (
    <div style={{background: 'linear-gradient(135deg, #f0f9ff 0%, #f0fdfa 100%)', padding: '64px 0'}}>
      <Container>
        <div className="text-center mb-5">
          <h3 style={{fontWeight: '700', fontSize: '36px', marginBottom: '12px', color: '#0f172a', fontFamily: 'Poppins, sans-serif'}}>How HireHand Works</h3>
          <div style={{width: '80px', height: '4px', background: 'linear-gradient(90deg, #2563eb 0%, #14b8a6 100%)', margin: '0 auto', borderRadius: '2px'}}></div>
        </div>
        <Row className="g-4 justify-content-center">
          {steps.map((s, i) => (
            <Col md={6} lg={4} key={i}>
              <div style={{
                background: 'white',
                padding: '32px 24px',
                borderRadius: '16px',
                textAlign: 'center',
                height: '100%',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.08)';
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontFamily: 'Poppins, sans-serif',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                }}>
                  {s.icon}
                </div>
                <h5 style={{fontWeight: '600', fontSize: '19px', marginBottom: '12px', color: '#1e293b', fontFamily: 'Poppins, sans-serif'}}>{s.title}</h5>
                <p style={{color: '#64748b', fontSize: '15px', lineHeight: '1.6', margin: 0, fontFamily: 'Poppins, sans-serif'}}>{s.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
