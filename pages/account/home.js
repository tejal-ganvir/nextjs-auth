import React from 'react'
import { getUserData } from '../../components/functions/authUtils'

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
    <div>{JSON.stringify(getUserData())}</div>
   )

 }

export default Home