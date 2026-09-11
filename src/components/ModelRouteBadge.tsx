import { Badge } from "@/components/ui/badge";
import type { ModelRouteMeta } from "@/lib/aiTypes";

export default function ModelRouteBadge({
  route,
  tone = "light",
}: {
  route: ModelRouteMeta;
  tone?: "light" | "dark";
}) {
  const prefix = route.tier === "free" ? "Free" : "Saver";
  const fallback = route.fallbackDepth > 0 ? ` · fallback ${route.fallbackDepth + 1}` : "";

  return (
    <Badge
      variant="outline"
      title={`${route.provider}: ${route.model}`}
      className={
        tone === "dark"
          ? "h-5 rounded-full border-white/15 bg-white/5 px-2 text-[10px] font-normal text-white/55"
          : "h-5 rounded-full border-slate-300/70 bg-white/55 px-2 text-[10px] font-normal text-slate-500 backdrop-blur-sm"
      }
    >
      {prefix} · {route.modelLabel}{fallback}
    </Badge>
  );
}
