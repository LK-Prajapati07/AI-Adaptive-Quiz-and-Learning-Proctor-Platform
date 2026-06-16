import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          LearnHub
        </h1>


        <div className="flex gap-4">

          <button
            onClick={() => navigate("/login")}
            className="
              px-5 py-2
              rounded-xl
              border
              hover:bg-gray-100
              transition
            "
          >
            Login
          </button>


          <button
            onClick={() => navigate("/register")}
            className="
              px-5 py-2
              rounded-xl
              bg-blue-600
              text-white
              hover:bg-blue-700
              transition
            "
          >
            Register
          </button>

        </div>

      </nav>




      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">


        <div>

          <h2 className="
            text-5xl
            font-bold
            text-gray-900
            leading-tight
          ">
            Upgrade Your Skills With Online Courses
          </h2>


          <p className="
            mt-6
            text-gray-600
            text-lg
          ">
            Learn from expert instructors, build real projects,
            and grow your career with our learning platform.
          </p>



          <div className="mt-8 flex gap-4">

            <button
              className="
                px-8 py-3
                rounded-xl
                bg-blue-600
                text-white
                font-semibold
                hover:bg-blue-700
              "
            >

              Explore Courses

            </button>


            <button
              className="
                px-8 py-3
                rounded-xl
                border
                font-semibold
                hover:bg-gray-100
              "
            >

              Become Instructor

            </button>

          </div>


        </div>




        {/* Card */}
        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          p-8
        ">


          <div className="
            h-64
            rounded-2xl
            bg-blue-100
            flex
            items-center
            justify-center
            text-7xl
          ">

            🎓

          </div>



          <div className="mt-6">

            <h3 className="
              text-xl
              font-bold
            ">
              1000+ Online Courses
            </h3>


            <p className="
              text-gray-500
              mt-2
            ">
              Learn anytime, anywhere with lifetime access.
            </p>


          </div>


        </div>


      </section>





      {/* Features */}
      <section className="
        max-w-6xl
        mx-auto
        px-6
        pb-20
        grid
        md:grid-cols-3
        gap-6
      ">


        {[
          ["📚", "Quality Courses"],
          ["👨‍🏫", "Expert Teachers"],
          ["🏆", "Certificates"],
        ].map((item, index) => (

          <div
            key={index}
            className="
              bg-white
              rounded-2xl
              shadow
              p-8
              text-center
            "
          >

            <div className="text-5xl">
              {item[0]}
            </div>


            <h3 className="
              mt-4
              font-bold
              text-xl
            ">
              {item[1]}
            </h3>


            <p className="
              mt-2
              text-gray-500
            ">
              Improve your knowledge with modern learning.
            </p>


          </div>

        ))}


      </section>


    </div>
  );
};

export default Home;