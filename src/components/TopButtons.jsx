import React from 'react'

function TopButtons({setQuery}) {
    const cities = [
        {
            id: 1,
            title: 'New York'
        },
        {
            id: 2,
            title: 'London'
        },
        {
            id: 3,
            title: 'New Delhi'
        },
        {
            id: 4,
            title: 'France'
        },
        {
            id: 5,
            title: 'Sydney'
        },
    ];

    return ( <div className='flex items-center justify-between my-6'>
        {cities.map((city) => (
            <button key={city.id} className="text-white text-lg font-medium transition ease-out hover:scale-110" onClick={() => setQuery({q: city.title})}>{city.title}</button>
        ))}
    </div>
    );  
}

export default TopButtons;