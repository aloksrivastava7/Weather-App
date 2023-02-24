import React from 'react'
import { UilLocationPoint, UilSearch } from '@iconscout/react-unicons'
import { useState } from 'react'
import { toast } from 'react-toastify';
function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState(""); 

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if(units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if(city !== "") setQuery({q: city});
  };

  const handleLocationClick = () => {
    if(navigator.geolocation) {
      toast.info("Fetching users location.")
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched")
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };
 

  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4 ml-5'>
            <input type="text" value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
            placeholder='search for city...'/>
            <UilSearch size={25} className='text-white cursor-pointer transition ease-in-out hover:scale-125' onClick={handleSearchClick}/>
            <UilLocationPoint size={25} className='text-white cursor-pointer transition ease-in-out hover:scale-125' onClick={handleLocationClick}/>
        </div>
        <div className='flex flex-row w-1/4 items-center justify-center space-x-2'>
          <button name="metric" className='text-xl text-white transition ease-out hover:scale-110' onClick={handleUnitsChange}>℃</button>
            <p className='text-xl text-white'>|</p>
          <button name="imperial" className='text-xl text-white transition ease-out hover:scale-110' onClick={handleUnitsChange}>℉</button>
        </div>
    </div>
  );
}

export default Inputs;