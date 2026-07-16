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

const CountryAutocompletion = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const fetchCountries = async () => {
    try {
      const data = await getData();
      const sortedCountries: string[] =
        data?.map((country: any) => country.name.common).sort((a: string, b: string) => a.localeCompare(b)) || [];
      setCountries(sortedCountries);
      setFilteredCountries(sortedCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  // Handle search
  const handleSearch = debounce((term) => {
    const lowercasedTerm = term.toLowerCase();
    const filtered = countries.filter((country) => country.toLowerCase().startsWith(lowercasedTerm));
    setFilteredCountries(filtered);
    setPage(1);
  }, 500);

  const handleInputChange = (e: any) => {
    handleSearch(e.target.value);
  };

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

  // Fetch country data
  useEffect(() => {
    fetchCountries();
  }, []);

  // Pagination logic
  const paginatedCountries = filteredCountries.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ padding: 8 }}>
      <h2>Country Autocompletion</h2>

      <div>
        <p>
          <span style={{ marginRight: 4 }}>Input country name: </span>
          <input style={{ minWidth: 200 }} type='text' placeholder='Search countries...' onChange={handleInputChange} />
        </p>

        <div>
          <ul>
            {paginatedCountries.map((country, index) => (
              <li key={index} style={{ cursor: 'pointer', padding: '5px' }}>
                {country}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <button onClick={prevPage} disabled={page === 1} style={{ marginRight: 8 }}>
            Previous
          </button>
          <button onClick={nextPage} disabled={page * pageSize >= filteredCountries.length}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryAutocompletion;
