import React from "react";
import { useState } from "react";

const FilterContext = React.createContext();

export const FilterContextProvider = (props) => {
  const [filtered, setFiltered] = useState(false);

  function filterByValue(array, value) {
    return array.filter((data) => JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  const filterHandler = (term, data) => {
    const filteredArr = filterByValue(data, term);
    setFiltered(filteredArr);
  };

  const clearFilter = () => {
    setFiltered(false)
  }

  return (
    <FilterContext.Provider
      value={{
        filtered: filtered,
        filterHandler: filterHandler,
        clear: clearFilter
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;