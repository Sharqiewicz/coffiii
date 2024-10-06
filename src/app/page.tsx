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
  setCurrentSound: (sound: string) => void;
  currentSound: string;
}

const StopPlayingSection: FC<StopPlayingSectionProps> = ({
  isPlaying,
  stopPlaying,
  setCurrentSound,
  currentSound,
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
        <List setCurrentSound={setCurrentSound} currentSound={currentSound} />
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
    <h1 className="text-lg md:text-4xl font-bold">Welcome at Coffiii</h1>
  </motion.div>
);

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarted, setIsStarted] = useState(false); // todo: remove it
  const [showWelcome, setShowWelcome] = useState(true); // todo: remove it

  const [currentSound, setCurrentSound] = useState<string | null>(Cafe1Sound);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const startPlaying = () => {
    setIsPlaying(true);
    setIsStarted(true);
    if (audioInstance) {
      audioInstance.loop = true;
      audioInstance.play();
    }
  };

  const stopPlaying = () => {
    setIsPlaying(false);
    if (audioInstance) {
      audioInstance.pause();
    }
  };

  const handleSetCurrentSound = (sound: string) => {
    setCurrentSound(sound);
  };

  useEffect(() => {
    if (currentSound) {
      const newAudio = new Audio(currentSound);
      setAudioInstance(newAudio);

      return () => {
        newAudio.pause();
      };
    }
  }, [currentSound]);

  useEffect(() => {
    if (audioInstance) {
      audioInstance.loop = true;
      audioInstance.play();
    }

    return () => {
      if (audioInstance) {
        audioInstance.pause();
      }
    };
  }, [audioInstance]);

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
          currentSound={currentSound || ''}
        />
      )}
    </motion.div>
  );

  return (
    <div className="relative flex flex-wrap items-end justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <h1 className="text-3xl">Coffiii</h1>
          <h2 className="text-xl mb-5">minimalistic cafe.fm</h2>
        </div>
        <div className="w-full mt-5">
          <AnimatePresence>
            {showWelcome ? (
              <WelcomeMessage key="welcome" />
            ) : (
              <DisplayCurrentButton key="button" />
            )}
          </AnimatePresence>
        </div>
      </main>
      <footer className="w-full row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Made with ❤ by Kacper Szarkiewicz
      </footer>
    </div>
  );
}
