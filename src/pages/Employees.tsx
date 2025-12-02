import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './AcademicPages.css';

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  salary: number;
  status: 'ACTIVE' | 'ON_LEAVE' | 'RETIRED';
  avatar?: string;
  createdAt: string;
}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية
  useEffect(() => {
    const mockEmployees: Employee[] = [
      {
        id: '1',
        name: 'د. محمد علي',
        employeeId: 'EMP-001',
        email: 'mohammad@university.edu',
        phone: '+966-501234567',
        position: 'أستاذ جامعي',
        department: 'قسم الهندسة المدنية',
        joinDate: '2015-01-10',
        salary: 15000,
        status: 'ACTIVE',
        avatar: '👨‍🏫',
        createdAt: '2015-01-10',
      },
      {
        id: '2',
        name: 'د. فاطمة أحمد',
        employeeId: 'EMP-002',
        email: 'fatima@university.edu',
        phone: '+966-501234568',
        position: 'أستاذة مساعدة',
        department: 'قسم الهندسة الكهربائية',
        joinDate: '2018-03-15',
        salary: 12000,
        status: 'ACTIVE',
        avatar: '👩‍🏫',
        createdAt: '2018-03-15',
      },
      {
        id: '3',
        name: 'د. خالد حسن',
        employeeId: 'EMP-003',
        email: 'khalid@university.edu',
        phone: '+966-501234569',
        position: 'محاضر',
        department: 'قسم الرياضيات',
        joinDate: '2019-06-20',
        salary: 10000,
        status: 'ACTIVE',
        avatar: '👨‍💼',
        createdAt: '2019-06-20',
      },
      {
        id: '4',
        name: 'أ. سارة محمود',
        employeeId: 'EMP-004',
        email: 'sarah@university.edu',
        phone: '+966-501234570',
        position: 'موظفة إدارية',
        department: 'الإدارة العامة',
        joinDate: '2020-01-05',
        salary: 6000,
        status: 'ON_LEAVE',
        avatar: '👩‍💼',
        createdAt: '2020-01-05',
      },
      {
        id: '5',
        name: 'أ. علي محمد',
        employeeId: 'EMP-005',
        email: 'ali@university.edu',
        phone: '+966-501234571',
        position: 'فني صيانة',
        department: 'الخدمات العامة',
        joinDate: '2016-09-12',
        salary: 5000,
        status: 'ACTIVE',
        avatar: '👨‍🔧',
        createdAt: '2016-09-12',
      },
    ];
    setEmployees(mockEmployees);
    setFilteredEmployees(mockEmployees);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = employees;

    if (searchTerm) {
      filtered = filtered.filter(
        (e) =>
          e.name.includes(searchTerm) ||
          e.employeeId.includes(searchTerm) ||
          e.email.includes(searchTerm)
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter((e) => e.department === departmentFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((e) => e.status === statusFilter);
    }

    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [searchTerm, departmentFilter, statusFilter, employees]);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
  const activeEmployees = employees.filter((e) => e.status === 'ACTIVE').length;

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string } } = {
      ACTIVE: { bg: '#d1fae5', text: '#065f46', label: '✅ نشط' },
      ON_LEAVE: { bg: '#fef3c7', text: '#92400e', label: '⏳ في إجازة' },
      RETIRED: { bg: '#fee2e2', text: '#991b1b', label: '🔴 متقاعد' },
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
            <h1>👨‍💼 إدارة الموظفين</h1>
            <p>إدارة بيانات الموظفين والرواتب</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة موظف جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👨‍💼</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الموظفين</div>
              <div className="stat-value">{employees.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">الموظفين النشطين</div>
              <div className="stat-value" style={{ color: '#10b981' }}>
                {activeEmployees}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الرواتب الشهرية</div>
              <div className="stat-value">{(totalSalary / 1000).toFixed(1)}ك</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">متوسط الراتب</div>
              <div className="stat-value">
                {employees.length > 0 ? (totalSalary / employees.length).toFixed(0) : 0}
              </div>
            </div>
          </div>
        </div>

        {/* البحث والفلاتر */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث باسم الموظف أو البريد..."
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
            <option value="الإدارة العامة">الإدارة العامة</option>
            <option value="الخدمات العامة">الخدمات العامة</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">كل الحالات</option>
            <option value="ACTIVE">نشط</option>
            <option value="ON_LEAVE">في إجازة</option>
            <option value="RETIRED">متقاعد</option>
          </select>
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>رقم الموظف</th>
                <th>الوظيفة</th>
                <th>القسم</th>
                <th>البريد الإلكتروني</th>
                <th>الراتب</th>
                <th>تاريخ الالتحاق</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{employee.avatar}</span>
                      <strong>{employee.name}</strong>
                    </div>
                  </td>
                  <td>{employee.employeeId}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.email}</td>
                  <td style={{ fontWeight: '600' }}>{employee.salary.toLocaleString()}</td>
                  <td>{employee.joinDate}</td>
                  <td>{getStatusBadge(employee.status)}</td>
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
            المعروض: {paginatedEmployees.length} من {filteredEmployees.length}
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

      {/* Modal إضافة موظف */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة موظف جديد</h2>
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
                  <label>رقم الموظف</label>
                  <input type="text" placeholder="أدخل رقم الموظف" />
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
                  <label>الوظيفة</label>
                  <select>
                    <option>-- اختر وظيفة --</option>
                    <option>أستاذ جامعي</option>
                    <option>أستاذة مساعدة</option>
                    <option>محاضر</option>
                    <option>موظف إداري</option>
                    <option>فني صيانة</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>القسم</label>
                  <select>
                    <option>-- اختر قسم --</option>
                    <option>قسم الهندسة المدنية</option>
                    <option>قسم الهندسة الكهربائية</option>
                    <option>قسم الرياضيات</option>
                    <option>الإدارة العامة</option>
                    <option>الخدمات العامة</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>الراتب الشهري</label>
                  <input type="number" placeholder="أدخل الراتب" />
                </div>
                <div className="form-group">
                  <label>تاريخ الالتحاق</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>الحالة</label>
                  <select>
                    <option>نشط</option>
                    <option>في إجازة</option>
                    <option>متقاعد</option>
                  </select>
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
