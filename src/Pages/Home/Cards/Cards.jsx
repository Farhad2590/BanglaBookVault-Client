// import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";

const Cards = ({ cards }) => {
    // console.log(cards);

    const { title,image,writerName } = cards;
    // console.log(title);

    return (

        <Link  className="bg-slate-50 border border-gray-300 rounded-lg p-5">
            <div className="flex flex-col justify-center items-center bg-gray-200 py-5 px-5 rounded-lg">
                <img src={image} alt="" className=" w-28 h-40 lg:w-44  lg:h-60" />
            </div>
            <div>
                <h2 className="mb-1 text-lg lg:text-xl font-semibold">{title}</h2>
                <p>By :{writerName}</p>
            </div>
            <div className="border-[2px] border-dashed my-5"></div>
            {/* <div className="flex justify-between">
                {category}
                <div className="flex gap-2 items-center">
                    <p>{rating}</p>
                    <CiStar />
                </div>
            </div> */}

        </Link>
    );
};

export default Cards;