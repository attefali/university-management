import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './AcademicPages.css';

interface College {
  id: string;
  name: string;
  code: string;
  dean: string;
  departments: number;
  students: number;
  employees: number;
  description: string;
  phone: string;
  email: string;
  location: string;
  established: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

interface FormData {
  name: string;
  code: string;
  dean: string;
  email: string;
  phone: string;
  location: string;
  established: string;
  status: 'ACTIVE' | 'INACTIVE';
  description: string;
  departments: number;
  students: number;
  employees: number;
}

export default function Colleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ State للنموذج
  const [formData, setFormData] = useState<FormData>({
    name: '',
    code: '',
    dean: '',
    email: '',
    phone: '',
    location: '',
    established: '',
    status: 'ACTIVE',
    description: '',
    departments: 0,
    students: 0,
    employees: 0,
  });

  // بيانات تجريبية
  useEffect(() => {
    const mockColleges: College[] = [
      {
        id: '1',
        name: 'كلية الهندسة',
        code: 'ENG-001',
        dean: 'د. محمد علي',
        departments: 5,
        students: 450,
        employees: 85,
        description: 'كلية الهندسة توفر برامج تعليمية متقدمة',
        phone: '+966-1-4678-9012',
        email: 'engineering@university.edu',
        location: 'المبنى الرئيسي - الطابق الثالث',
        established: '2010',
        status: 'ACTIVE',
        createdAt: '2010-01-15',
      },
      {
        id: '2',
        name: 'كلية العلوم',
        code: 'SCI-001',
        dean: 'د. فاطمة أحمد',
        departments: 4,
        students: 380,
        employees: 72,
        description: 'كلية العلوم تركز على البحث العلمي',
        phone: '+966-1-4678-9013',
        email: 'science@university.edu',
        location: 'المبنى الثاني - الطابق الأول',
        established: '2012',
        status: 'ACTIVE',
        createdAt: '2012-03-20',
      },
      {
        id: '3',
        name: 'كلية الآداب',
        code: 'ART-001',
        dean: 'د. خالد حسن',
        departments: 6,
        students: 520,
        employees: 95,
        description: 'كلية الآداب تهتم بالدراسات الإنسانية',
        phone: '+966-1-4678-9014',
        email: 'arts@university.edu',
        location: 'المبنى الثالث - الطابق الثاني',
        established: '2008',
        status: 'ACTIVE',
        createdAt: '2008-06-10',
      },
    ];
    setColleges(mockColleges);
    setFilteredColleges(mockColleges);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = colleges;

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.name.includes(searchTerm) ||
          c.code.includes(searchTerm) ||
          c.dean.includes(searchTerm)
      );
    }

    setFilteredColleges(filtered);
    setCurrentPage(1);
  }, [searchTerm, colleges]);

  // ✅ دالة التعامل مع تغيير الـ Input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'departments' || name === 'students' || name === 'employees' 
        ? parseInt(value) || 0 
        : value,
    }));
  };

  // ✅ دالة الإضافة
  const handleAddCollege = () => {
    // التحقق من البيانات المطلوبة
    if (!formData.name.trim()) {
      alert('❌ أدخل اسم الكلية');
      return;
    }
    if (!formData.code.trim()) {
      alert('❌ أدخل كود الكلية');
      return;
    }
    if (!formData.dean.trim()) {
      alert('❌ أدخل اسم العميد');
      return;
    }

    // إنشاء كلية جديدة
    const newCollege: College = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
    };

    // إضافة الكلية
    setColleges([...colleges, newCollege]);

    // إعادة تعيين النموذج
    setFormData({
      name: '',
      code: '',
      dean: '',
      email: '',
      phone: '',
      location: '',
      established: '',
      status: 'ACTIVE',
      description: '',
      departments: 0,
      students: 0,
      employees: 0,
    });

    // إغلاق الـ Modal
    setShowCreateModal(false);

    // رسالة نجاح
    alert('✅ تمت إضافة الكلية بنجاح!');
  };

  const handleViewCollege = (college: College) => {
    setSelectedCollege(college);
    setShowViewModal(true);
  };

  const paginatedColleges = filteredColleges.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage);

  const totalStudents = colleges.reduce((sum, c) => sum + c.students, 0);
  const totalEmployees = colleges.reduce((sum, c) => sum + c.employees, 0);

  return (
    <MainLayout>
      <div className="academic-page">
        <div className="page-header">
          <div>
            <h1>🏫 إدارة الكليات</h1>
            <p>إدارة الكليات والأقسام الأكاديمية</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة كلية جديدة
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏫</div>
            <div className="stat-content">
              <div className="stat-label">عدد الكليات</div>
              <div className="stat-value">{colleges.length}</div>
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
            <div className="stat-icon">👨‍💼</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الموظفين</div>
              <div className="stat-value">{totalEmployees}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <div className="stat-label">متوسط الطلاب</div>
              <div className="stat-value">
                {colleges.length > 0 ? Math.round(totalStudents / colleges.length) : 0}
              </div>
            </div>
          </div>
        </div>

        {/* البحث */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث باسم الكلية أو الكود..."
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
                <th>اسم الكلية</th>
                <th>الكود</th>
                <th>العميد</th>
                <th>الأقسام</th>
                <th>الطلاب</th>
                <th>الموظفين</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedColleges.map((college) => (
                <tr key={college.id}>
                  <td>
                    <strong>{college.name}</strong>
                  </td>
                  <td>{college.code}</td>
                  <td>{college.dean}</td>
                  <td style={{ fontWeight: '600' }}>{college.departments}</td>
                  <td style={{ fontWeight: '600' }}>{college.students}</td>
                  <td style={{ fontWeight: '600' }}>{college.employees}</td>
                  <td>
                    <span
                      style={{
                        background: college.status === 'ACTIVE' ? '#d1fae5' : '#fee2e2',
                        color: college.status === 'ACTIVE' ? '#065f46' : '#991b1b',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      {college.status === 'ACTIVE' ? '✅ نشطة' : '❌ غير نشطة'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon"
                        onClick={() => handleViewCollege(college)}
                        title="عرض"
                      >
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
            المعروض: {paginatedColleges.length} من {filteredColleges.length}
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

      {/* Modal عرض التفاصيل */}
      {showViewModal && selectedCollege && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>👁️ تفاصيل الكلية</h2>
              <button
                className="modal-close"
                onClick={() => setShowViewModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="info-grid">
                <div className="info-item">
                  <label>اسم الكلية</label>
                  <div>
                    <strong>{selectedCollege.name}</strong>
                  </div>
                </div>
                <div className="info-item">
                  <label>الكود</label>
                  <div>{selectedCollege.code}</div>
                </div>
                <div className="info-item">
                  <label>العميد</label>
                  <div>{selectedCollege.dean}</div>
                </div>
                <div className="info-item">
                  <label>البريد الإلكتروني</label>
                  <div>{selectedCollege.email}</div>
                </div>
                <div className="info-item">
                  <label>الهاتف</label>
                  <div>{selectedCollege.phone}</div>
                </div>
                <div className="info-item">
                  <label>الموقع</label>
                  <div>{selectedCollege.location}</div>
                </div>
                <div className="info-item">
                  <label>سنة التأسيس</label>
                  <div>{selectedCollege.established}</div>
                </div>
                <div className="info-item">
                  <label>عدد الأقسام</label>
                  <div style={{ fontWeight: '600' }}>{selectedCollege.departments}</div>
                </div>
                <div className="info-item">
                  <label>عدد الطلاب</label>
                  <div style={{ fontWeight: '600' }}>{selectedCollege.students}</div>
                </div>
                <div className="info-item">
                  <label>عدد الموظفين</label>
                  <div style={{ fontWeight: '600' }}>{selectedCollege.employees}</div>
                </div>
                <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                  <label>الوصف</label>
                  <div>{selectedCollege.description}</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowViewModal(false)}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Modal إضافة كلية - محدث */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة كلية جديدة</h2>
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
                  <label>اسم الكلية *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="أدخل اسم الكلية"
                  />
                </div>
                <div className="form-group">
                  <label>الكود *</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="أدخل كود الكلية"
                  />
                </div>
                <div className="form-group">
                  <label>العميد *</label>
                  <input
                    type="text"
                    name="dean"
                    value={formData.dean}
                    onChange={handleInputChange}
                    placeholder="أدخل اسم العميد"
                  />
                </div>
                <div className="form-group">
                  <label>البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="أدخل البريد الإلكتروني"
                  />
                </div>
                <div className="form-group">
                  <label>الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="أدخل رقم الهاتف"
                  />
                </div>
                <div className="form-group">
                  <label>الموقع</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="أدخل موقع الكلية"
                  />
                </div>
                <div className="form-group">
                  <label>سنة التأسيس</label>
                  <input
                    type="number"
                    name="established"
                    value={formData.established}
                    onChange={handleInputChange}
                    placeholder="أدخل سنة التأسيس"
                  />
                </div>
                <div className="form-group">
                  <label>الحالة</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="ACTIVE">نشطة</option>
                    <option value="INACTIVE">غير نشطة</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>عدد الأقسام</label>
                  <input
                    type="number"
                    name="departments"
                    value={formData.departments}
                    onChange={handleInputChange}
                    placeholder="أدخل عدد الأقسام"
                  />
                </div>
                <div className="form-group">
                  <label>عدد الطلاب</label>
                  <input
                    type="number"
                    name="students"
                    value={formData.students}
                    onChange={handleInputChange}
                    placeholder="أدخل عدد الطلاب"
                  />
                </div>
                <div className="form-group">
                  <label>عدد الموظفين</label>
                  <input
                    type="number"
                    name="employees"
                    value={formData.employees}
                    onChange={handleInputChange}
                    placeholder="أدخل عدد الموظفين"
                  />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>الوصف</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="أدخل وصف الكلية"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-primary"
                onClick={handleAddCollege}
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
