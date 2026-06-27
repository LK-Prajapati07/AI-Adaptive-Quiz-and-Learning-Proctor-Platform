import { History } from "lucide-react";

import AttemptCard from "./components/AttemptCard";
import { useUserAttempts } from "@/customHook/attempt.hook";


const AttemptHistory = () => {
  const { data, isLoading } = useUserAttempts();
  console.log(data)

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading Attempts...</h2>
      </div>
    );
  }

  const attempts = data?.attempts ;
  console.log(attempts)

  return (
    <div className="p-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">
        <History className="text-blue-600" size={32} />

        <div>
          <h1 className="text-3xl font-bold">Attempt History</h1>

          <p className="text-gray-500">View all your previous quiz attempts.</p>
        </div>
      </div>

      {/* Summary */}

      <div className="bg-white rounded-xl shadow border p-6 mb-8">
        <h2 className="text-xl font-semibold">Total Attempts</h2>

        <p className="text-4xl font-bold text-blue-600 mt-3">
          {data?.total || 0}
        </p>
      </div>

      {/* Empty State */}

      {attempts.length === 0 && (
        <div className="bg-white rounded-xl shadow border p-10 text-center">
          <h2 className="text-2xl font-semibold">No Attempts Found</h2>

          <p className="text-gray-500 mt-3">
            Start your first quiz to see your history.
          </p>
        </div>
      )}

      {/* Attempts */}

      <div className="grid gap-6">
        {attempts.map((attempt) => (
          <AttemptCard key={attempt._id} attempt={attempt} />
        ))}
      </div>
    </div>
  );
};

export default AttemptHistory;
