import Head from "next/head";
import axios from "axios";

import styles from "../styles/Home.module.css";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Check location</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <h2>{`Your IP is: ${props.ip}`}</h2>
      <section className={styles.grid}>
      <div>
        <h3>ipwhois.app</h3>
        <pre>{JSON.stringify(props.ipwhoisData, null, 4)}</pre>
      </div>

      <div>
        <h3>ip-api.com</h3>
        <pre>{JSON.stringify(props.ipapiData, null, 4)}</pre>
      </div>
      </section>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const ip = context.req?.headers["x-real-ip"] ?? "";

  const ipWhoIs = axios.get(`https://ipwhois.app/json/${ip}`);
  const ipApi = axios.get(`http://ip-api.com/json/${ip}?fields=66846719`);

  const [ipwhoisResp, ipApiResp] = await Promise.allSettled([ipWhoIs, ipApi]);

  return {
    props: {
      ip,
      ipwhoisData: ipwhoisResp.status === 'fulfilled' ? ipwhoisResp?.value?.data : null,
      ipapiData: ipApiResp.status === 'fulfilled' ? ipApiResp?.value?.data : null,
    },
  };
}
