import { SearchField } from '@heroui/react';
import React from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';

const SearchSection = () => {
    return (
         <div className="flex items-center justify-between w-full mb-10">

  {/* LEFT SIDE */}
  <h1 className="text-lg font-medium text-white">
    Welcome back, Alex Sterling
  </h1>

  {/* RIGHT SIDE */}
  <div className="flex items-center gap-4">

    <SearchField name="search" aria-label="Global search">
      <SearchField.Group>
        <SearchField.SearchIcon aria-label="Search icon" />

        <SearchField.Input
          className="w-[280px]"
          placeholder="Search..."
          aria-label="Search"
        />

        <SearchField.ClearButton aria-label="Clear search input" />
      </SearchField.Group>
    </SearchField>

            <button
        aria-label="Notifications"
        className="relative p-2 rounded-full hover:bg-white/10 transition"
        >
        <IoIosNotificationsOutline className="text-xl text-white" />

        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

  </div>
</div>
    );
};

export default SearchSection;