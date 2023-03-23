import { Route, Routes } from "react-router-dom";
import Home from './pages/Admin/Home'
import Index from './pages/Login'
import Person from './pages/Admin/Person'
import Certificate from './pages/Admin/Certificate'
import Reports from './pages/Admin/Reports'
import Point from './pages/Admin/Schedule'
import UserAdminHistory from "./pages/Admin/UserAdminHistory";
import Settings from "./pages/Admin/Settings";

import UserHome from "./pages/User/UserHome";
import UserHistory from "./pages/User/UserHistory";
import UserSettings from "./pages/User/UserSettings"
import UserCertificate from "./pages/User/UserCertificate";
import UserCertificateSend from "./pages/User/UserCertificateSendForm";

export default function PagesRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/person" element={<Person />} />
            <Route path="/home/certificate" element={<Certificate />} />
            <Route path="/home/reports" element={<Reports />} />
            <Route path="/home/point" element={<Point />} />
            <Route path="/home/settings" element={<Settings />} />
            <Route path="/home/user/point/history" element={<UserAdminHistory />} />
            
            <Route path="/home/user" element={<UserHome />} />
            <Route path="/home/user/settings" element={<UserSettings />} />
            <Route path="/home/user/history" element={<UserHistory />} />
            <Route path="/home/user/certificate" element={<UserCertificate />} />
            <Route path="/home/user/certificate/send" element={<UserCertificateSend />} />
        </Routes>
    )

}