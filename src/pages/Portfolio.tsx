import { useState, useEffect, lazy, Suspense } from 'react';
import { 
  ArrowDown, Download, Mail, ExternalLink, Instagram, Linkedin, 
  Menu, X, Figma, ChevronRight, Code, Palette, Sparkles, 
  Award, Clock, Users, Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ProjectCarousel } from '@/components/ProjectCarousel';
import { ContactForm } from '@/components/ContactForm';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CV from '../../Jayanth Kotapati__UIUX.pdf';

// Lazy load heavy components for better performance
const LazyProjectGrid = lazy(() => import('@/components/ProjectGrid'));

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Scroll animation hooks for different sections
  const heroAnimation = useScrollAnimation(0.1);
  const aboutAnimation = useScrollAnimation(0.2);
  const projectsAnimation = useScrollAnimation(0.1);
  const skillsAnimation = useScrollAnimation(0.2);
  const contactAnimation = useScrollAnimation(0.2);

  // Simulate loading for smooth experience
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
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
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Project data
  const projects = [
    {
      title: "COMFORT WEAR",
      subtitle: "Mobile E-Commerce App",
      description: "A comprehensive e-commerce mobile application featuring intuitive user experience, seamless product browsing, and secure checkout process. Designed with modern UI principles and user-centered approach.",
      tools: "UI/UX Design, Prototyping, User Research",
      image: "/lovable-uploads/d7a8394a-de60-472f-a442-a4a00fb85a6d.png",
      projectLink: "https://www.figma.com/proto/FJ3Qk2lOf1IdK3hTwJtFT8/E-commerces--website?node-id=0-1&t=AS6M5J5ddNFiF2YQ-1",
      caseStudyLink: "https://www.behance.net/gallery/227358245/Comfort-Wear-case-study",
      featured: true
    },
    {
      title: "COURSE-ONLINE",
      subtitle: "Learning Platform App",
      description: "Modern online learning platform designed to provide seamless educational experiences with intuitive course navigation and engaging user interface for students and mentors.",
      tools: "UI/UX Design, Mobile App Design, User Research",
      image: "/lovable-uploads/389d16d0-93cb-443e-b3dc-653543ff3a3e.png",
      projectLink: "https://www.figma.com/proto/Y8lve28Tl1xh2cGNUiXDKj/Course-online--Learning?node-id=0-1&t=pFtA5ZSBwInYw6L4-1",
      caseStudyLink: "https://www.behance.net/gallery/230532382/Course-online-case-study",
      featured: true
    },
    {
      title: "BURGER HUNT",
      subtitle: "Food Delivery App with Parallax",
      description: "Modern food delivery application featuring stunning parallax effects and intuitive user experience. Designed to make food ordering delightful and efficient.",
      tools: "UI/UX Design, Parallax Effects, Prototyping",
      image: "/lovable-uploads/b61558b7-dd40-4118-84e0-ae2951483f27.png",
      projectLink: "https://www.figma.com/proto/tvmtFRMvBELvrbyr95bXh5/Untitled?node-id=12-4&t=NTL4kx4Ioeq8iFFv-1",
      caseStudyLink: "#",
      featured: true
    },
    {
      title: "CLASSIC CARS MUSTANG",
      subtitle: "Automotive Showcase with Parallax",
      description: "Elegant automotive showcase featuring the iconic Mustang 1954 with smooth parallax scrolling effects and premium design aesthetics.",
      tools: "UI/UX Design, Parallax Design, Visual Design",
      image: "/lovable-uploads/f5c380d6-db4d-48a6-9b61-0eaf4e978ff4.png",
      projectLink: "https://www.figma.com/proto/tvmtFRMvBELvrbyr95bXh5/Untitled?node-id=75-831&t=30jv7tUduRR6vyRF-1",
      caseStudyLink: "#",
      featured: true
    },
    {
      title: "FOOD RE-DESIGN",
      subtitle: "Web Application Design",
      description: "Modern food application redesign with intuitive user experience and real-time data visualization for better user engagement.",
      tools: "UI/UX Design, User Research",
      image: "/lovable-uploads/c4af3f37-96b8-4dbd-8237-f997d6f6d458.png",
      projectLink: "https://www.figma.com/proto/anL4j8dj13EGFYcUifEZ4y/food?node-id=0-1&t=Ddw3t1jlgVxW9JOn-1",
      caseStudyLink: "#",
      featured: true
    }
  ];

  const skills = [
    { name: "UI/UX Design", level: 95, icon: Palette },
    { name: "Prototyping", level: 90, icon: Code },
    { name: "User Research", level: 85, icon: Users },
    { name: "Visual Design", level: 92, icon: Sparkles }
  ];

  const achievements = [
    { icon: Award, label: "Projects Completed", value: "15+" },
    { icon: Users, label: "Happy Clients", value: "10+" },
    { icon: Clock, label: "Years Experience", value: "2+" },
    { icon: Star, label: "Client Rating", value: "4.9/5" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-primary">JK</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-primary focus-visible:text-primary ${
                    activeSection === item.toLowerCase() ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <a href={CV} download="Jayanth_Kotapati_UIUX.pdf">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-muted transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
              <div className="px-4 py-6 space-y-4">
                {['Home', 'About', 'Projects', 'Skills', 'Contact'].map(item => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <Separator />
                <a href={CV} download="Jayanth_Kotapati_UIUX.pdf" className="block">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float animation-delay-700" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div 
            ref={heroAnimation.ref}
            className={`space-y-8 transition-all duration-1000 ${
              heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                Available for freelance
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Hi, I'm 
                <span className="text-gradient-primary block">Jayanth Kotapati</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                UI/UX Designer crafting beautiful digital experiences
              </p>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                I specialize in creating intuitive and engaging user interfaces that solve real problems 
                and delight users. Every pixel has a purpose.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('projects')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground btn-primary"
              >
                View My Work
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Get In Touch
              </Button>
            </div>

            <div className="flex space-x-4 pt-4">
              {[
                { icon: Linkedin, url: 'https://www.linkedin.com/in/jayanth-kotapati-800b88288/', label: 'LinkedIn' },
                { icon: Instagram, url: 'https://www.instagram.com/j_a_y_a__n_t_h?igsh=MWR2MHJqYmJndjJ0MA==', label: 'Instagram' },
                { icon: Mail, url: 'mailto:jayanthkotapati14@gmail.com', label: 'Email' }
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(social.url, '_blank')}
                  className="border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open('https://www.behance.net/jayanthkotapati', '_blank')}
                className="border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Behance"
              >
                <img 
                  src="/lovable-uploads/dde8d7e2-4aa6-4788-908c-37e8229fb9f0.png" 
                  alt="Behance" 
                  className="w-5 h-5" 
                />
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in animation-delay-300">
            <div className="relative w-80 h-80 mx-auto">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-20 animate-pulse-glow" />
              <div className="absolute inset-4 bg-gradient-to-r from-accent to-primary rounded-full blur-xl opacity-30 animate-pulse-glow animation-delay-500" />
              
              {/* Profile image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 bg-card hover-glow">
                <img 
                  alt="Jayanth Kotapati - UI/UX Designer" 
                  src="/lovable-uploads/aab91a2e-c541-4dc7-9660-efea419a82e8.png" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollToSection('about')}
            className="rounded-full"
            aria-label="Scroll to about section"
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={aboutAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              aboutAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient-primary">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Passionate about creating meaningful digital experiences that solve real-world problems 
              through thoughtful design and user-centered approaches.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div 
              className={`space-y-6 transition-all duration-1000 delay-300 ${
                aboutAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-3xl font-bold">Creating Digital Solutions</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  As a UI/UX designer, I specialize in creating intuitive and engaging digital experiences. 
                  My approach combines user research, creative design thinking, and technical implementation 
                  to deliver solutions that not only look great but also function seamlessly.
                </p>
                <p>
                  I believe in the power of good design to transform businesses and improve people's lives. 
                  Every project I work on is an opportunity to learn, grow, and create something meaningful 
                  that makes a real difference.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="text-center p-4 hover-lift">
                    <CardContent className="p-0">
                      <achievement.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{achievement.value}</div>
                      <div className="text-sm text-muted-foreground">{achievement.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div 
              className={`transition-all duration-1000 delay-500 ${
                aboutAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <Card className="p-6 bg-card border-border hover-lift">
                <CardHeader>
                  <CardTitle className="text-xl font-bold mb-4">My Journey</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Bachelor of Computer Science</h4>
                      <p className="text-muted-foreground text-sm">Eluru College of Engineering and Technology</p>
                      <p className="text-muted-foreground text-xs">2020 - 2024 • CGPA: 7.07/10</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">UI/UX Design Specialization</h4>
                      <p className="text-muted-foreground text-sm">Self-taught through courses and practice</p>
                      <p className="text-muted-foreground text-xs">2022 - Present</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={projectsAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              projectsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-gradient-primary">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A curated selection of my best work showcasing various design disciplines and approaches
            </p>
          </div>

          <div 
            className={`transition-all duration-1000 delay-300 ${
              projectsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <ProjectCarousel projects={projects} />
          </div>

          {/* Additional Projects Grid */}
          <div className="mt-16">
            <Suspense fallback={
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="loading-shimmer h-64 bg-muted animate-pulse" />
                ))}
              </div>
            }>
              <LazyProjectGrid projects={projects} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={skillsAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              skillsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient-primary">Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive set of design and technical skills honed through years of practice and real-world projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <Card 
                key={index}
                className={`text-center p-6 hover-lift transition-all duration-1000 ${
                  skillsAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: skillsAnimation.isVisible ? `${index * 100 + 500}ms` : '0ms' 
                }}
              >
                <CardContent className="p-0 space-y-4">
                  <skill.icon className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <div className="space-y-2">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: skillsAnimation.isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 100 + 800}ms`
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{skill.level}% Proficiency</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tools & Technologies */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8">Tools & Technologies</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Figma", icon: Figma },
                { name: "Adobe Photoshop", icon: null },
                { name: "Adobe Illustrator", icon: null },
                { name: "Canva", icon: null },
                { name: "Sketch", icon: null },
                { name: "InVision", icon: null }
              ].map((tool, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tool.icon && <tool.icon className="w-4 h-4 mr-2" />}
                  {tool.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={contactAnimation.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              contactAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's <span className="text-gradient-primary">Connect</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div 
              className={`space-y-8 transition-all duration-1000 delay-300 ${
                contactAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Get in touch</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always excited to work on new projects and collaborate with creative teams. 
                  Whether you have a specific project in mind or just want to say hello, 
                  I'd love to hear from you!
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6 hover-lift">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <a 
                        href="mailto:jayanthkotapati14@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        jayanthkotapati14@gmail.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-lift">
                  <div className="flex items-center space-x-4">
                    <Linkedin className="w-6 h-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">LinkedIn</h4>
                      <a 
                        href="https://www.linkedin.com/in/jayanth-kotapati-800b88288/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Connect with me
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-lift">
                  <div className="flex items-center space-x-4">
                    <ExternalLink className="w-6 h-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">Portfolio</h4>
                      <a 
                        href="https://www.behance.net/jayanthkotapati"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        View on Behance
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div 
              className={`transition-all duration-1000 delay-500 ${
                contactAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-primary mb-2">Jayanth Kotapati</h3>
            <p className="text-muted-foreground">UI/UX Designer</p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-6">
            <a 
              href="https://www.linkedin.com/in/jayanth-kotapati-800b88288/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://www.behance.net/jayanthkotapati"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Behance"
            >
              <img 
                src="/lovable-uploads/dde8d7e2-4aa6-4788-908c-37e8229fb9f0.png" 
                alt="Behance" 
                className="w-5 h-5" 
              />
            </a>
            <a 
              href="mailto:jayanthkotapati14@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          
          <Separator className="mb-6" />
          
          <div className="text-sm text-muted-foreground">
            <p>&copy; 2024 Jayanth Kotapati. All rights reserved.</p>
            <p className="mt-2">Designed and developed with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;