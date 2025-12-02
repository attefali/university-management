import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('admin@university.edu');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('فشل تسجيل الدخول. يرجى التحقق من بيانات الدخول.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
      </div>

      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">🎓</div>
            <h1>نظام إدارة الجامعة</h1>
            <p>نظام متكامل لإدارة الجامعات والمؤسسات التعليمية</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">كلمة المرور</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                تذكرني
              </label>
              <a href="#" className="forgot-password">
                هل نسيت كلمة المرور؟
              </a>
            </div>

            <button
              type="submit"
              className="btn-login"
              disabled={isLoading}
            >
              {isLoading ? 'جاري التحميل...' : 'دخول'}
            </button>
          </form>

          <div className="login-footer">
            <p>جميع الحقوق محفوظة © 2025</p>
            <div className="social-links">
              <a href="#" title="Facebook">f</a>
              <a href="#" title="Twitter">𝕏</a>
              <a href="#" title="LinkedIn">in</a>
            </div>
          </div>
        </div>

        <div className="login-features">
          <div className="feature">
            <div className="feature-icon">📊</div>
            <div className="feature-title">تقارير شاملة</div>
            <div className="feature-desc">إنشاء تقارير مفصلة وشاملة</div>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <div className="feature-title">أمان عالي</div>
            <div className="feature-desc">حماية كاملة للبيانات والمعلومات</div>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <div className="feature-title">أداء سريع</div>
            <div className="feature-desc">نظام سريع وفعال وموثوق</div>
          </div>
        </div>
      </div>
    </div>
  );
}
