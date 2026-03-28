import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Navbar } from './components/Navbar';
import { Homepage } from './components/Homepage';
import { Inquiry } from './components/Inquiry';
import { LoginPage } from './components/login-page';
import {ClientFolder} from './components/client-folder'
import {Dashboard} from './components/dashboard'
import { AddClient } from "./components/add-client";


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<><Navbar /><Homepage /></>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/inquiry" element={<><Navbar /><Inquiry /></>} />
          <Route path="/client/:clientId" element={<ClientFolder/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/add-client" element={<AddClient />} />
          
        </Routes>
      </div>
    </Router>
  );
}
