import endpoints from "@/config/endpoints";
import { api } from "./api";

const composeEndpoint = (endpointName, path, urlParams) => {
  let url = endpoints[endpointName || ""] || path || "";

  if (urlParams && urlParams.length) {
    urlParams.forEach((p, i) => {
      url = url.replace(`$[${i + 1}]`, p);
    });
    // TODO: to use REDUCE ARRAY
  }
  return url;
};

const handlePromise = (promise) =>
  promise
    .then((response) => {
      if (response.ok) return [null, response, response.data];
      return [{ error: true, data: response.data }, response, response.data];
    })
    .catch((error) => Promise.resolve([error, { ok: false }, null]));

const service = ({ method, pathRequest, params }) => {
  switch (method) {
    case "POST":
      return api.post(pathRequest || "", params);
    case "PUT":
      return api.put(pathRequest || "", params);
    case "DELETE":
      return api.delete(pathRequest || "", params);
    default:
      return api.get(pathRequest || "", params);
  }
};

/* MOCKS */
const loadingTimeMSMOCK = 500;

const setPromiseAPIMOCK = (endpoint) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const dataToSend = require(`@/mocks/${endpoint}.json`);
      if (dataToSend) {
        res({
          ok: true,
          data: dataToSend,
        });
      } else {
        // Error
        res({
          ok: false,
          data: null,
        });
      }
    }, loadingTimeMSMOCK);
  });
};

/* edd MOCKS */

export const callToAPI = ({ method, endpoint, path, urlParams, params }) => {
  if (process.env.API_MOCK_MODE === "yes") {
    return handlePromise(setPromiseAPIMOCK(endpoint));
  }

  const pathRequest = composeEndpoint(endpoint, path, urlParams);

  return handlePromise(service({ method, pathRequest, params }));
};
