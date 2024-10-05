import { FC } from 'react';
import { AnimationControls, motion } from 'framer-motion';
import { BackwardIcon } from '@heroicons/react/24/solid';

interface StopPlayingSectionProps {
  animate: AnimationControls;
}

export const BackwardButton: FC<StopPlayingSectionProps> = ({ animate }) => (
  <motion.button
    className="bg-white rounded-full px-3 py-3 pl-3.5 transition hover:bg-amber-100"
    animate={animate}
    whileTap={{ scale: 0.2 }}
    whileHover={{ scale: 1.1 }}
  >
    <BackwardIcon className="text-black w-10 h-10 rotate-180" />
  </motion.button>
);
