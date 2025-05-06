'use client';

import { FC, memo, type JSX } from 'react';
import { buttonVariants } from '@repo/ui/components/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { cn } from '@repo/ui/lib/utils';
import { ArrowUpRightIcon, PlayIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export interface Tweet {
  id: string;
  name: string;
  avatar: string;
  handle: string;
  text: string;
  date: string;
  isVerified: boolean;
}

export interface Video {
  id: string;
  name: string;
  handle: string;
  image: string;
}

interface TweetItemProps {
  tweet: Tweet;
}

interface VideoItemProps {
  video: Video;
}

interface ContentColumnProps {
  colIndex: number;
  tweetColumn: Tweet[];
  videoColumn: Video[];
}

interface TweetWallProps {
  tweets: Tweet[];
  videos: Video[];
}

const VerifiedBadge: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    className="size-4"
  >
    <path
      d="M11.8328 6.78451C11.8328 7.17703 11.7387 7.54104 11.5506 7.87435C11.3625 8.20766 11.1109 8.46861 10.7937 8.65062C10.8025 8.70982 10.8069 8.80192 10.8069 8.92691C10.8069 9.52117 10.6078 10.0255 10.2141 10.4422C9.81812 10.861 9.34125 11.0693 8.78344 11.0693C8.53406 11.0693 8.29562 11.0233 8.07031 10.9312C7.89531 11.2908 7.64375 11.5802 7.31344 11.8017C6.98531 12.0254 6.62437 12.135 6.23281 12.135C5.8325 12.135 5.46937 12.0276 5.14562 11.8083C4.81969 11.5912 4.57031 11.2996 4.39531 10.9312C4.17 11.0233 3.93375 11.0693 3.68219 11.0693C3.12437 11.0693 2.64531 10.861 2.245 10.4422C1.84469 10.0255 1.64562 9.51898 1.64562 8.92691C1.64562 8.86113 1.65437 8.76903 1.66969 8.65062C1.3525 8.46642 1.10094 8.20766 0.912812 7.87435C0.726875 7.54104 0.632812 7.17703 0.632812 6.78451C0.632812 6.36787 0.737812 5.98413 0.945625 5.63766C1.15344 5.29119 1.43344 5.03463 1.78344 4.86798C1.69156 4.61799 1.64562 4.36582 1.64562 4.11583C1.64562 3.52377 1.84469 3.01722 2.245 2.60058C2.64531 2.18394 3.12437 1.97343 3.68219 1.97343C3.93156 1.97343 4.17 2.01948 4.39531 2.11158C4.57031 1.75196 4.82187 1.4625 5.15219 1.24103C5.48031 1.01955 5.84125 0.907715 6.23281 0.907715C6.62437 0.907715 6.98531 1.01955 7.31344 1.23883C7.64156 1.46031 7.89531 1.74976 8.07031 2.10939C8.29562 2.01729 8.53187 1.97124 8.78344 1.97124C9.34125 1.97124 9.81812 2.17956 10.2141 2.59839C10.61 3.01722 10.8069 3.52157 10.8069 4.11364C10.8069 4.38994 10.7653 4.63992 10.6822 4.86578C11.0322 5.03244 11.3122 5.289 11.52 5.63547C11.7278 5.98413 11.8328 6.36787 11.8328 6.78451ZM5.99437 8.47519L8.30656 5.00393C8.36562 4.91183 8.38312 4.81096 8.36344 4.70351C8.34156 4.59606 8.28687 4.51054 8.195 4.45353C8.10312 4.39432 8.0025 4.37459 7.89531 4.38994C7.78594 4.40748 7.69844 4.46011 7.63281 4.55221L5.59625 7.62218L4.65781 6.68364C4.57469 6.60032 4.47844 6.56084 4.37125 6.56523C4.26187 6.56962 4.16781 6.60909 4.08469 6.68364C4.01031 6.7582 3.97312 6.85249 3.97312 6.96652C3.97312 7.07835 4.01031 7.17265 4.08469 7.24939L5.37312 8.54097L5.43656 8.59141C5.51094 8.64184 5.5875 8.66597 5.66187 8.66597C5.80844 8.66377 5.92 8.60237 5.99437 8.47519Z"
      fill="#5289FE"
    ></path>
  </svg>
);

VerifiedBadge.displayName = 'VerifiedBadge';

const TweetItem: FC<TweetItemProps> = memo(({ tweet }: TweetItemProps) => (
  <li className="bg-card p-4 rounded-lg shadow-sm">
    <div className="grid grid-cols-[2.5rem_1fr] gap-2">
      <Avatar className="size-10">
        <AvatarImage src={tweet.avatar} alt={tweet.name} />
        <AvatarFallback>{tweet.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="text-xs">
        <p className="flex items-center gap-1 text-base">
          {tweet.name}
          {tweet.isVerified && <VerifiedBadge />}
        </p>
        <p>
          <span className="text-muted-foreground">{tweet.handle}</span>
        </p>
      </div>
    </div>
    <p className="text-base text-card-foreground mt-2">{tweet.text}</p>
    <time className="text-xs text-muted-foreground mt-2">
      {new Date(tweet.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}
    </time>
  </li>
));

TweetItem.displayName = 'TweetItem';

// Composant pour afficher une vidéo
const VideoItem: FC<VideoItemProps> = memo(({ video }: VideoItemProps) => (
  <li className="aspect-[9/16] relative overflow-hidden rounded-lg shadow-sm">
    <Link
      href="https://x.com/mealbud.ai"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 flex items-center justify-center bg-card text-card-foreground hover:bg-card/80 transition-colors duration-200"
    >
      <PlayIcon className="size-8" />
    </Link>
    <Image
      src={video.image}
      alt={`${video.name}'s video`}
      layout="fill"
      objectFit="cover"
      className="object-cover w-full h-full"
    />
  </li>
));

VideoItem.displayName = 'VideoItem';

const ContentColumn: FC<ContentColumnProps> = memo(
  ({ colIndex, tweetColumn, videoColumn }: ContentColumnProps) => {
    const startsWithTweet = colIndex % 2 === 0;
    const maxItems = Math.max(tweetColumn.length, videoColumn.length);
    const interleaved: Array<{ type: 'tweet' | 'video'; item: Tweet | Video }> =
      [];

    for (let i = 0; i < maxItems; i++) {
      if (startsWithTweet) {
        const tweet = tweetColumn[i];
        const video = videoColumn[i];
        if (tweet !== undefined)
          interleaved.push({ type: 'tweet', item: tweet });
        if (video !== undefined)
          interleaved.push({ type: 'video', item: video });
      } else {
        const video = videoColumn[i];
        const tweet = tweetColumn[i];
        if (video !== undefined)
          interleaved.push({ type: 'video', item: video });
        if (tweet !== undefined)
          interleaved.push({ type: 'tweet', item: tweet });
      }
    }

    return (
      <ul className="flex flex-col gap-4">
        {interleaved.map((content) =>
          content.type === 'tweet' ? (
            <TweetItem key={content.item.id} tweet={content.item as Tweet} />
          ) : (
            <VideoItem key={content.item.id} video={content.item as Video} />
          ),
        )}
      </ul>
    );
  },
);

ContentColumn.displayName = 'ContentColumn';

const TweetWall: FC<TweetWallProps> = ({ tweets, videos }) => {
  const NUM_COLUMNS = 4;
  const tweetColumns: Tweet[][] = Array.from({ length: NUM_COLUMNS }, () => []);
  const videoColumns: Video[][] = Array.from({ length: NUM_COLUMNS }, () => []);

  tweets.forEach((tweet, i) => {
    const columnIndex = i % NUM_COLUMNS;
    if (tweetColumns[columnIndex]) {
      tweetColumns[columnIndex].push(tweet);
    }
  });

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
            {Array.from({ length: NUM_COLUMNS }).map((_, colIndex) => (
              <ContentColumn
                key={colIndex}
                colIndex={colIndex}
                tweetColumn={tweetColumns[colIndex] || []}
                videoColumn={videoColumns[colIndex] || []}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const defaultTweets: Tweet[] = [
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
    text: "Mealbud is like having a tiny dietitian in your pocket. Except it doesn't judge you when you eat pizza. 🍕💖 It even gave me a breakdown of the nutrients in a smoothie I made with 4 ingredients. Wild.",
    date: '2025-02-10T19:08:00Z',
    isVerified: true,
  },
  {
    id: '4',
    name: 'Nassim',
    avatar: 'https://i.pravatar.cc/150?img=9',
    handle: '@nassimlabs',
    text: "Mealbud's weekly nutrition breakdown is clean, simple, and actually useful. I can see where I'm slacking (fiber, always fiber 🙄) and where I'm doing better than I thought.",
    date: '2025-03-18T11:27:00Z',
    isVerified: false,
  },
];

const defaultVideos: Video[] = [
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

export default function TweetWallWrapper(): JSX.Element {
  return <TweetWall tweets={defaultTweets} videos={defaultVideos} />;
}
