import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './AcademicPages.css';

interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  instructor: string;
  credits: number;
  students: number;
  semester: string;
  description: string;
  schedule: string;
  location: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: '1',
        name: 'الهندسة الإنشائية المتقدمة',
        code: 'CIVIL-301',
        department: 'قسم الهندسة المدنية',
        instructor: 'د. أحمد محمد',
        credits: 3,
        students: 45,
        semester: 'الفصل الأول',
        description: 'مقرر متقدم في الهندسة الإنشائية',
        schedule: 'الأحد والثلاثاء 10:00-11:30',
        location: 'قاعة 201',
        status: 'ACTIVE',
        createdAt: '2025-01-15',
      },
      {
        id: '2',
        name: 'الدوائر الكهربائية',
        code: 'ELEC-201',
        department: 'قسم الهندسة الكهربائية',
        instructor: 'د. سارة علي',
        credits: 4,
        students: 52,
        semester: 'الفصل الأول',
        description: 'أساسيات الدوائر الكهربائية',
        schedule: 'الاثنين والأربعاء 14:00-15:30',
        location: 'قاعة 305',
        status: 'ACTIVE',
        createdAt: '2025-01-15',
      },
      {
        id: '3',
        name: 'حساب التفاضل والتكامل',
        code: 'MATH-101',
        department: 'قسم الرياضيات',
        instructor: 'د. محمود حسن',
        credits: 3,
        students: 120,
        semester: 'الفصل الأول',
        description: 'مقدمة في حساب التفاضل والتكامل',
        schedule: 'السبت والاثنين 09:00-10:30',
        location: 'قاعة 101',
        status: 'ACTIVE',
        createdAt: '2025-01-15',
      },
    ];
    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.name.includes(searchTerm) ||
          c.code.includes(searchTerm) ||
          c.instructor.includes(searchTerm)
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter((c) => c.department === departmentFilter);
    }

    if (semesterFilter) {
      filtered = filtered.filter((c) => c.semester === semesterFilter);
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [searchTerm, departmentFilter, semesterFilter, courses]);

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);

  return (
    <MainLayout>
      <div className="academic-page">
        <div className="page-header">
          <div>
            <h1>📖 إدارة المقررات</h1>
            <p>إدارة المقررات والمواد الدراسية</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة مقرر جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📖</div>
            <div className="stat-content">
              <div className="stat-label">عدد المقررات</div>
              <div className="stat-value">{courses.length}</div>
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
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الساعات المعتمدة</div>
              <div className="stat-value">{totalCredits}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">متوسط الطلاب بالمقرر</div>
              <div className="stat-value">
                {courses.length > 0 ? Math.round(totalStudents / courses.length) : 0}
              </div>
            </div>
          </div>
        </div>

        {/* البحث والفلاتر */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث باسم المقرر أو الكود..."
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
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">كل الفصول</option>
            <option value="الفصل الأول">الفصل الأول</option>
            <option value="الفصل الثاني">الفصل الثاني</option>
            <option value="الفصل الصيفي">الفصل الصيفي</option>
          </select>
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم المقرر</th>
                <th>الكود</th>
                <th>القسم</th>
                <th>المحاضر</th>
                <th>الساعات</th>
                <th>الطلاب</th>
                <th>الفصل</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <strong>{course.name}</strong>
                  </td>
                  <td>{course.code}</td>
                  <td>{course.department}</td>
                  <td>{course.instructor}</td>
                  <td style={{ fontWeight: '600' }}>{course.credits}</td>
                  <td style={{ fontWeight: '600' }}>{course.students}</td>
                  <td>{course.semester}</td>
                  <td>
                    <span
                      style={{
                        background: course.status === 'ACTIVE' ? '#d1fae5' : '#fee2e2',
                        color: course.status === 'ACTIVE' ? '#065f46' : '#991b1b',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      {course.status === 'ACTIVE' ? '✅ نشط' : '❌ غير نشط'}
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
            المعروض: {paginatedCourses.length} من {filteredCourses.length}
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

      {/* Modal إضافة مقرر */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة مقرر جديد</h2>
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
                  <label>اسم المقرر</label>
                  <input type="text" placeholder="أدخل اسم المقرر" />
                </div>
                <div className="form-group">
                  <label>الكود</label>
                  <input type="text" placeholder="أدخل كود المقرر" />
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
                  <label>المحاضر</label>
                  <input type="text" placeholder="أدخل اسم المحاضر" />
                </div>
                <div className="form-group">
                  <label>الساعات المعتمدة</label>
                  <input type="number" placeholder="أدخل عدد الساعات" min="1" max="6" />
                </div>
                <div className="form-group">
                  <label>الفصل</label>
                  <select>
                    <option>الفصل الأول</option>
                    <option>الفصل الثاني</option>
                    <option>الفصل الصيفي</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>الجدول الزمني</label>
                  <input type="text" placeholder="مثال: السبت والاثنين 09:00-10:30" />
                </div>
                <div className="form-group">
                  <label>الموقع</label>
                  <input type="text" placeholder="أدخل رقم القاعة" />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>الوصف</label>
                  <textarea placeholder="أدخل وصف المقرر"></textarea>
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
