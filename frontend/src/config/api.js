// config/api.js
export const API_CONFIG = {
  baseURL: "http://localhost:5000",
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
  },
};
