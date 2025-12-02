import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './InventoryPages.css';

interface Receipt {
  id: string;
  receiptNumber: string;
  itemName: string;
  itemCode: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receiptDate: string;
  receivedBy: string;
  location: string;
  condition: 'GOOD' | 'DAMAGED' | 'PARTIAL';
  notes?: string;
  supplyId?: string;
  createdAt: string;
}

export default function Receipts() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [filteredReceipts, setFilteredReceipts] = useState<Receipt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية
  useEffect(() => {
    const mockReceipts: Receipt[] = [
      {
        id: '1',
        receiptNumber: 'REC-2025-001',
        itemName: 'أجهزة حاسوب',
        itemCode: 'COMP-001',
        quantity: 20,
        unitPrice: 2500,
        totalPrice: 50000,
        receiptDate: '2025-11-22',
        receivedBy: 'محمد علي',
        location: 'المخزن الرئيسي',
        condition: 'GOOD',
        notes: 'تم الاستقبال بحالة ممتازة',
        supplyId: '1',
        createdAt: '2025-11-22',
      },
      {
        id: '2',
        receiptNumber: 'REC-2025-002',
        itemName: 'أوراق طباعة A4',
        itemCode: 'PAPER-001',
        quantity: 80,
        unitPrice: 50,
        totalPrice: 4000,
        receiptDate: '2025-11-21',
        receivedBy: 'فاطمة محمد',
        location: 'المخزن الثانوي',
        condition: 'PARTIAL',
        notes: 'تم استقبال 80 من 100',
        supplyId: '3',
        createdAt: '2025-11-21',
      },
      {
        id: '3',
        receiptNumber: 'REC-2025-003',
        itemName: 'أقلام جاف',
        itemCode: 'PEN-001',
        quantity: 400,
        unitPrice: 5,
        totalPrice: 2000,
        receiptDate: '2025-11-20',
        receivedBy: 'علي حسن',
        location: 'المخزن الرئيسي',
        condition: 'DAMAGED',
        notes: 'تم استقبال 400 لكن 50 منها تالفة',
        supplyId: '2',
        createdAt: '2025-11-20',
      },
    ];
    setReceipts(mockReceipts);
    setFilteredReceipts(mockReceipts);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = receipts;

    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.itemName.includes(searchTerm) ||
          r.receiptNumber.includes(searchTerm) ||
          r.receivedBy.includes(searchTerm)
      );
    }

    if (conditionFilter) {
      filtered = filtered.filter((r) => r.condition === conditionFilter);
    }

    setFilteredReceipts(filtered);
    setCurrentPage(1);
  }, [searchTerm, conditionFilter, receipts]);

  const paginatedReceipts = filteredReceipts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);

  const getConditionBadge = (condition: string) => {
    const conditionMap: { [key: string]: { bg: string; text: string; label: string } } = {
      GOOD: { bg: '#d1fae5', text: '#065f46', label: '✅ جيدة' },
      DAMAGED: { bg: '#fee2e2', text: '#991b1b', label: '⚠️ تالفة' },
      PARTIAL: { bg: '#fef3c7', text: '#92400e', label: '⚠️ جزئية' },
    };
    const style = conditionMap[condition];
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

  const totalReceiptValue = receipts.reduce((sum, r) => sum + r.totalPrice, 0);
  const goodCondition = receipts.filter((r) => r.condition === 'GOOD').length;
  const damagedItems = receipts.filter((r) => r.condition === 'DAMAGED').length;

  return (
    <MainLayout>
      <div className="inventory-page">
        <div className="page-header">
          <div>
            <h1>📨 إدارة الاستلامات</h1>
            <p>تسجيل واستقبال البضائع والمستلزمات</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة استلام جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📨</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الاستلامات</div>
              <div className="stat-value">{receipts.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-label">قيمة الاستلامات</div>
              <div className="stat-value">{totalReceiptValue.toLocaleString()}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">حالة جيدة</div>
              <div className="stat-value" style={{ color: '#10b981' }}>
                {goodCondition}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <div className="stat-label">تالفة أو جزئية</div>
              <div className="stat-value" style={{ color: '#ef4444' }}>
                {damagedItems}
              </div>
            </div>
          </div>
        </div>

        {/* البحث والفلاتر */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث باسم الصنف أو رقم الاستلام..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">كل الحالات</option>
            <option value="GOOD">جيدة</option>
            <option value="DAMAGED">تالفة</option>
            <option value="PARTIAL">جزئية</option>
          </select>
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>رقم الاستلام</th>
                <th>الصنف</th>
                <th>الكمية</th>
                <th>سعر الوحدة</th>
                <th>الإجمالي</th>
                <th>تاريخ الاستقبال</th>
                <th>استقبل بواسطة</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReceipts.map((receipt) => (
                <tr key={receipt.id}>
                  <td>
                    <strong>{receipt.receiptNumber}</strong>
                  </td>
                  <td>{receipt.itemName}</td>
                  <td style={{ fontWeight: '600' }}>{receipt.quantity}</td>
                  <td>{receipt.unitPrice}</td>
                  <td style={{ fontWeight: '600', color: '#667eea' }}>
                    {receipt.totalPrice.toLocaleString()}
                  </td>
                  <td>{receipt.receiptDate}</td>
                  <td>{receipt.receivedBy}</td>
                  <td>{getConditionBadge(receipt.condition)}</td>
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
            المعروض: {paginatedReceipts.length} من {filteredReceipts.length}
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

      {/* Modal إضافة استلام */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة استلام جديد</h2>
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
                  <label>الصنف</label>
                  <select>
                    <option>-- اختر صنف --</option>
                    <option>أجهزة حاسوب</option>
                    <option>أوراق طباعة</option>
                    <option>أقلام جاف</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>الكمية</label>
                  <input type="number" placeholder="أدخل الكمية" />
                </div>
                <div className="form-group">
                  <label>سعر الوحدة</label>
                  <input type="number" placeholder="أدخل سعر الوحدة" />
                </div>
                <div className="form-group">
                  <label>الموقع</label>
                  <select>
                    <option>المخزن الرئيسي</option>
                    <option>المخزن الثانوي</option>
                    <option>المخزن الثالث</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>استقبل بواسطة</label>
                  <input type="text" placeholder="أدخل اسم المستقبل" />
                </div>
                <div className="form-group">
                  <label>الحالة</label>
                  <select>
                    <option>جيدة</option>
                    <option>تالفة</option>
                    <option>جزئية</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>ملاحظات</label>
                  <textarea placeholder="أدخل ملاحظات إضافية"></textarea>
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
