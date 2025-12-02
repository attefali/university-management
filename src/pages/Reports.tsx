import { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './AcademicPages.css';

interface Report {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  generatedBy: string;
  status: 'AVAILABLE' | 'GENERATING' | 'ARCHIVED';
}

export default function Reports() {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      title: 'تقرير الطلاب الشامل',
      description: 'تقرير شامل عن جميع الطلاب والدرجات',
      type: 'طلاب',
      date: '2025-11-20',
      generatedBy: 'د. محمد علي',
      status: 'AVAILABLE',
    },
    {
      id: '2',
      title: 'تقرير المخزون الشهري',
      description: 'تقرير شامل عن حالة المخزون',
      type: 'مخزون',
      date: '2025-11-15',
      generatedBy: 'أ. فاطمة أحمد',
      status: 'AVAILABLE',
    },
    {
      id: '3',
      title: 'تقرير المصروفات السنوي',
      description: 'تقرير تفصيلي عن المصروفات',
      type: 'مصروفات',
      date: '2025-11-10',
      generatedBy: 'أ. خالد حسن',
      status: 'AVAILABLE',
    },
  ]);

  return (
    <MainLayout>
      <div className="academic-page">
        <div className="page-header">
          <div>
            <h1>📊 التقارير</h1>
            <p>عرض وإدارة التقارير الشاملة</p>
          </div>
          <button
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إنشاء تقرير جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي التقارير</div>
              <div className="stat-value">{reports.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">التقارير المتاحة</div>
              <div className="stat-value" style={{ color: '#10b981' }}>
                {reports.filter((r) => r.status === 'AVAILABLE').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-label">قيد الإنشاء</div>
              <div className="stat-value" style={{ color: '#f59e0b' }}>
                {reports.filter((r) => r.status === 'GENERATING').length}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-content">
              <div className="stat-label">المؤرشفة</div>
              <div className="stat-value" style={{ color: '#8b5cf6' }}>
                {reports.filter((r) => r.status === 'ARCHIVED').length}
              </div>
            </div>
          </div>
        </div>

        {/* قائمة التقارير */}
        <div style={{ marginTop: '32px' }}>
          <div style={{ display: 'grid', gap: '16px' }}>
            {reports.map((report) => (
              <div
                key={report.id}
                style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>
                    📄 {report.title}
                  </h3>
                  <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px' }}>
                    {report.description}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b' }}>
                    <span>🏷️ {report.type}</span>
                    <span>📅 {report.date}</span>
                    <span>👤 {report.generatedBy}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    style={{
                      padding: '10px 16px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                    }}
                  >
                    📥 تحميل
                  </button>
                  <button
                    style={{
                      padding: '10px 16px',
                      background: '#f1f5f9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                    }}
                  >
                    👁️ عرض
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
