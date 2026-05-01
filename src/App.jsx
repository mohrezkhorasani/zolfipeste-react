import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lobby from './Pages/Lobby';
import Friends from './Pages/FriendList';
import DashboardPage from './Pages/Dashboard';
import BaseLayout from "./Layout/BaseLayout"
import AccountLayout from './Layout/AccountLayout';
import ProfileOrders from './Pages/Profile/ProfileOrders';
import JoinForm from './Pages/FriendList';
import History from './Pages/History';
import LoginForm from './Pages/Profile/login';
import SignUpForm from './Pages/Profile/Signup';
import ProtectedRoute from './Tools/AuthWrapper';
import { AuthProvider } from './Tools/AuthProvider';
import ContactPage from './Pages/Contactus';
import NotFoundPage from './Pages/Error/404';
import PlayerProfile from './Pages/ProfilePlayer';
import GamePage from './Pages/Game/GamePage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* صفحات عمومی */}
          <Route element={<BaseLayout />}>

            <Route element={<LoginForm />} path='/login' />
            <Route element={<SignUpForm />} path='/signup' />
            <Route path="/rooms/:Mid/join" element={<JoinForm />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<Lobby />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/history" element={<History />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/contact-form" element={<ContactPage />} />
            <Route path="/player-profile" element={<PlayerProfile />} />
          </Route>

          {/* صفحات نیازمند احراز هویت */}
          <Route element={<ProtectedRoute />}>
            <Route path="/me" element={<AccountLayout />}>
              <Route path="my-account" element={<DashboardPage />} />
              <Route path="orders" element={<ProfileOrders />} />
            </Route>
          </Route>
          {/* Protected routes with AccountLayout and specific permissions */}
          <Route element={<ProtectedRoute requiredPermissions={['create_meeting', 'edit_meeting', 'delete_meeting']} />}>
            <Route element={<BaseLayout />}>
            </Route>
          </Route>
          {/* Protected routes with AccountLayout and specific permissions */}
          <Route element={<ProtectedRoute requiredPermissions={['manage_admins']} />}>
            {/* <Route path="/me" element={<AccountLayout />}>
                <Route path="my-account" element={<DashboardPage />} />
                <Route path="orders" element={<ProfileOrders />} />
              </Route> */}
          </Route>
          {/* صفحه لاگین (مثال) */}
          {/* <Route path="/login" element={<LoginPage />} /> */}



          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>

  )
}

export default App
