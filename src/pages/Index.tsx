

import { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, ExternalLink, Instagram, Linkedin, Menu, X, Figma, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FloatingShapes3D } from '@/components/FloatingShapes3D';
import { ParticleField } from '@/components/ParticleField';
import emailjs from '@emailjs/browser';
import CV from '../../Jayanth Kotapati__UIUX.pdf';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Scroll animation hooks for different sections
  const aboutAnimation = useScrollAnimation(0.2);
  const projectsAnimation = useScrollAnimation(0.1);
  const educationAnimation = useScrollAnimation(0.2);
  const skillsAnimation = useScrollAnimation(0.2);
  const techAnimation = useScrollAnimation(0.2);
  const contactAnimation = useScrollAnimation(0.2);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'education', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await emailjs.send('service_6r6956i', 'template_c7s8ghz', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Jayanti Kotapati'
      }, 'g1iMpZw27FIrnlHs5');
      console.log('Email sent successfully:', result);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon."
      });
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      toast({
        title: "Error sending message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const projects = [{
    title: "COMFORT WEAR",
    subtitle: "Mobile E-Commerce App",
    description: "Keep yourself in style by purchasing product from 'comfort wear'",
    tools: "UI/UX Design, Prototyping",
    image: "/lovable-uploads/d7a8394a-de60-472f-a442-a4a00fb85a6d.png",
    projectLink: "https://www.figma.com/proto/FJ3Qk2lOf1IdK3hTwJtFT8/E-commerces--website?node-id=0-1&t=AS6M5J5ddNFiF2YQ-1",
    caseStudyLink: "https://www.behance.net/gallery/227358245/Comfort-Wear-case-study"
  }, {
    title: "COURSE-ONLINE",
    subtitle: "Learning Platform App",
    description: "Modern online learning platform designed to provide seamless educational experiences with intuitive course navigation and engaging user interface for students and mentors.",
    tools: "UI/UX Design, Mobile App Design, User Research",
    image: "/lovable-uploads/389d16d0-93cb-443e-b3dc-653543ff3a3e.png",
    projectLink: "https://www.figma.com/proto/Y8lve28Tl1xh2cGNUiXDKj/Course-online--Learning?node-id=0-1&t=pFtA5ZSBwInYw6L4-1",
    caseStudyLink: "https://www.behance.net/gallery/230532382/Course-online-case-study"
  }, {
    title: "BURGER HUNT",
    subtitle: "Food Delivery App with Parallax",
    description: "Modern food delivery application featuring stunning parallax effects and intuitive user experience. Crunchy meat all day makes the pain go away.",
    tools: "UI/UX Design, Parallax Effects, Prototyping",
    image: "/lovable-uploads/b61558b7-dd40-4118-84e0-ae2951483f27.png",
    projectLink: "https://www.figma.com/proto/tvmtFRMvBELvrbyr95bXh5/Untitled?node-id=12-4&t=NTL4kx4Ioeq8iFFv-1",
    caseStudyLink: "#"
  }, {
    title: "CLASSIC CARS MUSTANG",
    subtitle: "Automotive Showcase with Parallax",
    description: "Elegant automotive showcase featuring the iconic Mustang 1954 with smooth parallax scrolling effects and premium design aesthetics.",
    tools: "UI/UX Design, Parallax Design, Visual Design",
    image: "/lovable-uploads/f5c380d6-db4d-48a6-9b61-0eaf4e978ff4.png",
    projectLink: "https://www.figma.com/proto/tvmtFRMvBELvrbyr95bXh5/Untitled?node-id=75-831&t=30jv7tUduRR6vyRF-1",
    caseStudyLink: "#"
  }, {
    title: "FOOD RE-DESIGN",
    subtitle: "Web Application Design",
    description: "Modern food application with intuitive user experience and real-time data visualization",
    tools: "UI/UX Design, User Research",
    image: "/lovable-uploads/c4af3f37-96b8-4dbd-8237-f997d6f6d458.png",
    projectLink: "https://www.figma.com/proto/anL4j8dj13EGFYcUifEZ4y/food?node-id=0-1&t=Ddw3t1jlgVxW9JOn-1",
    caseStudyLink: "#"
  }, {
    title: "NIKE RE-DESIGN",
    subtitle: "Web Application",
    description: "Modern shoe web application with intuitive user experience",
    tools: "UI/UX Design, Wireframing",
    image: "/lovable-uploads/fc9ae2ec-5121-4e32-82de-1a2ff5c13b53.png",
    projectLink: "https://www.figma.com/proto/xP8Vr0T8VDP5bUo9j73AV4/NIKE?page-id=0%3A1&node-id=1-254&starting-point-node-id=81%3A100&t=hw1eFjUB446gOPip-1",
    caseStudyLink: "#"
  }, {
    title: "SHUTTER SEARCH",
    subtitle: "Photographer Discovery Platform",
    description: "Website for finding photographers - capture every movement with professionals who bring passion and precision to every shot.",
    tools: "UI/UX Design, Web Design, Prototyping",
    image: "/lovable-uploads/shutter-search.jpg",
    projectLink: "https://www.figma.com/proto/BRp61RM9VQJ6LGLeaFXDDj/Responsive--Designs?node-id=90-566&t=oMOnXaArQ41ntfLb-1",
    caseStudyLink: "#"
  }];

  const skills = ["Web Designing", "UI/UX Design", "Front-End Technology", "Editing and Design"];
  const technologies = [{
    name: "Figma",
    icon: Figma
  }, {
    name: "Photoshop",
    icon: null
  }, {
    name: "Canva",
    icon: null
  }];

  return <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* 3D Background Elements */}
      <ParticleField />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-primary rounded-sm">JK</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Education', 'Skills', 'Contact'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === item.toLowerCase() ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item}
                </button>)}
            </div>

          <div className="hidden md:flex items-center space-x-4 ml-8">
              <ThemeToggle />
              <a href={CV} download="Jayanth Kotapati__UIUX.pdf">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </a>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border">
              <div className="px-4 py-6 space-y-4">
                {['Home', 'About', 'Projects', 'Education', 'Skills', 'Contact'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </button>)}
                <div className="pt-4 border-t border-border flex flex-col gap-2">
                  <ThemeToggle />
                  <a href={CV} download="Jayanth Kotapati__UIUX.pdf" className="w-full">
                    <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download CV
                    </Button>
                  </a>
                </div>
              </div>
            </div>}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/3 to-transparent"></div>
        
        {/* 3D Floating Shapes */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <FloatingShapes3D />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fade-in backdrop-blur-sm bg-background/20 p-8 rounded-2xl border border-primary/10 shadow-2xl">
            <p className="text-primary mb-4 my-[33px] text-left mx-[6px] font-bold text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Hi, I'm JAYANTH KOTAPATI</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              I'M A UI/UX
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse">DESIGNER</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
              I am a passionate UI/UX designer with a love for creating beautiful and functional user experiences. I have strong foundation in UI/UX design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="border-primary text-primary bg-card/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300" onClick={() => window.open('https://www.linkedin.com/in/jayanth-kotapati-800b88288/', '_blank')}>
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-primary text-primary bg-card/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300" onClick={() => window.open('https://www.instagram.com/j_a_y_a__n_t_h?igsh=MWR2MHJqYmJndjJ0MA==', '_blank')}>
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-primary text-primary bg-card/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300" onClick={() => window.open('https://www.behance.net/jayanthkotapati', '_blank')}>
                  <img src="/lovable-uploads/dde8d7e2-4aa6-4788-908c-37e8229fb9f0.png" alt="Behance" className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-primary text-primary bg-card/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300" onClick={() => window.open('mailto:jayanthkotapati14@gmail.com', '_blank')}>
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in animation-delay-300">
            <div className="w-80 h-80 mx-auto rounded-full overflow-hidden relative group">
              {/* Premium layered background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-secondary/40 to-primary/40 blur-3xl rounded-full transform scale-110 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent blur-2xl rounded-full transform scale-125"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-secondary/30 to-transparent blur-xl rounded-full transform scale-105"></div>
              
              {/* Floating border effect */}
              <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-primary via-secondary to-primary opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-2 rounded-full border border-primary/30 opacity-40"></div>
              
              <img 
                alt="Profile" 
                src="/lovable-uploads/aab91a2e-c541-4dc7-9660-efea419a82e8.png" 
                className="w-full h-full object-fill relative z-10 rounded-full shadow-[0_0_120px_hsl(var(--primary)/0.9),0_0_240px_hsl(var(--primary)/0.5),0_0_360px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_180px_hsl(var(--primary)/1),0_0_300px_hsl(var(--primary)/0.7),0_0_420px_hsl(var(--primary)/0.4)] group-hover:scale-105 transition-all duration-700" 
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div ref={aboutAnimation.ref} className={`text-center mb-16 transition-all duration-1000 ${aboutAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About <span className="text-primary">Me</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate about creating meaningful digital experiences that solve real-world problems through thoughtful design and user-centered approaches.
            </p>
          </div>
          
          <div className={`flex flex-col items-center justify-center text-center transition-all duration-1000 delay-300 ${aboutAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <h3 className="text-3xl font-bold mb-6 text-center">Creating Digital Solutions</h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed text-justify max-w-3xl">I'm an UI/UX designer, I specialize in creating intuitive and engaging digital experiences. My approach combines user research, creative design thinking, and technical implementation to deliver solutions that not only look great but also function seamlessly.</p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed text-justify max-w-3xl">
                I believe in the power of good design to transform businesses and improve people's lives. Every project I work on is an opportunity to learn, grow, and create something meaningful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gradient-to-b from-muted/30 via-muted/50 to-background relative overflow-hidden mx-0" aria-labelledby="projects-heading">
        {/* Premium animated background patterns */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto">
          <div ref={projectsAnimation.ref} className={`text-center mb-20 transition-all duration-1000 ${projectsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary mr-4"></div>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 backdrop-blur-sm">
                Portfolio Showcase
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary ml-4"></div>
            </div>
            <h2 id="projects-heading" className="text-4xl md:text-6xl font-bold mb-6">
              Featured <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Discover my premium design solutions that blend creativity with functionality, crafted with attention to detail and user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 relative z-10">
            {projects.map((project, index) => (
              <article 
                key={index} 
                className={`group relative bg-gradient-to-br from-card/95 via-card/90 to-card/85 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.25),0_0_60px_hsl(var(--primary)/0.20),0_0_120px_hsl(var(--primary)/0.10)] transition-all duration-700 hover:-translate-y-8 hover:rotate-1 border border-primary/20 hover:border-primary/50 cursor-pointer focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 focus-within:ring-offset-background ${projectsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
                style={{
                  transitionDelay: projectsAnimation.isVisible ? `${index * 200 + 300}ms` : '0ms'
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title} project`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.open(project.projectLink, '_blank');
                  }
                }}
              >
                {/* Premium floating background effects */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-secondary/10 via-transparent to-primary/10 rounded-3xl opacity-0 group-hover:opacity-80 transition-all duration-700"></div>
                
                {/* Enhanced project number badge */}
                <div className="absolute top-6 left-6 z-30">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm opacity-60"></div>
                    <div className="relative w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg border border-primary/30 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
                
                {/* Premium status indicator */}
                <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-full px-3 py-1 border border-green-500/30">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 text-xs font-medium">Live</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-t-3xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 z-10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <img 
                    src={project.image} 
                    alt={`Screenshot of ${project.title} project showing ${project.subtitle}`} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-110 group-hover:contrast-105" 
                    loading="lazy"
                  />
                  
                  {/* Premium overlay gradients with micro animations */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Enhanced floating action buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <button 
                      className="bg-background/10 backdrop-blur-md rounded-full p-3 border border-primary/30 hover:border-primary/60 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.projectLink, '_blank');
                      }}
                      aria-label={`Open ${project.title} project in new tab`}
                    >
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                  
                  {/* Enhanced bottom project info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center justify-between">
                      <div className="bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/30">
                        <span className="text-primary text-xs font-semibold">{project.tools}</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 relative">
                  {/* Premium content background with animated gradients */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-primary/5 rounded-b-3xl opacity-0 group-hover:opacity-80 transition-all duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent group-hover:from-secondary group-hover:via-primary group-hover:to-secondary transition-all duration-700">
                        {project.title}
                      </h3>
                      <h4 className="text-lg text-foreground/90 font-medium mb-2">{project.subtitle}</h4>
                      <div className="h-px w-16 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                    
                    <p className="text-muted-foreground mb-8 leading-relaxed text-sm group-hover:text-foreground/80 transition-colors duration-300">
                      {project.description}
                    </p>
                    
                     {/* Enhanced tools badge with premium styling */}
                    <div className="mb-8">
                      <div className="inline-flex items-center bg-gradient-to-r from-primary/15 to-secondary/15 text-primary px-4 py-2 rounded-full text-xs font-semibold border border-primary/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{project.tools}</span>
                      </div>
                    </div>
                    
                    {/* Premium button layout with enhanced interactions */}
                    <div className="flex flex-col gap-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="relative overflow-hidden bg-gradient-to-r from-primary/15 to-primary/10 border-primary/40 text-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary/90 hover:text-primary-foreground hover:shadow-[0_12px_32px_hsl(var(--primary)/0.40)] hover:border-primary/70 transition-all duration-500 backdrop-blur-sm group-hover:scale-105 focus:ring-2 focus:ring-primary/50 focus:ring-offset-2" 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.projectLink, '_blank');
                        }}
                        aria-label={`View ${project.title} project details`}
                      >
                        <span className="relative z-10 flex items-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="relative overflow-hidden bg-gradient-to-r from-secondary/15 to-secondary/10 border-secondary/40 text-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-secondary/90 hover:text-secondary-foreground hover:shadow-[0_12px_32px_hsl(var(--secondary)/0.40)] hover:border-secondary/70 transition-all duration-500 backdrop-blur-sm group-hover:scale-105 focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (project.caseStudyLink !== "#") {
                            window.open(project.caseStudyLink, '_blank');
                          }
                        }} 
                        disabled={project.caseStudyLink === "#"}
                        aria-label={project.caseStudyLink === "#" ? "Case study coming soon" : `View ${project.title} case study`}
                      >
                        <span className="relative z-10 flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          {project.caseStudyLink === "#" ? "Case Study Soon" : "Case Study"}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Premium call-to-action */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 backdrop-blur-sm rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-500 group cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Have a project in mind?
                </h3>
                <p className="text-muted-foreground mb-4">Let's create something amazing together</p>
                <div className="inline-flex items-center text-primary font-medium group-hover:text-secondary transition-colors duration-300">
                  <span>Get in touch</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Skills Section */}
      <section id="education" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Education */}
            <div ref={educationAnimation.ref} className={`transition-all duration-1000 ${educationAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl font-bold mb-12 text-center lg:text-left">
                <span className="text-primary">Education</span>
              </h2>
              <div className="space-y-8">
                <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-primary mb-2">Bachelor of Computer Science (CSE)</h3>
                  <p className="text-foreground mb-2">Eluru College of Engineering and Technology</p>
                  <p className="text-muted-foreground text-sm mb-2">CGPA: 7.07/10</p>
                  <p className="text-muted-foreground/70 text-sm">2020 - 2024</p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-primary mb-2">Intermediate (M.P.C)</h3>
                  <p className="text-foreground mb-2">Vidya Vikas Junior College</p>
                  <p className="text-muted-foreground text-sm mb-2">Percentage: 7/10</p>
                  <p className="text-muted-foreground/70 text-sm">2018 - 2020</p>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-primary mb-2">S.S.C</h3>
                  <p className="text-foreground mb-2">Vidya Vikas High School</p>
                  <p className="text-muted-foreground text-sm mb-2">CGPA: 9.2/10</p>
                  <p className="text-muted-foreground/70 text-sm">2017 - 2018</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div id="skills" ref={skillsAnimation.ref} className={`transition-all duration-1000 ${skillsAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h2 className="text-4xl font-bold mb-12 text-center lg:text-left">
                <span className="text-primary">Skills</span>
              </h2>
              <div className="space-y-6">
                {skills.map((skill, index) => <div key={index} className={`group hover:-translate-y-2 transition-all duration-1000 bg-card p-6 rounded-xl border border-border hover:border-primary/50 ${skillsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
                transitionDelay: skillsAnimation.isVisible ? `${index * 150}ms` : '0ms'
              }}>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors text-center">
                      {skill}
                    </h3>
                  </div>)}
              </div>
            </div>
          </div>

          {/* Technologies & Tools Section */}
          <div ref={techAnimation.ref} className={`w-full max-w-4xl mx-auto mt-20 transition-all duration-1000 ${techAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-12 text-center">Technologies & <span className="text-primary">Tools</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {technologies.map((tech, index) => <div key={index} className={`group bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-1000 hover:-translate-y-2 ${techAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
              transitionDelay: techAnimation.isVisible ? `${index * 200 + 300}ms` : '0ms'
            }}>
                  <div className="flex flex-col items-center space-y-4">
                    {tech.icon ? <tech.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" /> : <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">{tech.name.charAt(0)}</span>
                      </div>}
                    <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tech.name}
                    </h4>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        {/* Premium background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div ref={contactAnimation.ref} className={`text-center mb-16 transition-all duration-1000 ${contactAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span></h2>
            <p className="text-muted-foreground text-lg">Ready to start your next project? Let's create something amazing together.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className={`transition-all duration-1000 delay-300 backdrop-blur-sm bg-card/40 p-8 rounded-2xl border border-primary/10 shadow-2xl hover:shadow-primary/10 ${contactAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Let's Connect</h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                What's next? Feel free to reach out to me if you're looking for a UI/UX Designer, have a query, or simply want to connect.
              </p>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1 block">Email</label>
                    <p className="text-foreground font-medium hover:text-primary transition-colors cursor-pointer break-all sm:break-normal text-sm sm:text-base" onClick={() => window.open('mailto:jayanthkotapati14@gmail.com')}>
                      jayanthkotapati14@gmail.com
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:scale-110 transition-all duration-300 backdrop-blur-sm" onClick={() => window.open('https://www.linkedin.com/in/jayanth-kotapati-800b88288/', '_blank')}>
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/5 text-secondary hover:bg-secondary hover:text-secondary-foreground hover:shadow-lg hover:shadow-secondary/25 hover:scale-110 transition-all duration-300 backdrop-blur-sm" onClick={() => window.open('https://www.instagram.com/j_a_y_a__n_t_h?igsh=MWR2MHJqYmJndjJ0MA==', '_blank')}>
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:scale-110 transition-all duration-300 backdrop-blur-sm" onClick={() => window.open('https://www.behance.net/jayanthkotapati', '_blank')}>
                    <img src="/lovable-uploads/dde8d7e2-4aa6-4788-908c-37e8229fb9f0.png" alt="Behance" className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-500 backdrop-blur-sm bg-card/40 p-8 rounded-2xl border border-primary/10 shadow-2xl hover:shadow-primary/10 ${contactAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <Input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    className="bg-background/50 backdrop-blur-sm border-primary/20 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 focus:shadow-lg focus:shadow-primary/10 transition-all duration-300 hover:border-primary/40" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <div className="relative group">
                  <Input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    className="bg-background/50 backdrop-blur-sm border-primary/20 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 focus:shadow-lg focus:shadow-primary/10 transition-all duration-300 hover:border-primary/40" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <div className="relative group">
                  <Textarea 
                    name="message" 
                    placeholder="Your Message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    required 
                    rows={5} 
                    className="bg-background/50 backdrop-blur-sm border-primary/20 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary/20 focus:shadow-lg focus:shadow-primary/10 transition-all duration-300 hover:border-primary/40 resize-none" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Jayanti Kotapati. All rights reserved. | Ready to get started?
          </p>
        </div>
      </footer>
    </div>;
};

export default Index;

