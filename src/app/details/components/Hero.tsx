"use client";

export default function Hero() {
  return (
    <section className="relative w-full h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Move_in_ready_Desktop.webp')" }}
      ></div>

      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6">
        <h1 className="text-white text-6xl md:text-8xl font-bold leading-tight md:leading-snug">
          Book
        </h1>
        <h1 className="text-white text-6xl md:text-8xl font-bold leading-tight md:leading-snug mt-2">
          Beautiful Stays
        </h1>
      </div>
    </section>
  );
}
