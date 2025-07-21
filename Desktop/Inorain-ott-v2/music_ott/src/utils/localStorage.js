const LOCAL_STORAGE = {
  CLEAR: () => localStorage.clear(),

  TOKEN: {
    GET: () => localStorage.getItem("token"),
    SET: (token) => localStorage.setItem("token", token),
  },
  LAST_GAME: {
    GET: () => JSON.parse(localStorage.getItem("last_game")),
    SET: (game) => localStorage.setItem("last_game", JSON.stringify(game)),
  },
};

export default LOCAL_STORAGE;
