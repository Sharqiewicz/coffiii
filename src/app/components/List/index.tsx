import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ListBulletIcon } from '@heroicons/react/24/solid';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const countryFlags = ['🇮🇹', '🇵🇹', '🇵🇱', '🇩🇪', '🇫🇷'];

export function List() {
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
        {countryFlags.map((flag, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.3 }}
            className="text-3xl cursor-pointer transition"
          >
            {flag}
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
}
