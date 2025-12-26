import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaToolbox, FaBroom, FaTruckMoving, FaHammer, FaPaintRoller, FaLaptopCode, FaLeaf } from 'react-icons/fa';

const features = [
  {
    title: 'Home Repairs',
    desc: 'Electrical, plumbing, carpentry—book certified pros.',
    icon: <FaHammer size={22} />, color: 'rgba(37,99,235,0.12)',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Cleaning Services',
    desc: 'Deep cleaning, mov-in/out, office cleanups.',
    icon: <FaBroom size={22} />, color: 'rgba(20,184,166,0.12)',
    img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Event Setup',
    desc: 'Decor, sound, lighting—setup teams on demand.',
    icon: <FaToolbox size={22} />, color: 'rgba(14,165,233,0.12)',
    img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Appliance Repair',
    desc: 'AC, fridge, washing machine—certified techs on-call.',
    icon: <FaToolbox size={22} />, color: 'rgba(37,99,235,0.12)',
    img: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Painting & Decor',
    desc: 'Interior refresh, accent walls, and design touches.',
    icon: <FaPaintRoller size={22} />, color: 'rgba(14,165,233,0.12)',
    img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'IT & Smart Home',
    desc: 'Wi‑Fi fixes, CCTV, smart device setup.',
    icon: <FaLaptopCode size={22} />, color: 'rgba(37,99,235,0.12)',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Gardening & Lawn',
    desc: 'Landscaping, mowing, plant care, seasonal prep.',
    icon: <FaLeaf size={22} />, color: 'rgba(20,184,166,0.12)',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80'
  }
];

export default function FeatureCards({ onExplore }) {
  const handleExplore = (title) => {
    if (onExplore) {
      onExplore(title);
    }
  };

  return (
    <Container className="section">
      <div className="section-heading text-center">
        <h3 className="mb-1">Popular Categories</h3>
        <p className="text-muted mb-0">Hand-picked services people book most often</p>
      </div>

      <Row className="gy-4">
        {features.map((f, i) => (
          <Col md={6} lg={4} key={i}>
            <Card className="card-service card-feature uniform">
              <div className="card-image-wrap">
                <Card.Img variant="top" src={f.img} alt={f.title} />
              </div>
              <Card.Body>
                <div className="icon mb-3" style={{ background: f.color }}>{f.icon}</div>
                <Card.Title>{f.title}</Card.Title>
                <Card.Text className="text-muted">{f.desc}</Card.Text>
                <Button variant="primary" size="sm" onClick={() => handleExplore(f.title)}>Explore</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
