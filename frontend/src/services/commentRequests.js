const baseUrl = "http://localhost:5001";
const comments = "/api/comments/";

export async function fetchArticleComments(
  id,
  setComments,
  setLoading,
  setError
) {
  fetch(baseUrl + comments + id, { credentials: "include" })
    .then((response) => response.json())
    .then((data) => {
      setComments(data.comments);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    });
}

export async function addComment(text, id, setLoading, setError) {
  try {
    const response = await fetch(baseUrl + comments + id, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

    const data = await response.json();
    return data.savedComment;
  } catch (error) {
    setError(error.message || "Unknown error");
    return null;
  } finally {
    setLoading(false);
  }
}

export async function deleteComment(id, commentId, setLoading, setError) {
  try {
    await fetch(baseUrl + comments + id + "/" + commentId, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
}

export async function likeComment(id, commentId, setLoading, setError) {
  try {
    await fetch(baseUrl + comments + id + "/" + commentId, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "like" }),
    });
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
}
export async function removeLikeComment(id, commentId, setLoading, setError) {
  try {
    await fetch(baseUrl + comments + id + "/" + commentId, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "unlike" }),
    });
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
}
