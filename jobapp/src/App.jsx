import "./App.css"
import { Route, Routes, useLocation } from "react-router-dom"
import AdminDashboard from "./components/admin/AdminDashboard.jsx"
import UserDashboard from "./components/user/UserDashboard.jsx"
import Signup from "./components/Signup.jsx"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import Navbar from "./components/Navbar.jsx"
import BrowseJobs from "./components/user/BrowseJobs.jsx"
import AppliedJobs from "./components/user/AppliedJobs.jsx"
import ManageJobs from "./components/admin/ManageJobs.jsx"
import ViewUserApplications from "./components/admin/ViewUserApplications.jsx"
import AddJobs from "./components/admin/AddJobs.jsx"
import ApplyJob from "./components/user/ApplyJob.jsx"
import Jobs from "./components/Jobs.jsx"

const Layout = ({ children }) => {
  const location = useLocation() 
  const hideNavbarRoutes = ["/admin-dashboard", "/manage-jobs", "/view-user-applications","/user-dashboard","/browse-jobs","/applied-jobs","/add-jobs","/apply-job"]
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname)

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/apply-job" element={<ApplyJob/>} />
        <Route path="/add-jobs" element={<AddJobs />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/view-user-applications" element={<ViewUserApplications />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </Layout>
  )
}

export default App
