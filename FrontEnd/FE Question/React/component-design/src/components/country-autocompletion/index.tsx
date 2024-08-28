import { useState, useEffect } from 'react';

const debounce = (callback: (...args: any[]) => any, delay: number, immediate: boolean = false) => {
  let timer: number | undefined = undefined;

  return function (this: unknown, ...args: any[]) {
    if (immediate) {
      callback.apply(this, args);
      clearTimeout(timer);
      immediate = false;
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

const pageSize = 10;
const getData = async () => {
  const data = await fetch('https://restcountries.com/v3.1/all')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fetching countries');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error fetching countries:', error);
    });
  return data;
};

const CountryAutocomplete = ({ selectedCountry, setSelectedCountry }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const fetchCountries = async () => {
    try {
      const data = await getData();
      const sortedCountries = data?.map((country) => country.name.common).sort((a, b) => a.localeCompare(b)) || [];
      setCountries(sortedCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  // Fetch country data
  useEffect(() => {
    fetchCountries();
  }, []);

  // Handle search term
  const handleSearch = debounce((term) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();
    const filtered = countries.filter((country) => country.toLowerCase().includes(lowercasedTerm));
    setFilteredCountries(filtered);
    setPage(1); // Reset to the first page
  }, 300);

  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  // Pagination logic
  const paginatedCountries = filteredCountries.slice((page - 1) * pageSize, page * pageSize);

  // Handle pagination
  const nextPage = () => {
    if (page * pageSize < filteredCountries.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <input type='text' placeholder='Search countries...' onChange={handleInputChange} />
      <ul>
        {paginatedCountries.map((country, index) => (
          <li key={index} onClick={() => handleCountrySelect(country)} style={{ cursor: 'pointer', padding: '5px' }}>
            {country}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={page * pageSize >= filteredCountries.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CountryAutocomplete;
