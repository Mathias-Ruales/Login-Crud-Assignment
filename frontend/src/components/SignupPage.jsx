import { useState } from 'react';
import { signupUser } from '../api';

function SignupPage({ onSignupSuccess, onGoToLogin }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(userName, password);
      onSignupSuccess();
    } catch (err) {
      setErrorMsg('Failed to create account. Username might already exist.');
    }
  };

  return (
    <>
      <section id="loginText">
        <h2>Let's <strong>Sign Up</strong>👇</h2>
        <p>Hey, enter your details to create an</p>
        <p>account</p>
      </section>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Choose Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          placeholder="Enter Username"
        />

        <label htmlFor="password">Choose Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter Password"
        />

        <button type="submit">Register</button>
        
        {errorMsg && <p id="errorMsg">{errorMsg}</p>}
        
        <section id="signUp">
           <p>Already have an account? <button type="button" className="link-btn" onClick={onGoToLogin}>Log in</button></p>
        </section>
      </form>
    </>
  );
}

export default SignupPage;
