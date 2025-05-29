import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NotFoundPage from "../pages/NotFoundPage";
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    // Or show a spinner/loading component
    return <div>Loading...</div>;
  }

  if (!user) {
    return <NotFoundPage />;
  }

  return children;
}
