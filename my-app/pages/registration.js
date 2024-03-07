import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function Registration() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
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
        // console.log(data.clinicNumber);
        // console.log(data.firstName);
        // console.log(data.surname);
        // if (data.email === data.retypeEmail){
        //     console.log(data.email + " is entered twice.");
        // }
        // console.log(data.month + "-" + data.day + "-" + data.year);

        const registrationForm = {
            ClinicNumber: data.clinicNumber,
            Birthday: data.year + '-' + (String(getMonths(data.month) + 1).padStart(2, '0')) + '-' + data.day,
            FirstName: data.firstName,
            Surname: data.surname,
            Email: data.email,
            Username: data.Username,
            patientPassword: data.patientPassword
        };


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
      <div className="center">
      <Container>
        <Container>
            PHR
        </Container>
        
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Form.Group as={Col}>
                <Form.Label>Clinic Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Clinic Number" {...register("clinicNumber", {required: "true"})} className={errors.q ? "is-invalid" : ""}/>
                <Form.Text muted>
                    10 digits; assigned to you before your first visit.
                </Form.Text>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" {...register("firstName")}/>
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" placeholder="Surname" {...register("surname")}/>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col}>
                <Form.Label>Retype Email</Form.Label>
                <Form.Control type="email" placeholder="Retype email" {...register("retypeEmail")}/>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" {...register("Username")}/>
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("patientPassword")}/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                <Form.Label>Birth Date</Form.Label>
                <Form.Select defaultValue="Choose..." {...register("month")}>
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
                
                <Form.Group as={Col}>
                <Form.Label>.</Form.Label>
                <Form.Select defaultValue="Choose..." {...register("day")}>
                    <option>Day:</option>
                    {optionsDays}
                </Form.Select>
                </Form.Group>

                <Form.Group as={Col}>
                <Form.Label>.</Form.Label>
                <Form.Select defaultValue="Choose..." {...register("year")}>
                    <option>Year...</option>
                    {optionsYear}
                </Form.Select>
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </Container>
        </div>
      </>
    );
  }
  