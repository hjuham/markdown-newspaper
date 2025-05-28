export async function fetchUsers(setUsers, setLoading, setError) {
  const baseUrl = "http://localhost:5001";
  const users = "/api/users";
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
