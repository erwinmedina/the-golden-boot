import "./RegistrationPage.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'

export default function RegistrationPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const { register, login, signInWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError("");

        try {
            if (isSignUp) {
                await register(email, password, username)
                navigate("/dashboard")
            } else {
                await login(email, password)
                navigate("/dashboard")
            }
        } catch (error) {
            if (error.message === "No account found with this email.") {
                setError("Email not found. Please check your email or sign up")
            } else if (error.code === "auth/wrong-password") {
                setError("Incorrect password. Please try again.")
            } else {
                setError("Invalid/Incorrect username/password.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/dashboard")
        } catch (error) {
            setError(error.message)
        }
    };

    
    return (
        <div className='registration container mt-5'>
            <div className="registration-box row justify-content-center">
                <div className="col-mid-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            
                            <h2 className="text-center mb-4">
                                {isSignUp ? 'Sign Up' : 'Login'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                {isSignUp ? 
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="username" className='signup form-label'>Username</label>
                                        <input 
                                            type="username" 
                                            className='form-control' 
                                            id='username' 
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value) } 
                                            required 
                                            />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className='signup form-label'>Email Address</label>
                                        <input 
                                            type="email" 
                                            className='form-control' 
                                            id='email' 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value) } 
                                            required 
                                            />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className='signup form-label'>Password</label>
                                        <input 
                                            type="password" 
                                            className='form-control' 
                                            id='password' 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value) } 
                                            required 
                                            />
                                        <label htmlFor="password" className='signup signupReqs form-label'>Minimum length of 6 characters, 1 uppercase, 1 number</label>
                                    </div>
                                
                                </>
                                :
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="email" className='signup form-label'>Email Address</label>
                                        <input 
                                            type="email" 
                                            className='form-control' 
                                            id='email' 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value) } 
                                            required 
                                            />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className='signup form-label'>Password</label>
                                        <input 
                                            type="password" 
                                            className='form-control' 
                                            id='password' 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value) } 
                                            required 
                                            />
                                    </div>
                                </>
                                }
                            {error && <div className="alert alert-danger">{error}</div>}
                                <button type="submit" className='btn btn-primary w-100 mb-3' disabled={isLoading}>
                                    {isLoading ? "Loading..." : (isSignUp ? 'Sign Up' : 'Login')}
                                </button>

                                <button className='btn btn-dark w-100 mb-3' onClick={handleGoogleSignIn} disabled={isLoading}>
                                    <div>
                                        <img className="google_logo" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" />
                                        {isSignUp? "Register using Google!" : "Sign in with Google!"    }
                                    </div>
                                </button>
                            </form>

                            <div className="text-center">
                                <button className='btn btn-link' onClick={() => setIsSignUp(!isSignUp)}>
                                    {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign up!"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}