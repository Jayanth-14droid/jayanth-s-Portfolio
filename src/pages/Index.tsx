import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Download, Mail, ExternalLink, Instagram, Linkedin, Menu, X, Figma, FileText, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import MagneticWrapper from '@/components/MagneticWrapper';
import LoadingScreen from '@/components/LoadingScreen';
import { SmoothScroll } from '@/components/SmoothScroll';
import { TiltCard } from '@/components/TiltCard';
import { CountUp } from '@/components/CountUp';
import emailjs from '@emailjs/browser';
import CV from '../../Jayanth Kotapati UI-UX Resume.pdf';
import profileImg from '@/assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = ['Home', 'About', 'Projects', 'Experience', 'Skills', 'Contact'];

const projects = [{
  title: "COMFORT WEAR", subtitle: "Mobile E-Commerce App",
  description: "Keep yourself in style by purchasing product from 'comfort wear'",
  tools: "UI/UX Design, Prototyping",
  image: "/lovable-uploads/d7a8394a-de60-472f-a442-a4a00fb85a6d.png",
  projectLink: "https://www.figma.com/proto/FJ3Qk2lOf1IdK3hTwJtFT8/E-commerces--website?node-id=0-1&t=AS6M5J5ddNFiF2YQ-1",
  caseStudyLink: "https://www.behance.net/gallery/227358245/Comfort-Wear-case-study"
}, {
  title: "COURSE-ONLINE", subtitle: "Learning Platform App",
  description: "Modern online learning platform designed to provide seamless educational experiences with intuitive course navigation and engaging user interface for students and mentors.",
  tools: "UI/UX Design, Mobile App Design, User Research",
  image: "/lovable-uploads/389d16d0-93cb-443e-b3dc-653543ff3a3e.png",
  projectLink: "https://www.figma.com/proto/Y8lve28Tl1xh2cGNUiXDKj/Course-online--Learning?node-id=0-1&t=pFtA5ZSBwInYw6L4-1",
  caseStudyLink: "https://www.behance.net/gallery/230532382/Course-online-case-study"
}, {
  title: "MIND EASE", subtitle: "Mental Health Mobile Application",
  description: "Mobile application focused on balancing mental health for working professionals and students aged 22-30, providing personalized tools and resources for mental wellness.",
  tools: "UI/UX Design, Mobile App Design, User Research",
  image: "/lovable-uploads/mind-ease.jpg",
  projectLink: "https://www.figma.com/proto/egBIHWTMDchGBScVi8XSUy/Mindease?page-id=0%3A1&node-id=18-598&p=f&viewport=-613%2C184%2C0.42&t=1rANrqBYeNCTlLuR-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=18%3A598",
  caseStudyLink: "https://www.behance.net/gallery/236845155/Mind-ease"
}, {
  title: "BURGER HUNT", subtitle: "Food Delivery App with Parallax",
  description: "Modern food delivery application featuring stunning parallax effects and intuitive user experience. Crunchy meat all day makes the pain go away.",
  tools: "UI/UX Design, Parallax Effects, Prototyping",
  image: "/lovable-uploads/b61558b7-dd40-4118-84e0-ae2951483f27.png",
  projectLink: "https://www.figma.com/proto/tvmtFRMvBELvrbyr95bXh5/Untitled?node-id=12-4&t=NTL4kx4Ioeq8iFFv-1",
  caseStudyLink: "#"
}, {
  title: "CLASSIC CARS MUSTANG", subtitle: "Automotive Showcase with Parallax",
  description: "Elegant automotive showcase featuring the iconic Mustang 1954 with smooth parallax scrolling effects and premium design aesthetics.",
  tools: "UI/UX Design, Parallax Design, Visual Design",
  image: "/lovable-uploads/f5c380d6-db4d-48a6-9b61-0eaf4e978ff4.png",
  projectLink: "https://www.figma.com/proto/tvmtFRMvBELvrbyr95bXh5/Untitled?node-id=75-831&t=30jv7tUduRR6vyRF-1",
  caseStudyLink: "#"
}, {
  title: "FOOD RE-DESIGN", subtitle: "Web Application Design",
  description: "Modern food application with intuitive user experience and real-time data visualization",
  tools: "UI/UX Design, User Research",
  image: "/lovable-uploads/c4af3f37-96b8-4dbd-8237-f997d6f6d458.png",
  projectLink: "https://www.figma.com/proto/anL4j8dj13EGFYcUifEZ4y/food?node-id=0-1&t=Ddw3t1jlgVxW9JOn-1",
  caseStudyLink: "#"
}, {
  title: "NIKE RE-DESIGN", subtitle: "Web Application",
  description: "Modern shoe web application with intuitive user experience",
  tools: "UI/UX Design, Wireframing",
  image: "/lovable-uploads/fc9ae2ec-5121-4e32-82de-1a2ff5c13b53.png",
  projectLink: "https://www.figma.com/proto/xP8Vr0T8VDP5bUo9j73AV4/NIKE?page-id=0%3A1&node-id=1-254&starting-point-node-id=81%3A100&t=hw1eFjUB446gOPip-1",
  caseStudyLink: "#"
}, {
  title: "SHUTTER SEARCH", subtitle: "Photographer Discovery Platform",
  description: "Website for finding photographers - capture every movement with professionals who bring passion and precision to every shot.",
  tools: "UI/UX Design, Web Design, Prototyping",
  image: "/lovable-uploads/shutter-search.jpg",
  projectLink: "https://www.figma.com/proto/BRp61RM9VQJ6LGLeaFXDDj/Responsive--Designs?node-id=90-566&t=oMOnXaArQ41ntfLb-1",
  caseStudyLink: "#"
}];

const skills = [
  { category: 'Design', items: ['UI/UX Design', 'Web Designing', 'Wireframing', 'Prototyping'] },
  { category: 'Tech', items: ['Front-End Basics', 'HTML/CSS', 'Responsive Design'] },
  { category: 'Tools', items: ['Figma', 'Photoshop', 'Canva'] },
  { category: 'Craft', items: ['User Research', 'Design Systems', 'Editing & Design'] },
];

const timeline = [
  { year: '2020 - 2024', title: 'Bachelor of Computer Science (CSE)', place: 'Eluru College of Engineering and Technology', meta: 'CGPA: 7.07/10' },
  { year: '2018 - 2020', title: 'Intermediate (M.P.C)', place: 'Vidya Vikas Junior College', meta: 'Percentage: 7/10' },
  { year: '2017 - 2018', title: 'S.S.C', place: 'Vidya Vikas High School', meta: 'CGPA: 9.2/10' },
];

const stats = [
  { end: 8, suffix: '+', label: 'Projects Shipped' },
  { end: 3, suffix: '+', label: 'Years Practicing' },
  { end: 20, suffix: '+', label: 'Design Explorations' },
  { end: 100, suffix: '%', label: 'Passion' },
];

// -------------------- Navbar --------------------
const Navbar = ({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 80)), [scrollY]);

  return (
    <motion.nav
      animate={{ height: scrolled ? 60 : 76 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-background/70 backdrop-blur-xl border-b border-border/40' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >JK</motion.div>

        <div className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((item) => {
            const id = item.toLowerCase();
            const isActive = active === id;
            return (
              <button key={item} onClick={() => onNavigate(id)}
                className={`relative text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {item}
                {isActive && <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />}
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center">
          <MagneticWrapper strength={0.25} radius={80}>
            <a href={CV} download="Jayanth Kotapati__UIUX.pdf">
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Download className="w-4 h-4 mr-2" /> Download CV
              </Button>
            </a>
          </MagneticWrapper>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
            <div className="px-4 py-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <button key={item} onClick={() => { onNavigate(item.toLowerCase()); setOpen(false); }}
                  className="block w-full text-left text-muted-foreground hover:text-primary transition-colors">
                  {item}
                </button>
              ))}
              <a href={CV} download="Jayanth Kotapati__UIUX.pdf" className="block pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full">
                  <Download className="w-4 h-4 mr-2" /> Download CV
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// -------------------- Typewriter --------------------
const useTypewriter = (words: string[], typingSpeed = 120, deletingSpeed = 60, pause = 2000) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timer = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (text === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), pause);
      } else {
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return { text, isDeleting };
};

// -------------------- Hero --------------------
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const yMid = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const yFg = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacityScroll = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mx = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const my = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;
    const handle = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [reduced, mouseX, mouseY]);

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };

  const { text } = useTypewriter(['SOFTWARE DEVELOPER', 'UI/UX DESIGNER'], 80, 40, 1500);

  return (
    <section ref={ref} id="home" className="h-screen flex items-center justify-center px-4 pt-28 pb-12 lg:pt-16 lg:pb-0 sticky top-0 left-0 w-full overflow-hidden z-0 bg-background">
      {/* Layer 1 – slowest bg blobs */}
      <motion.div style={{ y: yBg, x: mx }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-[420px] h-[420px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[130px]" />
      </motion.div>
      {/* Layer 2 – mid ground grid */}
      <motion.div style={{ y: yMid, x: useTransform(mx, (v) => v * 0.5) }} className="absolute inset-0 opacity-40 pointer-events-none"
        aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
      </motion.div>

      {/* Foreground */}
      <motion.div style={{ y: yFg }} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p variants={item} className="mb-4 my-[24px] text-left font-bold text-3xl md:text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Hi, I'm JAYANTH KOTAPATI
          </motion.p>
          <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            <span className="block">I'M A</span>
            <span className="block min-h-[1.2em] whitespace-nowrap">
              {text}
              <span
                className="inline-block w-[3px] md:w-[4px] h-[0.85em] bg-primary ml-1 align-middle"
                style={{ animation: 'cursorBlink 1s step-end infinite' }}
              />
            </span>
          </motion.h1>
          <motion.p variants={item} className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
            I am a passionate UI/UX designer with a love for creating beautiful and functional user experiences. I have strong foundation in UI/UX design.
          </motion.p>
          <motion.div variants={item} className="flex space-x-4">
            {[
              { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/jayanth-kotapati-800b88288/' },
              { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/j_a_y_a__n_t_h?igsh=MWR2MHJqYmJndjJ0MA==' },
              { icon: <img src="/lovable-uploads/dde8d7e2-4aa6-4788-908c-37e8229fb9f0.png" alt="Behance" className="w-5 h-5" />, href: 'https://www.behance.net/jayanthkotapati' },
              { icon: <Mail className="w-5 h-5" />, href: 'mailto:jayanthkotapati14@gmail.com' },
            ].map((s, i) => (
              <MagneticWrapper key={i} strength={0.3} radius={60}>
                <Button variant="outline" size="icon"
                  className="border-primary text-primary bg-card/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  onClick={() => window.open(s.href, '_blank')}>
                  {s.icon}
                </Button>
              </MagneticWrapper>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: useTransform(mx, (v) => v * -0.3), y: useTransform(my, (v) => v * -0.3) }}
          className="relative flex justify-center order-first lg:order-last mt-4 lg:mt-0"
        >
          <div className="w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full p-1 bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/40 shadow-[0_0_80px_hsl(var(--primary)/0.25)]">
            <div className="w-full h-full rounded-full overflow-hidden relative group bg-background">
              <img alt="Profile" src={profileImg} className="w-full h-full object-cover object-top rounded-full transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div style={{ opacity: opacityScroll }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// -------------------- Reveal wrapper --------------------
const Reveal = ({ children, delay = 0, x = 0, className = '' }: { children: React.ReactNode; delay?: number; x?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// -------------------- About --------------------
const About = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  
  const yText = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} id="about" className="py-32 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary text-xs font-medium tracking-widest uppercase">About</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Me</span></h2>
        </Reveal>

        <div className="max-w-3xl mx-auto mb-20">
          <motion.div style={{ y: yText }}>
            <Reveal>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Creating Digital Solutions</h3>
              <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
                I'm a UI/UX designer specializing in intuitive, engaging digital experiences. My approach combines user research, creative design thinking, and technical implementation to deliver solutions that look great and function seamlessly.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I believe in the power of good design to transform businesses and improve people's lives. Every project is a chance to learn, grow, and craft something meaningful.
              </p>
            </Reveal>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

// -------------------- Projects (horizontal on desktop) --------------------
const Projects = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !wrapRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = () => track.scrollWidth - window.innerWidth + 120;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    }, wrapRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-12">
        <Reveal className="mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary text-xs font-medium tracking-widest uppercase">Portfolio</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            Featured <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mt-4">
            A curated selection of design projects showcasing innovative solutions and thoughtful user experiences.
          </p>
        </Reveal>
      </div>

      <div ref={wrapRef} className="h-screen overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-row gap-8 px-4 lg:px-16 h-full items-center"
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              className="w-[85vw] sm:w-[400px] md:w-[480px] lg:w-[520px] flex-shrink-0"
            >
              <TiltCard className="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden hover:border-primary/40 transition-colors">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
                  <motion.img
                    src={p.image} alt={p.title} loading="lazy"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.15, clipPath: 'inset(20% round 24px)' }}
                    whileInView={{ scale: 1, clipPath: 'inset(0% round 0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute top-5 left-5 flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-foreground font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="absolute top-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); window.open(p.projectLink, '_blank'); }}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border/50 hover:bg-primary hover:text-primary-foreground transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    {p.caseStudyLink !== '#' && (
                      <button onClick={(e) => { e.stopPropagation(); window.open(p.caseStudyLink, '_blank'); }}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border/50 hover:bg-primary hover:text-primary-foreground transition-colors">
                        <FileText className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-7">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{p.subtitle}</div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm">{p.description}</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => window.open(p.projectLink, '_blank')} className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary group/btn">
                      View Project <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    {p.caseStudyLink !== '#' && (
                      <>
                        <div className="w-px h-4 bg-border" />
                        <button onClick={() => window.open(p.caseStudyLink, '_blank')} className="text-sm text-muted-foreground hover:text-primary">Case Study</button>
                      </>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// -------------------- Experience / Timeline --------------------
const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !pathRef.current || !ref.current) return;
    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${length}`;
    pathRef.current.style.strokeDashoffset = `${length}`;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 70%',
      end: 'bottom 70%',
      scrub: 0.6,
      onUpdate: (self) => {
        if (pathRef.current) pathRef.current.style.strokeDashoffset = `${length * (1 - self.progress)}`;
      },
    });
    return () => st.kill();
  }, [reduced]);

  return (
    <section id="experience" className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="max-w-5xl mx-auto">
        <Reveal className="mb-20 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary text-xs font-medium tracking-widest uppercase">Journey</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            Education & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Experience</span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative">
          {/* SVG progress line */}
          <svg className="absolute left-4 md:left-8 top-0 h-full w-4 overflow-visible pointer-events-none" preserveAspectRatio="none">
            <path ref={pathRef} d="M 8 0 L 8 10000" stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>
          {/* Faint track */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border/40" />

          <div className="space-y-10">
            {timeline.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="relative pl-14 md:pl-24"
              >
                <div className="absolute left-4 md:left-8 top-6 w-3 h-3 -translate-x-[5px] rounded-full bg-primary ring-4 ring-background shadow-[0_0_20px_hsl(var(--primary)/0.6)]" />
                <div className="bg-card/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-border/50 hover:border-primary/40 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1">{t.title}</h3>
                      <p className="text-muted-foreground">{t.place}</p>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium whitespace-nowrap">
                      {t.year}
                    </div>
                  </div>
                  <div className="inline-flex px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-sm">{t.meta}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// -------------------- Skills --------------------
const Skills = () => (
  <section id="skills" className="py-32 px-4 relative overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <Reveal className="text-center mb-16">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
          <span className="text-primary text-xs font-medium tracking-widest uppercase">Expertise</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
        </div>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
          Skills & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tools</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 0.1}>
            <div className="p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/50">
              <h3 className="text-xl font-bold mb-6 text-primary">{group.category}</h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    whileHover={{ y: -4, boxShadow: '0 10px 30px hsl(var(--primary) / 0.2)' }}
                    className="px-4 py-2 rounded-full bg-background/60 border border-border/60 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// -------------------- Contact --------------------
const Contact = ({ onSubmit, formData, onChange }: any) => (
  <section id="contact" className="py-32 px-4 relative overflow-hidden">
    <motion.div
      animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-10 left-10 w-96 h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none"
    />
    <motion.div
      animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-3xl pointer-events-none"
    />

    <div className="max-w-4xl mx-auto relative z-10">
      <Reveal className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          Let's <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Connect</span>
        </h2>
        <p className="text-muted-foreground text-lg">Ready to start your next project? Let's create something amazing together.</p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Reveal x={-30}>
          <div className="backdrop-blur-sm bg-card/40 p-8 rounded-2xl border border-border/50 h-full">
            <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Feel free to reach out if you're looking for a UI/UX Designer, have a query, or just want to connect.
            </p>
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary flex items-center justify-center rounded-xl">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Email</label>
                <p className="text-foreground font-medium break-all cursor-pointer hover:text-primary" onClick={() => window.open('mailto:jayanthkotapati14@gmail.com')}>
                  jayanthkotapati14@gmail.com
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {[
                { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/jayanth-kotapati-800b88288/' },
                { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/j_a_y_a__n_t_h?igsh=MWR2MHJqYmJndjJ0MA==' },
                { icon: <img src="/lovable-uploads/dde8d7e2-4aa6-4788-908c-37e8229fb9f0.png" alt="Behance" className="w-5 h-5" />, href: 'https://www.behance.net/jayanthkotapati' },
              ].map((s, i) => (
                <MagneticWrapper key={i} strength={0.35} radius={70}>
                  <Button variant="outline" size="icon" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all" onClick={() => window.open(s.href, '_blank')}>
                    {s.icon}
                  </Button>
                </MagneticWrapper>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal x={30}>
          <div className="backdrop-blur-sm bg-card/40 p-8 rounded-2xl border border-border/50">
            <h3 className="text-2xl font-bold mb-6">Send a message</h3>
            <form onSubmit={onSubmit} className="space-y-5">
              <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={onChange} required className="bg-background/50 border-border/60 focus:border-primary" />
              <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={onChange} required className="bg-background/50 border-border/60 focus:border-primary" />
              <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={onChange} required rows={5} className="bg-background/50 border-border/60 focus:border-primary resize-none" />
              <MagneticWrapper strength={0.2} radius={100}>
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">Send Message</Button>
              </MagneticWrapper>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// -------------------- Root --------------------
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.toLowerCase());
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isLoading]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailjs.send('service_6r6956i', 'template_c7s8ghz', {
        from_name: formData.name, from_email: formData.email, message: formData.message, to_name: 'Jayanti Kotapati',
      }, 'g1iMpZw27FIrnlHs5');
      toast({ title: 'Message sent!', description: "Thank you for reaching out. I'll get back to you soon." });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      toast({ title: 'Error sending message', description: 'Something went wrong. Please try again later.', variant: 'destructive' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <SmoothScroll>
        <div className={`min-h-screen bg-background text-foreground overflow-x-hidden relative transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar active={activeSection} onNavigate={scrollToSection} />
          <Hero />
          <div className="relative z-10 bg-background">
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Contact onSubmit={handleSubmit} formData={formData} onChange={handleInputChange} />
            <footer className="py-8 px-4 border-t border-border">
              <div className="max-w-7xl mx-auto text-center">
                <p className="text-muted-foreground">© 2024 Jayanti Kotapati. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </div>
      </SmoothScroll>
    </>
  );
};

export default Index;
