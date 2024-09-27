import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import recruitmentImage from '../../assets/pngtree-recruitment-concept-of-job-search-flat-vector-with-people-workers-business-png-image_2018509.jpg';


const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl mx-auto p-5">
                    {/* Left side with the image */}
                    <div className="hidden lg:flex w-1/2 items-center justify-center">
                        <img src={recruitmentImage} alt="Login Illustration" className="w-full h-full object-cover rounded-md" />
                    </div>

                    {/* Right side with the form */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <form onSubmit={submitHandler} className="w-full max-w-md border border-gray-200 rounded-md p-6 bg-white shadow-lg">
                            <h1 className="font-bold text-2xl mb-5">Login</h1>
                            <div className="my-3">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    className="mt-1"
                                />
                            </div>

                            <div className="my-3">
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    className="mt-1"
                                />
                            </div>
                            <div className="flex items-center justify-between mt-5">
                                <RadioGroup className="flex items-center gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer"
                                        />
                                        <Label htmlFor="r1">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer"
                                        />
                                        <Label htmlFor="r2">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            {
                                loading ? (
                                    <Button className="w-full my-4 flex justify-center items-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full my-4">Login</Button>
                                )
                            }
                            <span className="text-sm block text-center">Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;