import { forwardRef } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

// General workers for main "Book a worker in minutes" section (7 workers)
const generalWorkers = [
  {
    name: 'Rahul',
    services: ['Electrician', 'Wiring', 'Fan Repair'],
    rating: 4.8,
    areas: ['Andheri', 'Bandra', 'Powai'],
  },
  {
    name: 'Asha',
    services: ['Cleaning', 'Deep Clean', 'Housekeeping'],
    rating: 4.6,
    areas: ['Koramangala', 'Indiranagar', 'Whitefield'],
  },
  {
    name: 'Vikram',
    services: ['Carpenter', 'Furniture Repair', 'Door Fittings'],
    rating: 4.9,
    areas: ['Gachibowli', 'Madhapur', 'Banjara Hills'],
  },
  {
    name: 'Suresh',
    services: ['AC Repair', 'Fridge Repair', 'Washing Machine'],
    rating: 4.8,
    areas: ['Andheri', 'Dadar', 'Kurla'],
  },
  {
    name: 'Meera',
    services: ['Plumber', 'Leak Fix', 'Bathroom Fittings'],
    rating: 4.7,
    areas: ['Malad', 'Lower Parel', 'Worli'],
  },
  {
    name: 'Rohan',
    services: ['Wi-Fi Setup', 'CCTV Installation', 'Smart Devices'],
    rating: 4.9,
    areas: ['Whitefield', 'Marathahalli', 'HSR Layout'],
  },
  {
    name: 'Arjun',
    services: ['Painting', 'Interior Painting', 'Wall Design'],
    rating: 4.6,
    areas: ['Bandra', 'Andheri', 'Borivali'],
  },
];

// Categorized workers for Explore section (2-3 per category)
const categorizedWorkers = [
  // Home Repairs (3 workers)
  {
    name: 'Rahul',
    services: ['Electrician', 'Home Repairs', 'Wiring', 'Fan Repair'],
    rating: 4.8,
    areas: ['Andheri', 'Bandra', 'Powai'],
    category: 'Home Repairs',
  },
  {
    name: 'Vikram',
    services: ['Carpenter', 'Home Repairs', 'Furniture Repair', 'Door Fittings'],
    rating: 4.9,
    areas: ['Gachibowli', 'Madhapur', 'Banjara Hills'],
    category: 'Home Repairs',
  },
  {
    name: 'Meera',
    services: ['Plumber', 'Home Repairs', 'Leak Fix', 'Bathroom Fittings'],
    rating: 4.7,
    areas: ['Malad', 'Lower Parel', 'Worli'],
    category: 'Home Repairs',
  },
  // Cleaning Services (2 workers)
  {
    name: 'Asha',
    services: ['Cleaning Services', 'Deep Clean', 'Housekeeping', 'Office Cleaning'],
    rating: 4.6,
    areas: ['Koramangala', 'Indiranagar', 'Whitefield'],
    category: 'Cleaning Services',
  },
  {
    name: 'Priya',
    services: ['Cleaning Services', 'Move-in Clean', 'Carpet Cleaning'],
    rating: 4.5,
    areas: ['Jubilee Hills', 'Banjara Hills', 'Hitech City'],
    category: 'Cleaning Services',
  },
  // Appliance Repair (2 workers)
  {
    name: 'Suresh',
    services: ['Appliance Repair', 'AC Repair', 'Fridge Repair', 'Washing Machine'],
    rating: 4.8,
    areas: ['Andheri', 'Dadar', 'Kurla'],
    category: 'Appliance Repair',
  },
  {
    name: 'Kumar',
    services: ['Appliance Repair', 'Microwave Repair', 'TV Repair'],
    rating: 4.7,
    areas: ['Miyapur', 'Kukatpally', 'KPHB'],
    category: 'Appliance Repair',
  },
  // Painting & Decor (2 workers)
  {
    name: 'Arjun',
    services: ['Painting & Decor', 'Interior Painting', 'Wall Design'],
    rating: 4.6,
    areas: ['Bandra', 'Andheri', 'Borivali'],
    category: 'Painting & Decor',
  },
  {
    name: 'Sanjay',
    services: ['Painting & Decor', 'Exterior Painting', 'Texture Work'],
    rating: 4.8,
    areas: ['Powai', 'Thane', 'Mulund'],
    category: 'Painting & Decor',
  },
  // IT & Smart Home (2 workers)
  {
    name: 'Rohan',
    services: ['IT & Smart Home', 'Wi-Fi Setup', 'CCTV Installation', 'Smart Devices'],
    rating: 4.9,
    areas: ['Whitefield', 'Marathahalli', 'HSR Layout'],
    category: 'IT & Smart Home',
  },
  {
    name: 'Lata',
    services: ['IT & Smart Home', 'Network Setup', 'Smart Locks', 'Home Automation'],
    rating: 4.7,
    areas: ['Koramangala', 'BTM', 'Electronic City'],
    category: 'IT & Smart Home',
  },
  // Event Setup (2 workers)
  {
    name: 'Deepak',
    services: ['Event Setup', 'Sound System', 'Lighting', 'Decor'],
    rating: 4.7,
    areas: ['Gachibowli', 'Kondapur', 'Madhapur'],
    category: 'Event Setup',
  },
  {
    name: 'Rajesh',
    services: ['Event Setup', 'Stage Setup', 'Audio Visual', 'Party Lights'],
    rating: 4.6,
    areas: ['Banjara Hills', 'Jubilee Hills', 'Hitech City'],
    category: 'Event Setup',
  },
  // Gardening & Lawn (3 workers)
  {
    name: 'Lakshmi',
    services: ['Gardening & Lawn', 'Landscaping', 'Plant Care', 'Lawn Mowing'],
    rating: 4.5,
    areas: ['Koramangala', 'Jayanagar', 'JP Nagar'],
    category: 'Gardening & Lawn',
  },
  {
    name: 'Ganesh',
    services: ['Gardening & Lawn', 'Tree Trimming', 'Fertilization', 'Garden Design'],
    rating: 4.6,
    areas: ['Indiranagar', 'Whitefield', 'Marathahalli'],
    category: 'Gardening & Lawn',
  },
  {
    name: 'Sunita',
    services: ['Gardening & Lawn', 'Organic Gardening', 'Pest Control', 'Irrigation'],
    rating: 4.7,
    areas: ['HSR Layout', 'BTM', 'Bannerghatta'],
    category: 'Gardening & Lawn',
  },
];

const BookingFlow = forwardRef(function BookingFlow({ onBook, serviceQuery = '', locationQuery = '', onServiceChange, onLocationChange, onFind, exploreCategory = null }, ref) {
  // Use categorized workers when in explore mode, otherwise use general workers
  const workersToShow = exploreCategory ? categorizedWorkers : generalWorkers;
  
  const filtered = workersToShow.filter((w) => {
    const serviceText = Array.isArray(w.services) ? w.services.join(' ').toLowerCase() : '';
    const areasText = Array.isArray(w.areas) ? w.areas.join(' ').toLowerCase() : '';
    
    // If in explore mode, filter by category
    if (exploreCategory) {
      const matchCategory = w.category === exploreCategory;
      if (!matchCategory) return false;
    }
    
    const matchService = serviceQuery ? (serviceText.includes(serviceQuery.toLowerCase()) || w.name.toLowerCase().includes(serviceQuery.toLowerCase())) : true;
    const matchLocation = locationQuery ? areasText.includes(locationQuery.toLowerCase()) : true;
    return matchService && matchLocation;
  });

  return (
    <div className="section booking-flow">
      <Container>
        <div className="section-heading text-center">
          <h3 className="mb-1">Book a worker in minutes</h3>
          <p className="text-muted mb-0">Tell us what you need and book instantly.</p>
        </div>
        <Form className="card card-service p-4 mb-4" ref={ref} onSubmit={(e) => { e.preventDefault(); onFind?.(serviceQuery, locationQuery); }} style={{maxWidth: '900px', margin: '0 auto 32px', boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)'}}>
          <Row className="gy-3 align-items-end">
            <Col md={5}>
              <Form.Label className="small text-muted" style={{fontWeight: '600'}}>Service</Form.Label>
              <div style={{position: 'relative'}}>
                <span style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '18px'}}>🔍</span>
                <Form.Control value={serviceQuery} onChange={(e) => onServiceChange?.(e.target.value)} placeholder="e.g., cleaning, electrician" style={{height: '48px', paddingLeft: '40px', border: '1.5px solid #e2e8f0', borderRadius: '10px'}} />
              </div>
            </Col>
            <Col md={5}>
              <Form.Label className="small text-muted" style={{fontWeight: '600'}}>Location</Form.Label>
              <div style={{position: 'relative'}}>
                <span style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '18px'}}>📍</span>
                <Form.Control value={locationQuery} onChange={(e) => onLocationChange?.(e.target.value)} placeholder="e.g., Mumbai, Andheri" style={{height: '48px', paddingLeft: '40px', border: '1.5px solid #e2e8f0', borderRadius: '10px'}} />
              </div>
            </Col>
            <Col md={2} className="d-grid">
              <Button type="submit" variant="primary" style={{height: '48px', fontWeight: '600'}}>Find</Button>
            </Col>
          </Row>
        </Form>

        <Row className="gy-3">
          {filtered.map((w, i) => (
            <Col md={6} lg={4} key={i}>
              <Card className="card-service booking-card h-100">
                <Card.Body>
                  <div className="mb-2">
                    <h5 className="mb-0" style={{fontWeight: '600', fontSize: '18px'}}>{w.name}</h5>
                    <div className="text-muted small">{(w.services || []).join(' • ')}</div>
                  </div>
                  <div className="small mb-1" style={{color: '#f59e0b', fontWeight: '600'}}>⭐ {w.rating}</div>
                  <div className="text-muted small mb-3">📍 {(w.areas || []).join(', ')}</div>
                  <Button variant="primary" size="sm" onClick={() => onBook?.(w)} style={{fontWeight: '600'}}>Book</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
});

export default BookingFlow;
