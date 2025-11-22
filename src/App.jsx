
import './App.css';
import './css/admin.css';
import './css/LandingPage.css';
import './css/Login.css';
import './css/Auth.css';
import './css/Register.css';
// import './css/StudentDashboard.css';



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
import AdminEnrollments from './pages/Admin/AdminEnrollments';
import Fees from './components/Admin/Fees';
import Notifications from './components/Admin/Notification';
import AdminEnrollmentForm from './components/Admin/AdminEnrollmentForm';
import AdminFees from './components/Admin/Fees';
import FeesTracking from './pages/Admin/FeesTracking';
import AdminFeesPage from './pages/Admin/AdminFeesPage';
import AddStudent from './pages/Admin/AddStudent';
import AdminInquiries from './pages/Admin/AdminInquiries';
import AddCourse from './pages/Admin/AddCourse';
import CourseEnrollment from './pages/Admin/Courses/CourseEnrollment';
import CoursesList from './pages/Admin/Courses/CoursesList';
import EditCourse from './pages/Admin/Courses/EditCourse';
import DeleteCourseModal from './pages/Admin/Courses/DeleteCourseModal';
import StudentForm from './components/Admin/StudentForm';
import StudentList from './components/Admin/StudentsList';



// login/regester
import Login from './Auth/Login';
import Register from './Auth/Register'
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from "./context/AuthContext";


import LandingPage from './pages/LandingPage';

import Env from './components/Env';







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






function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Pages */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/En" element={<Env />} />




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
        <Route path="/admin/enrollment/form" element={<AdminEnrollmentForm />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/students" element={<AdminStudents />} />
        <Route path="/courses" element={<AdminCourses />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/fees-tracking" element={<FeesTracking />} />
        <Route path="/fees-page" element={<AdminFeesPage />} />
        <Route path="/fee" element={<AdminFees />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/inquiries" element={<AdminInquiries />} />
        <Route path="/course-enrollment" element={<CourseEnrollment />} />
        <Route path="/courses-list" element={<CoursesList />} />
        <Route path="/edit-course" element={<EditCourse />} />
        <Route path="/delete-course" element={<DeleteCourseModal />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/admin/dasbord" element={<Ad />} />
        <Route path="/student-list" element={<StudentList />} />



        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />




        {/* StudentRout */}
        <Route path="/student/fees" element={<StudentFees />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/student/timetable" element={<Timetable />} />
        <Route path="/student/my-courses" element={<MyCourses />} />
        <Route path="/student/course-details" element={<CourseDetails />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/announcements" element={<Announcements />} />
        <Route path="/student/support" element={<StudentSupport />} />
        <Route path="/student/payments" element={<StudentPayments />} />
        <Route path="/student/timetable" element={<StudentTimetable />} />
        {/* <Route path="/student/announcements" element={<StudentAnnouncements />} /> */}
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/grades" element={<StudentGrades />} />
        <Route path="/student/notifications" element={<StudentNotifications />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
