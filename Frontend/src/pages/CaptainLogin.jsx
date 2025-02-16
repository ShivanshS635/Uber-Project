import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CaptainLogin = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setCaptainData({ email : email, password : password });
        setemail('');
        setpassword('');
    }

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div className="">
                <img className='w-16 mb-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s" alt="" />
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
                <p className="text-center">Join A Fleet? <Link to='/captain-signup' className='text-blue-600'>Register As A Captain</Link></p>
            </div>
            <div className="">
                    <Link to='/login' className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Sign In As User</Link>

            </div>
        </div>
    );
};

export default CaptainLogin;
