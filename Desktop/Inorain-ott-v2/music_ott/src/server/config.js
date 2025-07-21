export const CONFIG = {
  // APP_CONFIGS: "application/get?languageId=13",
  GET_CATEGORIES: "entertainment/api/music_categories",
  GET_BY_CATEGORY: (id) => `entertainment/api/music/by_category/${id}`,
  GET_RECENTLY: "entertainment/api/recently_played/music",
  SAVE_RECENTLY_PLAYED: "entertainment/api/save_played/music",
};
