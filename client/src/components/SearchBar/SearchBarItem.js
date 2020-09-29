import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { SearchInput } from "evergreen-ui";

const SearchBarItem = () => {
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredMinSize, setEnteredMinSize] = useState(null);
  const [enteredMaxSize, setEnteredMaxSize] = useState(null);
  const inputRef = useRef();

  
  useEffect(() => {
    const timer = setTimeout(() => {
      //compare old search string with new string, if same, send http request
      
      // this is dependent on evergreen-ui library ^5.1.2
      const inputValue = inputRef.current.children[1].value;
      
      if (enteredCity === inputValue) {
        const query = enteredCity.length === 0 ? "" : `?city=${enteredCity}`;

        axios
          .get("/api/lots/search" + query)
          .then((data) => {
            console.log(data)
          })
          // .then((data) => {
          //   const loadedLots = [];
          //   console.log(data);
            // for (const key in data) {
            //   // loadedLots.push({

            //   // })

            // }
          // });
      }
    }, 500);
    // clean up timer before next run
    return () => {
      clearTimeout(timer);
    };
  }, [enteredCity, enteredMinSize, enteredMaxSize, inputRef]);

  return (
    <section className="search">
      <div className="search-item--city">
        <SearchInput
          ref={inputRef}
          placeholder="Enter city"
          value={enteredCity}
          onChange={(e) => setEnteredCity(e.target.value)}
        />
      </div>
    </section>
  );
};

export default SearchBarItem;
