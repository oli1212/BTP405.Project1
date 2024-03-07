import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function MainNav() {

  return (
    <Navbar collapseOnSelect expand="lg" className="fixed-top navbar-dark bg-primary">
      <Container>
        <Navbar.Brand href="/">PHR</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Care Clinic" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Patient-Centered Care</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">About Clinic</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Request Appointment</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Find a Docter</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">Clinical Trials</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Health Library" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Diseases & Conditions</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Drugs & Sipplements</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Symptoms</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Tests & Procedures</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="For Medical Professionals" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Medical Professional Resources</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Refer a Patient</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Clinic Laboratories</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Medical Education</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/registration">Create Account</Nav.Link>
          </Nav>
          <br />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
