/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { signInform } from "site-constant";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import withAuth from "lib/Hoc/withAuth";

function Index() {
  const [isLoading, setLoading] = useState(false);
  const Router = useRouter();
  const { schema } = signInform;
  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
    register,
    setError,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post("/api/auth/signIn", data)
      .then((res) => {
        setLoading(false);
        // setSuccess(true);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          return setTimeout(() => Router.push("/admin/dashboard"), 4000);
        }
      })
      .catch((err) => {
        setLoading(false);
        err?.response.status === 401 &&
          setError("password", {
            type: "server",
            message: err.response.data.message,
          });
      });
  };

  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 px-4">
            <div className="pt-32 sm:pt-0">
              <>
                <div className="container mx-auto px-4 h-full">
                  <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full px-4">
                      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                          <div className="text-center mb-3">
                            <h6 className="text-blueGray-500 text-sm font-bold">
                              sign in with credentials{" "}
                            </h6>
                          </div>

                          <hr className="mt-6 border-b-1 border-blueGray-300" />
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Email"
                                {...register("email")}
                              />
                              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                {errors.email?.message}
                              </span>
                            </div>

                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Password"
                                {...register("password")}
                              />
                              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                {errors.password?.message}
                              </span>{" "}
                            </div>
                            <div>
                              <label className="inline-flex items-center cursor-pointer">
                                <input
                                  id="customCheckLogin"
                                  type="checkbox"
                                  className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                />
                                <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                  Remember me
                                </span>
                              </label>
                            </div>

                            <div className="text-center mt-6">
                              <button
                                disabled={!isDirty || !isValid}
                                className={`${
                                  !isDirty || !isValid ? "" : "bg-blueGray-800"
                                } text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150`}
                                type="submit"
                              >
                                {isLoading ? "Please wait..." : "Sign In"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="flex flex-wrap mt-6 relative">
                        <div className="w-1/2">
                          <a
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            className="text-blueGray-200"
                          >
                            <small>Forgot password?</small>
                          </a>
                        </div>
                        <div className="w-1/2 text-right">
                          <Link href="/auth/register">
                            <a href="#pablo" className="text-blueGray-200">
                              <Link href={"/auth/register"}>
                                Create new account
                              </Link>{" "}
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
          src="/img/pattern_nextjs.png"
          alt="..."
        />
      </section>

      <Footer />
    </>
  );
}

export default Index;
