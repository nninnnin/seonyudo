"use client";

import React from "react";
import { useSearchParams, redirect } from "next/navigation";
import dynamic from "next/dynamic";

import { GuideSubjects } from "@/views/guide/constants";

const GuideChat = dynamic(
  () => import("@/views/guide/components/GuideChat"),
  {
    ssr: false,
  }
);

export default function GuidePage() {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");

  if (!subject) {
    redirect("/guide?subject=" + GuideSubjects.Notice);
  }

  return <GuideChat />;
}
