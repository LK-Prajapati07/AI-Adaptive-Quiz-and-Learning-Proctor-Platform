import React from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { FcGoogle } from "react-icons/fc";

import { useForm } from "react-hook-form";

import { toast } from "sonner";

import { auth, googleProvider } from "@/firebase";

import { useLoginHook } from "@/customHook/auth.hook";

const Login = () => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      role: "Student",
    },
  });

  const { mutate, isPending } = useLoginHook();

  // EMAIL LOGIN

  const loginHandler = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const firebaseUser = userCredential.user;
      if (!firebaseUser.emailVerified) {
        await signOut(auth);
        toast.warning("Please verify your email");
        return;
      }
      const idToken = await firebaseUser.getIdToken();
      await mutate({
        idToken,

        role: data.role,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const role = watch("role");

      const result = await signInWithPopup(auth, googleProvider);

      const idToken = await result.user.getIdToken();

      await mutate({
        idToken,

        role,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // FORGOT PASSWORD

  const forgetPassword = async () => {
    try {
      const email = watch("email");

      if (!email) {
        toast.warning("Enter email first");

        return;
      }

      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="
min-h-screen
flex
items-center
justify-center
bg-linear-to-br
from-blue-50
via-white
to-purple-50
px-4
"
    >
      <div
        className="
w-full
max-w-md
bg-white
rounded-2xl
shadow-xl
p-8
"
      >
        <h1
          className="
text-3xl
font-bold
text-center
"
        >
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit(loginHandler)} className="space-y-5 mt-8">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="
w-full
border
px-4
py-3
rounded-xl
"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="
w-full
border
px-4
py-3
rounded-xl
"
          />

          <button
            type="button"
            onClick={forgetPassword}
            className="
text-blue-600
"
          >
            Forgot Password?
          </button>

          <select
            {...register("role")}
            className="
w-full
border
px-4
py-3
rounded-xl
"
          >
            <option value="Student">Student</option>

            <option value="Trainer">Trainer</option>

            <option value="Recruiter">Recruiter</option>
          </select>

          <button
            disabled={isPending}
            className="
w-full
bg-blue-600
text-white
py-3
rounded-xl
"
          >
            {isPending ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="my-6 text-center">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="
w-full
border
py-3
rounded-xl
flex
items-center
justify-center
gap-3
"
        >
          <FcGoogle className="text-2xl" />
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
