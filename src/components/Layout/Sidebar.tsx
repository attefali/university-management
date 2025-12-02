import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const menuItems = [
    { path: '/dashboard', label: '🏠 لوحة التحكم', icon: '📊' },
    {
      label: '🎓 الإدارة الأكاديمية',
      icon: '📚',
      submenu: [
        { path: '/colleges', label: '🏫 الكليات' },
        { path: '/departments', label: '🏢 الأقسام' },
        { path: '/courses', label: '📖 المقررات' },
        { path: '/centers', label: '📍 المراكز' },
      ]
    },
    {
      label: '👥 الموارد البشرية',
      icon: '👨‍💼',
      submenu: [
        { path: '/users', label: '👤 المستخدمون' },
        { path: '/employees', label: '👨‍💼 الموظفون' },
        { path: '/students', label: '🎓 الطلاب' },
        { path: '/student-grades', label: '📊 درجات الطلاب' },
      ]
    },
    {
      label: '📦 إدارة المخزن',
      icon: '🏭',
      submenu: [
        { path: '/inventory', label: '📋 المخزون' },
        { path: '/supplies', label: '📥 التوريدات' },
        { path: '/receipts', label: '📨 الاستلامات' },
        { path: '/transfers', label: '🔄 التحويلات' },
        { path: '/expenses', label: '💸 الصروفات' },
        { path: '/depreciation', label: '📉 الاهلاك' },
        { path: '/maintenance', label: '🔧 الصيانة والتعهيد' },
      ]
    },
    { path: '/reports', label: '📈 التقارير', icon: '📊' },
  ];

  const toggleMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🎓 نظام الجامعة</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.label || item.path}>
            {item.submenu ? (
              <div className="menu-group">
                <button
                  className="menu-toggle"
                  onClick={() => toggleMenu(item.label)}
                >
                  <span>{item.icon} {item.label}</span>
                  <span className={`arrow ${expandedMenu === item.label ? 'open' : ''}`}>▼</span>
                </button>
                {expandedMenu === item.label && (
                  <div className="submenu">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`nav-link submenu-link ${location.pathname === sub.path ? 'active' : ''}`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path!}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.icon} {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
