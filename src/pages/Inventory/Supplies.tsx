import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './InventoryPages.css';

interface Supply {
  id: string;
  name: string;
  code: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  supplier: string;
  lastOrderDate: string;
  status: 'ACTIVE' | 'DISCONTINUED';
  createdAt: string;
}

export default function Supplies() {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [filteredSupplies, setFilteredSupplies] = useState<Supply[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية
  useEffect(() => {
    const mockSupplies: Supply[] = [
      {
        id: '1',
        name: 'أوراق A4',
        code: 'SUP-001',
        category: 'مستلزمات مكتبية',
        quantity: 500,
        unit: 'ريزمة',
        unitPrice: 25,
        totalValue: 12500,
        supplier: 'شركة الورق العربية',
        lastOrderDate: '2025-11-10',
        status: 'ACTIVE',
        createdAt: '2025-01-15',
      },
      {
        id: '2',
        name: 'أقلام حبر سائل',
        code: 'SUP-002',
        category: 'مستلزمات مكتبية',
        quantity: 200,
        unit: 'صندوق',
        unitPrice: 50,
        totalValue: 10000,
        supplier: 'شركة الأقلام المتقدمة',
        lastOrderDate: '2025-11-05',
        status: 'ACTIVE',
        createdAt: '2025-02-10',
      },
      {
        id: '3',
        name: 'حبر طابعة ليزر',
        code: 'SUP-003',
        category: 'مستلزمات طباعة',
        quantity: 50,
        unit: 'خرطوشة',
        unitPrice: 150,
        totalValue: 7500,
        supplier: 'شركة الحبر الدولية',
        lastOrderDate: '2025-11-08',
        status: 'ACTIVE',
        createdAt: '2025-03-05',
      },
      {
        id: '4',
        name: 'ممسحات بيضاء',
        code: 'SUP-004',
        category: 'مستلزمات مكتبية',
        quantity: 100,
        unit: 'قطعة',
        unitPrice: 10,
        totalValue: 1000,
        supplier: 'شركة المستلزمات العامة',
        lastOrderDate: '2025-11-01',
        status: 'ACTIVE',
        createdAt: '2025-04-20',
      },
    ];
    setSupplies(mockSupplies);
    setFilteredSupplies(mockSupplies);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = supplies;

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.includes(searchTerm) ||
          s.code.includes(searchTerm) ||
          s.supplier.includes(searchTerm)
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((s) => s.category === categoryFilter);
    }

    setFilteredSupplies(filtered);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, supplies]);

  const paginatedSupplies = filteredSupplies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredSupplies.length / itemsPerPage);

  const totalValue = supplies.reduce((sum, s) => sum + s.totalValue, 0);
  const activeSupplies = supplies.filter((s) => s.status === 'ACTIVE').length;

  return (
    <MainLayout>
      <div className="inventory-page">
        <div className="page-header">
          <div>
            <h1>🛒 إدارة المستلزمات</h1>
            <p>إدارة المستلزمات والموارد</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة مستلزم جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي المستلزمات</div>
              <div className="stat-value">{supplies.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">المستلزمات النشطة</div>
              <div className="stat-value" style={{ color: '#10b981' }}>
                {activeSupplies}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي القيمة</div>
              <div className="stat-value">{(totalValue / 1000).toFixed(1)}ك</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">متوسط القيمة</div>
              <div className="stat-value">
                {supplies.length > 0 ? (totalValue / supplies.length / 1000).toFixed(1) + 'ك' : '0'}
              </div>
            </div>
          </div>
        </div>

        {/* البحث والفلاتر */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث باسم المستلزم أو المورد..."
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
            <option value="مستلزمات مكتبية">مستلزمات مكتبية</option>
            <option value="مستلزمات طباعة">مستلزمات طباعة</option>
          </select>
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم المستلزم</th>
                <th>الكود</th>
                <th>الفئة</th>
                <th>الكمية</th>
                <th>السعر</th>
                <th>القيمة الإجمالية</th>
                <th>المورد</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSupplies.map((supply) => (
                <tr key={supply.id}>
                  <td>
                    <strong>{supply.name}</strong>
                  </td>
                  <td>{supply.code}</td>
                  <td>{supply.category}</td>
                  <td style={{ fontWeight: '600' }}>{supply.quantity}</td>
                  <td style={{ fontWeight: '600' }}>{supply.unitPrice}</td>
                  <td style={{ fontWeight: '600', color: '#667eea' }}>
                    {supply.totalValue.toLocaleString()}
                  </td>
                  <td>{supply.supplier}</td>
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
            المعروض: {paginatedSupplies.length} من {filteredSupplies.length}
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

      {/* Modal إضافة مستلزم */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة مستلزم جديد</h2>
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
                  <label>اسم المستلزم</label>
                  <input type="text" placeholder="أدخل اسم المستلزم" />
                </div>
                <div className="form-group">
                  <label>الكود</label>
                  <input type="text" placeholder="أدخل كود المستلزم" />
                </div>
                <div className="form-group">
                  <label>الفئة</label>
                  <select>
                    <option>-- اختر فئة --</option>
                    <option>مستلزمات مكتبية</option>
                    <option>مستلزمات طباعة</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>الكمية</label>
                  <input type="number" placeholder="أدخل الكمية" />
                </div>
                <div className="form-group">
                  <label>السعر الوحدة</label>
                  <input type="number" placeholder="أدخل سعر الوحدة" />
                </div>
                <div className="form-group">
                  <label>المورد</label>
                  <input type="text" placeholder="أدخل اسم المورد" />
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
