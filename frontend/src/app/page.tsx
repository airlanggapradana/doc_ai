import Benefits from "@/components/landingPage/Benefits";
import Hero from "@/components/landingPage/Hero";

export default function HomePage() {
  return (
    <section className="bg-white">
      <div className="w-full px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="w-full">
          <div className="mx-auto max-w-screen-2xl">
            <Hero />

            <Benefits />
          </div>
        </div>
      </div>
    </section>
  );
}
