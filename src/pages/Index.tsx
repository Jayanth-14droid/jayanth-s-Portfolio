

import { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, ExternalLink, Instagram, Linkedin, Menu, X, Figma } from 'lucide-react';
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
      <section id="projects" className="py-20 px-4 bg-gradient-to-b from-muted/30 via-muted/50 to-background relative overflow-hidden mx-0">
        {/* Premium background patterns */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto">
          <div ref={projectsAnimation.ref} className={`text-center mb-16 transition-all duration-1000 ${projectsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="text-primary">Projects</span></h2>
            <p className="text-muted-foreground text-lg">A selection of my recent work showcasing various design disciplines</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {projects.map((project, index) => <div key={index} className={`group bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.1),0_0_0_1px_hsl(var(--primary)/0.1)] transition-all duration-700 hover:-translate-y-3 border border-primary/10 hover:border-primary/20 ${projectsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
            transitionDelay: projectsAnimation.isVisible ? `${index * 200 + 300}ms` : '0ms'
          }}>
                <div className="relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{project.title}</h3>
                  <h4 className="text-lg text-foreground/90 mb-3 font-medium">{project.subtitle}</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{project.description}</p>
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-4">{project.tools}</div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 backdrop-blur-sm" onClick={() => window.open(project.projectLink, '_blank')}>
                      View Project
                    </Button>
                    <Button variant="outline" size="sm" className="border-primary/20 bg-secondary/5 text-secondary hover:bg-secondary hover:text-secondary-foreground hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300 backdrop-blur-sm" onClick={() => project.caseStudyLink !== "#" && window.open(project.caseStudyLink, '_blank')} disabled={project.caseStudyLink === "#"}>
                      View Case Study
                    </Button>
                  </div>
                </div>
              </div>)}
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
      <section id="contact" className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div ref={contactAnimation.ref} className={`text-center mb-16 transition-all duration-1000 ${contactAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In <span className="text-primary">Touch</span></h2>
            <p className="text-muted-foreground text-lg">Ready to start your next project? Let's create something amazing together.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className={`transition-all duration-1000 delay-300 ${contactAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                What's next? Feel free to reach out to me if you're looking for a UI/UX Designer, have a query, or simply want to connect.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">jayanthkotapati14@gmail.com</p>
                  </div>
                </div>
                
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
                </div>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-500 ${contactAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-ring focus:ring-ring" />
                </div>
                
                <div>
                  <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-ring focus:ring-ring" />
                </div>
                
                <div>
                  <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleInputChange} required rows={5} className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-ring focus:ring-ring" />
                </div>
                
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
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

