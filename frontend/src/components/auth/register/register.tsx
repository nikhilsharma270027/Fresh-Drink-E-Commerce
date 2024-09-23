import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../common/firebase';

const Register = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: ""
    });
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (event: any) => {
        event.preventDefault();
        if (!values.name || !values.email || !values.pass) {
            setErrorMessage("Fill all the fields");
            return;
        }
        setErrorMessage("");

        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                const user = res.user;
                await updateProfile(user, {
                    displayName: values.name
                });
                console.log(user);
                navigate("/");
            })
            .catch((err) => {
                setIsRegistering(true);
                console.log("error", err.message);
            });
    };

    return (
        <main className="flex items-center justify-center w-full h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded-3xl shadow-2xl border border-gray-300 space-y-6">
                <div className="text-center mb-6">
                    <h3 className="text-gray-800 text-2xl font-bold">Create a New Account</h3>
                </div>
                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Name</label>
                        <input
                            type="text"
                            required
                            value={values.name}
                            onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
                            className="w-full mt-2 px-4 py-3 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-lg focus:border-indigo-600 transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            value={values.email}
                            onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
                            className="w-full mt-2 px-4 py-3 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-lg focus:border-indigo-600 transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Password</label>
                        <input
                            disabled={isRegistering}
                            type="password"
                            required
                            onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
                            className="w-full mt-2 px-4 py-3 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-lg focus:border-indigo-600 transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Confirm Password</label>
                        <input
                            disabled={isRegistering}
                            type="password"
                            required
                            className="w-full mt-2 px-4 py-3 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-lg focus:border-indigo-600 transition duration-300"
                        />
                    </div>

                    {errorMessage && (
                        <span className='text-red-600 font-bold'>{errorMessage}</span>
                    )}

                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`w-full px-4 py-3 font-bold text-white rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg transition duration-300'}`}
                    >
                        {isRegistering ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <div className="text-sm text-center text-gray-700">
                        Already have an account? {' '}
                        <Link to={'/login'} className="text-indigo-600 hover:underline font-bold">Continue</Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Register;
