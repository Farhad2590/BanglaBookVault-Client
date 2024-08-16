import { Outlet } from "react-router-dom";
import Nav from "../Components/SharedComponents/Nav/Nav";
import Footer from "../Components/SharedComponents/Footer/Footer";
// import Nav from "../Components/Nav/Nav";


const Layouts = () => {
    return (
        <div className="bg-green-100 font-gramond">
            <div className="mx-auto w-[94%]">
                <div>
                    <Nav></Nav>
                </div>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Layouts;