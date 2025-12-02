import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './InventoryPages.css';

interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  approvedBy: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية
  useEffect(() => {
    const mockExpenses: Expense[] = [
      {
        id: '1',
        description: 'شراء أجهزة حاسوب',
        category: 'معدات',
        amount: 50000,
        date: '2025-11-15',
        paymentMethod: 'تحويل بنكي',
        approvedBy: 'د. محمد علي',
        status: 'APPROVED',
        createdAt: '2025-11-15',
      },
      {
        id: '2',
        description: 'صيانة الطابعات',
        category: 'صيانة',
        amount: 5000,
        date: '2025-11-10',
        paymentMethod: 'شيك',
        approvedBy: 'أ. فاطمة أحمد',
        status: 'APPROVED',
        createdAt: '2025-11-10',
      },
      {
        id: '3',
        description: 'شراء مستلزمات مكتبية',
        category: 'مستلزمات',
        amount: 3000,
        date: '2025-11-12',
        paymentMethod: 'نقداً',
        approvedBy: 'قيد الانتظار',
        status: 'PENDING',
        createdAt: '2025-11-12',
      },
      {
        id: '4',
        description: 'استئجار قاعة للمؤتمر',
        category: 'إيجارات',
        amount: 15000,
        date: '2025-11-08',
        paymentMethod: 'تحويل بنكي',
        approvedBy: 'د. خالد حسن',
        status: 'APPROVED',
        createdAt: '2025-11-08',
      },
      {
        id: '5',
        description: 'شراء أثاث مكتبي',
        category: 'أثاث',
        amount: 20000,
        date: '2025-11-05',
        paymentMethod: 'شيك',
        approvedBy: 'المدير',
        status: 'REJECTED',
        createdAt: '2025-11-05',
      },
    ];
    setExpenses(mockExpenses);
    setFilteredExpenses(mockExpenses);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = expenses;

    if (searchTerm) {
      filtered = filtered.filter(
        (e) =>
          e.description.includes(searchTerm) ||
          e.category.includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((e) => e.status === statusFilter);
    }

    setFilteredExpenses(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, expenses]);

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const approvedAmount = expenses
    .filter((e) => e.status === 'APPROVED')
    .reduce((sum, e) => sum + e.amount, 0);
  const pendingCount = expenses.filter((e) => e.status === 'PENDING').length;

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string } } = {
      PENDING: { bg: '#fef3c7', text: '#92400e', label: '⏳ قيد الانتظار' },
      APPROVED: { bg: '#d1fae5', text: '#065f46', label: '✅ موافق عليه' },
      REJECTED: { bg: '#fee2e2', text: '#991b1b', label: '❌ مرفوض' },
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
      <div className="inventory-page">
        <div className="page-header">
          <div>
            <h1>💰 إدارة المصروفات</h1>
            <p>إدارة المصروفات والنفقات</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة مصروف جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي المصروفات</div>
              <div className="stat-value">{(totalAmount / 1000).toFixed(1)}ك</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">المصروفات الموافق عليها</div>
              <div className="stat-value" style={{ color: '#10b981' }}>
                {(approvedAmount / 1000).toFixed(1)}ك
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-label">قيد الانتظار</div>
              <div className="stat-value" style={{ color: '#f59e0b' }}>
                {pendingCount}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">متوسط المصروف</div>
              <div className="stat-value">
                {expenses.length > 0 ? (totalAmount / expenses.length / 1000).toFixed(1) + 'ك' : '0'}
              </div>
            </div>
          </div>
        </div>

        {/* البحث والفلاتر */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث عن مصروف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">كل الحالات</option>
            <option value="PENDING">قيد الانتظار</option>
            <option value="APPROVED">موافق عليه</option>
            <option value="REJECTED">مرفوض</option>
          </select>
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>الوصف</th>
                <th>الفئة</th>
                <th>المبلغ</th>
                <th>التاريخ</th>
                <th>طريقة الدفع</th>
                <th>الموافق عليه من</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>
                    <strong>{expense.description}</strong>
                  </td>
                  <td>{expense.category}</td>
                  <td style={{ fontWeight: '600', color: '#667eea' }}>
                    {expense.amount.toLocaleString()}
                  </td>
                  <td>{expense.date}</td>
                  <td>{expense.paymentMethod}</td>
                  <td>{expense.approvedBy}</td>
                  <td>{getStatusBadge(expense.status)}</td>
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
            المعروض: {paginatedExpenses.length} من {filteredExpenses.length}
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

      {/* Modal إضافة مصروف */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة مصروف جديد</h2>
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
                  <label>الوصف</label>
                  <input type="text" placeholder="أدخل وصف المصروف" />
                </div>
                <div className="form-group">
                  <label>الفئة</label>
                  <select>
                    <option>-- اختر فئة --</option>
                    <option>معدات</option>
                    <option>صيانة</option>
                    <option>مستلزمات</option>
                    <option>إيجارات</option>
                    <option>أثاث</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>المبلغ</label>
                  <input type="number" placeholder="أدخل المبلغ" />
                </div>
                <div className="form-group">
                  <label>التاريخ</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>طريقة الدفع</label>
                  <select>
                    <option>تحويل بنكي</option>
                    <option>شيك</option>
                    <option>نقداً</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>الملاحظات</label>
                  <input type="text" placeholder="أدخل ملاحظات إضافية" />
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
