import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS, InteractionState } from './types';

interface SpeechBubbleProps {
  message: string;
  interactionState: InteractionState;
  onNavigate: (sectionId: string) => void;
  onClose: () => void;
}

const SpeechBubble = ({ message, interactionState, onNavigate, onClose }: SpeechBubbleProps) => {
  const showMenu = interactionState === 'menu-open';
  const showMessage = message && interactionState !== 'idle';

  return (
    <AnimatePresence>
      {(showMessage || showMenu) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute -top-4 -left-48 w-44"
        >
          <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-xl overflow-hidden">
            {showMenu ? (
              <div className="p-2">
                <p className="text-xs font-medium text-foreground px-2 py-1.5 mb-1">
                  What do you need?
                </p>
                <div className="space-y-0.5">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => onNavigate(section.id)}
                      className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors duration-150"
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={onClose}
                  className="w-full text-center px-3 py-1.5 mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="px-3 py-2">
                <p className="text-sm text-foreground whitespace-nowrap">
                  {message}
                </p>
              </div>
            )}
          </div>
          
          {/* Speech bubble pointer */}
          <div className="absolute bottom-[-6px] right-8 w-3 h-3 bg-card/95 border-r border-b border-border rotate-45 transform" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpeechBubble;
