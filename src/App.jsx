import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Child1 from "./pages/Child1";
import Child2 from "./pages/Child2";
import AdminDashboard from "./pages/AdminDashboard";
import CreateBlog from "./pages/CreateBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppContext } from "./context/AppContext";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Blog from "./pages/Blog";

function App() {
  const { isAuthenticated, isAdmin } = useContext(AppContext);

  return (
    <div className="h-screen w-full flex items-start justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
              >
                <Home />
              </ProtectedRoute>
            }
          >
            <Route path="child1" element={<Child1 />} />
            <Route path="child2" element={<Child2 />} />
          </Route>
          <Route
            path="/blog/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Blog />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
              >
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/create-blog"
            element={
              <AdminProtectedRoute
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
              >
                <CreateBlog />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
