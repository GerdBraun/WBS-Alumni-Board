import { useEffect, useState } from "react";

const SearchForm = ({
  searchTerm,
  setSearchTerm,
  searchModel,
  searchPlaceholder,
}) => {
    useEffect(() => {
        setInputValue(searchTerm);
    }, [searchTerm]);

  const submitSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value);
  };

  const [inputValue, setInputValue] = useState(searchTerm);
  const handleChange = (event) => {
    // Update the state with the new value
    setInputValue(event.target.value);
  };

  return (
    <form onSubmit={(e) => submitSearch(e)}>
      <label className="input input-bordered flex items-center gap-2 mb-8">
        <input
          type="text"
          className="grow"
          placeholder={searchPlaceholder}
          value={inputValue}
          onChange={handleChange} 
          name="search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </form>
  );
};

export default SearchForm;
