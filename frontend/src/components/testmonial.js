import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../style/testmonial.css";
import { Link } from "react-router-dom";

const categories = [
  {
    _id: "db531703-552b-457f-9636-be93b7318bfd",
    categoryName: "Fantasy",
    imgUrl:
      "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Fantasy.webp?updatedAt=1685900046954",
    description:
      "Fantasy books involves magic, creatures, quests, and battles between good and evil.",
  },
  {
    _id: "135e068a-6ce6-4dff-9769-0f1f6e516ca7",
    categoryName: "Drama",
    imgUrl:
      "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Drama.webp?updatedAt=1685900145239",
    description:
      "Drama often portray complex and conflicting human emotions, relationships, and situations.",
  },
  {
    _id: "2c12dac4-315b-4dac-93f0-22316f9d2105",
    categoryName: "Biography",
    imgUrl:
      "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Biography.webp?updatedAt=1685900145357",
    description:
      "Biography is accurate, comprehensive portrayal of subjects in compelling narratives.",
  },
  {
    _id: "2aad9bce-f932-44bf-8d13-0a0109dcbb5e",
    categoryName: "Non-Fiction",
    imgUrl:
      "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Non-Fiction.webp?updatedAt=1685900007386",
    description:
      "Non-fiction describes real events, rather than telling a story.",
  },
  {
    _id: "f5645c4e-e81d-40f1-a9ed-3b78fcbee698",
    categoryName: "Horror",
    imgUrl:
      "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Horror.webp?updatedAt=1685899510911",
    description: "Horror is meant to cause discomfort and fear for readers.",
  },
  {
    _id: "f7898a2d-b1e2-4c97-bf5a-17c3a9d8e246",
    categoryName: "Fiction",
    imgUrl:
      "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Fiction.webp?updatedAt=1685899510905",
    description:
      "Fiction is Imaginative genre, author's creativity shaping made-up stories.",
  },
  {
    _id: "c4321b6f-53d7-4e9e-81a8-9f35b7a2dcf3",
    categoryName: "Thriller",
    imgUrl:
      "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Thriller.webp?updatedAt=1685899510859",
    description:
      "Thriller is suspenseful, action-packed genre with unexpected twists and danger.",
  },
  {
    _id: "98765432-1234-5678-9876-543210abcdef",
    categoryName: "Classic",
    imgUrl:
      "https://ik.imagekit.io/pb97gg2as/E-Commerce-Assets/Categories/Classic.webp?updatedAt=1685980971579",
    description:
      "Classic books are Enduring masterpieces across genres, timeless tales that inspire readers.",
  },
];

function Testimonial() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <>
      <div className="AA">
        <div className="parent">
          <h2 className="text-2xl font-bold mt-20 text-white">Top Rated</h2>
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisible={false}
            arrows={false}
            dotListClass="custom-dot-list-style"
            transitionDuration={5000}
          >
            {categories.map((data, index) => {
              return (
                <div className="slider" key={index}>
                  <Link
                    to={`/products/${data.categoryName}`}
                    id={data._id}
                    title={data.description}
                  >
                    <button className="pb-2 bg-gray-700 border w-72 h-60 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] border-gray-400 transition-all duration-200 rounded-lg cursor-pointer backdrop-filter backdrop-blur-md hover:bg-gray-600 hover:bg-opacity-60 bg-opacity-60">
                      <div className="relative">
                        <img
                          src={data.imgUrl}
                          className="w-72 h-40 max-w-xs p-2"
                          alt="img"
                        />
                        <div className="absolute px-4 ml-4 text-sm leading-7 text-gray-100 bg-gray-600 bottom-3 backdrop-blur-md backdrop-filter bg-clip-padding bg-opacity-20 lg:gap-x-10 md:flex rounded-xl">
                          <span className="cursor-pointer">
                            {data.categoryName}
                          </span>
                        </div>
                      </div>
                      <p className="mx-4 text-sm text-gray-100 sm:block">
                        {data.description}
                      </p>
                    </button>
                  </Link>
                </div>
              );
            })}
          </Carousel>
          <br />
        </div>
      </div>
    </>
  );
}

export default Testimonial;
