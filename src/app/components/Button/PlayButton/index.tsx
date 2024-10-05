import { PlayIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface PlayButtonProps {
  startPlaying: () => void;
  isPlaying: boolean;
}

export const PlayButton: FC<PlayButtonProps> = ({
  startPlaying,
  isPlaying,
}) => (
  <motion.button
    onClick={startPlaying}
    animate={
      isPlaying
        ? {
            scale: 0,
            transition: { duration: 0.2 },
          }
        : {}
    }
    className="bg-white rounded-full px-3 py-3 pl-3.5 transition hover:bg-amber-100 hover:scale-110 mx-auto"
  >
    <PlayIcon className="text-black w-10 h-10" />
  </motion.button>
);
