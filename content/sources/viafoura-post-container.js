import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";
import axios from "axios";
import { VIAFOURA_SITE_UUID } from "fusion:environment";

const params = [
  {
    name: "containerId",
    displayName: "Container ID",
    type: "text",
  },
];

const fetch = ({ containerId } = {}) => {
  return axios({
    url: `https://livecomments.viafoura.co/v4/livecomments/${VIAFOURA_SITE_UUID}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      container_id: containerId,
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
