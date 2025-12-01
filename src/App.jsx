
import './App.css';
import './css/admin.css';
import './css/LandingPage.css';
import './css/Login.css';
import './css/Auth.css';
import './css/Register.css';
import './css/Fees.css';
import './css/AdminDashboard.css'
import './css/StudentDashboard.css'
import './css/AddStudent.css'





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




// login/regester
import Login from './Auth/Login';
import Register from './Auth/Register'
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from "./context/AuthContext";
import Logout from './Auth/Logout';


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
import StudentRegistration from './Auth/StudentRegistration'






function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Pages */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Add-student" element={<StudentRegistration />} />
        <Route path="/logout" element={<Logout />} />













        {/* Protected Routes */}

        {/* <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/admin/add-course"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AddCourse />
            
          }
        /> */}


        {/* <Route
          path="/student/dashboard"
          element={
            <PrivateRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </PrivateRoute>
          }
        /> */}




        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/enrollment" element={<AdminEnrollments />} />
        <Route path="/admin/fees" element={<AdminfeesPage />} />
        <Route path="/admin/feetracking" element={<FeeTracking />} />
        <Route path="/admin/assignfee" element={<AssignFee />} />











        <Route path="/students" element={<AdminStudents />} />
        <Route path="/courses" element={<AdminCourses />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/inquiries" element={<AdminInquiries />} />
        <Route path="/course-enrollment" element={<CourseEnrollment />} />
        <Route path="/courses-list" element={<CoursesList />} />
        <Route path="/edit-course" element={<EditCourse />} />
        <Route path="/delete-course" element={<DeleteCourseModal />} />

        <Route path="/admin/dasbord" element={<Ad />} />




        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />




        {/* StudentRout */}
        <Route path="/student/fees" element={<StudentFees />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
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






      </Routes>
    </BrowserRouter>
  );
}

export default App;
