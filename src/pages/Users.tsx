import { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { User } from '@/types';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // محاكاة جلب البيانات
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUsers: User[] = [
      {
        id: '1',
        name: 'مدير النظام',
        email: 'admin@university.com',
        role: 'admin',
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        name: 'أستاذ محمد',
        email: 'teacher@university.com',
        role: 'teacher',
        createdAt: '2024-01-16',
      },
      {
        id: '3',
        name: 'طالب أحمد',
        email: 'student@university.com',
        role: 'student',
        createdAt: '2024-01-17',
      },
      {
        id: '4',
        name: 'أستاذة فاطمة',
        email: 'fatima@university.com',
        role: 'teacher',
        createdAt: '2024-01-18',
      },
      {
        id: '5',
        name: 'طالبة سارة',
        email: 'sarah@university.com',
        role: 'student',
        createdAt: '2024-01-19',
      },
    ];

    setUsers(mockUsers);
    setLoading(false);
  };

  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      admin: '👨‍💼 مدير',
      teacher: '👨‍🏫 أستاذ',
      student: '👨‍🎓 طالب',
    };
    return roles[role] || role;
  };

  return (
    <MainLayout>
      <div className="users-content">
        <h2>👥 المستخدمون</h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#999' }}>⏳ جاري التحميل...</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>الدور</th>
                  <th>تاريخ الإنشاء</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{getRoleLabel(user.role)}</td>
                    <td>{user.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
