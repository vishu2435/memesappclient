import Head from 'next/head'
import styles from './Layout.module.css'
import NavBar from '../../Containers/NavBar/NavBar'
import Footer from '../../Containers/Footer/Footer'

const Layout=(props)=>{
    return(
        <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json"/>
         
        </Head>
        <NavBar/>
        {props.children}
        <div className={styles.footer}>
        <Footer/>
        </div>
      </div>
    )
}
export default Layout