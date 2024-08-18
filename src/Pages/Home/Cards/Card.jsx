import { useEffect, useState } from 'react';
import Title from '../../../Components/SharedComponents/Title/Title';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingState from '../../../Components/SharedComponents/LoadingState/LoadingState';

const Card = () => {
    const [itemsPerPage, setItemsPerPage] = useState(8)
    const [currentPage, setCurrentPage] = useState(1)
    const [count, setCount] = useState(0)
    const [filter, setFilter] = useState('')
    const [filters, setFilters] = useState('')
    // const [publiser, setpubliser] = useState('')
    const [card, setCard] = useState([]);
    const [sort, setSort] = useState('');
    const [sorts, setSorts] = useState('');
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);


    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const { data } = await axios(`http://localhost:8000/book?page=
                    ${currentPage}&size=${itemsPerPage}&filter=${filter}&filters=${filters}&sort=${sort}&sorts=${sorts}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
                setCard(data);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [currentPage, itemsPerPage, filter, sort, search, filters, sorts, minPrice, maxPrice])

    // console.log(publiser);


    useEffect(() => {
        const getCount = async () => {
            try {
                const { data } = await axios(`http://localhost:8000/books-count?filter=${filter}&filters=${filters}`);
                console.log('Total count:', data.count); // Debugging line
                setCount(data.count);
            } catch (error) {
                console.error('Error fetching count:', error);
            }
        };
        getCount();
    }, [filter, filters]);



    const numberOfPages = Math.ceil(count / itemsPerPage);
    console.log('Number of Pages:', numberOfPages); // Debugging line
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1)


    //  handle pagination button
    const handlePaginationButton = value => {
        // console.log(value)
        setCurrentPage(value)
    }



    const handleReset = () => {
        setFilter('')
        setFilters('')
        setSort('')
        setSorts('')
        setSearch('')

        // setSearchText('')
    }

    const handleSearch = e => {
        e.preventDefault()
        const text = e.target.search.value;

        setSearch(text)
    }
    const handlePriceRangeChange = () => {
        const min = document.getElementById("minPrice").value || 0;
        const max = document.getElementById("maxPrice").value || Infinity;
        setMinPrice(min);
        setMaxPrice(max);
    };
    if (loading) {
        return <LoadingState></LoadingState>;
    }

    return (
        <div className='pb-10'>
            <Title heading="Our Books"></Title>

            <div className='flex flex-col md:flex-row justify-center items-center gap-5 flex-wrap mt-5 mb-5'>

                <div>
                    <select
                        onChange={e => {
                            setSorts(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={sorts}
                        name='sort'
                        id='sort'
                        className='border p-4 rounded-md'
                    >
                        <option value=''>Sort By Date</option>
                        <option value='newerList'>Newer list</option>
                        <option value='olderList'>Older list</option>
                    </select>
                </div>
                <form onSubmit={handleSearch}>
                    <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-green-800 focus-within:ring-green-800'>
                        <input
                            className='px-6 py-2 text-black placeholder-black bg-white outline-none focus:placeholder-transparent'
                            type='text'
                            name='search'
                            placeholder='Enter book Title'
                            aria-label='Enter book Title'
                        />
                        <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-green-800 rounded-md disabled:hover:bg-white disabled:hover:text-white hover:text-white disabled:cursor-not-allowed disabled:text-white'>
                            Search
                        </button>
                    </div>
                </form>
                <div>
                    <select
                        onChange={e => {
                            setSort(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={sort}
                        name='sort'
                        id='sort'
                        className='border p-4 rounded-md'
                    >
                        <option value=''>Sort By Price</option>
                        <option value='dsc'>Descending Order</option>
                        <option value='asc'>Ascending Order</option>
                    </select>
                </div>
                <button onClick={handleReset} className='px-1 md:px-4 py-3 bg-green-800 rounded-md  text-white font-semibold'>Reset</button>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center gap-5 flex-wrap mt-5 mb-5'>
                <div>
                    <select
                        onChange={e => {
                            setFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={filter}
                        name='categoryName'
                        id='categoryName'
                        className='border p-4 rounded-lg'
                    >
                        <option value=''>Filter By Category</option>
                        <option value='Bangladesh History'>Bangladesh History</option>
                        <option value='Liberation War'>Liberation War</option>
                        <option value='Culture and Heritage'>Culture and Heritage</option>
                        <option value='Political History'>Political History</option>
                        <option value='Economic History'>Economic History</option>
                    </select>
                </div>
                
                <div>
                    <select
                        onChange={e => {
                            setFilters(e.target.value)
                            setCurrentPage(1)
                        }}
                        value={filters}
                        name='categoryName'
                        id='categoryName'
                        className='border p-4 rounded-lg'
                    >
                        <option value=''>Filter By Publisher Brand</option>
                        <option value='Environment Press'>Environment Press</option>
                        <option value='Bengal Press'>Bengal Press</option>
                        <option value='Dhaka Publications'>Dhaka Publications</option>
                        <option value='Subcontinental Press'>Subcontinental Press</option>
                        {/* <option value='Economic History'>Economic History</option> */}
                    </select>
                </div>
            </div>
            <div className="grid justify-center mb-10 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 ">
                {
                    card.length === 0 ? (
                        <LoadingState />
                    ) : (
                        card.map((cardItem, index) => (
                            <div
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
                                <div className='flex justify-center'><span className='font-bold'>Publishing Brand:</span>{cardItem.publisher}</div>
                                <div className="flex justify-between">
                                    <p ><span className='font-bold'>Price:</span>{cardItem.priceRange}taka</p>
                                    <p><span className='font-bold'>Publish Date:</span>{cardItem.Published_date}</p>
                                </div>
                                <div className="">
                                    <div className='flex justify-start'>
                                        <p className='mr-5 font-bold'>Format:</p>
                                        <ul className='flex space-x-5'>
                                            {cardItem.format.map((formatItem, formatIndex) => (
                                                <li key={formatIndex}>[{formatItem}]</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className='flex justify-end'>
                                        <p className='mr-5 font-bold'>Availability:</p>
                                        <ul className='flex space-x-5'>
                                            {cardItem.availability.map((availabilityItem, availabilityIndex) => (
                                                <li key={availabilityIndex}>[{availabilityItem}]</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className='flex justify-center'><span className='font-bold'>Category:</span>{cardItem.categoryName}</div>
                            </div>
                        ))
                    )
                }
            </div>


            {/* Pagination Section */}
            <div className='flex justify-center mt-12'>
                {/* Previous Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-green-800  hover:text-white'
                >
                    <div className='flex items-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>

                        <span className='mx-1'>previous</span>
                    </div>
                </button>
                {/* Numbers */}
                {pages.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}


                        key={btnNum}
                        className={` hidden ${currentPage === btnNum ? 'bg-green-800 text-white' : ''
                            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-green-800  hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
                {/* Next Button */}
                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-green-800 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
                >
                    <div className='flex items-center -mx-1'>
                        <span className='mx-1'>Next</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>

        </div>
    );
};

export default Card;