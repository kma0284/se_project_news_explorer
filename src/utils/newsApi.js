const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/everything";

export const getNews = (query) => {
  return fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`,
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
  });
};
