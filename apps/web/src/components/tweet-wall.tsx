import { buttonVariants } from '@repo/ui/components/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { cn } from '@repo/ui/lib/utils';
import { ArrowUpRightIcon, PlayIcon } from 'lucide-react';
import Link from 'next/link';

type Tweet = {
  id: string;
  name: string;
  avatar: string;
  handle: string;
  text: string;
  date: string;
  isVerified: boolean;
};

type Video = {
  id: string;
  name: string;
  handle: string;
  image: string;
};

const tweets: Tweet[] = [
  {
    id: '1',
    name: 'Clara D.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    handle: '@clara_eats',
    text: "I've been testing Mealbud for a few days — it's wild how accurate the calorie estimates are 👀🍽️ Definitely my new go-to before logging anything manually.",
    date: '2024-12-21T14:23:00Z',
    isVerified: true,
  },
  {
    id: '2',
    name: 'Lucas R.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    handle: '@lucas_dev',
    text: 'Finally found an app that lets me track my food without the boring manual input. Shoutout to Mealbud 🙌',
    date: '2025-01-02T09:45:00Z',
    isVerified: false,
  },
  {
    id: '3',
    name: 'Sophie A.',
    avatar: 'https://i.pravatar.cc/150?img=3',
    handle: '@sophiefit',
    text: 'Mealbud is like having a tiny dietitian in your pocket. Except it doesn’t judge you when you eat pizza. 🍕💖 It even gave me a breakdown of the nutrients in a smoothie I made with 4 ingredients. Wild.',
    date: '2025-02-10T19:08:00Z',
    isVerified: true,
  },
  {
    id: '4',
    name: 'Nassim',
    avatar: 'https://i.pravatar.cc/150?img=9',
    handle: '@nassimlabs',
    text: "Mealbud's weekly nutrition breakdown is clean, simple, and actually useful. I can see where I’m slacking (fiber, always fiber 🙄) and where I’m doing better than I thought.",
    date: '2025-03-18T11:27:00Z',
    isVerified: false,
  },
];

const videos: Video[] = [
  {
    id: 'video-1',
    name: 'Mealbud AI',
    handle: '@mealbud.ai',
    image: '/images/placeholder.svg',
  },
  {
    id: 'video-2',
    name: 'Mealbud AI',
    handle: '@mealbud.ai',
    image: '/images/placeholder.svg',
  },
  {
    id: 'video-3',
    name: 'Mealbud AI',
    handle: '@mealbud.ai',
    image: '/images/placeholder.svg',
  },
  {
    id: 'video-4',
    name: 'Mealbud AI',
    handle: '@mealbud.ai',
    image: '/images/placeholder.svg',
  },
];

const NUM_COLUMNS = 4;

export default function TweetWall() {
  // Crée les colonnes vides
  const tweetColumns: Tweet[][] = Array.from({ length: NUM_COLUMNS }, () => []);
  const videoColumns: Video[][] = Array.from({ length: NUM_COLUMNS }, () => []);

  // Répartition équitable des tweets
  tweets.forEach((tweet, i) => {
    const columnIndex = i % NUM_COLUMNS;
    if (tweetColumns[columnIndex]) {
      tweetColumns[columnIndex].push(tweet);
    }
  });

  // Répartition équitable des vidéos
  videos.forEach((video, i) => {
    const columnIndex = i % NUM_COLUMNS;
    if (videoColumns[columnIndex]) {
      videoColumns[columnIndex].push(video);
    }
  });

  return (
    <section className="mx-auto bg-muted/70 py-16">
      <div className="container mx-auto relative">
        <div className="flex items-start justify-between w-full">
          <h2 className="text-left text-balance text-foreground mb-4 text-4xl font-normal">
            Approved by over 10,000 users
            <br />
            on social media
          </h2>
          <Link
            href="https://x.com/search?q=%23mealbud.ai"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'default', size: 'xl' }),
              'items-center',
            )}
          >
            See more reviews on X
            <ArrowUpRightIcon className="size-5" />
          </Link>
        </div>

        <div className="relative flex gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
            {[0, 1, 2, 3].map((colIndex) => {
              const tweetsInCol = tweetColumns[colIndex] || [];
              const videosInCol = videoColumns[colIndex] || [];
              const startsWithTweet = colIndex % 2 === 0;
              const maxItems = Math.max(tweetsInCol.length, videosInCol.length);
              const interleaved: (Tweet | Video)[] = [];

              for (let i = 0; i < maxItems; i++) {
                if (startsWithTweet) {
                  const tweet = tweetsInCol[i];
                  const video = videosInCol[i];
                  if (tweet !== undefined) interleaved.push(tweet);
                  if (video !== undefined) interleaved.push(video);
                } else {
                  const video = videosInCol[i];
                  const tweet = tweetsInCol[i];
                  if (video !== undefined) interleaved.push(video);
                  if (tweet !== undefined) interleaved.push(tweet);
                }
              }

              return (
                <ul key={colIndex} className="flex flex-col gap-4">
                  {interleaved.map((item) =>
                    'text' in item ? (
                      <li
                        key={item.id}
                        className="bg-card p-4 rounded-lg shadow-sm"
                      >
                        <div className="grid grid-cols-[2.5rem_1fr] gap-2">
                          <Avatar className="size-10">
                            <AvatarImage src={item.avatar} alt={item.name} />
                            <AvatarFallback>
                              {item.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-xs">
                            <p className="flex items-center gap-1 text-base">
                              {item.name}
                              {item.isVerified && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="13"
                                  viewBox="0 0 12 13"
                                  fill="none"
                                  className="size-4"
                                >
                                  <path
                                    d="..." // raccourci volontaire, tu peux coller ton path ici
                                    fill="#5289FE"
                                  />
                                </svg>
                              )}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                {item.handle}
                              </span>
                            </p>
                          </div>
                        </div>
                        <p className="text-base text-card-foreground mt-2">
                          {item.text}
                        </p>
                        <time className="text-xs text-muted-foreground mt-2">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </time>
                      </li>
                    ) : (
                      <li
                        key={item.id}
                        className="aspect-[9/16] relative overflow-hidden rounded-lg shadow-sm"
                      >
                        <Link
                          href="https://x.com/mealbud.ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-card text-card-foreground hover:bg-card/80 transition-colors duration-200"
                        >
                          <PlayIcon className="size-8" />
                        </Link>
                        <img
                          src={item.image}
                          alt={`${item.name}'s video`}
                          className="object-cover w-full h-full"
                        />
                      </li>
                    ),
                  )}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
