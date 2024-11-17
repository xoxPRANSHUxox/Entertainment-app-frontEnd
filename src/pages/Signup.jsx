import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 
  const handleSignup = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      toast.error("Passwords do not match."); 
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Signup successful!'); 

   
      setEmail('');
      setPassword('');
      setConfirmPassword('');


      setTimeout(() => {
        navigate('/login');
      }, 1000); 
    } catch (err) {
      toast.error(`Signup failed: ${err.message}`); 
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success('Google signup successful!');
      navigate('/login');
    } catch (err) {
      toast.error(`Google signup failed`); 
    }
  };

  const navigateLogin = (e) => {
    e.preventDefault();
    navigate('/login')

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSignup} className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 border-red-900 border border-x-4">
        <h2 className="text-white text-2xl mb-4 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className="text-white" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-white" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-white" htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Confirm your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-600"
        >
          Sign Up
        </button>
        {/* Google Sign Up Button */}

        <button 
        onClick={handleGoogleSignup}
        className="mt-4 w-fit px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500"
      >
        Sign Up with Google
      </button>
       
       <button
                 className="w-fit ml-4 px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-600"
                 onClick={navigateLogin}
>
  Log In
</button>
      </form>

      
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default Signup;
