import React, { useEffect, useState } from "react";

// layout for page

import Auth from "layouts/Auth.js";
import { resetPassword } from "site-constant";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Toast from "components/Toast/Toast";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const { token } = router.query;
  const { schema } = resetPassword;
  const [isLoading, setLoading] = useState(false);
  const [isPageLoading, setPageLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
    register,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    validateToken();
  }, []);

  async function validateToken() {
    try {
      const data = await axios.get(`/api/auth/validateToken?token=${token}`);
      if (!(data.status === 200) && !(data.data.status === "success")) {
        return router.push("/");
      }
      setPageLoading(false);
    } catch (error) {
      console.log({ error });
      return router.push("/");
    }
  }

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(`/api/auth/resetPassword?token=${token}`, data)
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => router.push("/"), 4000);
      })
      .catch((err) => {
        setLoading(false);
        console.log({ err });
      });
  };

  if (isPageLoading) {
    return (
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <h1>Authenticating Token...</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        {success && <Toast />}
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Enter new Password{" "}
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
                    </span>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      {...register("confirmPpassword")}
                    />
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {errors.confirmPpassword?.message}
                    </span>
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
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
                      {isLoading ? "Creating..." : "Create Account"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
