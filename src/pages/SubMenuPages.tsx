import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Clock from '../components/Clock'
import Person from '../pages/Person'

export default function () {
    return (<>
        <Routes>
            <Route path="/" element={<Clock />} />
            <Route path="/person" element={<Person />} />
        </Routes>
    </>)
}