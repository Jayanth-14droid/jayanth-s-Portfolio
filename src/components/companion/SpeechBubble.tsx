import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS, InteractionState } from './types';
interface SpeechBubbleProps {
  message: string;
  interactionState: InteractionState;
  onNavigate: (sectionId: string) => void;
  onClose: () => void;
  isMobile?: boolean;
}
const SpeechBubble = ({
  message,
  interactionState,
  onNavigate,
  onClose,
  isMobile = false
}: SpeechBubbleProps) => {
  const showMenu = interactionState === 'menu-open';
  const showMessage = message && interactionState !== 'idle';

  // Smaller bubble on mobile
  const bubbleWidth = isMobile ? 'w-36' : 'w-44';
  const bubblePosition = isMobile ? '-left-36 -top-2' : '-left-48 -top-4';
  return <AnimatePresence>
      {(showMessage || showMenu) && <motion.div initial={{
      opacity: 0,
      scale: 0.8,
      y: 10
    }} animate={{
      opacity: 1,
      scale: 1,
      y: 0
    }} exit={{
      opacity: 0,
      scale: 0.8,
      y: 10
    }} transition={{
      duration: 0.2,
      ease: 'easeOut'
    }} className={`absolute ${bubblePosition} ${bubbleWidth}`}>
          <div className="bg-card/95 backdrop-blur-md border border-border overflow-hidden shadow-none rounded-none">
            {showMenu ? <div className={isMobile ? 'p-1.5' : 'p-2'}>
                <p className={`font-medium text-foreground px-2 py-1 mb-0.5 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
                  What do you need?
                </p>
                <div className="space-y-0.5">
                  {SECTIONS.map(section => <button key={section.id} onClick={() => onNavigate(section.id)} className={`w-full text-left px-2 py-1.5 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors duration-150 ${isMobile ? 'text-[11px]' : 'text-sm'}`}>
                      {section.label}
                    </button>)}
                </div>
                <button onClick={onClose} className={`w-full text-center px-2 py-1 mt-0.5 text-muted-foreground hover:text-foreground transition-colors ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
                  Close
                </button>
              </div> : <div className={isMobile ? 'px-2 py-1.5' : 'px-3 py-2'}>
                <p className={`text-foreground ${isMobile ? 'text-[11px]' : 'text-sm'}`}>
                  {message}
                </p>
              </div>}
          </div>
          
          {/* Speech bubble pointer */}
          <div className={`absolute bottom-[-6px] ${isMobile ? 'right-4' : 'right-8'} w-3 h-3 bg-card/95 border-r border-b border-border rotate-45 transform`} />
        </motion.div>}
    </AnimatePresence>;
};
export default SpeechBubble;