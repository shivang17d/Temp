import clsx from 'clsx';
import NextNProgress from 'nextjs-progressbar';
import * as React from 'react';
import { CgSpinner } from 'react-icons/cg';

import Footer from '@/components/Layout/Footer';
import Seo from '@/components/Seo';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    preferences: { theme, fontFamily },
  } = usePreferenceContext();

  const [isClient, setIsClient] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setIsClient(false), 500);
  }, []);

  return (
    <>
      {isClient ? (
        <>
          <Seo title='Monkeytype Clone' />
          <div
            className={clsx(
              theme,
              fontFamily,
              'fixed inset-0 flex h-screen w-screen items-center justify-center bg-bg'
            )}
          >
            <div className='flex max-w-[500px] flex-wrap items-center justify-center gap-x-8'>
              <div className='flex flex-col items-center gap-4'>
                <CgSpinner className='animate-spin text-[3rem] text-fg' />
                <p className='hidden'>
                  Monkeytype Clone - Typeracer App based on Monkeytype
                </p>
                <div className='loading font-primary text-fg'>
                  Preparing the page for you...
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={clsx(
            theme,
            fontFamily,
            'sm:scrollbar h-screen w-full overflow-y-auto bg-bg transition-colors duration-300'
          )}
        >
          <div className='layout flex h-full flex-col bg-transparent'>
            <NextNProgress
              color={`rgb(${progressColors[theme as ProgressColorType]})`}
              startPosition={0.3}
              stopDelayMs={200}
              height={2}
              showOnShallow={true}
            />
            {children}
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

const progressColors = {
  default: '58 163 193',
  'light': '75 75 75',
  'dark': '231 246 242',
};

type ProgressColorType = keyof typeof progressColors;
