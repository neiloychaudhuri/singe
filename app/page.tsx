import SingeForm from "@/components/form/SingeForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black text-zinc-100 tracking-tight mb-4">
          How cooked are you?
        </h1>
        <p className="text-zinc-500 text-lg max-w-md mx-auto">
          Answer 6 quick questions. Get a brutally honest score,
          an AI-powered roast, and a hype-up you didn&apos;t ask for.
        </p>
      </div>
      <SingeForm />
    </div>
  );
}
