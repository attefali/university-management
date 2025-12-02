import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './InventoryPages.css';

interface Transfer {
  id: string;
  itemName: string;
  itemCode: string;
  quantity: number;
  fromLocation: string;
  toLocation: string;
  transferDate: string;
  approvedBy: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export default function Transfers() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية
  useEffect(() => {
    const mockTransfers: Transfer[] = [
      {
        id: '1',
        itemName: 'أجهزة حاسوب محمولة',
        itemCode: 'LAPTOP-001',
        quantity: 10,
        fromLocation: 'المخزن الرئيسي',
        toLocation: 'قسم الهندسة المدنية',
        transferDate: '2025-11-15',
        approvedBy: 'د. محمد علي',
        status: 'COMPLETED',
        createdAt: '2025-11-15',
      },
      {
        id: '2',
        itemName: 'طابعات ليزر',
        itemCode: 'PRINTER-001',
        quantity: 3,
        fromLocation: 'المخزن الثاني',
        toLocation: 'قسم الهندسة الكهربائية',
        transferDate: '2025-11-12',
        approvedBy: 'د. فاطمة أحمد',
        status: 'COMPLETED',
        createdAt: '2025-11-12',
      },
      {
        id: '3',
        itemName: 'أوراق A4',
        itemCode: 'PAPER-001',
        quantity: 50,
        fromLocation: 'المخزن الرئيسي',
        toLocation: 'الإدارة العامة',
        transferDate: '2025-11-18',
        approvedBy: 'قيد الانتظار',
        status: 'PENDING',
        createdAt: '2025-11-18',
      },
      {
        id: '4',
        itemName: 'كراسي مكتبية',
        itemCode: 'CHAIR-001',
        quantity: 20,
        fromLocation: 'المخزن الرئيسي',
        toLocation: 'قسم الرياضيات',
        transferDate: '2025-11-10',
        approvedBy: 'د. خالد حسن',
        status: 'COMPLETED',
        createdAt: '2025-11-10',
      },
    ];
    setTransfers(mockTransfers);
    setFilteredTransfers(mockTransfers);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = transfers;

    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.itemName.includes(searchTerm) ||
          t.itemCode.includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    setFilteredTransfers(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, transfers]);

  const paginatedTransfers = filteredTransfers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage);

  const completedTransfers = transfers.filter((t) => t.status === 'COMPLETED').length;
  const pendingTransfers = transfers.filter((t) => t.status === 'PENDING').length;
  const totalQuantity = transfers.reduce((sum, t) => sum + t.quantity, 0);

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string } } = {
      PENDING: { bg: '#fef3c7', text: '#92400e', label: '⏳ قيد الانتظار' },
      COMPLETED: { bg: '#d1fae5', text: '#065f46', label: '✅ مكتمل' },
      CANCELLED: { bg: '#fee2e2', text: '#991b1b', label: '❌ ملغى' },
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
            <h1>🔄 إدارة التحويلات</h1>
            <p>إدارة تحويلات المخزون بين الأقسام</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة تحويل جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي التحويلات</div>
              <div className="stat-value">{transfers.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">التحويلات المكتملة</div>
              <div className="stat-value" style={{ color: '#10b981' }}>
                {completedTransfers}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-label">قيد الانتظار</div>
              <div className="stat-value" style={{ color: '#f59e0b' }}>
                {pendingTransfers}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الكمية</div>
              <div className="stat-value">{totalQuantity}</div>
            </div>
          </div>
        </div>

        {/* البحث والفلاتر */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث عن صنف..."
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
            <option value="COMPLETED">مكتمل</option>
            <option value="CANCELLED">ملغى</option>
          </select>
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم الصنف</th>
                <th>الكود</th>
                <th>الكمية</th>
                <th>من</th>
                <th>إلى</th>
                <th>التاريخ</th>
                <th>الموافق عليه</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransfers.map((transfer) => (
                <tr key={transfer.id}>
                  <td>
                    <strong>{transfer.itemName}</strong>
                  </td>
                  <td>{transfer.itemCode}</td>
                  <td style={{ fontWeight: '600' }}>{transfer.quantity}</td>
                  <td>{transfer.fromLocation}</td>
                  <td>{transfer.toLocation}</td>
                  <td>{transfer.transferDate}</td>
                  <td>{transfer.approvedBy}</td>
                  <td>{getStatusBadge(transfer.status)}</td>
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
            المعروض: {paginatedTransfers.length} من {filteredTransfers.length}
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

      {/* Modal إضافة تحويل */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة تحويل جديد</h2>
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
                  <label>اسم الصنف</label>
                  <select>
                    <option>-- اختر صنف --</option>
                    <option>أجهزة حاسوب محمولة</option>
                    <option>طابعات ليزر</option>
                    <option>أوراق A4</option>
                    <option>كراسي مكتبية</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>الكمية</label>
                  <input type="number" placeholder="أدخل الكمية" />
                </div>
                <div className="form-group">
                  <label>من (الموقع الحالي)</label>
                  <select>
                    <option>-- اختر موقع --</option>
                    <option>المخزن الرئيسي</option>
                    <option>المخزن الثاني</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>إلى (الموقع الجديد)</label>
                  <select>
                    <option>-- اختر موقع --</option>
                    <option>قسم الهندسة المدنية</option>
                    <option>قسم الهندسة الكهربائية</option>
                    <option>قسم الرياضيات</option>
                    <option>الإدارة العامة</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>تاريخ التحويل</label>
                  <input type="date" />
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
