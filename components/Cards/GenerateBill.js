import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { generateInvoiceForm } from "site-constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import NaijaStates from "naija-state-local-government";
import { useDebounce } from "lib/hooks/useDebounce";

// components

function CardSettings() {
  const [mdas, setMdas] = useState([]);
  const [countries, setCountries] = useState([]);
  const [taxItems, setTaxItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { schema } = generateInvoiceForm;
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

  const id = watch("mda_id", false);
  console.log({ errors });

  useEffect(() => {
    const MDAs = axios.get("/api/data/mdas");
    const countries = axios.get("/api/data/countries");
    axios
      .all([MDAs, countries])
      .then((response) => {
        const [mdas, countries] = response;
        setMdas(mdas.data.data);
        setCountries(countries.data.data);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    axios
      .get(`/api/data/taxitems?mda_id=${id}`)
      .then((response) => {
        setTaxItems(response.data.data);
      })
      .catch(console.log);
  }, [id]);

  const onBusinessSearch = useDebounce((e) => {
    const { value } = e.target;
    console.log(typeof value, "[]]]]]]]]]]]]]]]]", value);
    if (value.length > 9) {
      axios
        .get("/api/businesses/" + value)
        .then((response) => {
          let bioResult = response.data?.data;
          if (!bioResult) {
            reset({
              address: "",
              business_id: "",
              lga: "",
              name: "",
              state: "",
            });
            return setError("id", {
              type: "server",
              message: "Business Identification does not exit!",
            });
          }
          reset(bioResult);
        })
        .catch(console.log);
    }
  }, 1000);

  const onSubmit = (data) => {
    setLoading(true);
    delete data.id;
    delete data.lga;
    delete data.name;
    delete data.state;
    delete data.address;

    axios
      .post("/api/invoice", data)
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

  const businesUniqueId = register("business_id", { required: true });
  console.log(typeof watch("business_id", false));
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
                  {...register("business_id")}
                  onChange={(e) => {
                    businesUniqueId.onChange(e);
                    onBusinessSearch(e);
                  }}
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.business_id?.message}
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
                  {...register("name")}
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.name?.message}
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
                <div className="mb-3 xl:w-96">
                  <select
                    {...register("state")}
                    className="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                  >
                    <option value="" defaultValue={"select State"} hidden>
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
                <div className="mb-3 xl:w-96">
                  <select
                    {...register("lga")}
                    className="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                  {...register("mda_id")}
                  className="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                >
                  <option value="" defaultValue={"select State"} hidden>
                    {" "}
                    select MDA
                  </option>
                  {mdas.map(({ title, id, mda_id }) => (
                    <option key={id} value={mda_id}>
                      {title}
                    </option>
                  ))}
                </select>
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.mda_id?.message}
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
                  {...register("tax_item_id")}
                  className="form-select appearance-none block rounded w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition  ease-in-out  m-0      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                >
                  <option value="" defaultValue={"select State"} hidden>
                    select Revenue Item
                  </option>
                  {taxItems.map(({ title, id }) => (
                    <option key={id} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.tax_item_id?.message}
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
                  {...register("amount")}
                  type="number"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                  {errors.amount?.message}
                </span>
              </div>
            </div>
            {/* <div className="w-full lg:w-6/12 px-4">
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
            </div> */}
          </div>
          <button
            // disabled={!isDirty || !isValid}
            className={`${
              !isDirty || !isValid ? "" : "bg-blueGray-800"
            } text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
            type="submit"
          >
            {isLoading ? "Please wait..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CardSettings;