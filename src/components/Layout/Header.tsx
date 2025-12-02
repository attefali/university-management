import { useAuthStore } from '@/store/authStore';
import './Header.css';

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="header">
      <div className="header-content">
        <h1>مرحباً {user?.name}</h1>
        <button onClick={logout} className="logout-btn">
          تسجيل الخروج
        </button>
      </div>
    </header>
  );
}
