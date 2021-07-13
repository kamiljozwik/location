import { FC } from "react";

import styles from "./Card.module.css";

export interface CardProps {
  name: string;
  link?: string;
  freeLimit?: string;
  apiKeyRequired?: string;
  json: any;
  index?: number;
}

export const Card: FC<CardProps> = ({
  children,
  name,
  link,
  freeLimit,
  apiKeyRequired,
  json,
  index,
}) => {
  const hasError = json?.error || json?.code;

  const latitude =
    json?.latitude ??
    json?.lat ??
    json?.location?.latitude ??
    json?.location?.lat ??
    json?.loc?.split(",")[0];

  const longitude =
    json?.longitude ??
    json?.lng ??
    json?.lon ??
    json?.location?.longitude ??
    json?.location?.lng ??
    json?.loc?.split(",")[1];

  return (
    <div className={`${styles.root} ${hasError ? styles.error : ""}`}>
      <div className={styles.info}>
        <h3 className={styles.title}>{`${index}. ${name}`}</h3>
        {children ?? (
          <>
            <dl>
              <dt>Link:</dt>
              <dd>
                <a href={link} target="_blank" referrerPolicy="no-referrer">
                  {link}
                </a>
              </dd>
              <dt>Free limit:</dt>
              <dd>{freeLimit}</dd>
              <dt>API key required:</dt>
              <dd>{apiKeyRequired}</dd>
            </dl>
          </>
        )}
      </div>
      {json ? (
        <div className={styles.geo}>
          <pre className={styles.code}>{JSON.stringify(json, null, 4)}</pre>
          {!hasError && latitude && longitude ? (
            <a
              target="_blank"
              href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`}
            >
              Check this location on map 🗺
            </a>
          ) : null}
        </div>
      ) : (
        <div className={styles.noData}>Response not available 🤷‍♂️</div>
      )}
    </div>
  );
};
