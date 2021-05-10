import React from 'react';
import styles from './layout.module.css';
import Topbar from './UI/Topbar';
import Footer from './UI/Footer';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { isUserAuthenticated } from '../functions/authUtils';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

/**
* @author
* @function Layout
**/

const Layout = (props) => {

  const router = useRouter()
  useEffect(() => {
    if(!isUserAuthenticated() && router.pathname !== '/auth/signup')
    {
      router.push('../auth/signin')
    }

  },[router.pathname])

  return(
    <React.Fragment>
        <Head>
          <title>Next App Project</title>
          <link href="http://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css" rel="stylesheet" key="test"/>
        </Head>
        <div className={styles.app_container}>
            <Topbar isLogged={isUserAuthenticated()} />
            <div className={styles.app_content}>
                {props.children}
            </div>
            <Footer />
        </div>
        <ToastContainer />
    </React.Fragment>
   )

 }

export default Layout