import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ListBulletIcon } from '@heroicons/react/24/solid';

import Cafe1Sound from '../../../public/sounds/cafe-1.mp3';
import Cafe2Sound from '../../../public/sounds/cafe-2.mp3';
import Cafe3Sound from '../../../public/sounds/cafe-3.mp3';
import Cafe4Sound from '../../../public/sounds/cafe-4.mp3';
import Cafe5Sound from '../../../public/sounds/cafe-5.mp3';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const SOUNDS = [
  {
    icon: '🇵🇱',
    sound: Cafe1Sound,
  },
  {
    icon: '🇸🇪',
    sound: Cafe2Sound,
  },
  {
    icon: '🇫🇷',
    sound: Cafe3Sound,
  },
  {
    icon: '🇮🇹',
    sound: Cafe4Sound,
  },
  {
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    sound: Cafe5Sound,
  },
];

interface ListProps {
  setCurrentSound: (sound: string) => void;
  currentSound: string;
}

export function List({ setCurrentSound, currentSound }: ListProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="relative"
    >
      <motion.button
        variants={{
          open: { x: -80 },
          closed: { x: 0 },
        }}
        transition={{ duration: 0.2 }}
        style={{ originY: 0.55 }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        className="bg-white rounded-full px-3 py-3 pl-3.5 transition hover:bg-amber-100"
      >
        <ListBulletIcon className="text-black w-10 h-10" />
      </motion.button>
      <motion.ul
        className="bg-white text-black rounded-lg p-5 absolute transition"
        variants={{
          open: {
            y: -60,
            clipPath: 'inset(0% 0% 0% 0% round 10px)',
          },
          closed: {
            y: 0,
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
          },
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {SOUNDS.filter(({ sound }) => sound !== currentSound).map(
          ({ sound, icon }) => (
            <motion.li
              key={icon}
              variants={itemVariants}
              whileHover={{ scale: 1.3 }}
              className={'text-3xl  transition cursor-pointer'}
              onClick={() => {
                setCurrentSound(sound);
              }}
            >
              {icon}
            </motion.li>
          )
        )}
      </motion.ul>
      <motion.div
        className="bg-white text-black rounded-lg p-5 absolute transition"
        variants={{
          open: {
            y: 130,
            clipPath: 'inset(0% 0% 0% 0% round 10px)',
          },
          closed: {
            y: 200,
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
          },
        }}
      >
        {SOUNDS.filter(({ sound }) => sound === currentSound).map(
          ({ icon }) => (
            <motion.p key={icon} className={'text-3xl transition'}>
              {icon}
            </motion.p>
          )
        )}
      </motion.div>
    </motion.nav>
  );
}
