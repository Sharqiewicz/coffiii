import { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

const useMagneticButton = (range: number = 100, intensity: number = 0.4) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update button position based on mouse proximity
  useEffect(() => {
    const buttonElement = buttonRef.current;
    if (!buttonElement) return;

    const updateButtonPosition = () => {
      const buttonRect = buttonElement.getBoundingClientRect();
      const buttonCenter = {
        x: buttonRect.left + buttonRect.width / 2,
        y: buttonRect.top + buttonRect.height / 2,
      };

      const distanceX = mousePos.x - buttonCenter.x;
      const distanceY = mousePos.y - buttonCenter.y;

      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < range) {
        // Calculate the magnetic pull within the range
        const magnetStrength = (1 - distance / range) * intensity;

        buttonElement.style.transform = `translate(${
          distanceX * magnetStrength
        }px, ${distanceY * magnetStrength}px)`;
      } else {
        // Reset position when outside the range
        buttonElement.style.transform = 'translate(0px, 0px)';
      }
    };

    updateButtonPosition();
  }, [mousePos, range, intensity]);

  return buttonRef;
};

export default useMagneticButton;
