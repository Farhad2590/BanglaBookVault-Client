// import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import useAuth from '../../../hooks/useAuth';

const Nav = () => {
    const { user, logOut } = useAuth()

    return (
        <>
            <div className="flex items-center md:gap-5 justify-between pt-5 pb-5 ">
                <div className="">
                    <div className="flex items-center">
                        <img className="w-16" src={logo} alt="" />
                        <h2 className="text-green-700 font-bold font-gramond text-xl md:text-xl lg:text-3xl">BanglaBookVault</h2>
                    </div>

                </div>
                <div className="flex gap-2">
                    {/* <Link to="/signin" className="btn bg-green-700 text-white">Sign In</Link> */}
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={user && user.photoURL} />
                                    </div>
                                </div>
                                <div tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="mt-3 btn bg-green-700 text-white">
                                        <a className="justify-between">
                                            {
                                                user && user.displayName
                                            }
                                        </a>
                                    </li>
                                    <li className="btn bg-green-700 text-white" ><button onClick={logOut}>Logout</button></li>
                                </div>
                            </div>

                            :
                            <Link to="/signin">
                                <button className="btn bg-green-700  text-white hover:border border-green-700">
                                    Join Us
                                </button>

                            </Link>

                    }
                </div>
            </div>

        </>

    );
};

export default Nav;


