import { Route, Routes } from "react-router-dom";
import Home from './pages/Admin/Home'
import Index from './pages/Login'
import Register from "./pages/Register";
import Person from './pages/Admin/Person'
import Certificate from './pages/Admin/Certificate'
import Reports from './pages/Admin/Reports'
import Point from './pages/Admin/Schedule'
import UserAdminHistory from "./pages/Admin/UserHistory";
import Settings from "./pages/Admin/Settings";
import Stock from "./pages/Admin/Stock"
import Sale from "./pages/Admin/Sale"
import Receipt from "./pages/Admin/Receipt"

import UserHome from "./pages/User/UserHome";
import UserHistory from "./pages/User/UserHistory";
import UserSettings from "./pages/User/UserSettings"
import UserCertificate from "./pages/User/UserCertificate";
import UserCertificateSend from "./pages/User/UserCertificateSendForm";
import UserSchedules from './pages/User/UserSchedules'

import SelerHome from "./pages/Seler/SelerHome"

export default function PagesRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />

            <Route path="/home" element={<Home />} />
            <Route path="/home/person" element={<Person />} />
            <Route path="/home/receipt" element={<Receipt />} />
            <Route path="/home/stock" element={<Stock />} />
            <Route path="/home/sale" element={<Sale />} />
            <Route path="/home/certificate" element={<Certificate />} />
            <Route path="/home/reports" element={<Reports />} />
            <Route path="/home/point" element={<Point />} />
            <Route path="/home/settings" element={<Settings />} />
            <Route path="/home/user/point/history/:topicId" element={<UserAdminHistory />} />
            
            <Route path="/home/user" element={<UserHome />} />
            <Route path="/home/user/settings" element={<UserSettings />} />
            <Route path="/home/user/history" element={<UserHistory />} />
            <Route path="/home/user/certificate" element={<UserCertificate />} />
            <Route path="/home/user/certificate/send" element={<UserCertificateSend />} />
            <Route path="/home/user/schedules" element={<UserSchedules />} />

            <Route path="/home/seler" element={<SelerHome />} />

            
        </Routes>
    )

}