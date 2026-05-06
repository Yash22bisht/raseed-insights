import { useEffect, useState } from "react";
import { getAnalyticsSummary, getAiInsights, type AnalyticsSummary, type AiInsight } from "@/services/analytics";
import { getReceiptHistory, type Receipt } from "@/services/receipts";

export function useDashboard() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [insights, setInsights] = useState<AiInsight[]>([]);
  const [recent, setRecent] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [s, i, r] = await Promise.allSettled([
          getAnalyticsSummary("month"),
          getAiInsights(),
          getReceiptHistory({ page: 1, pageSize: 5, sortBy: "date", sortOrder: "desc" }),
        ]);
        if (cancelled) return;
        if (s.status === "fulfilled") setSummary(s.value);
        if (i.status === "fulfilled") setInsights(i.value);
        if (r.status === "fulfilled") setRecent(r.value.data ?? []);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load dashboard");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { summary, insights, recent, loading, error };
}