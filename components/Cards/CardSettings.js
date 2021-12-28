import React, { useEffect, useState } from "react";
import axios from "axios";

// components

export default function CardSettings() {
  const [industries, setIndustries] = useState([]);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const industries = axios.get("/api/data/industries");
    const countries = axios.get("/api/data/countries");
    axios
      .all([industries, countries])
      .then((response) => {
        const [industries, countries] = response;
        setIndustries(industries.data.data);
        setCountries(countries.data.data);
      })
      .catch(console.log);
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Business Registration Form
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 mt-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Business Owner Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Business Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Business Phone nUmber
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>{" "}
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Business Email
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    No. of Employees
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="jesse@example.com"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Select Business Type
                  </label>
                  <div class="mb-3 xl:w-96">
                    <select
                      class="form-select appearance-none      block  rounded    w-full       px-3       py-1.5 text-base font-normal       text-gray-700       bg-white bg-clip-padding bg-no-repeat       border border-solid border-gray-300 transition  ease-in-out      m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                    >
                      <option selected> select Business Type</option>
                      {industries.map(({ title, _id }) => (
                        <option key={_id} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Select Business Owner structure
                  </label>
                  <div class="mb-3 xl:w-96">
                    <select
                      class="form-select appearance-none      block  rounded    w-full       px-3       py-1.5 text-base font-normal       text-gray-700       bg-white bg-clip-padding bg-no-repeat       border border-solid border-gray-300 transition  ease-in-out      m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                    >
                      <option selected>select Owner Structure</option>
                      <option value="1">Sole Proprietorship</option>
                      <option value="2">Partnersgip</option>
                      <option value="3">Private Limited Company</option>
                      <option value="4">Public Limited Company</option>
                      <option value="5">Company Limited by Guarantee</option>
                      <option value="6">Others</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Select Location/LGA
                  </label>
                  <div class="mb-3 xl:w-96">
                    <select
                      class="form-select appearance-none      block  rounded    w-full       px-3       py-1.5 text-base font-normal       text-gray-700       bg-white bg-clip-padding bg-no-repeat       border border-solid border-gray-300 transition  ease-in-out      m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                    >
                      <option selected>select LGA</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>{" "}
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Select State
                  </label>
                  <div class="mb-3 xl:w-96">
                    <select
                      class="form-select appearance-none      block  rounded    w-full       px-3       py-1.5 text-base font-normal       text-gray-700       bg-white bg-clip-padding bg-no-repeat       border border-solid border-gray-300 transition  ease-in-out      m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                    >
                      <option selected>select State</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Country
                  </label>
                  <select
                    class="form-select appearance-none      block  rounded    w-full       px-3       py-1.5 text-base font-normal       text-gray-700       bg-white bg-clip-padding bg-no-repeat       border border-solid border-gray-300 transition  ease-in-out      m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                  >
                    <option selected> select Country</option>
                    {countries.map(({ name, _id }) => (
                      <option key={_id} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              style={{ background: "blue", color: "white" }}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
