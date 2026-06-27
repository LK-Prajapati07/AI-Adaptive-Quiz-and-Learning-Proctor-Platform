import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiUploadCloud, FiBookOpen, FiFileText, FiCheck, FiLayers } from "react-icons/fi";
import { useCreateQuiz } from "@/customHook/useQuiz.hook";

const categories = [
  "Programming",
  "Aptitude",
  "General Knowledge",
  "Science",
  "Mathematics",
  "English",
  "Interview Preparation",
];

const difficulties = ["Easy", "Medium", "Hard", "Mixed"];
const questionTypes = ["MCQ", "TRUE_FALSE", "FILL_BLANK", "SUBJECTIVE"];

const CreateQuiz = () => {
  const { mutate, isPending } = useCreateQuiz();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isAdaptive: false,
      isRandomized: false,
    },
  });

  // Watching these fields to add dynamic styles for custom checkbox pills
  const watchRandomized = watch("isRandomized");
  const watchAdaptive = watch("isAdaptive");

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "file") {
        formData.append("file", data.file[0]);
      } else {
        formData.append(key, data[key]);
      }
    });
    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-slate-50 to-violet-50 flex justify-center items-center p-4 sm:p-8 antialiased selection:bg-indigo-500/20">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl rounded-3xl border border-white bg-white/70 backdrop-blur-xl p-6 sm:p-12 shadow-[0_20px_50px_rgba(99,102,241,0.08)]"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200/60">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm tracking-wide uppercase mb-1">
              <FiBookOpen /> AI Assistant
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
              Create Smart Quiz
            </h1>
            <p className="text-slate-500 mt-1">
              Upload a source document and let your configuration define the test environment.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-indigo-50 rounded-2xl border border-indigo-100/80">
            <FiFileText className="text-indigo-500 text-lg" />
            <span className="text-xs font-medium text-indigo-700">PDF Document Parser Engine v2</span>
          </div>
        </div>

        {/* Form Elements */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Title */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 tracking-wide">Quiz Title</label>
            <input
              type="text"
              placeholder="e.g., React Hooks Advanced Assessment"
              {...register("title", { required: "Title is required" })}
              className={`w-full mt-2 rounded-xl bg-white/90 border ${
                errors.title ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 focus:ring-indigo-500/20"
              } p-3.5 text-slate-800 placeholder-slate-400 outline-none transition shadow-sm focus:border-indigo-500 focus:ring-4`}
            />
            {errors.title && <p className="text-red-500 text-xs font-medium mt-1.5 ml-1">{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-semibold text-slate-700 tracking-wide">Category</label>
            <div className="relative">
              <select
                {...register("category")}
                className="w-full mt-2 rounded-xl bg-white/90 border border-slate-200 p-3.5 text-slate-700 outline-none transition shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 appearance-none cursor-pointer"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <div className="absolute right-4 top-[58%] pointer-events-none border-l-2 border-b-2 border-slate-400 w-2 h-2 -rotate-45" />
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm font-semibold text-slate-700 tracking-wide">Difficulty Level</label>
            <div className="relative">
              <select
                {...register("difficulty")}
                className="w-full mt-2 rounded-xl bg-white/90 border border-slate-200 p-3.5 text-slate-700 outline-none transition shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 appearance-none cursor-pointer"
              >
                {difficulties.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <div className="absolute right-4 top-[58%] pointer-events-none border-l-2 border-b-2 border-slate-400 w-2 h-2 -rotate-45" />
            </div>
          </div>

          {/* Question Type */}
          <div>
            <label className="text-sm font-semibold text-slate-700 tracking-wide">Question Type</label>
            <div className="relative">
              <select
                {...register("questionType")}
                className="w-full mt-2 rounded-xl bg-white/90 border border-slate-200 p-3.5 text-slate-700 outline-none transition shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 appearance-none cursor-pointer"
              >
                {questionTypes.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <div className="absolute right-4 top-[58%] pointer-events-none border-l-2 border-b-2 border-slate-400 w-2 h-2 -rotate-45" />
            </div>
          </div>

          {/* Total Questions */}
          <div>
            <label className="text-sm font-semibold text-slate-700 tracking-wide">Total Questions</label>
            <input
              type="number"
              min="1"
              placeholder="10"
              {...register("totalQuestions")}
              className="w-full mt-2 rounded-xl bg-white/90 border border-slate-200 p-3.5 text-slate-800 placeholder-slate-400 outline-none transition shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-semibold text-slate-700 tracking-wide">Duration (Minutes)</label>
            <input
              type="number"
              min="1"
              placeholder="30"
              {...register("duration")}
              className="w-full mt-2 rounded-xl bg-white/90 border border-slate-200 p-3.5 text-slate-800 placeholder-slate-400 outline-none transition shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
            />
          </div>

          {/* Passing Marks */}
          <div>
            <label className="text-sm font-semibold text-slate-700 tracking-wide">Passing Marks</label>
            <input
              type="number"
              placeholder="50"
              {...register("passingMarks")}
              className="w-full mt-2 rounded-xl bg-white/90 border border-slate-200 p-3.5 text-slate-800 placeholder-slate-400 outline-none transition shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
            />
          </div>

          {/* Total Marks */}
          <div className="md:col-span-2 lg:col-span-1">
            <label className="text-sm font-semibold text-slate-700 tracking-wide">Total Marks</label>
            <input
              type="number"
              placeholder="100"
              {...register("totalMarks")}
              className="w-full mt-2 rounded-xl bg-white/90 border border-slate-200 p-3.5 text-slate-800 placeholder-slate-400 outline-none transition shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 tracking-wide">Description</label>
            <textarea
              rows={4}
              placeholder="Provide context or rules instructions for students taking this quiz..."
              {...register("description")}
              className="w-full mt-2 rounded-xl bg-white/90 border border-slate-200 p-4 text-slate-800 placeholder-slate-400 outline-none transition shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 resize-none"
            />
          </div>

          {/* Upload Dropzone */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 tracking-wide block mb-2">Upload Reference Materials</label>
            <label className="flex flex-col justify-center items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 cursor-pointer hover:bg-indigo-50/40 hover:border-indigo-400 transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-indigo-50/0 to-indigo-50/20 opacity-0 group-hover:opacity-100 transition" />
              
              <div className="p-4 rounded-full bg-white shadow-md text-indigo-500 group-hover:scale-110 transition relative z-10">
                <FiUploadCloud size={32} />
              </div>

              <p className="text-slate-700 font-semibold mt-4 relative z-10">
                Click to browse or drag & drop files here
              </p>
              <p className="text-slate-400 text-xs mt-1 relative z-10">
                Exclusively supporting standard document vectors (.PDF)
              </p>

              <input
                type="file"
                accept=".pdf"
                hidden
                {...register("file", { required: "PDF attachment is required to build context models" })}
              />
            </label>
            {errors.file && <p className="text-red-500 text-xs font-medium mt-2 ml-1">{errors.file.message}</p>}
          </div>

          {/* Custom Feature Badges Checkboxes */}
          <div className="flex flex-wrap gap-4 md:col-span-2 my-2">
            {/* Randomized Pill Button */}
            <label className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border cursor-pointer select-none font-medium text-sm transition-all shadow-sm ${
              watchRandomized 
                ? "bg-indigo-500 border-indigo-500 text-white shadow-indigo-200" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}>
              <input type="checkbox" {...register("isRandomized")} className="hidden" />
              <div className={`w-4 h-4 rounded-md flex items-center justify-center transition border ${watchRandomized ? 'bg-white border-white text-indigo-500' : 'border-slate-300'}`}>
                {watchRandomized && <FiCheck className="text-xs stroke-4" />}
              </div>
              Randomize Questions
            </label>

            {/* Adaptive Pill Button */}
            <label className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border cursor-pointer select-none font-medium text-sm transition-all shadow-sm ${
              watchAdaptive 
                ? "bg-violet-500 border-violet-500 text-white shadow-violet-200" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}>
              <input type="checkbox" {...register("isAdaptive")} className="hidden" />
              <div className={`w-4 h-4 rounded-md flex items-center justify-center transition border ${watchAdaptive ? 'bg-white border-white text-violet-500' : 'border-slate-300'}`}>
                {watchAdaptive && <FiCheck className="text-xs stroke-4" />}
              </div>
              Adaptive AI Calibration
            </label>
          </div>

          {/* Submit Action Button */}
          <motion.button
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            disabled={isPending}
            className="md:col-span-2 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl py-4 font-bold text-white shadow-lg shadow-indigo-200/50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing Prompt & Building Quiz...
              </>
            ) : (
              <>
                <FiLayers /> Deploy Quiz Instantly
              </>
            )}
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
};

export default CreateQuiz;