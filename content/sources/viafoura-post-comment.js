import handleFetchError from "@wpmedia/arc-themes-components/src/utils/handle-fetch-error";
import axios from "axios";
import { VIAFOURA_SITE_UUID } from "fusion:environment";

const params = [
  {
    name: "containerId",
    displayName: "Container ID",
    type: "text",
  },
  {
    name: "content",
    displayName: "Comment content",
    type: "text",
  },
  {
    name: "articleURL",
    displayName: "Article URL",
    type: "text",
  },
  {
    name: "authToken",
    displayName: "Auth Token",
    type: "text",
  }
];

const fetch = ({ containerId, content, articleURL, authToken } = {}) => {
  return axios({
    url: `https://livecomments.viafoura.co/v4/livecomments/${VIAFOURA_SITE_UUID}/${containerId}/comments`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    },
    data: {
      content: content,
      metadata: {
        origin_title: "Test",
        origin_summary: "Test",
        origin_url: articleURL,
        origin_image_url: articleURL,
      }
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
