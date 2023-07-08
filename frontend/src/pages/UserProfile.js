import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const UserProfile = () => {
  const [user_id, setUser_id] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user_id;
        setUser_id(id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  console.log(user_id);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profile_picture: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getUserById/${user_id}`
        );
        const userData = response.data;
        setUserData((prevData) => ({
          ...prevData,
          username: userData[0].username,
          email: userData[0].email,
          profile_picture: userData[0].profile_picture,
        }));
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [user_id]);

  console.log(userData);

  // Retrive the

  // Retrive all the posts
  const [userPosts, setUserPosts] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`/api/users/${user_id}/posts`)
  //     .then((response) => {
  //       setUserPosts(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [user_id]);

  const TABLE_HEAD = ["Favorate Book", "Date"];

  const TABLE_ROWS = [
    {
      name: "",
      date: "",
    },
    {
      name: "",
      date: "",
    },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                'url("https://static-cse.canva.com/blob/921439/ImagebyStanislavKondratievviaUnsplash.jpg")',
            }}
          ></div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x={0}
              y={0}
            >
              <polygon
                className="text-brown-100 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-brown-100">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={userData.profile_picture}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <Link
                        to="/editForm"
                        className="bg-gray-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Edit Profile
                      </Link>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                    {userData.username}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-envelope mr-2 text-lg text-blueGray-400" />
                    {userData.email}
                  </div>
                </div>

                <div className=" py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <div className="text-center">
                        <div className="text-sm leading-normal mb-2 text-blueGray-400 font-bold uppercase">
                          Your Wish List
                        </div>
                      </div>

                      <Card className="overflow-scroll h-full w-full">
                        <table className="w-full min-w-max table-auto text-center">
                          <thead>
                            <tr>
                              {TABLE_HEAD.map((head) => (
                                <th
                                  key={head}
                                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                  >
                                    {head}
                                  </Typography>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {/* ----------------------------------Retriving the wishlist------------------------------------- */}
                            {TABLE_ROWS.map(({ name, date }, index) => {
                              const isLast = index === TABLE_ROWS.length - 1;
                              const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                              return (
                                <tr key={name}>
                                  <td className={classes}>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {name}
                                    </Typography>
                                  </td>
                                  <td className={classes}>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {date}
                                    </Typography>
                                  </td>
                                </tr>
                              );
                            })}
                            {/* ------------------------------------------------------------------------------------ */}
                          </tbody>
                        </table>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Posts */}
            <div className="w-full bg-gray-200 dark:bg-gray-900 py-10">
              <div className="container mx-auto px-6 flex items-start justify-center">
                {/* <div className="w-full">
                  {userPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-col lg:flex-row mx-auto bg-white dark:bg-gray-800 shadow rounded"
                    >
                      <div className="w-full lg:w-1/3 px-12 flex flex-col items-center py-10">
                        <div className="w-24 h-24 mb-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <img
                            className="w-full h-full overflow-hidden object-cover rounded-full"
                            src={post.avatar}
                            alt="User Img"
                          />
                        </div>
                        <h2 className="text-gray-800 dark:text-gray-100 text-xl tracking-normal font-medium mb-1">
                          {post.username}
                        </h2>
                        <p className="flex text-gray-600 dark:text-gray-100 text-sm tracking-normal font-normal mb-3 text-center">
                          Created at {post.createdAt}
                        </p>
                        <h6 className="text-gray-600 dark:text-gray-100 text-xl leading-6 mb-2 text-center">
                          {post.title}
                        </h6>
                        <p className="text-gray-600 dark:text-gray-100 text-sm tracking-normal font-normal mb-8 text-center w-10/12">
                          {post.content}
                        </p>
                        <div className="flex items-start">
                          <div className>
                            <h2 className="text-gray-600 dark:text-gray-100 text-2xl leading-6 mb-2 text-center">
                              Status
                            </h2>
                            <p className="text-gray-800 dark:text-gray-100 text-sm leading-5">
                              {post.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserProfile;
