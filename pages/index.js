import styles from '../styles/Home.module.css';
import Image from 'next/image'
import Link from 'next/link';
import Head from 'next/head';

export default function MainPage(){
  return (
    <>
      
    <Head>
      <title>My application</title>
    </Head>

    <div className={styles.container}>
        <Image
        className={styles.landingImage}
          src="/photos8.jpeg"
          alt="Picture of the author"
          layout='fill'
          objectFit='cover'
          objectPosition='center'
    />
     <h1 className={styles.title}> <Link href="/posts/main-page">Welcome to Boards online!</Link></h1>

    </div>
   
    </>
   
  )
}