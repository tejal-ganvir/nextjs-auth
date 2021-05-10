import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { fetchJSON } from '../../components/apiconfig/api';

/**
* @author
* @function Features
**/

const Features = (props) => {

  const [data, setData] = useState('');

  useEffect(() => {
    fetchJSON('allusers')
    .then((data) => {
      if(data.status){
        setData(data.data);
      }else{
        toaster(data.status,data.message)
      }
    })
  },[])

  return(
    <React.Fragment>
      <ListGroup variant="flush" style={{fontSize:'25px'}}>
        {
          data && data.map((val, idx) => (
            <ListGroup.Item key={`listno`+idx}>
              {val.fullname}
              <div className="feature-user-actions">
                <Link passHref href={`../account/edituser?id=${val._id}`}><a><i className="mdi mdi-pencil-circle text-primary"></i></a></Link> | <i className="mdi mdi-delete-circle text-danger"></i>
              </div>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </React.Fragment>
   )

 }

export default Features