import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.log(error);
      throw error;
    }
    fetchUser();
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
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
      throw error;
    }
  };

  const updateUser = async (id, email, interests) => {
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/login/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      setUser(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const signup = async (email, interests, password) => {
    try {
      const response = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, interests, password }),
      });
      if (!response.ok) {
        throw new Error("Creating user failed");
      }
      login(email, password);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // // Call this in useEffect to load the user on app startup
  useEffect(() => {
    fetchUser();
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, updateUser, fetchUser, logout, signup, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
