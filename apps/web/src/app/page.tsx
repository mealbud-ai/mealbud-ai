import HeroAnimation from '@/components/hero-animation';
import TweetWall from '@/components/tweet-wall';

export default function Home() {
  return (
    <main className="relative">
      <section className="pt-1 mx-auto relative z-10 bg-gradient-to-b from-background via-background to-primary">
        <div className="space-y-4 w-full py-20 mt-16 container mx-auto">
          <p className="text-lg md:text-xl font-normal text-center">
            <strong className="font-normal text-primary">
              AI Daily Nutrition Assistant
            </strong>
          </p>
          <h1 className="text-5xl lg:text-8xl text-center font-semibold">
            Be aware of what you eat
            <br />
            every day with Mealbud
          </h1>
          <h2 className="text-lg md:text-2xl text-center">
            Just describe your meal. Mealbud gives you instant insights into
            calories, nutrients and habits.
            <br />
            Stay mindful of what you eat every day and take control of your
            health.
          </h2>
        </div>
        <div className="mt-16 relative container mx-auto">
          <div className="absolute inset-0 z-10 pointer-events-none h-1/5 top-auto"></div>
          <div className="bg-card backdrop-blur-sm rounded-t-lg border shadow-sm overflow-hidden border-b-0">
            <div className="p-4 border-b flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <div className="ml-4 text-sm text-slate-400">mealbud.ai</div>
            </div>
            <div className="p-6 min-h-[300px] h-auto">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>
      <TweetWall />
    </main>
  );
}
