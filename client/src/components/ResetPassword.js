import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearMessage } from '../Js/Slice/userSlice';
import './Style/ForgotAndResetPass.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const dispatch = useDispatch();
    const { status, message, error } = useSelector((state) => state.user);
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'succeeded' && message) {
            setTimeout(() => navigate('/login'), 3000); 
        }
        return () => {
            dispatch(clearMessage());
        };
    }, [status, message, navigate, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        dispatch(resetPassword({ token, password }));
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Reset Your Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Resetting...' : 'Reset Password'}
                    </button>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;