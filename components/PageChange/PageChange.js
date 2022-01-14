import React from "react";

// reactstrap components
// import { Spinner } from "reactstrap";

// core components

export default function PageChange(props) {
  return (
    <div>
      <div className="bg-cover fixed z-40 w-full h-full top-0 left-0"></div>
      <div className="top-0 left-0 w-full h-full block z-50 absolute bg-black bg-opacity-50">
        <div className="my-32 mx-auto max-w-sm text-center relative z-50 top-0">
          <div className=" mb-4 h-full flex items-center">
            <i className="fas fa-circle-notch animate-spin text-white mx-auto text-6xl"></i>
          </div>
          <h4 className="text-lg font-medium text-white">Loading ...</h4>
        </div>
      </div>
    </div>
  );
}
