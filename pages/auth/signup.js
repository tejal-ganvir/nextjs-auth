import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik'
import { Jumbotron, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import * as Yup from 'yup';
import Link from 'next/link'
import { postJSON } from '../../components/apiconfig/api';
import toaster from '../../components/functions/toaster';
import { useRouter } from 'next/router'
import { setSession } from '../../components/functions/authUtils';

/**
* @author
* @function Signup
**/

const Signup = (props) => {

    const router = useRouter()

  return(
    <React.Fragment>
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Jumbotron>
                    <Formik
                        initialValues={{
                            username: '',
                            fullname: '',
                            email: '',
                            password: '',
                            agree: false,
                        }}

                        validationSchema={Yup.object().shape({
                            username: Yup.string()
                                .required('Username is required'),
                            fullname: Yup.string()
                                .required('Fullname is required'),
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Email is required'),
                            password: Yup
                                .string()
                                .label('Password')
                                .required()
                                .min(8, 'Seems a bit short...')
                                .max(20, 'Try a short password.')
                                .matches(
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    "Must Contain above 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character(! @ $ # % & *)"
                                ),
                            agree: Yup.bool()
                                .oneOf([true], 'Accept Terms & Conditions is required')
                        })}

                        onSubmit={async (values) => {
                            postJSON('signup',{username: values.username, fullname: values.fullname, email: values.email, password: values.password})
                            .then((data) => {
                                if(data.status){
                                    setSession(data.token);
                                    router.push('/account/home');
                                }
                                toaster(data.status,data.message)
                            })
                        }}
                    >
                        {({ errors, status, touched, isSubmitting, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicuser">
                                    <Form.Label>User Name</Form.Label>
                                    <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}
                                            placeholder="eg - john01"
                                            style={{boxShadow: '0px 1px 4px rgba(200, 194, 194, 0.25)',
                                                borderRadius: '15px'}}/>
                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formBasicname">
                                    <Form.Label>Full Name</Form.Label>
                                    <Field name="fullname" type="text" className={'form-control' + (errors.fullname && touched.fullname ? ' is-invalid' : '')}
                                            placeholder="Joey Holmes"
                                            style={{boxShadow: '0px 1px 4px rgba(200, 194, 194, 0.25)',
                                                borderRadius: '15px'}}/>
                                    <ErrorMessage name="fullname" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formBasicname">
                                    <Form.Label>Email</Form.Label>
                                    <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                            placeholder="joey@hotmail.com"
                                            style={{boxShadow: '0px 1px 4px rgba(200, 194, 194, 0.25)',
                                                borderRadius: '15px'}}/>
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                                            placeholder="Strong password"
                                            style={{boxShadow: '0px 1px 4px rgba(200, 194, 194, 0.25)',
                                                borderRadius: '15px'}}/>
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </Form.Group>
                                <InputGroup className="mt-3">
                                    <InputGroup.Prepend>
                                        <span className="input-group-text">
                                            <Field type="checkbox" name="agree" label="Checkbox for following text input" className={(errors.agree && touched.agree ? ' is-invalid' : '')} />
                                        </span>
                                    </InputGroup.Prepend>
                                    <FormControl disabled defaultValue="I agree to Terms of Services and Privacy Policy" />
                                </InputGroup>
                                {errors && errors.agree && <div className="invalid-feedback" style={{display:'block'}}>{errors.agree}</div>}

                                <Button className="mt-3 mb-3" variant="primary" type="submit" disabled={isSubmitting}>Signup</Button>
                            </Form>
                        )}
                    </Formik>
                    <p>I already have account <Link href="/auth/signin">Sign In</Link></p>
                </Jumbotron>
            </Col>
        </Row>
    </React.Fragment>
   )

 }

export default Signup