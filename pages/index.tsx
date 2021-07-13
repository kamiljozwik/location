import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { Card } from "../components/Card";
import { LookupsProps, getLookups, getLookupsData } from "../utils";
import styles from "../styles/Home.module.css";

interface Props extends LookupsProps {
  ip?: string;
}

export default function Home(props: Props) {
  const [geo, setGeo] = useState<
    GeolocationPosition | GeolocationPositionError
  >();

  const success = (pos: GeolocationPosition) => setGeo(pos);
  const error = (err: GeolocationPositionError) => setGeo(err);

  /** Get data from browser using Geolocation API */
  const getGeo = () => {
    if (!navigator.geolocation) {
      return;
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  /* Get IP Lookup providers to compare */
  const lookups = getLookups(props);

  return (
    <div className={styles.root}>
      <Head>
        <title>IP Lookup Comparison</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <a href="https://frontstack.pl" target="_blank">
        <img src="logo.svg" className={styles.logo} alt="frontstack logo" />
      </a>
      <p className={styles.subtitle}>IP Lookup - comparison</p>
      <section>
        <Card
          name="Your browser"
          link="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API"
          freeLimit="Unlimited, but requires user consent"
          apiKeyRequired="No"
          index={0}
          json={
            geo && "coords" in geo
              ? {
                  accuracy: geo.coords.accuracy,
                  altitude: geo.coords.altitude,
                  altitudeAccuracy: geo.coords.altitudeAccuracy,
                  heading: geo.coords.heading,
                  latitude: geo.coords.latitude,
                  longitude: geo.coords.longitude,
                  speed: geo.coords.speed,
                }
              : geo && "message" in geo
              ? {
                  code: geo.code,
                  message: geo.message,
                }
              : null
          }
        >
          {geo === undefined ? (
            <button className={styles.btn} onClick={getGeo}>
              Show my location
            </button>
          ) : null}
        </Card>

        <h2 className={styles.title}>
          {props.ip ? `Your IP is: ${props.ip}` : "We don't know your IP 😔"}
        </h2>

        {lookups.map((l, index) => (
          <Card key={l.name} {...l} index={index + 1} />
        ))}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ip = context.req?.headers["x-real-ip"] ?? "";

  /* Get API responses from all IP Lookups providers */
  const props = ip ? await getLookupsData(ip) : {};

  return { props };
};
