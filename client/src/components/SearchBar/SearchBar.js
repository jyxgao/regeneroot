import React, {useState} from "react";

export default function SearchBar() {
  const [value, setValue] = useState("");
  return (
    <section>
      <form onSubmit={event => event.preventDefault()}>
        <input 
          spellCheck="false"
          placeholder="Search Location"
          name="search"
          type="text"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
    </section>
  )

}