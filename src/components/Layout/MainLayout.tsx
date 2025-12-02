import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import Sidebar from './Sidebar';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    if (confirm('هل تريد تسجيل الخروج؟')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="layout-content">
        <header className="top-bar">
          <div className="top-bar-left">
            <button
              className="toggle-sidebar"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="تبديل الشريط الجانبي"
            >
              ☰
            </button>
            <div className="breadcrumb">
              <span>🏠 الرئيسية</span>
            </div>
          </div>

          <div className="top-bar-right">
            <div className="search-box">
              <input
                type="text"
                placeholder="ابحث عن شيء..."
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>

            <div className="notifications">
              <button className="notification-btn" title="الإشعارات">
                🔔
                <span className="notification-badge">3</span>
              </button>
            </div>

            <div className="user-menu">
              <div className="user-info">
                <span className="user-avatar">{user?.avatar}</span>
                <div className="user-details">
                  <div className="user-name">{user?.name}</div>
                  <div className="user-role">
                    {user?.role === 'ADMIN' ? 'مدير النظام' : 'مستخدم'}
                  </div>
                </div>
              </div>

              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">
                  👤 الملف الشخصي
                </a>
                <a href="#" className="dropdown-item">
                  ⚙️ الإعدادات
                </a>
                <a href="#" className="dropdown-item">
                  ❓ المساعدة
                </a>
                <hr className="dropdown-divider" />
                <button
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  🚪 تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="main-content">
          {children}
        </main>

        <footer className="main-footer">
          <div className="footer-content">
            <p>&copy; 2025 نظام إدارة الجامعة. جميع الحقوق محفوظة.</p>
            <div className="footer-links">
              <a href="#">سياسة الخصوصية</a>
              <a href="#">شروط الاستخدام</a>
              <a href="#">اتصل بنا</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
