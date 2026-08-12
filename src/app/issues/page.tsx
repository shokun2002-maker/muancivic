import { redirect } from "next/navigation";

export default function IssuesIndexPage() {
  redirect("/issues/current");
}
