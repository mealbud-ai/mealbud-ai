import TweetWall from '@/components/tweet-wall';
import { Button } from '@repo/ui/components/button';

export default function Home() {
  return (
    <main>
      <section className="flex h-screen items-center justify-center">
        <Button variant="default">Hello world</Button>
      </section>
      <TweetWall />
    </main>
  );
}
