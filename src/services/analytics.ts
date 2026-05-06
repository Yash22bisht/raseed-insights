import { http, unwrap } from "./http";

export type CategoryStat = {
  name: string;
  amount: number;
  percentage?: number;
};

export type TrendPoint = { label: string; amount: number };

export type AnalyticsSummary = {
  totalSpent: number;
  budget?: number;
  remaining?: number;
  changePct?: number;
  categories: CategoryStat[];
  trend: TrendPoint[];
  topMerchants?: Array<{ name: string; amount: number; visits?: number }>;
};

export async function getAnalyticsSummary(range: string = "month") {
  const { data } = await http.get("/analytics/summary", { params: { range } });
  return unwrap<AnalyticsSummary>(data);
}

export type AiInsight = {
  id?: string;
  title: string;
  description: string;
  type?: "warning" | "success" | "tip" | "info";
  category?: string;
};

export async function getAiInsights() {
  const { data } = await http.get("/ai/insights");
  const payload = unwrap<AiInsight[] | { insights: AiInsight[] }>(data);
  if (Array.isArray(payload)) return payload;
  return payload?.insights ?? [];
}