import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NotFoundPage from "../pages/NotFoundPage";
export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return <NotFoundPage />;
  }

  return children;
}
