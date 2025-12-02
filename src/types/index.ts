// أنواع المستخدم
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  createdAt: string;
}

// أنواع الاستجابة من API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// أنواع الأخطاء
export interface ApiError {
  code: string;
  message: string;
}

// أنواع المسار
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  protected: boolean;
}
