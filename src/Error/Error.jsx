import { Link } from "react-router-dom";
const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <img src={'https://i.ibb.co/wNL3zQY/download.jpg'} alt=""  />
            <h2 className="text-4xl fort-bold">Oops You Are In Wrong Route</h2>
            <Link to={''}><button className="btn bg-green-400">Go to Home</button></Link>
        </div>
    );
};

export default Error;