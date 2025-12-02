import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './AcademicPages.css';

interface Center {
  id: string;
  name: string;
  code: string;
  director: string;
  staff: number;
  budget: number;
  description: string;
  phone: string;
  email: string;
  location: string;
  established: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export default function Centers() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<Center[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية
  useEffect(() => {
    const mockCenters: Center[] = [
      {
        id: '1',
        name: 'مركز الحاسوب',
        code: 'COMP-CENTER',
        director: 'د. علي محمد',
        staff: 12,
        budget: 500000,
        description: 'مركز متخصص في تكنولوجيا المعلومات',
        phone: '+966-1-4678-9020',
        email: 'computer@university.edu',
        location: 'المبنى الرئيسي - الطابق الرابع',
        established: '2015',
        status: 'ACTIVE',
        createdAt: '2015-05-10',
      },
      {
        id: '2',
        name: 'مركز البحث العلمي',
        code: 'RESEARCH-CENTER',
        director: 'د. فاطمة أحمد',
        staff: 18,
        budget: 750000,
        description: 'مركز متخصص في البحث العلمي والتطوير',
        phone: '+966-1-4678-9021',
        email: 'research@university.edu',
        location: 'المبنى الثاني - الطابق الثالث',
        established: '2016',
        status: 'ACTIVE',
        createdAt: '2016-03-15',
      },
      {
        id: '3',
        name: 'مركز اللغات',
        code: 'LANG-CENTER',
        director: 'د. خالد حسن',
        staff: 10,
        budget: 300000,
        description: 'مركز متخصص في تعليم اللغات',
        phone: '+966-1-4678-9022',
        email: 'languages@university.edu',
        location: 'المبنى الثالث - الطابق الأول',
        established: '2017',
        status: 'ACTIVE',
        createdAt: '2017-09-20',
      },
    ];
    setCenters(mockCenters);
    setFilteredCenters(mockCenters);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = centers;

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.name.includes(searchTerm) ||
          c.code.includes(searchTerm) ||
          c.director.includes(searchTerm)
      );
    }

    setFilteredCenters(filtered);
    setCurrentPage(1);
  }, [searchTerm, centers]);

  const paginatedCenters = filteredCenters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCenters.length / itemsPerPage);

  const totalBudget = centers.reduce((sum, c) => sum + c.budget, 0);
  const totalStaff = centers.reduce((sum, c) => sum + c.staff, 0);

  return (
    <MainLayout>
      <div className="academic-page">
        <div className="page-header">
          <div>
            <h1>🏢 إدارة المراكز</h1>
            <p>إدارة المراكز والوحدات المتخصصة</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة مركز جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-content">
              <div className="stat-label">عدد المراكز</div>
              <div className="stat-value">{centers.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍💼</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الموظفين</div>
              <div className="stat-value">{totalStaff}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الميزانية</div>
              <div className="stat-value">{(totalBudget / 1000000).toFixed(1)}م</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">متوسط الميزانية</div>
              <div className="stat-value">
                {centers.length > 0 ? (totalBudget / centers.length / 1000).toFixed(0) + 'ك' : '0'}
              </div>
            </div>
          </div>
        </div>

        {/* البحث */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث باسم المركز أو الكود..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم المركز</th>
                <th>الكود</th>
                <th>المدير</th>
                <th>الموظفين</th>
                <th>الميزانية</th>
                <th>سنة التأسيس</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCenters.map((center) => (
                <tr key={center.id}>
                  <td>
                    <strong>{center.name}</strong>
                  </td>
                  <td>{center.code}</td>
                  <td>{center.director}</td>
                  <td style={{ fontWeight: '600' }}>{center.staff}</td>
                  <td style={{ fontWeight: '600' }}>
                    {(center.budget / 1000).toFixed(0)}ك
                  </td>
                  <td>{center.established}</td>
                  <td>
                    <span
                      style={{
                        background: center.status === 'ACTIVE' ? '#d1fae5' : '#fee2e2',
                        color: center.status === 'ACTIVE' ? '#065f46' : '#991b1b',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      {center.status === 'ACTIVE' ? '✅ نشط' : '❌ غير نشط'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="عرض">
                        👁️
                      </button>
                      <button className="btn-icon" title="تعديل">
                        ✏️
                      </button>
                      <button className="btn-icon" title="حذف">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* الترقيم */}
        <div className="pagination-container">
          <div className="pagination-info">
            المعروض: {paginatedCenters.length} من {filteredCenters.length}
          </div>
          <div className="pagination-buttons">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn-pagination"
            >
              ← السابق
            </button>
            <span className="pagination-counter">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn-pagination"
            >
              التالي →
            </button>
          </div>
        </div>
      </div>

      {/* Modal إضافة مركز */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة مركز جديد</h2>
              <button
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>اسم المركز</label>
                  <input type="text" placeholder="أدخل اسم المركز" />
                </div>
                <div className="form-group">
                  <label>الكود</label>
                  <input type="text" placeholder="أدخل كود المركز" />
                </div>
                <div className="form-group">
                  <label>المدير</label>
                  <input type="text" placeholder="أدخل اسم المدير" />
                </div>
                <div className="form-group">
                  <label>الميزانية</label>
                  <input type="number" placeholder="أدخل الميزانية" />
                </div>
                <div className="form-group">
                  <label>البريد الإلكتروني</label>
                  <input type="email" placeholder="أدخل البريد الإلكتروني" />
                </div>
                <div className="form-group">
                  <label>الهاتف</label>
                  <input type="tel" placeholder="أدخل رقم الهاتف" />
                </div>
                <div className="form-group">
                  <label>سنة التأسيس</label>
                  <input type="number" placeholder="أدخل سنة التأسيس" />
                </div>
                <div className="form-group">
                  <label>الحالة</label>
                  <select>
                    <option>نشط</option>
                    <option>غير نشط</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>الوصف</label>
                  <textarea placeholder="أدخل وصف المركز"></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
              >
                ✅ إضافة
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
