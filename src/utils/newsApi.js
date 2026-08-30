const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const BASE_URL = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

export const getNews = (query) => {
  const today = new Date();
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const params = new URLSearchParams({
    q: query,
    apiKey: API_KEY,
    from: formatDate(sevenDaysAgo),
    to: formatDate(today),
    pageSize: "100",
  });

  return fetch(`${BASE_URL}?${params.toString()}`).then((res) => {
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
  });
};
