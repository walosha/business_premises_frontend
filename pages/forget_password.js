import React, { useState } from "react";
import Link from "next/link";

// layout for page

import Auth from "layouts/Auth.js";
import { forgetPassword } from "site-constant";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Toast from "components/Toast/Toast";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const { schema } = forgetPassword;
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
    register,
    setError,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post("/api/auth/forgetPassword", data)
      .then((res) => {
        router.reload(window.location.pathname);
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
        err?.response.status === 422 &&
          setError("email", {
            type: "server",
            message: "Email reset sent if email is valid",
          });
      });
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        {success && <Toast message={" Please check your mailbox"} />}
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Forget Password
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
                      // autoComplete="off"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      {...register("email")}
                    />
                  </div>
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors.email?.message}
                  </span>

                  <div className="text-center mt-6">
                    <button
                      disabled={!isDirty || !isValid}
                      className={`${
                        !isDirty || !isValid ? "" : "bg-blueGray-800"
                      } text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150`}
                      type="submit"
                    >
                      {isLoading ? "Sending..." : "Send"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2 ">
                <Link href="#pablo">Sign In?</Link>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/auth/register">Create new account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
