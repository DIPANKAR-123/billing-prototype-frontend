

import BASE_URLS from "./urls";

const getBaseUrl = () => {
  const environment = "production" || "development"; 
  return BASE_URLS[environment] || BASE_URLS.development;
};

export default getBaseUrl;
