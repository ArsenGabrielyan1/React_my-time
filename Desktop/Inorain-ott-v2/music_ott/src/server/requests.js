import { request } from "./request";
import { CONFIG } from "./config";

// export const getLanguages = () => {
//   return request(
//     "get",
//     CONFIG.LANGUAGES, // -> endpoint
//   );
// };

// export const getAppSettings = (body) => {
//   return request(
//     "get",
//     CONFIG.APP_CONFIGS, // -> endpoint
//     "",
//     body,
//   );
// };
export const getCategoriesMusic = (body) => {
  return request(
    "get",
    CONFIG.GET_CATEGORIES, // -> endpoint
    {
      query: JSON.stringify({
        page: 1,
        pagination: false,
      }),
    }
  );
};
export const getRecentlyMusics = () => {
  return request(
    "get",
    CONFIG.GET_RECENTLY, // -> endpoint
    {
      query: JSON.stringify({
        page: 1,
        pagination: false,
      }),
    }
  );
};
export const getMusicByCategory = (id) => {
  return request(
    "get",
    CONFIG.GET_BY_CATEGORY(id), // -> endpoint
    {
      query: JSON.stringify({
        page: 1,
        pagination: false,
      }),
    }
  );
};

export const saveRecentlyPlayedRadio = (body) => {
  return request(
    "put",
    CONFIG.SAVE_RECENTLY_PLAYED, // -> endpoint
    "",
    body
  );
};
