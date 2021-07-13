import { CardProps } from "../components/Card";

export interface LookupsProps {
  ipWhoIsData: any;
  ip_ApiData: any;
  ipApiData: any;
  ipRegistryData: any;
  ipifyRespData: any;
  ipgeolocationData: any;
  abstractapiData: any;
  ipstackData: any;
  ipinfoData: any;
}

/** Get data about tested IP Lookups services */
export const getLookups = (props: LookupsProps): CardProps[] => [
  {
    name: "ipwhois",
    link: "https://ipwhois.io/",
    freeLimit:
      "10k requests/month",
    apiKeyRequired: "No",
    json: props.ipWhoIsData,
  },
  {
    name: "ip-api",
    link: "https://ip-api.com/",
    freeLimit: "No monthly limit. 45 requests/minute from one IP address. Free for non-commercial use",
    apiKeyRequired: "No",
    json: props.ip_ApiData,
  },
  {
    name: "ipapi",
    link: "https://ipapi.com/",
    freeLimit: "1k requests/month",
    apiKeyRequired: "Yes",
    json: props.ipApiData,
  },
  {
    name: "ipregistry",
    link: "https://ipregistry.co/",
    freeLimit: "10k requests/month",
    apiKeyRequired: "Yes",
    json: props.ipRegistryData,
  },
  {
    name: "Ipify",
    link: "https://geo.ipify.org/",
    freeLimit: "1k requests/month",
    apiKeyRequired: "Yes",
    json: props.ipifyRespData,
  },
  {
    name: "ipgeolocation",
    link: "https://ipgeolocation.io/",
    freeLimit: "30k requests/month with 1k/day limit. Free for non-commercial use",
    apiKeyRequired: "Yes",
    json: props.ipgeolocationData,
  },
  {
    name: "abstractapi",
    link: "https://www.abstractapi.com/ip-geolocation-api",
    freeLimit: "20k requests/month",
    apiKeyRequired: "Yes",
    json: props.abstractapiData,
  },
  {
    name: "ipstack",
    link: "https://ipstack.com/",
    freeLimit: "5k requests/month",
    apiKeyRequired: "Yes",
    json: props.ipstackData,
  },
  {
    name: "ipinfo",
    link: "https://ipinfo.io/",
    freeLimit: "50k requests/month",
    apiKeyRequired: "Yes",
    json: props.ipinfoData,
  },
];
