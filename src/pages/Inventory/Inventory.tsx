import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './InventoryPages.css';

interface InventoryItem {
  id: string;
  name: string;
  code: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  lastUpdated: string;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  createdAt: string;
}

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية
  useEffect(() => {
    const mockItems: InventoryItem[] = [
      {
        id: '1',
        name: 'أجهزة حاسوب محمولة',
        code: 'LAPTOP-001',
        category: 'أجهزة كهربائية',
        quantity: 45,
        unit: 'جهاز',
        location: 'المخزن الرئيسي',
        lastUpdated: '2025-11-20',
        status: 'IN_STOCK',
        createdAt: '2025-01-15',
      },
      {
        id: '2',
        name: 'طابعات ليزر',
        code: 'PRINTER-001',
        category: 'أجهزة كهربائية',
        quantity: 8,
        unit: 'جهاز',
        location: 'المخزن الثاني',
        lastUpdated: '2025-11-19',
        status: 'LOW_STOCK',
        createdAt: '2025-02-10',
      },
      {
        id: '3',
        name: 'أوراق A4',
        code: 'PAPER-001',
        category: 'مستلزمات مكتبية',
        quantity: 500,
        unit: 'ريزمة',
        location: 'المخزن الرئيسي',
        lastUpdated: '2025-11-18',
        status: 'IN_STOCK',
        createdAt: '2025-01-20',
      },
      {
        id: '4',
        name: 'أقلام حبر',
        code: 'PEN-001',
        category: 'مستلزمات مكتبية',
        quantity: 0,
        unit: 'صندوق',
        location: 'المخزن الثاني',
        lastUpdated: '2025-11-17',
        status: 'OUT_OF_STOCK',
        createdAt: '2025-03-05',
      },
      {
        id: '5',
        name: 'كراسي مكتبية',
        code: 'CHAIR-001',
        category: 'أثاث',
        quantity: 120,
        unit: 'كرسي',
        location: 'المخزن الرئيسي',
        lastUpdated: '2025-11-16',
        status: 'IN_STOCK',
        createdAt: '2025-01-25',
      },
    ];
    setItems(mockItems);
    setFilteredItems(mockItems);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(
        (i) =>
          i.name.includes(searchTerm) ||
          i.code.includes(searchTerm)
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((i) => i.category === categoryFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((i) => i.status === statusFilter);
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, statusFilter, items]);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const inStockCount = items.filter((i) => i.status === 'IN_STOCK').length;
  const lowStockCount = items.filter((i) => i.status === 'LOW_STOCK').length;
  const outOfStockCount = items.filter((i) => i.status === 'OUT_OF_STOCK').length;

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string } } = {
      IN_STOCK: { bg: '#d1fae5', text: '#065f46', label: '✅ متوفر' },
      LOW_STOCK: { bg: '#fef3c7', text: '#92400e', label: '⚠️ كمية قليلة' },
      OUT_OF_STOCK: { bg: '#fee2e2', text: '#991b1b', label: '❌ غير متوفر' },
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
            <h1>📦 إدارة المخزون</h1>
            <p>إدارة المخزون والمستودعات</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة صنف جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الأصناف</div>
              <div className="stat-value">{items.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">متوفر</div>
              <div className="stat-value" style={{ color: '#10b981' }}>
                {inStockCount}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <div className="stat-label">كمية قليلة</div>
              <div className="stat-value" style={{ color: '#f59e0b' }}>
                {lowStockCount}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <div className="stat-label">غير متوفر</div>
              <div className="stat-value" style={{ color: '#ef4444' }}>
                {outOfStockCount}
              </div>
            </div>
          </div>
        </div>

        {/* البحث والفلاتر */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث باسم الصنف أو الكود..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">كل الفئات</option>
            <option value="أجهزة كهربائية">أجهزة كهربائية</option>
            <option value="مستلزمات مكتبية">مستلزمات مكتبية</option>
            <option value="أثاث">أثاث</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">كل الحالات</option>
            <option value="IN_STOCK">متوفر</option>
            <option value="LOW_STOCK">كمية قليلة</option>
            <option value="OUT_OF_STOCK">غير متوفر</option>
          </select>
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم الصنف</th>
                <th>الكود</th>
                <th>الفئة</th>
                <th>الكمية</th>
                <th>الوحدة</th>
                <th>الموقع</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>{item.code}</td>
                  <td>{item.category}</td>
                  <td style={{ fontWeight: '600' }}>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.location}</td>
                  <td>{getStatusBadge(item.status)}</td>
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
            المعروض: {paginatedItems.length} من {filteredItems.length}
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

      {/* Modal إضافة صنف */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة صنف جديد</h2>
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
                  <input type="text" placeholder="أدخل اسم الصنف" />
                </div>
                <div className="form-group">
                  <label>الكود</label>
                  <input type="text" placeholder="أدخل كود الصنف" />
                </div>
                <div className="form-group">
                  <label>الفئة</label>
                  <select>
                    <option>-- اختر فئة --</option>
                    <option>أجهزة كهربائية</option>
                    <option>مستلزمات مكتبية</option>
                    <option>أثاث</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>الكمية</label>
                  <input type="number" placeholder="أدخل الكمية" />
                </div>
                <div className="form-group">
                  <label>الوحدة</label>
                  <input type="text" placeholder="مثال: جهاز، ريزمة" />
                </div>
                <div className="form-group">
                  <label>الموقع</label>
                  <input type="text" placeholder="أدخل موقع التخزين" />
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
