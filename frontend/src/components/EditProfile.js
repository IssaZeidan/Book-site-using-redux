/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from "react";
import axios from "axios";

function EditForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveEdits = () => {
    setIsLoading(true);

    // Construct the updated data or payload
    const updatedData = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      emailAddress: document.getElementById("email-address").value,
      phoneNumber: document.getElementById("phone-number").value,
    };

    // Make the PUT request to the backend API
    axios
      .put("api/users/${userId}", updatedData)
      .then((response) => {
        // Handle the successful response, e.g., show a success message
      })
      .catch((error) => {
        // Handle the error, e.g., show an error message
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="w-full bg-white p-10">
        <h1
          tabIndex={0}
          role="heading"
          aria-label="profile information"
          className="focus:outline-none text-3xl font-bold text-gray-800 mt-12"
        >
          Profile info Editing
        </h1>
        <p
          role="contentinfo"
          className=" focus:outline-nonetext-sm font-light leading-tight text-gray-600 mt-4"
        >
          Fill in the data for profile. It will take a couple of minutes.
        </p>
        <h2
          role="heading"
          aria-label="enter Personal data"
          className="text-xl font-semibold leading-7 text-gray-800 mt-10"
        >
          Personal data
        </h2>
        {/* <p className="text-sm font-light leading-none text-gray-600 mt-0.5">Your details</p> */}
        <div className="mt-8 md:flex items-center">
          <div className="flex flex-col">
            <label className="mb-3 text-sm leading-none text-gray-800">
              First name
            </label>
            {/* <input type="name" tabIndex={0} aria-label="Enter first name" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" defaultValue="William" /> */}
            <input
              type="name"
              id="first-name"
              tabIndex={0}
              aria-label="Enter first name"
              className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
              defaultValue="William"
            />
          </div>
          <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Last name
            </label>
            {/* <input type="name" tabIndex={0} aria-label="Enter last name" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" defaultValue="Smith" /> */}
            <input
              type="name"
              id="last-name"
              tabIndex={0}
              aria-label="Enter last name"
              className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
              defaultValue="Smith"
            />
          </div>
        </div>
        <div className="mt-12 md:flex items-center">
          <div className="flex flex-col">
            <label className="mb-3 text-sm leading-none text-gray-800">
              Email Address
            </label>
            {/* <input type="email" tabIndex={0} aria-label="Enter email Address" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" defaultValue="smith.william@gmail.com" /> */}
            <input
              type="email"
              id="email-address"
              tabIndex={0}
              aria-label="Enter email Address"
              className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
              defaultValue="smith.william@gmail.com"
            />
          </div>
          {/* <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                        <label className="mb-3 text-sm leading-none text-gray-800">Phone number</label>
                        <input type="number" id="phone-number" tabIndex={0} aria-label="Enter phone number" className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" defaultValue="+81 839274" />
                    </div> */}
        </div>

        <button
          role="button"
          aria-label="Next step"
          className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-7 md:mt-14 hover:bg-gray-100  focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          onClick={handleSaveEdits}
          disabled={isLoading}
        >
          <span className="text-sm font-medium text-center text-gray-800 capitalize">
            Save Edits {isLoading ? "Saving..." : "Save Edits"}{" "}
          </span>
          {isLoading && (
            <svg
              className="mt-1 ml-3"
              width={12}
              height={8}
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.01 3H0V5H8.01V8L12 4L8.01 0V3Z" fill="#242731" />
            </svg>
          )}
        </button>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n          .checkbox:checked + .check-icon {\n              display: flex;\n          }\n      ",
        }}
      />
    </div>
  );
}

export default EditForm;
