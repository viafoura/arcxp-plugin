import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";
import axios from "axios";
import { VIAFOURA_SITE_DOMAIN, EDITORIAL_USER_EMAIL, EDITORIAL_USER_PASSWORD } from "fusion:environment";

const params = [];

const fetch = () => {
  return axios({
    url: `https://api.viafoura.co/v2/${VIAFOURA_SITE_DOMAIN}/users/login?session=false`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: EDITORIAL_USER_EMAIL,
      password: EDITORIAL_USER_PASSWORD,
    },
  })
    .then(({ data }) => {
      return data;
    })
    .catch(handleFetchError);
};

export default {
  fetch,
  params,
};
