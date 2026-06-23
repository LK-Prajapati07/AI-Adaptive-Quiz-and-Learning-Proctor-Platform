import React from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { auth, googleProvider } from "@/firebase";
import { useLoginHook } from "@/customHook/auth.hook";

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      role: "Student",
    },
  });

  const { mutateAsync } = useLoginHook();

  const loginHandler = async (data) => {
    console.log
    // try {
    //   const userCredential = await signInWithEmailAndPassword(
    //     auth,
    //     data.email,
    //     data.password,
    //     data.role,
    //   );

    //   const user = userCredential.user;

    //   if (!user.emailVerified) {
    //     await signOut(auth);

    //     toast.warning("Please verify your email before login");

    //     return;
    //   }

    //   const idToken = await user.getIdToken();
    //   console.log(idToken)

    //   mutateAsync({
    //     idToken,
    //     role: data.role,
    //   });
    //   toast.success("Login Successful 🎉");

    //   navigate("/dashboard");
    // } catch (error) {
    //   toast.error(error?.message || "Something went wrong");
    // }
  };


const handleGoogleSignIn = async () => {
  try {

    const role = watch("role");

    console.log("ROLE:", role);

    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    const idToken =
      await result.user.getIdToken();


     mutateAsync({
      idToken,
      role,
    });


    toast.success(
      "Google Login Successful 🎉"
    );

    navigate("/dashboard");

  } catch(error){

    toast.error(
      error?.response?.data?.message ||
      error.message
    );

  }
};

  const forgetPassword = async () => {
    try {
      const email = watch("email");

      if (!email) {
        toast.warning("Enter email first");

        return;
      }

      await sendPasswordResetEmail(auth, email);

      toast.success("Reset link sent to email");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

          <p className="text-gray-500 mt-2">
            Login to continue your learning journey
          </p>
        </div>

        <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
          <div>
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              {...register("email")}
              className="mt-2 w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
              className="mt-2 w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <button
            type="button"
            onClick={forgetPassword}
            className="text-blue-600"
          >
            Forgot Password?
          </button>
          <div>
            <label>Login as</label>

            <select
              {...register("role")}
              className="
      mt-2 
      w-full 
      px-4 
      py-3 
      border 
      rounded-xl
      bg-white
    "
            >
              <option value="Student">Student</option>

              <option value="Trainer">Trainer</option>

              <option value="Recruiter">Recruiter</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl"
          >
            Login
          </button>
        </form>

        <div className="my-6 text-center">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 border rounded-xl"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>

        <p className="text-center mt-6">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer ml-2"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
