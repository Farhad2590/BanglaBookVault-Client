import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signupImage from "../../assets/Forgot password-rafiki.svg"
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from 'react-hot-toast'


// import home from "../../assets/home.png"

const Signup = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state || '/'
    // const location = useLocation()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {
        createUser,
        signInWithGoogle,
        updateUserProfile
    } = useAuth()

    const onSubmit = (data) => {
        const { name, email, photoUrl, password } = data;
        console.log(name, email, photoUrl, password);

        createUser(email, password)
            .then((result) => {
                console.log(result.user, "user");
                updateUserProfile(name, photoUrl)
                    .then(() => {
                        toast.success("User registered successfully!");
                        reset();
                        navigate("/");
                    })
                    .catch((error) => console.log(error));
            })
    };

    // handle google signin
    const handleGoogleSignIn = async () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate('/');
                toast.success('Google sigin in successfull')
            })
    }



    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-full max-w-3xl bg-white  shadow-lg  flex">

                <div className="bg-green-800  w-[50%]">
                    <img src={signupImage} alt="" className="w-full h-full object-cover" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-2 p-8 space-y-4 w-[50%]">
                    <h1 className="text-3xl text-center font-bold text-green-800">Sign Up</h1>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full Name"
                            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-green-800 outline-none"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (<span className="text-red-600">Name is required</span>)}
                    </div>
                    <div className="relative">
                        <i className="fas fa-envelope absolute left-3 top-3 text-green-800"></i>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            {...register("email", { required: true })}
                            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-green-800 outline-none"
                        />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="photoUrl"
                            id="photoUrl"
                            placeholder="Photo Url"
                            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-green-800 outline-none"
                            {...register("photoUrl")}
                        />
                    </div>
                    <div className="relative">
                        <i className="fas fa-lock absolute left-3 top-3 text-green-800"></i>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-green-800 outline-none"
                        />
                        {errors.password && <span className="text-red-600">Password is required</span>}
                    </div>
                    <div onClick={handleGoogleSignIn} className="flex justify-end gap-2 items-center">
                        <FaGoogle />
                        <a href="#" className="text-lg text-green-800 hover:underline">Google Login</a>
                    </div>
                    <button type="submit" className="w-full py-2 bg-green-800 text-white rounded-md hover:bg-green-800 transition duration-300">Submit</button>
                    <p className="text-center text-sm">Already have an account? <Link to="/signin" htmlFor="flip" className="text-green-800 cursor-pointer hover:underline">Sign in now</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Signup;