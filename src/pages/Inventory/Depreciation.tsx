import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './InventoryPages.css';

interface Depreciation {
  id: string;
  assetName: string;
  assetCode: string;
  purchaseDate: string;
  purchasePrice: number;
  depreciationRate: number;
  currentValue: number;
  accumulatedDepreciation: number;
  status: 'ACTIVE' | 'FULLY_DEPRECIATED' | 'DISPOSED';
  createdAt: string;
}

export default function Depreciation() {
  const [depreciations, setDepreciations] = useState<Depreciation[]>([]);
  const [filteredDepreciations, setFilteredDepreciations] = useState<Depreciation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // بيانات تجريبية
  useEffect(() => {
    const mockDepreciations: Depreciation[] = [
      {
        id: '1',
        assetName: 'أجهزة حاسوب',
        assetCode: 'ASSET-001',
        purchaseDate: '2020-01-15',
        purchasePrice: 100000,
        depreciationRate: 20,
        currentValue: 40000,
        accumulatedDepreciation: 60000,
        status: 'ACTIVE',
        createdAt: '2020-01-15',
      },
      {
        id: '2',
        assetName: 'طابعات ليزر',
        assetCode: 'ASSET-002',
        purchaseDate: '2019-06-10',
        purchasePrice: 50000,
        depreciationRate: 15,
        currentValue: 15000,
        accumulatedDepreciation: 35000,
        status: 'ACTIVE',
        createdAt: '2019-06-10',
      },
      {
        id: '3',
        assetName: 'أثاث مكتبي',
        assetCode: 'ASSET-003',
        purchaseDate: '2018-03-20',
        purchasePrice: 80000,
        depreciationRate: 10,
        currentValue: 0,
        accumulatedDepreciation: 80000,
        status: 'FULLY_DEPRECIATED',
        createdAt: '2018-03-20',
      },
      {
        id: '4',
        assetName: 'أجهزة عرض',
        assetCode: 'ASSET-004',
        purchaseDate: '2021-09-05',
        purchasePrice: 30000,
        depreciationRate: 25,
        currentValue: 22500,
        accumulatedDepreciation: 7500,
        status: 'ACTIVE',
        createdAt: '2021-09-05',
      },
    ];
    setDepreciations(mockDepreciations);
    setFilteredDepreciations(mockDepreciations);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = depreciations;

    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          d.assetName.includes(searchTerm) ||
          d.assetCode.includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((d) => d.status === statusFilter);
    }

    setFilteredDepreciations(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, depreciations]);

  const paginatedDepreciations = filteredDepreciations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredDepreciations.length / itemsPerPage);

  const totalPurchasePrice = depreciations.reduce((sum, d) => sum + d.purchasePrice, 0);
  const totalCurrentValue = depreciations.reduce((sum, d) => sum + d.currentValue, 0);
  const totalAccumulatedDepreciation = depreciations.reduce((sum, d) => sum + d.accumulatedDepreciation, 0);

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string } } = {
      ACTIVE: { bg: '#d1fae5', text: '#065f46', label: '✅ نشط' },
      FULLY_DEPRECIATED: { bg: '#dbeafe', text: '#0c2d6b', label: '📉 مستهلك بالكامل' },
      DISPOSED: { bg: '#fee2e2', text: '#991b1b', label: '🗑️ مستبعد' },
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
            <h1>📉 إدارة الاستهلاك</h1>
            <p>إدارة استهلاك الأصول والممتلكات</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة أصل جديد
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💎</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي سعر الشراء</div>
              <div className="stat-value">{(totalPurchasePrice / 1000).toFixed(1)}ك</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-label">القيمة الحالية</div>
              <div className="stat-value" style={{ color: '#10b981' }}>
                {(totalCurrentValue / 1000).toFixed(1)}ك
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📉</div>
            <div className="stat-content">
              <div className="stat-label">الاستهلاك المتراكم</div>
              <div className="stat-value" style={{ color: '#ef4444' }}>
                {(totalAccumulatedDepreciation / 1000).toFixed(1)}ك
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">نسبة الاستهلاك</div>
              <div className="stat-value">
                {totalPurchasePrice > 0
                  ? ((totalAccumulatedDepreciation / totalPurchasePrice) * 100).toFixed(1) + '%'
                  : '0%'}
              </div>
            </div>
          </div>
        </div>

        {/* البحث والفلاتر */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث عن أصل..."
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
            <option value="ACTIVE">نشط</option>
            <option value="FULLY_DEPRECIATED">مستهلك بالكامل</option>
            <option value="DISPOSED">مستبعد</option>
          </select>
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم الأصل</th>
                <th>الكود</th>
                <th>تاريخ الشراء</th>
                <th>سعر الشراء</th>
                <th>نسبة الاستهلاك</th>
                <th>القيمة الحالية</th>
                <th>الاستهلاك المتراكم</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDepreciations.map((depreciation) => (
                <tr key={depreciation.id}>
                  <td>
                    <strong>{depreciation.assetName}</strong>
                  </td>
                  <td>{depreciation.assetCode}</td>
                  <td>{depreciation.purchaseDate}</td>
                  <td style={{ fontWeight: '600' }}>
                    {depreciation.purchasePrice.toLocaleString()}
                  </td>
                  <td style={{ fontWeight: '600' }}>
                    {depreciation.depreciationRate}%
                  </td>
                  <td style={{ fontWeight: '600', color: '#10b981' }}>
                    {depreciation.currentValue.toLocaleString()}
                  </td>
                  <td style={{ fontWeight: '600', color: '#ef4444' }}>
                    {depreciation.accumulatedDepreciation.toLocaleString()}
                  </td>
                  <td>{getStatusBadge(depreciation.status)}</td>
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
            المعروض: {paginatedDepreciations.length} من {filteredDepreciations.length}
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

      {/* Modal إضافة أصل */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة أصل جديد</h2>
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
                  <label>اسم الأصل</label>
                  <input type="text" placeholder="أدخل اسم الأصل" />
                </div>
                <div className="form-group">
                  <label>الكود</label>
                  <input type="text" placeholder="أدخل كود الأصل" />
                </div>
                <div className="form-group">
                  <label>تاريخ الشراء</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>سعر الشراء</label>
                  <input type="number" placeholder="أدخل سعر الشراء" />
                </div>
                <div className="form-group">
                  <label>نسبة الاستهلاك السنوية (%)</label>
                  <input type="number" placeholder="أدخل النسبة" min="0" max="100" />
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
