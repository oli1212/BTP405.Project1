import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Footer from '@/components/Footer';
import Nav from 'react-bootstrap/Nav';


export default function Registration() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState(null);
    const currentYear = (new Date()).getFullYear();
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

    const yearArray = range(currentYear, currentYear - 100, -1);
    const dayArray = range(1, 31, +1);

    const optionsYear = yearArray.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        )
      })

    const optionsDays = dayArray.map((item) =>{
        return (
          <option key={item} value={item}>
            {item}
          </option>
        )
    })

    function getMonths(month){
        var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ];
        var monthNum = months.indexOf(month);
        return monthNum;
    }

    const submitForm = async (data) => {

        var registrationForm = {}
        if (data.email === data.retypeEmail) {
            registrationForm = {
                ClinicNumber: data.clinicNumber,
                Birthday: data.year + '-' + (String(getMonths(data.month) + 1).padStart(2, '0')) + '-' + data.day,
                FirstName: data.firstName,
                Surname: data.surname,
                Email: data.email,
                Username: data.Username,
                patientPassword: data.patientPassword
            };
        } else{
            // show error
        }

        try {
            const response = await fetch('http://localhost:8080/registration', { // Send POST request to "/registration" endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationForm), // Convert form data to JSON string
            });

            if (response.ok) {
                // Redirect to success page or perform any other action upon successful submission
                console.log(JSON.stringify(registrationForm));
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
                <Col md={{ span: 15, offset: 1 }}><h1>Create Your Account</h1>
                <br />
                <p><b>Please note:</b> You'll need your <b>Clinic number</b> to create your new account.</p>
                <p>Create your Patient Online Services Account using the form below. You must be 18 or older to create your account. 
                For patients 13-17, you can call the Mayo Clinic Customer Assistance at 877-858-0398 Monday-Friday, 7 am-7pm Central Time. 
                A parent or guardian must present when you call to set up your account. Caregiver accounts must be created for patients 12 and under.</p>
                <br />
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 10, offset: 4 }}><h2>Enter patient information</h2>
                <br />
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Container className="forms">
                        <Form onSubmit={handleSubmit(submitForm)}>
                        <Row>
                            <Form.Group as={Col} controlId="validationCustom01">
                                <Form.Label>Clinic Number</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Clinic Number" 
                                    {...register("clinicNumber", {required: "true"})} className={errors.q ? "is-invalid" : ""} 
                                    required 
                                />
                                <Form.Text muted>
                                    10 digits; assigned to you before your first visit.
                                </Form.Text>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="validationCustom02">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" {...register("firstName")} required />
                            </Form.Group>
            
                            <Form.Group as={Col} className="mb-3" controlId="validationCustom03">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control type="text" placeholder="Surname" {...register("surname")} required />
                            </Form.Group>
                        </Row>
            
                        <Row>
                            <Form.Group as={Col} controlId="validationCustom04">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" {...register("email")} required />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="validationCustom05">
                            <Form.Label>Retype Email</Form.Label>
                            <Form.Control type="email" placeholder="Retype email" {...register("retypeEmail")} required />
                            </Form.Group>
                        </Row>
            
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="validationCustom06">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" {...register("Username")} required />
                            </Form.Group>
            
                            <Form.Group as={Col} className="mb-3" controlId="validationCustom07">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" {...register("patientPassword")} required />
                            </Form.Group>
                        </Row>
            
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom08">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Select defaultValue="Choose..." {...register("month")} required >
                                <option>Month:</option>
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                            </Form.Select>
                            </Form.Group>
                            
                            <Form.Group as={Col} controlId="validationCustom09">
                            <Form.Label>.</Form.Label>
                            <Form.Select defaultValue="Choose..." {...register("day")} required >
                                <option>Day:</option>
                                {optionsDays}
                            </Form.Select>
                            </Form.Group>
            
                            <Form.Group as={Col} controlId="validationCustom10">
                            <Form.Label>.</Form.Label>
                            <Form.Select defaultValue="Choose..." {...register("year")} required >
                                <option>Year...</option>
                                {optionsYear}
                            </Form.Select>
                            </Form.Group>
                        </Row>
                        <Stack>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Stack>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
        <Footer />
      </>
    );
  }
  