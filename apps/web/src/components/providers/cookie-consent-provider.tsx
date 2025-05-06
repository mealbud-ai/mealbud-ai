'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';

interface CookieConsentContextType {
  hasCookieConsent: boolean;
  setHasCookieConsent: (consent: boolean) => void;
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

type CookieConsentProviderProps = Readonly<{
  children: React.ReactNode;
  initialConsent?: boolean;
}>;

export function CookieConsentProvider({
  children,
  initialConsent = false,
}: CookieConsentProviderProps) {
  const [hasCookieConsent, setHasCookieConsent] = useState(initialConsent);

  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cookieConsent='))
      ?.split('=')[1];

    if (cookieValue !== undefined) {
      setHasCookieConsent(cookieValue === 'true');
    }
  }, []);

  const contextValue = useMemo(
    () => ({ hasCookieConsent, setHasCookieConsent }),
    [hasCookieConsent],
  );

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      'useCookieConsent must be used within a CookieConsentProvider',
    );
  }
  return context;
}
