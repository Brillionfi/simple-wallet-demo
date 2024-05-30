"use client";

import HomePage from "@/components/HomePage";
import { Suspense } from "react";

export default function () {
  return (
    <Suspense fallback={null}>
      <HomePage />
    </Suspense>
  );
}
