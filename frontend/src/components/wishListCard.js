import axios from "axios";
import React, { useEffect, useState } from "react";

function BooksCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/books")
      .then((response) => {
        setData(response.data.slice(0,10));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(data);

  return (
    <>
      {data.map((book) => (
        <div
          // onClick={(e) => productOverview(_id)}
          className="flex flex-col items-center self-start border border-gray-500 rounded-lg hover:bg-gray-800 hover:border hover:border-gray-700 "
        >
          <div className="relative">
            <img
              className="w-40 h-56 p-4 rounded-t-lg lg:w-56 lg:h-80"
              src={book.imgUrl}
              alt={book.title}
            />
          </div>
          <div className="flex flex-col flex-wrap content-between justify-center px-5 pb-5 align-middle">
            <h5
              title={book.title}
              className="w-32 h-12 text-base font-semibold tracking-tight text-gray-100 lg:w-48 lg:text-lg lg:h-14 line-clamp-2"
            >
              {book.title}
            </h5>
            <div className="flex flex-col space-y-2">
              <div className="text-lg lg:text-2xl relative before:mr-1 before:content-[''] font-bold text-gray-100">
                <span className=" absolute text-xs right-0 bottom-1.5 font-semibold px-2.5 py-0.5 rounded bg-cyan-900 bg-opacity-80 text-gray-100">
                  {book.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default BooksCard;
