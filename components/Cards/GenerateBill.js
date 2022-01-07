import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { registerBusinessForm } from "site-constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import NaijaStates from "naija-state-local-government";
import { useDebounce } from "lib/hooks/useDebounce";

// components

function CardSettings() {
  const [bio, setBio] = useState({
    address: "",
    id: "",
    lga: "",
    name: "",
    state: "",
  });
  const [countries, setCountries] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { schema } = registerBusinessForm;
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
    register,
    setError,
    watch,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const industries = axios.get("/api/data/industries");
    const countries = axios.get("/api/data/countries");
    axios
      .all([industries, countries])
      .then((response) => {
        const [industries, countries] = response;
        // setIndustries(industries.data.data);
        setCountries(countries.data.data);
      })
      .catch(console.log);
  }, []);

  const onBusinessSearch = useDebounce((e) => {
    axios
      .get("/api/businesses/" + e.target.value)
      .then((response) => {
        let bioResult = response.data?.data;
        reset(bioResult);
      })
      .catch(console.log);
  }, 1000);

  const onSubmit = (data) => {
    setLoading(true);
    console.log({ data });
    axios
      .post("/api/businesses", data)
      .then((res) => {
        setLoading(false);
        router.reload(window.location.pathname);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/");
        }
        setLoading(false);
        err?.response?.status === 422 &&
          setError("reg_no", {
            type: "server",
            message: err.response.data.message,
          });
      });
  };
  console.log(NaijaStates.lgas("Oyo"));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Business Profile Form
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 mt-4 lg:px-10 py-10 pt-0">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Business Unique ID{" "}
                </label>
                <input
                  // {...register("name")}
                  onChange={onBusinessSearch}
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.name?.message}
                </span>
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
                  // value={bio.name}
                  {...register("name")}
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.owner_name?.message}
                </span>
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
                  {...register("address")}
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue=""
                  readOnly
                />
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.address?.message}
                </span>
              </div>
            </div>{" "}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  LGA
                </label>
                <input
                  {...register("lga")}
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.owner_name?.message}
                </span>
              </div>
            </div>
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
                    {...register("state")}
                    class="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                  >
                    <option value="" selected hidden>
                      select State
                    </option>
                    {NaijaStates.states().map((state) => (
                      <option value={state}>{state}</option>
                    ))}
                  </select>
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.state?.message}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Select Location/LGA
                </label>
                <div class="mb-3 xl:w-96">
                  <select
                    {...register("lga")}
                    class="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                  >
                    <option value="" selected hidden>
                      select LGA
                    </option>
                    {NaijaStates.lgas(watch("state", false) || "Oyo").lgas.map(
                      (state) => (
                        <option value={state}>{state}</option>
                      )
                    )}
                  </select>
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.lga?.message}
                  </span>
                </div>
              </div>
            </div>{" "} */}
          </div>
        </div>
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Invoice Generation detail
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 mt-4 lg:px-10 py-10 pt-0">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  MDA
                </label>
                <select
                  {...register("lga")}
                  class="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                >
                  <option value="" selected hidden>
                    select MDA
                  </option>
                  {NaijaStates.lgas(watch("state", false) || "Oyo").lgas.map(
                    (state) => (
                      <option value={state}>{state}</option>
                    )
                  )}
                </select>
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.name?.message}
                </span>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Revenue Item{" "}
                </label>
                <select
                  {...register("lga")}
                  class="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                >
                  <option value="" selected hidden>
                    select Revenue Item
                  </option>
                  {NaijaStates.lgas(watch("state", false) || "Oyo").lgas.map(
                    (state) => (
                      <option value={state}>{state}</option>
                    )
                  )}
                </select>
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.owner_name?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Amount
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.name?.message}
                </span>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Billing Date
                </label>
                <input
                  {...register("owner_name")}
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.owner_name?.message}
                </span>
              </div>
            </div>
          </div>
          <button
            disabled={!isDirty || !isValid}
            className={`${
              !isDirty || !isValid ? "" : "bg-blueGray-800"
            } text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
            type="submit"
          >
            {isLoading ? "Creating..." : "Create Business"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CardSettings;
