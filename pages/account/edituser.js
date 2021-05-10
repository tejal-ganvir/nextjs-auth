import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { fetchJSON } from '../../components/apiconfig/api';
import { Formik, Field, ErrorMessage } from 'formik'
import { Jumbotron, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import * as Yup from 'yup';
import { postJSON } from '../../components/apiconfig/api';
import toaster from '../../components/functions/toaster';

/**
* @author
* @function EditUser
**/

const EditUser = (props) => {

    const [data, setData] = useState('');
    const router = useRouter();
    const id = router.query && router.query.id ? router.query.id : '';

    useEffect(() => {
        if(id){
            fetchJSON('singleuser?id='+id)
            .then((data) => {
                setData(data.data);
                //toaster(data.status, data.message);
            })
        }
    },[id])

    const username = data && data.username || '';
    const fullname = data && data.fullname || '';
    const email = data && data.email || '';

  return(
    <React.Fragment>
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Jumbotron>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            username: username,
                            fullname: fullname,
                            email: email,
                        }}

                        validationSchema={Yup.object().shape({
                            username: Yup.string()
                                .required('Username is required'),
                            fullname: Yup.string()
                                .required('Fullname is required'),
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Email is required'),
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

                                <Button className="mt-3 mb-3" variant="primary" type="submit" disabled={isSubmitting}>Update</Button>
                            </Form>
                        )}
                    </Formik>
                </Jumbotron>
            </Col>
        </Row>
    </React.Fragment>
   )

 }

export default EditUser