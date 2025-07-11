const baseUrl = "http://localhost:5001";
const users = "/api/users/";

export async function fetchUsers(setUsers, setLoading, setError) {
  try {
    setLoading(true);
    const response = await fetch(baseUrl + users, {
      credentials: "include",
    });
    if (response.ok) {
      const userData = await response.json();
      setUsers(userData.users);
    } else {
      setUsers(null);
    }
  } catch (error) {
    setError(error);
  }
}

export async function editUser(
  id,
  email,
  role,
  interests,
  setLoading,
  setError
) {
  try {
    setLoading(true);
    await fetch(baseUrl + users + id, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        role,
        interests,
      }),
    });
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
}

export async function deleteUser(id, setLoading, setError) {
  try {
    setLoading(true);
    await fetch(baseUrl + users + id, {
      method: "DELETE",
      credentials: "include",
    });
    console.log(id);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
}
