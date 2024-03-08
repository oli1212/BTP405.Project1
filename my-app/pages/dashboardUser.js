import { useRouter } from 'next/router';
import LoggedInLayout from '@/components/LoggedInLayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = () => {
        // Perform logout logic here...
        // Redirect to the login page
        router.push('/login');
    };

    return (
    <>
        <LoggedInLayout>
            <Container>
                <Row>
                    <Col xs={8}>
                        <h1 className="my-4">Dashboard</h1>
                        </Col>
                    <Col xs={4} className="text-end">
                        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    </Col>
                </Row>
                <Stack gap={3}>
                    <Row>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <Stack gap={3}>
                                        <Button variant="outline-secondary">Consent Forms</Button>
                                        <Button variant="outline-secondary">Intake Forms</Button>
                                        <Button variant="outline-secondary">Pending Appointments</Button>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <Stack gap={2}>
                                        <h5 className="card-title">Upcoming Appointments</h5>
                                        <div className="faint-line"></div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Provider</th>
                                                    <th>Location</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Today, 11:20 AM EST</td>
                                                    <td>John Doe</td>
                                                    <td>Clinic</td>
                                                    <td>Follow Up</td>
                                                    <td>Booked</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <Stack gap={2}>
                                        <h5 className="card-title">Medications</h5>
                                        <div className="faint-line"></div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Medication Name</th>
                                                    <th>Quantity</th>
                                                    <th>Refills</th>
                                                    <th>Start Date</th>
                                                    <th>Provider</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>morphine</td>
                                                    <td>2 tablets</td>
                                                    <td>0</td>
                                                    <td>5/23/2023</td>
                                                    <td>Robert Birmingham</td>
                                                </tr>
                                                {/* Add more rows as needed */}
                                            </tbody>
                                        </table>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <Stack gap={3} >
                                        <Row>
                                            <Col>
                                                Balance
                                            </Col>
                                            <Col>
                                                <Button variant="outline-secondary" className='w-100'>PAY</Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                Appointment
                                            </Col>
                                            <Col>
                                                <Button variant="outline-secondary" className='w-100'>SCHEDULE</Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                Lab Record
                                            </Col>
                                            <Col>
                                                <Button variant="outline-secondary" className='w-100'>UPLOAD</Button>
                                            </Col>
                                        </Row>               
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Stack>
            </Container>
        </LoggedInLayout>
    </>
  );
}