
import './App.css';
import './css/admin.css';
import './css/LandingPage.css';
import './css/Login.css';
import './css/Auth.css';
import './css/Register.css';
import './css/Fees.css';
import './css/AdminDashboard.css'
import './css/studentFees.css'





import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom'


import AdminLayout from './layouts/AdminLayout'
// import StudentLayout from './layouts/StudentLayout'

import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProfile from './pages/Admin/AdminProfile';
import AdminSettings from './pages/Admin/AdminSettings';
import Students from './pages/Students';
import Ad from './components/AdminDasbord/Ad';
import AdminStudents from './pages/Admin/AdminStudents';
import AdminCourses from './pages/Admin/AdminCourses';
import AdminEnrollments from './pages/Admin/AdminEnrollments'
import Notifications from './components/Admin/Notification';
import AddStudent from './pages/Admin/AddStudent';
import AdminInquiries from './pages/Admin/AdminInquiries';
import AdminfeesPage from "./pages/Admin/AdminFeesPage"
import FeeTracking from './pages/Admin/FeeTracking';
import AssignFee from './pages/Admin/AssignFee';

import CourseEnrollment from './pages/Admin/Courses/CourseEnrollment';
import CoursesList from './pages/Admin/Courses/CoursesList';
import EditCourse from './pages/Admin/Courses/EditCourse';
import DeleteCourseModal from './pages/Admin/Courses/DeleteCourseModal';
import Events from './pages/Admin/Events';



// login/regester
import Login from './Auth/Login';
import Register from './Auth/Register'
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import StudentProtectedRoute from './components/StudentProtectedRoute';
import Logout from './Auth/Logout';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


import LandingPage from './pages/LandingPage';









// student

import StudentFees from './pages/Student/StudentFees';
import StudentDashboard from './pages/Student/StudentDashboard';
import Payments from './pages/Student/Payments';
import Timetable from './pages/Student/Timetable';
import MyCourses from './pages/Student/MyCourses';
import CourseDetails from './pages/Student/CourseDetails';
import Profile from './pages/Student/Profile';
import Announcements from './pages/Student/Announcements';
import StudentSupport from './pages/Student/StudentSupport';
import StudentPayments from './pages/Student/StudentPayments';
import StudentTimetable from './pages/Student/StudentTimetable';
// import StudentAnnouncements from './pages/Student/StudentAnnouncements';
import StudentProfile from './pages/Student/Profile';
import StudentGrades from './pages/Student/StudentGrades';
import StudentNotifications from './pages/Student/StudentNotifications';
import StudentAssignments from './pages/Student/StudentAssignments';
import Dashboard from './components/StudentDasboard/Dashboard';
import Studentlogin from './Auth/Studentlogin';
import PaymentCallback from './pages/Student/PaymentCallback';
import PaymentSuccess from './pages/Student/PaymentSuccess';
import PaymentFailed from './pages/Student/PaymentFailed';
import Results from './pages/Student/Results';
import StudentResetPass from './pages/StudentRestpass';
import StudentPassword from './pages/Studentpassword';





function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Pages */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/Add-student" element={<StudentRegistration />} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />















        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute role="admin"><AdminProfile /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute role="admin"><AdminSettings /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute role="admin"><Students /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/enrollment" element={<ProtectedRoute role="admin"><AdminEnrollments /></ProtectedRoute>} />
        <Route path="/admin/fees" element={<ProtectedRoute role="admin"><AdminfeesPage /></ProtectedRoute>} />
        <Route path="/admin/feetracking" element={<ProtectedRoute role="admin"><FeeTracking /></ProtectedRoute>} />
        <Route path="/admin/assignfee" element={<ProtectedRoute role="admin"><AssignFee /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute role="admin"><Events /></ProtectedRoute>} />












        <Route path="/students" element={<ProtectedRoute role="admin"><AdminStudents /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute role="admin"><AdminCourses /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute role="admin"><Notifications /></ProtectedRoute>} />
        <Route path="/add-student" element={<ProtectedRoute role="admin"><AddStudent /></ProtectedRoute>} />
        <Route path="/inquiries" element={<ProtectedRoute role="admin"><AdminInquiries /></ProtectedRoute>} />
        <Route path="/course-enrollment" element={<ProtectedRoute role="admin"><CourseEnrollment /></ProtectedRoute>} />
        <Route path="/courses-list" element={<ProtectedRoute role="admin"><CoursesList /></ProtectedRoute>} />
        <Route path="/edit-course" element={<ProtectedRoute role="admin"><EditCourse /></ProtectedRoute>} />
        <Route path="/delete-course" element={<ProtectedRoute role="admin"><DeleteCourseModal /></ProtectedRoute>} />

        <Route path="/admin/dasbord" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />




        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />




        {/* StudentRout */}


        <Route path="/student/fees" element={<StudentFees />} />
        <Route path="/student/dashboard" element={<StudentProtectedRoute><StudentDashboard /></StudentProtectedRoute>} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/student/payments" element={<Payments />} />
        <Route path="/student/timetable" element={<Timetable />} />
        <Route path="/student/my-courses" element={<MyCourses />} />
        <Route path="/student/course-details" element={<CourseDetails />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/announcements" element={<Announcements />} />
        <Route path="/student/support" element={<StudentSupport />} />
        <Route path="/student/payments" element={<StudentPayments />} />
        <Route path="/student/timetable" element={<StudentTimetable />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/grades" element={<StudentGrades />} />
        <Route path="/student/notifications" element={<StudentNotifications />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/student/login" element={<Studentlogin />} />
        <Route path="/student/results" element={<Results />} />

        <Route path="/payment-callback" element={<PaymentCallback />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/student/reset-password/:token" element={<StudentResetPass />} />
        <Route path="/student/forgot-password" element={<StudentPassword />} />








      </Routes>
    </BrowserRouter>
  );
}

export default App;
