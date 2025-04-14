import React, { useState, useCallback } from 'react';
import './Registr.css';
import tivimivi from '../../assets/tivi.png';
import hide from '../../assets/hide.png';
import view from '../../assets/view.png';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Registr() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleSignState = useCallback((e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setShowVerification(false);
    setError('');
  }, [isLogin]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleRegisterClick = useCallback((e) => {
    e.preventDefault();
    setIsLogin(false);
    setError('');
  }, []);

  const handleEmailSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin && email) {
      try {
        setIsLoading(true);
        const code = Math.floor(10000 + Math.random() * 90000).toString();
        setGeneratedCode(code);
        
        await emailjs.send(
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
        );
        
        setShowVerification(true);
        toast.success('Verification code sent to your email!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error('Failed to send email:', error);
         toast.error('Failed to send verification code. Please try again.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [isLogin, email]);
  
  const handleVerificationSubmit = useCallback((e) => {
    e.preventDefault();
    if (verificationCode === generatedCode) {
      toast.success('Registration successful! You can now sign in.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLogin(true);
      setShowVerification(false);
      setError('');
    } else {
      toast.error('Invalid verification code. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [verificationCode, generatedCode]);

  const handleVerificationInputChange = useCallback((index, value) => {

    if (value.length > 1) {
      const pastedCode = value.replace(/\D/g, '').substring(0, 5);
      const newCode = pastedCode.split('');
      setVerificationCode(pastedCode);
      if (pastedCode.length === 5) {
        const lastInput = document.querySelectorAll('.verification-input')[4];
        if (lastInput) lastInput.focus();
      }
      return;
    }


    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 1) {
      const newCode = verificationCode.split('');
      newCode[index] = numericValue;
      setVerificationCode(newCode.join(''));
      
      if (numericValue && index < 4) {
        const nextInput = document.querySelectorAll('.verification-input')[index + 1];
        if (nextInput) nextInput.focus();
      }
    }
  }, [verificationCode]);

  const handleVerificationKeyDown = useCallback((index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.querySelectorAll('.verification-input')[index - 1];
      if (prevInput) prevInput.focus();
    }
  }, [verificationCode]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').replace(/\D/g, '').substring(0, 5);
    if (pasteData.length > 0) {
      setVerificationCode(pasteData);
      // Focus on the last input
      setTimeout(() => {
        const inputs = document.querySelectorAll('.verification-input');
        const lastFilledIndex = Math.min(pasteData.length - 1, 4);
        if (inputs[lastFilledIndex]) {
          inputs[lastFilledIndex].focus();
        }
      }, 0);
    }
  }, []);

  return (
    <div className="Registr">
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!showVerification ? (
        <>
          <h1>{isLogin ? 'Login' : 'Are you ready to watch?'}</h1>
          <p>
            {isLogin ? '' : <p> All you have to do is tell us your email <br /> to get started </p>}
          </p>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

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
                disabled={isLoading}
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
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={isLoading}
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

            <button type="submit" className='btn' disabled={isLoading}>
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Get Started')}
            </button>

            <a href="#" className='sign' onClick={toggleSignState} style={isLoading ? { pointerEvents: 'none' } : {}}>
              {isLogin ? 'Forgot Password' : 'Sign In'}
            </a>

            {isLogin && (
              <div className="help">
                <p>Wanna join us,</p>
                <a href="#" onClick={handleRegisterClick} style={isLoading ? { pointerEvents: 'none' } : {}}>
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

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

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
                    onChange={(e) => handleVerificationInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                    onPaste={handlePaste}
                    maxLength="1"
                    pattern="\d"
                    required
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            <button type="submit" className='btn' disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify & Register'}
            </button>

            <div className="help">
              <p>Didn't receive code?</p>
              <a href="#" onClick={() => {
                toast.info(`Your code is: ${generatedCode}`, {
                  position: "top-center",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }} style={isLoading ? { pointerEvents: 'none' } : {}}>
                Resend Code
              </a>
            </div>
          </form>
        </div>
      )}

      <div className="tivi">
        <img src={tivimivi} alt="tivimivi" loading="lazy" />
      </div>
    </div>
  );
}