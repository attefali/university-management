import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './AcademicPages.css';

interface Department {
  id: string;
  name: string;
  code: string;
  college: string;
  head: string;
  students: number;
  courses: number;
  faculty: number;
  description: string;
  phone: string;
  email: string;
  established: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية
  useEffect(() => {
    const mockDepartments: Department[] = [
      {
        id: '1',
        name: 'قسم الهندسة المدنية',
        code: 'CIVIL-001',
        college: 'كلية الهندسة',
        head: 'د. أحمد محمد',
        students: 120,
        courses: 25,
        faculty: 15,
        description: 'قسم متخصص في الهندسة المدنية',
        phone: '+966-1-4678-9015',
        email: 'civil@university.edu',
        established: '2010',
        status: 'ACTIVE',
        createdAt: '2010-01-15',
      },
      {
        id: '2',
        name: 'قسم الهندسة الكهربائية',
        code: 'ELEC-001',
        college: 'كلية الهندسة',
        head: 'د. سارة علي',
        students: 110,
        courses: 28,
        faculty: 18,
        description: 'قسم متخصص في الهندسة الكهربائية',
        phone: '+966-1-4678-9016',
        email: 'electrical@university.edu',
        established: '2010',
        status: 'ACTIVE',
        createdAt: '2010-01-15',
      },
      {
        id: '3',
        name: 'قسم الرياضيات',
        code: 'MATH-001',
        college: 'كلية العلوم',
        head: 'د. محمود حسن',
        students: 95,
        courses: 20,
        faculty: 12,
        description: 'قسم متخصص في الرياضيات',
        phone: '+966-1-4678-9017',
        email: 'mathematics@university.edu',
        established: '2012',
        status: 'ACTIVE',
        createdAt: '2012-03-20',
      },
    ];
    setDepartments(mockDepartments);
    setFilteredDepartments(mockDepartments);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = departments;

    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          d.name.includes(searchTerm) ||
          d.code.includes(searchTerm) ||
          d.head.includes(searchTerm)
      );
    }

    if (collegeFilter) {
      filtered = filtered.filter((d) => d.college === collegeFilter);
    }

    setFilteredDepartments(filtered);
    setCurrentPage(1);
  }, [searchTerm, collegeFilter, departments]);

  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  const totalStudents = departments.reduce((sum, d) => sum + d.students, 0);
  const totalFaculty = departments.reduce((sum, d) => sum + d.faculty, 0);

  return (
    <MainLayout>
      <div className="academic-page">
        <div className="page-header">
          <div>
            <h1>📚 إدارة الأقسام</h1>
            <p>إدارة الأقسام الأكاديمية والبرامج</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة قسم جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <div className="stat-label">عدد الأقسام</div>
              <div className="stat-value">{departments.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الطلاب</div>
              <div className="stat-value">{totalStudents}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍🏫</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي أعضاء هيئة التدريس</div>
              <div className="stat-value">{totalFaculty}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📖</div>
            <div className="stat-content">
              <div className="stat-label">متوسط المقررات</div>
              <div className="stat-value">
                {departments.length > 0
                  ? Math.round(
                      departments.reduce((sum, d) => sum + d.courses, 0) / departments.length
                    )
                  : 0}
              </div>
            </div>
          </div>
        </div>

        {/* البحث والفلاتر */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث باسم القسم أو الكود..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={collegeFilter}
            onChange={(e) => setCollegeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">كل الكليات</option>
            <option value="كلية الهندسة">كلية الهندسة</option>
            <option value="كلية العلوم">كلية العلوم</option>
            <option value="كلية الآداب">كلية الآداب</option>
          </select>
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم القسم</th>
                <th>الكود</th>
                <th>الكلية</th>
                <th>رئيس القسم</th>
                <th>الطلاب</th>
                <th>المقررات</th>
                <th>أعضاء هيئة التدريس</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDepartments.map((dept) => (
                <tr key={dept.id}>
                  <td>
                    <strong>{dept.name}</strong>
                  </td>
                  <td>{dept.code}</td>
                  <td>{dept.college}</td>
                  <td>{dept.head}</td>
                  <td style={{ fontWeight: '600' }}>{dept.students}</td>
                  <td style={{ fontWeight: '600' }}>{dept.courses}</td>
                  <td style={{ fontWeight: '600' }}>{dept.faculty}</td>
                  <td>
                    <span
                      style={{
                        background: dept.status === 'ACTIVE' ? '#d1fae5' : '#fee2e2',
                        color: dept.status === 'ACTIVE' ? '#065f46' : '#991b1b',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      {dept.status === 'ACTIVE' ? '✅ نشط' : '❌ غير نشط'}
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
            المعروض: {paginatedDepartments.length} من {filteredDepartments.length}
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

      {/* Modal إضافة قسم */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة قسم جديد</h2>
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
                  <label>اسم القسم</label>
                  <input type="text" placeholder="أدخل اسم القسم" />
                </div>
                <div className="form-group">
                  <label>الكود</label>
                  <input type="text" placeholder="أدخل كود القسم" />
                </div>
                <div className="form-group">
                  <label>الكلية</label>
                  <select>
                    <option>-- اختر كلية --</option>
                    <option>كلية الهندسة</option>
                    <option>كلية العلوم</option>
                    <option>كلية الآداب</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>رئيس القسم</label>
                  <input type="text" placeholder="أدخل اسم رئيس القسم" />
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
                  <textarea placeholder="أدخل وصف القسم"></textarea>
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
