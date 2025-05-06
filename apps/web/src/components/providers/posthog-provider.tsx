'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { Suspense, useEffect, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCookieConsent } from './cookie-consent-provider';

type PostHogProviderProps = Readonly<{
  children: ReactNode;
}>;

export function PostHogProvider({ children }: PostHogProviderProps) {
  const { hasCookieConsent } = useCookieConsent();

  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: 'always',
      debug: process.env.NODE_ENV === 'development',
    });
  }, []);

  useEffect(() => {
    if (hasCookieConsent) {
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }
  }, [hasCookieConsent]);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += '?' + search;
      }
      posthog.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
