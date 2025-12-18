import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../config/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setisGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setisGenerating(true);
      const prompt = `Enhance my professional summary "${data}"`;
      const response = await api.post(
        `/api/ai/enhance-professional-summary`,
        { userContent: prompt },
        { headers: { Authorization: token } }
      );
      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setisGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {/* Left column - Professional Summary */}
        <div className="">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
            Professional Summary
          </h3>
          <p className="text-sm text-neutral-500">
            Add summary for your resume here
          </p>
        </div>

        {/* Right side - AI Enhancing Button */}
        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          rows={7}
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 px-4 mt-2 border text-sm border-neutral-300 rounded-lg focus:ring-blue-500 focus:ring focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professioal summary that highlights your key strengths and career objectives..."
        />

        <p className="text-xs text-neutral-500 max-w-4/5 mx-auto text-center">
          Tip: Keep it concise and focus on your most relevant achievements and
          skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
