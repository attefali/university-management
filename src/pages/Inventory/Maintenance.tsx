import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import './InventoryPages.css';

interface Maintenance {
  id: string;
  equipmentName: string;
  equipmentCode: string;
  maintenanceType: string;
  maintenanceDate: string;
  nextMaintenanceDate: string;
  cost: number;
  technician: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  notes?: string;
  createdAt: string;
}

export default function Maintenance() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [filteredMaintenances, setFilteredMaintenances] = useState<Maintenance[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // نموذج الإضافة/التعديل
  const [formData, setFormData] = useState({
    equipmentName: '',
    equipmentCode: '',
    maintenanceType: '',
    maintenanceDate: '',
    nextMaintenanceDate: '',
    cost: '',
    technician: '',
    notes: '',
  });

  // بيانات تجريبية
  useEffect(() => {
    const mockMaintenances: Maintenance[] = [
      {
        id: '1',
        equipmentName: 'أجهزة حاسوب',
        equipmentCode: 'EQUIP-001',
        maintenanceType: 'صيانة دورية',
        maintenanceDate: '2025-11-15',
        nextMaintenanceDate: '2025-12-15',
        cost: 2000,
        technician: 'أ. علي محمد',
        status: 'COMPLETED',
        notes: 'تم تنظيف المراوح وتحديث البرامج',
        createdAt: '2025-11-15',
      },
      {
        id: '2',
        equipmentName: 'طابعات ليزر',
        equipmentCode: 'EQUIP-002',
        maintenanceType: 'استبدال الحبر',
        maintenanceDate: '2025-11-20',
        nextMaintenanceDate: '2025-12-20',
        cost: 1500,
        technician: 'أ. محمود حسن',
        status: 'IN_PROGRESS',
        notes: 'جاري استبدال خرطوشة الحبر',
        createdAt: '2025-11-20',
      },
      {
        id: '3',
        equipmentName: 'أجهزة عرض',
        equipmentCode: 'EQUIP-003',
        maintenanceType: 'صيانة شاملة',
        maintenanceDate: '2025-11-25',
        nextMaintenanceDate: '2026-01-25',
        cost: 3000,
        technician: 'قيد التحديد',
        status: 'SCHEDULED',
        notes: 'صيانة شاملة للجهاز',
        createdAt: '2025-11-25',
      },
      {
        id: '4',
        equipmentName: 'أنظمة التكييف',
        equipmentCode: 'EQUIP-004',
        maintenanceType: 'تنظيف المرشحات',
        maintenanceDate: '2025-11-10',
        nextMaintenanceDate: '2025-12-10',
        cost: 1000,
        technician: 'أ. سارة علي',
        status: 'COMPLETED',
        notes: 'تم تنظيف المرشحات وفحص الضاغط',
        createdAt: '2025-11-10',
      },
    ];
    setMaintenances(mockMaintenances);
    setFilteredMaintenances(mockMaintenances);
  }, []);

  // تطبيق الفلاتر
  useEffect(() => {
    let filtered = maintenances;

    if (searchTerm) {
      filtered = filtered.filter(
        (m) =>
          m.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.equipmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.technician.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((m) => m.status === statusFilter);
    }

    setFilteredMaintenances(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, maintenances]);

  const paginatedMaintenances = filteredMaintenances.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMaintenances.length / itemsPerPage);

  const totalCost = maintenances.reduce((sum, m) => sum + m.cost, 0);
  const completedCount = maintenances.filter((m) => m.status === 'COMPLETED').length;
  const inProgressCount = maintenances.filter((m) => m.status === 'IN_PROGRESS').length;
  const scheduledCount = maintenances.filter((m) => m.status === 'SCHEDULED').length;

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string } } = {
      SCHEDULED: { bg: '#fef3c7', text: '#92400e', label: '📅 مجدول' },
      IN_PROGRESS: { bg: '#dbeafe', text: '#0c2d6b', label: '🔧 قيد الصيانة' },
      COMPLETED: { bg: '#d1fae5', text: '#065f46', label: '✅ مكتمل' },
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

  // معالجات النموذج
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMaintenance = () => {
    if (
      !formData.equipmentName ||
      !formData.maintenanceType ||
      !formData.maintenanceDate ||
      !formData.cost ||
      !formData.technician
    ) {
      alert('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    const newMaintenance: Maintenance = {
      id: Date.now().toString(),
      equipmentName: formData.equipmentName,
      equipmentCode: formData.equipmentCode || `EQUIP-${Date.now()}`,
      maintenanceType: formData.maintenanceType,
      maintenanceDate: formData.maintenanceDate,
      nextMaintenanceDate: formData.nextMaintenanceDate,
      cost: parseFloat(formData.cost),
      technician: formData.technician,
      status: 'SCHEDULED',
      notes: formData.notes,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setMaintenances([...maintenances, newMaintenance]);
    resetForm();
    setShowCreateModal(false);
    alert('✅ تمت إضافة الصيانة بنجاح');
  };

  const handleEditMaintenance = () => {
    if (!selectedMaintenance) return;

    if (
      !formData.equipmentName ||
      !formData.maintenanceType ||
      !formData.maintenanceDate ||
      !formData.cost ||
      !formData.technician
    ) {
      alert('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    const updatedMaintenances = maintenances.map((m) =>
      m.id === selectedMaintenance.id
        ? {
            ...m,
            equipmentName: formData.equipmentName,
            equipmentCode: formData.equipmentCode,
            maintenanceType: formData.maintenanceType,
            maintenanceDate: formData.maintenanceDate,
            nextMaintenanceDate: formData.nextMaintenanceDate,
            cost: parseFloat(formData.cost),
            technician: formData.technician,
            notes: formData.notes,
          }
        : m
    );

    setMaintenances(updatedMaintenances);
    resetForm();
    setShowEditModal(false);
    setSelectedMaintenance(null);
    alert('✅ تم تحديث الصيانة بنجاح');
  };

  const handleDeleteMaintenance = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الصيانة؟')) {
      setMaintenances(maintenances.filter((m) => m.id !== id));
      alert('✅ تم حذف الصيانة بنجاح');
    }
  };

  const handleViewMaintenance = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setShowViewModal(true);
  };

  const handleEditClick = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setFormData({
      equipmentName: maintenance.equipmentName,
      equipmentCode: maintenance.equipmentCode,
      maintenanceType: maintenance.maintenanceType,
      maintenanceDate: maintenance.maintenanceDate,
      nextMaintenanceDate: maintenance.nextMaintenanceDate,
      cost: maintenance.cost.toString(),
      technician: maintenance.technician,
      notes: maintenance.notes || '',
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      equipmentName: '',
      equipmentCode: '',
      maintenanceType: '',
      maintenanceDate: '',
      nextMaintenanceDate: '',
      cost: '',
      technician: '',
      notes: '',
    });
  };

  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  return (
    <MainLayout>
      <div className="inventory-page">
        <div className="page-header">
          <div>
            <h1>🔧 إدارة الصيانة</h1>
            <p>إدارة صيانة المعدات والأجهزة</p>
          </div>
          <button
            className="btn-primary"
            onClick={openCreateModal}
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            ➕ إضافة صيانة جديدة
          </button>
        </div>

        {/* الإحصائيات */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🔧</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الصيانات</div>
              <div className="stat-value">{maintenances.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">الصيانات المكتملة</div>
              <div className="stat-value" style={{ color: '#10b981' }}>
                {completedCount}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-label">قيد الصيانة</div>
              <div className="stat-value" style={{ color: '#3b82f6' }}>
                {inProgressCount}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <div className="stat-label">المجدولة</div>
              <div className="stat-value" style={{ color: '#f59e0b' }}>
                {scheduledCount}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-label">إجمالي التكاليف</div>
              <div className="stat-value">{(totalCost / 1000).toFixed(1)}ك</div>
            </div>
          </div>
        </div>

        {/* البحث والفلاتر */}
        <div className="search-filters">
          <input
            type="text"
            placeholder="ابحث عن معدة أو فني..."
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
            <option value="SCHEDULED">مجدول</option>
            <option value="IN_PROGRESS">قيد الصيانة</option>
            <option value="COMPLETED">مكتمل</option>
          </select>
        </div>

        {/* الجدول */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>اسم المعدة</th>
                <th>الكود</th>
                <th>نوع الصيانة</th>
                <th>تاريخ الصيانة</th>
                <th>الصيانة القادمة</th>
                <th>التكلفة</th>
                <th>الفني</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMaintenances.length > 0 ? (
                paginatedMaintenances.map((maintenance) => (
                  <tr key={maintenance.id}>
                    <td>
                      <strong>{maintenance.equipmentName}</strong>
                    </td>
                    <td>{maintenance.equipmentCode}</td>
                    <td>{maintenance.maintenanceType}</td>
                    <td>{maintenance.maintenanceDate}</td>
                    <td>{maintenance.nextMaintenanceDate}</td>
                    <td style={{ fontWeight: '600', color: '#667eea' }}>
                      {maintenance.cost.toLocaleString()}
                    </td>
                    <td>{maintenance.technician}</td>
                    <td>{getStatusBadge(maintenance.status)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          title="عرض"
                          onClick={() => handleViewMaintenance(maintenance)}
                        >
                          👁️
                        </button>
                        <button
                          className="btn-icon"
                          title="تعديل"
                          onClick={() => handleEditClick(maintenance)}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icon"
                          title="حذف"
                          onClick={() => handleDeleteMaintenance(maintenance.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                    📭 لا توجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* الترقيم */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <div className="pagination-info">
              المعروض: {paginatedMaintenances.length} من {filteredMaintenances.length}
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
        )}
      </div>

      {/* Modal عرض الصيانة */}
      {showViewModal && selectedMaintenance && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>👁️ تفاصيل الصيانة</h2>
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
                  <label>اسم المعدة</label>
                  <div>{selectedMaintenance.equipmentName}</div>
                </div>
                <div className="info-item">
                  <label>الكود</label>
                  <div>{selectedMaintenance.equipmentCode}</div>
                </div>
                <div className="info-item">
                  <label>نوع الصيانة</label>
                  <div>{selectedMaintenance.maintenanceType}</div>
                </div>
                <div className="info-item">
                  <label>تاريخ الصيانة</label>
                  <div>{selectedMaintenance.maintenanceDate}</div>
                </div>
                <div className="info-item">
                  <label>الصيانة القادمة</label>
                  <div>{selectedMaintenance.nextMaintenanceDate}</div>
                </div>
                <div className="info-item">
                  <label>التكلفة</label>
                  <div style={{ color: '#667eea', fontWeight: '600' }}>
                    {selectedMaintenance.cost.toLocaleString()}
                  </div>
                </div>
                <div className="info-item">
                  <label>الفني المسؤول</label>
                  <div>{selectedMaintenance.technician}</div>
                </div>
                <div className="info-item">
                  <label>الحالة</label>
                  <div>{getStatusBadge(selectedMaintenance.status)}</div>
                </div>
                {selectedMaintenance.notes && (
                  <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                    <label>الملاحظات</label>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{selectedMaintenance.notes}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-primary"
                onClick={() => {
                  setShowViewModal(false);
                  handleEditClick(selectedMaintenance);
                }}
                style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
              >
                ✏️ تعديل
              </button>
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

      {/* Modal إضافة صيانة */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ إضافة صيانة جديدة</h2>
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
                  <label>المعدة *</label>
                  <select
                    name="equipmentName"
                    value={formData.equipmentName}
                    onChange={handleFormChange}
                  >
                    <option>-- اختر معدة --</option>
                    <option>أجهزة حاسوب</option>
                    <option>طابعات ليزر</option>
                    <option>أجهزة عرض</option>
                    <option>أنظمة التكييف</option>
                    <option>أجهزة أخرى</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>الكود</label>
                  <input
                    type="text"
                    name="equipmentCode"
                    value={formData.equipmentCode}
                    onChange={handleFormChange}
                    placeholder="مثال: EQUIP-001"
                  />
                </div>
                <div className="form-group">
                  <label>نوع الصيانة *</label>
                  <select
                    name="maintenanceType"
                    value={formData.maintenanceType}
                    onChange={handleFormChange}
                  >
                    <option>-- اختر نوع --</option>
                    <option>صيانة دورية</option>
                    <option>استبدال الأجزاء</option>
                    <option>صيانة شاملة</option>
                    <option>تنظيف</option>
                    <option>إصلاح عطل</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>تاريخ الصيانة *</label>
                  <input
                    type="date"
                    name="maintenanceDate"
                    value={formData.maintenanceDate}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label>الصيانة القادمة</label>
                  <input
                    type="date"
                    name="nextMaintenanceDate"
                    value={formData.nextMaintenanceDate}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label>التكلفة *</label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleFormChange}
                    placeholder="أدخل التكلفة"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>الفني المسؤول *</label>
                  <input
                    type="text"
                    name="technician"
                    value={formData.technician}
                    onChange={handleFormChange}
                    placeholder="أدخل اسم الفني"
                  />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>الملاحظات</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    placeholder="أدخل ملاحظات إضافية"
                    style={{ minHeight: '80px', resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-primary"
                onClick={handleAddMaintenance}
                style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
              >
                ✅ إضافة
              </button>
              <button
                className="btn-secondary"
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal تعديل صيانة */}
      {showEditModal && selectedMaintenance && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ تعديل الصيانة</h2>
              <button
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>المعدة *</label>
                  <select
                    name="equipmentName"
                    value={formData.equipmentName}
                    onChange={handleFormChange}
                  >
                    <option>-- اختر معدة --</option>
                    <option>أجهزة حاسوب</option>
                    <option>طابعات ليزر</option>
                    <option>أجهزة عرض</option>
                    <option>أنظمة التكييف</option>
                    <option>أجهزة أخرى</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>الكود</label>
                  <input
                    type="text"
                    name="equipmentCode"
                    value={formData.equipmentCode}
                    onChange={handleFormChange}
                    placeholder="مثال: EQUIP-001"
                  />
                </div>
                <div className="form-group">
                  <label>نوع الصيانة *</label>
                  <select
                    name="maintenanceType"
                    value={formData.maintenanceType}
                    onChange={handleFormChange}
                  >
                    <option>-- اختر نوع --</option>
                    <option>صيانة دورية</option>
                    <option>استبدال الأجزاء</option>
                    <option>صيانة شاملة</option>
                    <option>تنظيف</option>
                    <option>إصلاح عطل</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>تاريخ الصيانة *</label>
                  <input
                    type="date"
                    name="maintenanceDate"
                    value={formData.maintenanceDate}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label>الصيانة القادمة</label>
                  <input
                    type="date"
                    name="nextMaintenanceDate"
                    value={formData.nextMaintenanceDate}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="form-group">
                  <label>التكلفة *</label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleFormChange}
                    placeholder="أدخل التكلفة"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>الفني المسؤول *</label>
                  <input
                    type="text"
                    name="technician"
                    value={formData.technician}
                    onChange={handleFormChange}
                    placeholder="أدخل اسم الفني"
                  />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>الملاحظات</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    placeholder="أدخل ملاحظات إضافية"
                    style={{ minHeight: '80px', resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-primary"
                onClick={handleEditMaintenance}
                style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
              >
                ✅ حفظ التغييرات
              </button>
              <button
                className="btn-secondary"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedMaintenance(null);
                  resetForm();
                }}
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
