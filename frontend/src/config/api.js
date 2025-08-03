const isProduction = process.env.NODE_ENV === "production";

export const API_CONFIG = {
  baseURL: isProduction
    ? "https://worldview-veow.onrender.com" // production URL
    : "http://localhost:5000", // local dev

  endpoints: {
    saveBookmark: "/api/bookmarks/save",
    removeBookmark: (countryCode) => `/api/bookmarks/remove/${countryCode}`,
    getBookmarks: "/api/bookmarks",
    chatbot: "/api/chat",
    getAllStories: "/api/stories",
    createStory: "/api/stories",
    updateStory: (id) => `/api/stories/${id}`,
    deleteStory: (id) => `/api/stories/${id}`,
    ImageKitAuth: "/api/imagekit/auth",
    subscribe: "/api/subscribe",
  },
};
