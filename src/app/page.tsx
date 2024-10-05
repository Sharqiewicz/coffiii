'use client';

import { FC, useEffect, useState } from 'react';
import { AnimatePresence, AnimationControls, motion } from 'framer-motion';
import { List } from './components/List';
import { PlayButton } from './components/Button/PlayButton';
import { PauseButton } from './components/Button/PauseButton';

import Cafe1Sound from '../public/sounds/cafe-1.mp3';

interface StopPlayingSectionProps {
  isPlaying: boolean;
  stopPlaying: () => void;
  setCurrentSound: (sound: HTMLAudioElement) => void;
}

const StopPlayingSection: FC<StopPlayingSectionProps> = ({
  isPlaying,
  stopPlaying,
  setCurrentSound,
}) => {
  const commonAnimate = isPlaying
    ? {}
    : { scale: 0, transition: { duration: 0.4 } };

  return (
    <motion.section
      className="flex gap-4 flex-wrap w-max justify-center items-center"
      animate={
        isPlaying
          ? { y: -100, transition: { duration: 0.8 }, scale: [0, 1] }
          : { y: 100 }
      }
    >
      <motion.div animate={commonAnimate}>
        <List setCurrentSound={setCurrentSound} />
      </motion.div>
      <PauseButton
        animate={commonAnimate as AnimationControls}
        stopPlaying={stopPlaying}
      />
    </motion.section>
  );
};

const WelcomeMessage: FC = () => (
  <motion.div
    className="flex justify-center items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, y: -100 }}
    transition={{ duration: 0.5 }}
  >
    <h1 className="text-4xl font-bold">Welcome at Coffiii</h1>
  </motion.div>
);

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarted, setIsStarted] = useState(false); // todo: remove it
  const [showWelcome, setShowWelcome] = useState(true); // todo: remove it

  const [currentSound, setCurrentSound] = useState(new Audio(Cafe1Sound));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentSound) {
      currentSound.loop = true;
      currentSound.play();
    }
  }, [currentSound]);

  const startPlaying = () => {
    setIsPlaying(true);
    setIsStarted(true);
    currentSound.loop = true;
    currentSound.play();
  };

  const stopPlaying = () => {
    setIsPlaying(false);
    currentSound.pause();
  };

  const handleSetCurrentSound = (sound: HTMLAudioElement) => {
    currentSound.pause();
    setCurrentSound(sound);
  };

  const DisplayCurrentButton = () => (
    <motion.div
      className="mt-2 flex flex-col gap-8 row-start-2 items-center sm:items-start"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <PlayButton isPlaying={isPlaying} startPlaying={startPlaying} />
      {isStarted && (
        <StopPlayingSection
          isPlaying={isPlaying}
          stopPlaying={stopPlaying}
          setCurrentSound={handleSetCurrentSound}
        />
      )}
    </motion.div>
  );

  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <h1 className="text-3xl">Coffiii</h1>
          <h2 className="text-xl mb-5">minimalistic cafe.fm</h2>
        </div>
        <div>
          <AnimatePresence>
            {showWelcome ? (
              <WelcomeMessage key="welcome" />
            ) : (
              <DisplayCurrentButton key="button" />
            )}
          </AnimatePresence>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Made with ❤ by Kacper Szarkiewicz
      </footer>
    </div>
  );
}
