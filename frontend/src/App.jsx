import { useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login'); 

  const handleLogin = (user) => setCurrentUser(user);
  
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  return (
    <main>
      {!currentUser ? (
        <>
          <section id="title">
            <h1>Ruales App</h1>
          </section>

          <section id="login">
            {currentView === 'login' ? (
              <LoginPage onLogin={handleLogin} onGoToSignup={() => setCurrentView('signup')} />
            ) : (
              <SignupPage onSignupSuccess={() => setCurrentView('login')} onGoToLogin={() => setCurrentView('login')} />
            )}
          </section>
        </>
      ) : (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </main>
  );
}

export default App;
