import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Index from './pages/Login'
import Person from './pages/Person'
import Certificate from './pages/Certificate'
import Reports from './pages/Reports'
import Point from './pages/Point'
import Settings from "./pages/Settings";
import UserHistory from "./pages/User/UserHistory";
import SettingsUser from "./pages/User/SettingsUser"
import UserCertificate from "./pages/User/UserCertificate";
import UserCertificateSend from "./pages/User/UserCertificateSend";

export default function PagesRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Index />} />
            <Route path="/home/person" element={<Person />} />
            <Route path="/home/certificate" element={<Certificate />} />
            <Route path="/home/reports" element={<Reports />} />
            <Route path="/home/point" element={<Point />} />
            <Route path="/home/settings" element={<Settings />} />
            
            <Route path="/home/settings/user" element={<SettingsUser />} />
            <Route path="/home/user/history" element={<UserHistory />} />
            <Route path="/home/user/certificate" element={<UserCertificate />} />
            <Route path="/home/user/certificate/send" element={<UserCertificateSend />} />
        </Routes>
    )

}