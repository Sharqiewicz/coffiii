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
    <AnimatePresence>
      <motion.section
        className="flex gap-4 flex-wrap w-full justify-center items-center"
        animate={
          isPlaying
            ? { y: -100, transition: { duration: 0.5 }, scale: [0.5, 1] }
            : { y: 50 }
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
    </AnimatePresence>
  );
};

const WelcomeMessage: FC = () => (
  <motion.div
    className="flex justify-center items-center w-full"
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
      className="mt-2 flex w-full justify-center items-center flex-wrap"
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full justify-center items-center">
        <PlayButton isPlaying={isPlaying} startPlaying={startPlaying} />
      </div>
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
    <div className="grid grid-rows-3 min-h-screen gap-16">
      <header className="flex items-center justify-center">
        <h1 className="text-3xl">Coffiii.</h1>
      </header>
      <main>
        <AnimatePresence>
          {showWelcome ? (
            <WelcomeMessage key="welcome" />
          ) : (
            <DisplayCurrentButton key="button" />
          )}
        </AnimatePresence>
      </main>
      <footer className="text-center my-auto">
        Made with ❤ by Kacper Szarkiewicz
      </footer>
    </div>
  );
}
