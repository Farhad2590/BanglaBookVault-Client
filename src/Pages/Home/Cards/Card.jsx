import  { useEffect, useState } from 'react';
import Title from '../../../Components/SharedComponents/Title/Title';
import Cards from './Cards';

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
            <div className="grid justify-center mb-10 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 ">
                {
                    card.map(cards => <Cards cards={cards}></Cards>)
                }
            </div>
        </div>
    );
};

export default Card;