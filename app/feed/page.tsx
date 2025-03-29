import FeedLayout from "@/components/feed/feed-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FloodSpy - Relief Feed",
  description: "Stay updated with the latest flood information and relief efforts",
}

export default function FeedPage() {
  return <FeedLayout />
}

