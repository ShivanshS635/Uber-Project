import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserLogin = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [userData, setUserData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserData({ email : email , password : password });
        setemail('');
        setpassword('');
    }

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div className="">
                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
                <form onSubmit={handleSubmit}>
                    <h3 className="text-lg font-medium mb-2">What's Your Email?</h3>

                    <input
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                        placeholder="Email@example.com"
                    />

                    <h3 className="text-lg font-medium mb-2">Password</h3>

                    <input
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required
                        placeholder="Password"
                    />

                    <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">Login</button>
                </form>
                <p className="text-center">New Here? <Link to='/signup' className='text-blue-600'>Create an Account</Link></p>
            </div>
            <div className="">
                    <Link to='/captain-login' className="bg-[#d5b827] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign In As Captain</Link>

            </div>
        </div>
    );
};

export default UserLogin;
