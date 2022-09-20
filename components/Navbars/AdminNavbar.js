import React, { useEffect, useState } from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import axios from "axios";

export default function Navbar() {
  const [user, setUser] = useState(0);
  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((response) => {
        setUser(response.data.data);
      })
      .catch(console.log);
  }, []);
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block mr-4 font-semibold"
            href="/#"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>

          <p className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
            Welcome, {user.name}
          </p>

          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
