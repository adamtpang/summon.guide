"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedbackModal({
  figureSlug,
  figureName,
  onClose,
}: {
  figureSlug: string;
  figureName: string;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          figureSlug,
          rating,
          comment: comment.trim() || undefined,
        }),
      });
      setSubmitted(true);
      setTimeout(onClose, 1500);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">🙏</div>
              <p className="text-slate-900 text-lg font-medium">Thank you!</p>
              <p className="text-slate-500 text-sm mt-1">
                Your feedback helps us improve.
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-slate-900 text-lg font-medium text-center mb-1">
                How was your conversation?
              </h3>
              <p className="text-slate-500 text-sm text-center mb-6">
                with {figureName}
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setRating(star)}
                    className="text-3xl transition-transform hover:scale-110 active:scale-95"
                    style={{ minWidth: 44, minHeight: 44 }}
                  >
                    {star <= (hoveredStar || rating) ? "⭐" : "☆"}
                  </button>
                ))}
              </div>

              {/* Comment (shows if < 5 stars) */}
              {rating > 0 && rating < 5 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mb-4"
                >
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="What would make it better?"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 resize-none focus:outline-none focus:border-blue-400"
                    rows={3}
                  />
                </motion.div>
              )}

              {/* Submit */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 text-slate-500 text-sm rounded-xl hover:text-slate-700 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={submit}
                  disabled={rating === 0 || submitting}
                  className="flex-1 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  {submitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
