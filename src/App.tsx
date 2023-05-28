import 'sanitize.css';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import NotFoundPage from './pages/NotFoundPage';
import { Footer } from './components/Footer/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import { ProtectedLayout } from './router/ProtectedLayout';
import { NotForLoggedInUser } from './router/NotForLoggedInUser';
import { SlideNotifications } from './components/SlideNotification/SlideNotifications';
import { CheckExpToken } from './router/CheckExpToken';

export const App = () => {
  return (
    <BrowserRouter>
      <SlideNotifications />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route element={<CheckExpToken />}>
          <Route element={<NotForLoggedInUser />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/main" element={<MainPage />} />
          </Route>
        </Route>
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
