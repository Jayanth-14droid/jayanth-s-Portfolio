export type IdleState = 'waiting' | 'checking-time' | 'looking-around' | 'waving' | 'pointing';

export type InteractionState = 
  | 'idle' 
  | 'hover' 
  | 'scroll-stopped' 
  | 'menu-open' 
  | 'navigating';

export interface SectionInfo {
  id: string;
  label: string;
}

export const SECTIONS: SectionInfo[] = [
  { id: 'projects', label: 'View Projects' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export interface CharacterProps {
  idleState: IdleState;
  isScrolling: boolean;
  facingRight: boolean;
  cursorPosition: { x: number; y: number } | null;
  interactionState: InteractionState;
  isPointing: boolean;
}

export interface CompanionContextValue {
  scrollToSection: (sectionId: string) => void;
  currentSection: string;
  interactionState: InteractionState;
  setInteractionState: (state: InteractionState) => void;
}
