import { useEffect, useState } from 'react';
import Title from '../../../Components/SharedComponents/Title/Title';
import { Link } from 'react-router-dom';

const Card = () => {
    const [card, setCard] = useState([]);
    useEffect(() => {
        fetch('data.json')
            .then(res => res.json())
            .then(data => setCard(data))
    })

    return (
        <div>
            <Title heading="Our Books"></Title>
            <div className='flex flex-col md:flex-row justify-center items-center gap-5 flex-wrap mt-5 mb-5'>
                <div>
                    <select
                        name='category'
                        id='category'
                        className='border p-4 rounded-lg'
                    >
                        <option value=''>Filter By Category</option>
                        <option value='Breakfast'>Breakfast</option>
                        <option value='Lunch'>Lunch</option>
                        <option value='Dinner'>Dinner</option>
                    </select>
                </div>

                <form >
                    <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-green-800 focus-within:ring-green-800'>
                        <input
                            className='px-6 py-2 text-white placeholder-white bg-white outline-none focus:placeholder-transparent'
                            type='text'
                            name='search'
                            placeholder='Enter Food Title'
                            aria-label='Enter Food Title'
                        />
                        <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-green-800 rounded-md disabled:hover:bg-white disabled:hover:text-white hover:text-white disabled:cursor-not-allowed disabled:text-white'>
                            Search
                        </button>
                    </div>
                </form>
                <div>
                    <select
                        name='sort'
                        id='sort'
                        className='border p-4 rounded-md'
                    >
                        <option value=''>Filter By Price</option>
                        <option value='dsc'>Descending Order</option>
                        <option value='asc'>Ascending Order</option>
                    </select>
                </div>
                <button  className='btn'>Reset</button>
            </div>
            <div className="grid justify-center mb-10 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 ">
                {
                    card.map((cardItem, index) => (
                        <Link
                            key={index}
                            className="bg-slate-50 border border-white rounded-lg p-5"
                        >
                            <div className="flex flex-col justify-center items-center bg-white py-5 px-5 rounded-lg">
                                <img
                                    src={cardItem.image}
                                    alt={cardItem.title}
                                    className="w-28 h-40 lg:w-44 lg:h-60"
                                />
                            </div>
                            <div>
                                <h2 className="mb-1 text-lg lg:text-xl font-semibold">
                                    {cardItem.title}
                                </h2>
                                <p>By: {cardItem.writerName}</p>
                            </div>
                            <div className="border-[2px] border-dashed my-5"></div>
                        </Link>
                    ))
                }

            </div>
        </div>
    );
};

export default Card;