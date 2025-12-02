import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './AcademicPages.css';

interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  phone: string;
  department: string;
  semester: number;
  gpa: number;
  status: 'ACTIVE' | 'GRADUATED' | 'SUSPENDED';
  enrollmentDate: string;
  avatar?: string;
  createdAt: string;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية
  useEffect(() => {
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'محمد علي أحمد',
        studentId: 'STU-2021-001',
        email: 'mohammad.ali@student.edu',
        phone: '+966-501111111',
        department: 'قسم الهندسة المدنية',
        semester: 6,
        gpa: 3.85,
        status: 'ACTIVE',
        enrollmentDate: '2021-09-01',
        avatar: '👨‍🎓',
        createdAt: '2021-09-01',
      },
      {
        id: '2',
        name: 'فاطمة محمود سالم',
        studentId: 'STU-2021-002',
        email: 'fatima.mahmoud@student.edu',
        phone: '+966-501111112',
        department: 'قسم الهندسة الكهربائية',
        semester: 6,
        gpa: 3.92,
        status: 'ACTIVE',
        enrollmentDate: '2021-09-01',
        avatar: '👩‍🎓',
        createdAt: '2021-09-01',
      },
      {
        id: '3',
        name: 'خالد حسن محمد',
        studentId: 'STU-2021-003',
        email: 'khalid.hassan@student.edu',
        phone: '+966-501111113',
        department: 'قسم الرياضيات',
        semester: 6,
        gpa: 3.65,
        status: 'ACTIVE',
        enrollmentDate: '2021-09-01',
        avatar: '👨‍🎓',
        createdAt: '2021-09-01',
      },
      {
        id: '4',
        name: 'سارة عبدالله علي',
        studentId: 'STU-2020-001',
        email: 'sarah.abdullah@student.edu',
        phone: '+966-501111114',
        department: 'قسم الهندسة المدنية',
        semester: 8,
        gpa: 3.78,
        status: 'GRADUATED',
        enrollmentDate: '2020-09-01',
        avatar: '👩‍🎓',
        createdAt: '2020-09-01',
      },
      {
        id: '5',
        name: 'علي محمد حسن',
        studentId: 'STU-2022-001',
        email: 'ali.mohammad@student.edu',
        phone: '+966-501111115',
        department: 'قسم الهندسة الكهربائية',
        semester: 4,
        gpa: 2.95,
        status: 'SUSPENDED',
        enrollmentDate: '2022-09-01',
        avatar: '👨‍🎓',
        createdAt: '2022-09-01',
      },
    ];
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.includes(searchTerm) ||
          s.studentId.includes(searchTerm) ||
          s.email.includes(searchTerm)
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter((s) => s.department === departmentFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((s) => s.status === statusFilter);
    }

    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [searchTerm, departmentFilter, statusFilter, students]);

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const activeStudents = students.filter((s) => s.status === 'ACTIVE').length;
  const graduatedStudents = students.filter((s) => s.status === 'GRADUATED').length;
  const avgGPA = students.length > 0 ? (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2) : '0';

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string } } = {
      ACTIVE: { bg: '#d1fae5', text: '#065f46', label: '✅ نشط' },
      GRADUATED: { bg: '#dbeafe', text: '#0c2d6b', label: '🎓 متخرج' },
      SUSPENDED: { bg: '#fee2e2', text: '#991b1b', label: '⛔ موقوف' },
    };
    const style = statusMap[status];
    return (
      <span
        style={{
          background: style.bg,
          color: style.text,
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
        }}
      >
        {style.label}
      </span>
    );
  };

  return (
    <MainLayout>
      <div className="academic-page">
        <div className="page-header">
          <div>
            <h1>👨‍🎓 إدارة الطلاب</h1>
            <p>إدارة بيانات الطلاب والدرجات</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة طالب جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الطلاب</div>
              <div className="stat-value">{students.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">الطلاب النشطين</div>
              <div className="stat-value" style={{ color: '#10b981' }}>
                {activeStudents}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-content">
              <div className="stat-label">المتخرجين</div>
              <div className="stat-value" style={{ color: '#0ea5e9' }}>
                {graduatedStudents}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-label">متوسط المعدل</div>
              <div className="stat-value">{avgGPA}</div>
            </div>
          </div>
        </div>

        {/* البحث والفلاتر */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث باسم الطالب أو الرقم الجامعي..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">كل الأقسام</option>
            <option value="قسم الهندسة المدنية">قسم الهندسة المدنية</option>
            <option value="قسم الهندسة الكهربائية">قسم الهندسة الكهربائية</option>
            <option value="قسم الرياضيات">قسم الرياضيات</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">كل الحالات</option>
            <option value="ACTIVE">نشط</option>
            <option value="GRADUATED">متخرج</option>
            <option value="SUSPENDED">موقوف</option>
          </select>
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الرقم الجامعي</th>
                <th>البريد الإلكتروني</th>
                <th>القسم</th>
                <th>الفصل</th>
                <th>المعدل</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{student.avatar}</span>
                      <strong>{student.name}</strong>
                    </div>
                  </td>
                  <td>{student.studentId}</td>
                  <td>{student.email}</td>
                  <td>{student.department}</td>
                  <td style={{ fontWeight: '600' }}>{student.semester}</td>
                  <td style={{ fontWeight: '600', color: '#667eea' }}>
                    {student.gpa.toFixed(2)}
                  </td>
                  <td>{getStatusBadge(student.status)}</td>
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
            المعروض: {paginatedStudents.length} من {filteredStudents.length}
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

      {/* Modal إضافة طالب */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة طالب جديد</h2>
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
                  <label>الاسم الكامل</label>
                  <input type="text" placeholder="أدخل الاسم الكامل" />
                </div>
                <div className="form-group">
                  <label>الرقم الجامعي</label>
                  <input type="text" placeholder="أدخل الرقم الجامعي" />
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
                  <label>القسم</label>
                  <select>
                    <option>-- اختر قسم --</option>
                    <option>قسم الهندسة المدنية</option>
                    <option>قسم الهندسة الكهربائية</option>
                    <option>قسم الرياضيات</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>الفصل الدراسي</label>
                  <select>
                    <option>-- اختر فصل --</option>
                    <option>الفصل الأول</option>
                    <option>الفصل الثاني</option>
                    <option>الفصل الثالث</option>
                    <option>الفصل الرابع</option>
                    <option>الفصل الخامس</option>
                    <option>الفصل السادس</option>
                    <option>الفصل السابع</option>
                    <option>الفصل الثامن</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>الحالة</label>
                  <select>
                    <option>نشط</option>
                    <option>متخرج</option>
                    <option>موقوف</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>تاريخ الالتحاق</label>
                  <input type="date" />
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
