import axios, { AxiosResponse } from "axios";

/** Helper to extract proper data from response */
const getData = (resp: PromiseSettledResult<AxiosResponse<any>>) =>
  resp?.status === "fulfilled"
    ? resp?.value?.data ?? null
    : { error: "Ooops, we can't get data" };

/** Get response from all tested IP Lookups providers */
export const getLookupsData = async (ip) => {
  const ipWhoIs = axios.get(`https://ipwhois.app/json/${ip}`);
  const ip_Api = axios.get(`http://ip-api.com/json/${ip}?fields=66846719`);
  const ipApi = axios.get(
    `http://api.ipapi.com/api/${ip}?access_key=${process.env.IPAPI_KEY}`
  );
  const ipRegistry = axios.get(
    `https://api.ipregistry.co/${ip}?key=${process.env.IPREGISTRY_KEY}`
  );
  const ipify = axios.get(
    `https://geo.ipify.org/api/v1?apiKey=${process.env.IPIFY_KEY}&ipAddress=${ip}`
  );
  const ipgeolocation = axios.get(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOLOCATION_KEY}&ip=${ip}`
  );
  const abstractapi = axios.get(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&ip_address=${ip}`
  );
  const ipstack = axios.get(
    `http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_KEY}`
  );
  const ipinfo = axios.get(
    `https://ipinfo.io/${ip}?token=${process.env.IPINFO_KEY}`
  );

  const [
    ipWhoIsResp,
    ip_ApiResp,
    ipApiResp,
    ipRegistryResp,
    ipifyResp,
    ipgeolocationResp,
    abstractapiResp,
    ipstackResp,
    ipinfoResp,
  ] = await Promise.allSettled([
    ipWhoIs,
    ip_Api,
    ipApi,
    ipRegistry,
    ipify,
    ipgeolocation,
    abstractapi,
    ipstack,
    ipinfo,
  ]);

  return {
    ip,
    ipWhoIsData: getData(ipWhoIsResp),
    ip_ApiData: getData(ip_ApiResp),
    ipApiData: getData(ipApiResp),
    ipRegistryData: getData(ipRegistryResp),
    ipifyRespData: getData(ipifyResp),
    ipgeolocationData: getData(ipgeolocationResp),
    abstractapiData: getData(abstractapiResp),
    ipstackData: getData(ipstackResp),
    ipinfoData: getData(ipinfoResp),
  };
};
