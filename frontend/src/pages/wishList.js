import { useEffect } from "react";
import Card from "../components/wishListCard";

const Wishlist = () => {
  useEffect(() => {
    document.title = "Wishlist | The Book Shelf";
  }, []);
  return (
    <section className="bg-white dark:bg-gray-900 my-12">
      <h1 className="mb-10 mt-40 sm:mt-32 font-bold tracking-tight text-center text-gray-100 md:text-xl lg:text-4xl">
        Wishlist
      </h1>
      <section className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 bg-transparent p-10">
          <Card />
        </div>
      </section>
    </section>
  );
};

export default Wishlist;
