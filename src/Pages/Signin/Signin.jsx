import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signinImage from "../../assets/Login-bro.svg"
import useAuth from "../../hooks/useAuth";
// import home from "../../assets/home.png"
import toast from 'react-hot-toast'


const Signin = () => {
  const { signIn, setLoading } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state || '/'

  const onSubmit = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password
    console.log(email, password);
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        toast.success('Log in Successful');
        navigate(from, { replace: true });
      })
      .catch(error => {
        // Handle the error here
        console.error('Sign in error:', error);
        toast.error('An error occurred while signing in');
      });
  }
return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative w-full max-w-3xl bg-white  shadow-lg perspective-1500 flex">

      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 p-8 space-y-4 w-[50%]">
        {/* <Link to="/">
            <img className="w-8" src={home} alt="" />
          </Link> */}
        <h1 className="text-3xl text-center font-bold text-green-800">Sign In</h1>
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
          <i className="fas fa-lock absolute left-3 top-3 text-green-800"></i>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-green-800 outline-none"
          />
          {errors.password && <span className="text-red-600">Password is required</span>}
        </div>
        <div className="text-right">
          <a href="#" className="text-sm text-green-800 hover:underline">Forgot password?</a>
        </div>
        <button type="submit" className="w-full py-2 bg-green-800 text-white rounded-md hover:bg-green-800 transition duration-300">Submit</button>
        <p className="text-center text-sm">Dont have an account? <Link to="/signup" htmlFor="flip" className="text-green-800 cursor-pointer hover:underline">Sign up now</Link></p>
      </form>
      <div className="bg-green-800  w-[50%]">
        <img src={signinImage} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
);
};

export default Signin;