import { permanentRedirect } from "next/navigation";

// The config redirect preserves query strings before this compatibility route runs.
export default function FoundersLensRedirect() {
  permanentRedirect("/sage");
}
