import { ImageResponse } from "next/og";
import { SUMMON_MARK_SVG } from "@/lib/brandMark";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(<img alt="" width={32} height={32} src={`data:image/svg+xml;base64,${Buffer.from(SUMMON_MARK_SVG).toString("base64")}`} />, size);
}
