import { useState} from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import Footer from '@/components/Footer';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState(null);
    const [patients, setPatients] = useState([]);
    const router = useRouter(); // Access the router object

    const submitForm = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/patientCreds'); // Send GET request to "/patientsCreds" endpoint
            if (response.ok) {
                const responseData = await response.json();
                setPatients(responseData);
                // validates username and password
                for (var i = 0; i < patients.length; i++){
                    if (patients[i][1] == data.Username && patients[i][2] == data.patientPassword) {
                        console.log("Login Success!!")
                        router.push('/dashboardUser');
                    } else{
                        console.log("Username or Password were incorrect")
                    }
                }
            } else {
                // Handle error response
                const errorMessage = await response.text();
                setErrorMessage(errorMessage); // Set error message state
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while submitting the form.'); // Set error message state
        }
    }

    return (
      <>
        <Container>
            <br/><br/>
            <Row>
                <Col md={4}><Nav.Link href="/">PHR</Nav.Link></Col>
            </Row>
            <br/><br/>
            <Row>
                <Col></Col>
                <Col md="auto">
                    <h1>Login</h1>
                    <br />
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col md={3}></Col>
                <Col className="col-md-6 me-auto">
                    <Container>
                        <Form onSubmit={handleSubmit(submitForm)}>
                            <Row>
                                <Form.Group as={Col} className="mb-3" >
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" {...register("Username")} required />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" {...register("patientPassword")} required />
                                </Form.Group>
                            </Row>
                
                            <Stack gap={2} className="col-md-7 mx-auto">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                <a href="/" className="mx-auto">Create your account</a>
                                <a href="/" className="mx-auto">Cant login?</a>
                            </Stack>
                        </Form>
                    </Container>
                </Col>
                <Col md={2}></Col>
            </Row>
        </Container>
        <Footer />
      </>
    );
  }
  