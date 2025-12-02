// src/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

// Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Colleges from "@/pages/Colleges";
import Departments from "@/pages/Departments";
import Courses from "@/pages/Courses";
import Centers from "@/pages/Centers";
import Employees from "@/pages/Employees";
import Students from "@/pages/Students";
import Reports from "@/pages/Reports";

function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        {/* صفحة تسجيل الدخول */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* لوحة التحكم */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* الكليات */}
        <Route
          path="/colleges"
          element={isAuthenticated ? <Colleges /> : <Navigate to="/login" />}
        />

        {/* الأقسام */}
        <Route
          path="/departments"
          element={isAuthenticated ? <Departments /> : <Navigate to="/login" />}
        />

        {/* المقررات */}
        <Route
          path="/courses"
          element={isAuthenticated ? <Courses /> : <Navigate to="/login" />}
        />

        {/* المراكز */}
        <Route
          path="/centers"
          element={isAuthenticated ? <Centers /> : <Navigate to="/login" />}
        />

        {/* الموظفون */}
        <Route
          path="/employees"
          element={isAuthenticated ? <Employees /> : <Navigate to="/login" />}
        />

        {/* الطلاب */}
        <Route
          path="/students"
          element={isAuthenticated ? <Students /> : <Navigate to="/login" />}
        />

        {/* التقارير */}
        <Route
          path="/reports"
          element={isAuthenticated ? <Reports /> : <Navigate to="/login" />}
        />

        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
