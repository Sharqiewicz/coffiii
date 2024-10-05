import { FC } from 'react';
import { AnimationControls, motion } from 'framer-motion';
import { PauseIcon } from '@heroicons/react/24/solid';
import { Timer } from '../../Timer';

interface StopPlayingSectionProps {
  stopPlaying: () => void;
  animate: AnimationControls;
}

export const PauseButton: FC<StopPlayingSectionProps> = ({
  stopPlaying,
  animate,
}) => (
  <motion.button
    onClick={stopPlaying}
    animate={animate}
    className="bg-white rounded-full px-3 py-3 pl-3.5 flex items-center gap-2 min-w-52 justify-between transition hover:bg-amber-100 hover:scale-110"
  >
    <Timer />
    <PauseIcon className="text-black w-10 h-10" />
  </motion.button>
);
