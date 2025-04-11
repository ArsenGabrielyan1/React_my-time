import React, { useState } from 'react';
import './Registr.css';
import tivimivi from '../../assets/tivi.png';
import hide from '../../assets/hide.png';
import view from '../../assets/view.png';
import emailjs from '@emailjs/browser';


export default function Registr() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [password, setPassword] = useState('');

  const toggleSignState = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setShowVerification(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setIsLogin(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && email) {
      const code = Math.floor(10000 + Math.random() * 90000).toString();
      setGeneratedCode(code);
      setShowVerification(true);
      emailjs.send(
        'service_zo7fozd',
        'template_pck51jd',
        {
          name: email,
          otp_code: code,
          to_email: email,
        },
        {
          publicKey: 'Aek87A9QDxy7rtKaQ',
        }
      ).then(() => {
        console.log('Email sent successfully');
      }).catch((error) => {
        console.error('Failed to send email:', error);
      });
    }
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    if (verificationCode === generatedCode) {
      alert('Registration successful! You can now sign in.');
      setIsLogin(true);
      setShowVerification(false);
    } else {
      alert('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="Registr">
      {!showVerification ? (
        <>
          <h1>{isLogin ? 'Login' : 'Are you ready to watch?'}</h1>
          <p>
            {isLogin ? '' : 'All you have to do is tell us your email to get started'}
          </p>

          <form className="login-form" onSubmit={isLogin ? null : handleEmailSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="form-input"
                name='email_from'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {isLogin && (
              <div className="form-group password-group">
                <label htmlFor="password">Password:</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <img src={view} alt="view" className='eye' />
                    ) : (
                      <img src={hide} alt="hide" className='eye' />
                    )}
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className='btn'>
              {isLogin ? 'Sign In' : 'Get Started'}
            </button>

            <a href="#" className='sign' onClick={toggleSignState}>
              {isLogin ? 'Forgot Password' : 'Sign In'}
            </a>

            {isLogin && (
              <div className="help">
                <p>Wanna join us,</p>
                <a href="#" onClick={handleRegisterClick}>
                  Register Now
                </a>
              </div>
            )}

            <div className="help">
              <p>Need help?</p>
              <a href="https://help.tivimivi.com/?lang=en" target="_blank" rel="noopener noreferrer">
                Go To Help
              </a>
            </div>
          </form>
        </>
      ) : (
        <div className="verification-view">
          <h1>Verify Your Email</h1>
          <p>We've sent a 5-digit code to {email}</p>

         
          <form className="login-form" onSubmit={handleVerificationSubmit}>
           
<div className="form-group">
  <label className='labell'>Verification Code</label>
  <div className="verification-inputs">
    {[...Array(5)].map((_, index) => (
      <input
        key={index}
        type="text"
        className="form-input verification-input"
        value={verificationCode[index] || ''}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, ''); 
          if (value.length <= 1) {
            const newCode = verificationCode.split('');
            newCode[index] = value;
            setVerificationCode(newCode.join(''));
              if (value && index < 4) {
              document.querySelectorAll('.verification-input')[index + 1].focus();
            }
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            document.querySelectorAll('.verification-input')[index - 1].focus();
          }
        }}
        maxLength="1"
        pattern="\d"
        required
      />
    ))}
  </div>
</div>

            <button type="submit" className='btn'>
              Verify & Register
            </button>

            <div className="help">
              <p>Didn't receive code?</p>
              <a href="#" onClick={() => alert(`Your code is: ${generatedCode}`)}>
                Resend Code
              </a>
            </div>
          </form>
         </div>
         )}

      <div className="tivi">
        <img src={tivimivi} alt="tivimivi" />
      </div>
    </div>
  );
}
