import Head from "next/head";
import { useState, useEffect } from 'react';

import styles from "../styles/Home.module.css";

export default function Home(props) {

  const [fetched, setFetched] = useState()

  useEffect(() => {
    fetch("https://ipwhois.app/json/")
    .then((response) => response.json())
    .then((json) => setFetched(json))
    .catch((e) => console.log(e));
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>Hello</main>
      <pre>
        <p>Fetched on client</p>
        {JSON.stringify(fetched, null, 4)}
      </pre>
      <pre>
        <p>from server props</p>
        {JSON.stringify(props.data, null, 4)}
      </pre>
      <h3>{props.ip}</h3>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("https://ipwhois.app/json/");
  const data = await res.json();

  const ip = context.req.socket.localAddress;

  // Pass data to the page via props
  return { props: { data, ip } };
}
