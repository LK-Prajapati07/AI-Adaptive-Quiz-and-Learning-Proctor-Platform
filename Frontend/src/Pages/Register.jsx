import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

// import {
//   auth,
//   googleProvider,
// } from "@/firebase/firebase.config";

import { useLoginHook } from "@/customHook/auth.hook";
import { auth, googleProvider } from "@/firebase";

const Register = () => {
  const navigate = useNavigate();

  const { mutateAsync } = useLoginHook();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      role: "Student",
    },
  });

  // ===============================
  // GOOGLE REGISTER
  // ===============================

  const handleGoogleSignIn = async () => {
    try {
      const role = watch("role");

      const result = await signInWithPopup(auth, googleProvider);

      const idToken = await result.user.getIdToken();

      await mutateAsync({
        idToken,
        role,
      });

      toast.success("Google Register Successful 🎉");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };



  const registerHandler = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      await sendEmailVerification(userCredential.user);

      await signOut(auth);

      toast.success("Verification email sent 📩");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="
      min-h-screen flex items-center justify-center
      bg-linear-to-br
      from-blue-50 via-white to-purple-50
      px-4
    "
    >
      <div
        className="
        w-full max-w-md
        bg-white rounded-2xl
        shadow-xl p-8
      "
      >
        {/* Header */}

        <div className="text-center mb-8">
          <h1
            className="
            text-3xl font-bold text-gray-900
          "
          >
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Start your learning journey today
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit(registerHandler)} className="space-y-5">
          {/* NAME */}

          <div>
            <label className="text-sm font-medium">Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
              className="
                mt-2 w-full px-4 py-3
                border rounded-xl
                focus:ring-2
                focus:ring-blue-500
                outline-none
              "
            />
          </div>

          {/* EMAIL */}

          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter email"
              {...register("email", { required: true })}
              className="
                mt-2 w-full px-4 py-3
                border rounded-xl
                focus:ring-2
                focus:ring-blue-500
                outline-none
              "
            />
          </div>

          {/* PASSWORD */}

          <div>
            <label className="text-sm font-medium">Password</label>

            <input
              type="password"
              placeholder="Create password"
              {...register("password", { required: true })}
              className="
                mt-2 w-full px-4 py-3
                border rounded-xl
                focus:ring-2
                focus:ring-blue-500
                outline-none
              "
            />
          </div>

          {/* ROLE */}

          <div>
            <label className="text-sm font-medium">Role</label>

            <select
              {...register("role")}
              className="
                mt-2 w-full
                px-4 py-3
                border rounded-xl
                outline-none
              "
            >
              <option value="Student">Student</option>

              <option value="Recruiter">Recruiter</option>

              <option value="Trainer">Trainer</option>
            </select>
          </div>

          {/* PROFILE PHOTO UI ONLY */}

          <div>
            <label className="text-sm font-medium">Profile Photo</label>

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

          {/* SUBMIT */}

          <button
            type="submit"
            className="
              w-full py-3
              rounded-xl
              bg-blue-600
              text-white
              font-semibold
              hover:bg-blue-700
              transition
            "
          >
            Register
          </button>
        </form>

        {/* Divider */}

        <div
          className="
          flex items-center my-6
        "
        >
          <div
            className="
            flex-1 h-px bg-gray-300
          "
          />

          <span
            className="
            px-3 text-gray-400 text-sm
          "
          >
            OR
          </span>

          <div
            className="
            flex-1 h-px bg-gray-300
          "
          />
        </div>

        {/* GOOGLE */}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="
            w-full py-3
            border rounded-xl
            flex justify-center
            items-center
            gap-3
            hover:bg-gray-50
            transition
          "
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>

        {/* LOGIN LINK */}

        <p
          className="
          text-center
          text-sm
          text-gray-500
          mt-6
        "
        >
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
