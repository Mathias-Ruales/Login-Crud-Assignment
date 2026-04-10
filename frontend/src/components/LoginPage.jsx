import { useState } from 'react';
import { loginUser } from '../api';

function LoginPage({ onLogin, onGoToSignup }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(userName, password);
      onLogin(user);
    } catch (err) {
      setErrorMsg('Invalid username or password');
    }
  };

  return (
    <>
      <section id="loginText">
        <h2>Let's <strong>Sign In</strong>👇</h2>
        <p>Hey, enter your details to sign in</p>
        <p>to your account</p>
      </section>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          placeholder="Enter Username"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter Password"
        />

        <button type="submit">Sign in</button>
        
        {errorMsg && <p id="errorMsg">{errorMsg}</p>}
        
        <section id="signUp">
          <p>Don't have an account? <button type="button" className="link-btn" onClick={onGoToSignup}>Sign up</button></p>
        </section>
      </form>
    </>
  );
}

export default LoginPage;
