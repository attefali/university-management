import MainLayout from '@/components/Layout/MainLayout';
import { useAuthStore } from '@/store/authStore';

export default function Dashboard() {
  const { user } = useAuthStore();

  const stats = [
    { label: 'الطلاب', value: 1250, icon: '👨‍🎓' },
    { label: 'الأساتذة', value: 85, icon: '👨‍🏫' },
    { label: 'الأقسام', value: 12, icon: '🏢' },
    { label: 'الدورات', value: 156, icon: '📚' },
  ];

  return (
    <MainLayout>
      <div className="dashboard-content">
        <h2>🎓 لوحة التحكم</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          مرحباً بك {user?.name} ({user?.role})
        </p>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="recent-activity">
          <h3>📋 النشاطات الأخيرة</h3>
          <ul>
            <li>تم إضافة 5 طلاب جدد</li>
            <li>تم تحديث درجات الفصل الأول</li>
            <li>تم جدولة اجتماع مع الأساتذة</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
