import styles from "./Search.module.css";
import { useState } from "react";
import { fetchArticles } from "../../services/articleRequests";
import Articles from "../Articles/Articles";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState("");
  const [published, setPublished] = useState("whenever");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    //Set end and start for date range
    const now = new Date();
    let start;
    let end;
    if (published == "whenever") {
      start = 1900;
      end = 2100;
    } else if (published == "24h") {
      start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      end = now;
    } else if (published == "week") {
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      end = now;
    } else if (published == "month") {
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      end = now;
    } else if (published == "custom") {
      start = customStart;
      end = customEnd;
    }
    setLoading(true);
    fetchArticles(
      setArticles,
      setLoading,
      setError,
      `?title=${search}&content=${search}&author=${search}&sort=${sort}&tags=${category}&start=${start}&end=${end}`
    );
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <>
      <div className={styles.search}>
        <div>
          <h3>Search</h3>

          <div className={styles.inputwrapper}>
            <div className={styles.inputdiv}>
              <input
                value={search}
                placeholder="Search article titles, content and authors"
                onChange={handleChange(setSearch)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <button disabled={loading} onClick={handleSearch}>
              Search
            </button>
          </div>

          <label>Sort:</label>
          <select value={sort} onChange={handleChange(setSort)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

          <br />

          <label>Category:</label>
          <select value={category} onChange={handleChange(setCategory)}>
            <option value="">All news</option>
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>
            <option value="entertainment">Entertainment</option>
            <option value="music">Music</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
          </select>

          <br />

          <label>Published:</label>
          <select value={published} onChange={handleChange(setPublished)}>
            <option value="whenever">Whenever</option>
            <option value="24h">Last 24 hours</option>
            <option value="week">Last week</option>
            <option value="month">Last month</option>
            <option value="custom">Custom</option>
          </select>

          <br />
          {published === "custom" ? (
            <>
              <label>From: </label>
              <input
                value={customStart}
                onChange={handleChange(setCustomStart)}
                type="date"
              ></input>
              <label>To: </label>
              <input
                value={customEnd}
                onChange={handleChange(setCustomEnd)}
                type="date"
              ></input>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {articles ? (
        <div className={styles.articlediv}>
          <div>
            <Articles
              articles={articles}
              loading={loading}
              error={error}
              foryou={false}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Search;
