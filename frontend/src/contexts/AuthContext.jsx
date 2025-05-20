import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);
    try {
      const response = await fetch("http://localhost:5001/api/login/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      setUser(email);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/users/my/user", {
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    }
  };

  const updateUser = async (id, email, interests) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:5001/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, interests }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Updating user failed");
      }
      // const userData = await response.json();
      // console.log(userData.user);
      // setUser(userData.user);
    } catch (error) {
      console.log(error);
    }
  };

  // // Call this in useEffect to load the user on app startup
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, updateUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
