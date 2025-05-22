import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Banner
import Banner from "./components/Banner";
//Pages
import FrontPage from "./pages/FrontPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./guards/PrivateRoute";
import AdminRoute from "./guards/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Banner />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <DashboardPage />
              </AdminRoute>
            }
          />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
