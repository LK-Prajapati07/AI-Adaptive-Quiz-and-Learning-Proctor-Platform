import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const registerHandler = (data) => {

  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Start your learning journey today
          </p>

        </div>


        <form
          onSubmit={handleSubmit(registerHandler)}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="
                mt-2 w-full px-4 py-3
                border rounded-xl
                focus:ring-2 focus:ring-blue-500
                outline-none
              "
            />
          </div>


          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className="
                mt-2 w-full px-4 py-3
                border rounded-xl
                focus:ring-2 focus:ring-blue-500
                outline-none
              "
            />
          </div>


          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              {...register("password")}
              className="
                mt-2 w-full px-4 py-3
                border rounded-xl
                focus:ring-2 focus:ring-blue-500
                outline-none
              "
            />
          </div>


          {/* Role */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Role
            </label>


            <select
              {...register("role")}
              className="
                mt-2 w-full px-4 py-3
                border rounded-xl
                outline-none
              "
            >

              <option value="Student">
                Student
              </option>
              <option value="Recruiter">
                Recruiter
              </option>

              <option value="Trainer">
                Trainer

              </option>

            </select>

          </div>



          {/* Profile */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Profile Photo
            </label>


            <input
              type="file"
              accept="image/*"
              {...register("profilePhoto")}
              className="
                mt-2 w-full
                border rounded-xl
                px-4 py-3
              "
            />

          </div>




          <button
            type="submit"
            className="
              w-full py-3 rounded-xl
              bg-blue-600 text-white
              font-semibold
              hover:bg-blue-700
              transition
            "
          >

            Register

          </button>


        </form>



        <div className="flex items-center my-6">

          <div className="flex-1 h-px bg-gray-300" />

          <span className="px-3 text-gray-400 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-gray-300" />

        </div>



        <button
          className="
            w-full py-3
            border rounded-xl
            flex justify-center gap-3
            hover:bg-gray-50
            transition
          "
        >

          <FcGoogle className="text-2xl" />

          Continue with Google

        </button>




        <p className="text-center text-sm text-gray-500 mt-6">

          Already have an account?

          <span
            onClick={() => navigate("/login")}
            className="
              text-blue-600
              cursor-pointer
              ml-1
              font-medium
            "
          >

            Login

          </span>

        </p>


      </div>

    </div>
  );
};

export default Register;