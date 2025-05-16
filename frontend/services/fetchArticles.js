export async function fetchArticles(setArticles, setLoading, setError) {
  const baseUrl = "http://localhost:5001";
  const articles = "/api/articles";
  fetch(baseUrl + articles)
    .then((response) => response.json())
    .then((data) => {
      setArticles(data.articles);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      setError(error);
      setLoading(false);
    });
}
