import { redirect } from "next/navigation";

export default function AboutIndexPage() {
  redirect("/about/greeting");
}
