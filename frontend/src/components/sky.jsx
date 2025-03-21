"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";

export function BackgroundBeamsDemo() {
  return (
    (<div
      className=" py-32 w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
<div className="max-w-2xl mx-auto p-4">
  <h1
    className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
    Join the Waitlist
  </h1>
  <p
    className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
    Be the first to experience the all-in-one student dashboard!  
    Seamlessly manage attendance with facial recognition, explore events, and register hassle-free—all in one place.
  </p>

</div>

      <BackgroundBeams />
    </div>)
  );
}
