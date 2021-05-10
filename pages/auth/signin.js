import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik'
import { Jumbotron, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import * as Yup from 'yup';
import Link from 'next/link'
import { postJSON } from '../../components/apiconfig/api';
import toaster from '../../components/functions/toaster';
import { redirectPush, setSession } from '../../components/functions/authUtils';
import { useRouter } from 'next/router';


/**
* @author
* @function Signin
**/

const Signin = (props) => {

  const router = useRouter();
    
  return(
    <React.Fragment>
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Jumbotron>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}

                        validationSchema={Yup.object().shape({
                            username: Yup.string()
                                .required('Username or Email is required'),
                            password: Yup
                                .string()
                                .label('Password')
                                .required(),
                        })}

                        onSubmit={async (values) => {
                            postJSON('signin',{username: values.username, password: values.password})
                            .then((data) => {
                                if(data.status){
                                    setSession(data.token);
                                    router.push('../account/home');
                                }
                                toaster(data.status,data.message)
                            })
                        }}
                    >
                        {({ errors, status, touched, isSubmitting, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicname">
                                    <Form.Label>User Name</Form.Label>
                                    <Field name="username" type="username" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}
                                            placeholder="joey@hotmail.com"
                                            style={{boxShadow: '0px 1px 4px rgba(200, 194, 194, 0.25)',
                                                borderRadius: '15px'}}/>
                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                                            placeholder="Strong password"
                                            style={{boxShadow: '0px 1px 4px rgba(200, 194, 194, 0.25)',
                                                borderRadius: '15px'}}/>
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Button className="mt-3 mb-3" variant="primary" type="submit" disabled={isSubmitting}>Signup</Button>
                            </Form>
                        )}
                    </Formik>
                    <p>Create New Account <Link href="/auth/signup">Sign Up</Link></p>
                </Jumbotron>
            </Col>
        </Row>
    </React.Fragment>
   )

 }

export default Signin