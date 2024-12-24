import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rank: { type: String, required: true },
  solvedQuestions: { type: Number, default: 0 },
  recentActivity: { type: Array, default: [] },
  streak: { type: Number, default: 0 },
  recentContests: { type: Array, default: [] },
});

export default mongoose.model("UserStats", userStatsSchema);
