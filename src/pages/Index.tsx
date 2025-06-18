import { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, ExternalLink, Github, Linkedin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon."
    });
    setFormData({
      name: '',
      email: '',
      message: ''
    });
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
    image: "/lovable-uploads/da0c0674-eb8a-4e9f-a0ec-949b5e534711.png",
    link: "#"
  }, {
    title: "FINTECH DASHBOARD",
    subtitle: "Web Application Design",
    description: "Modern financial dashboard with intuitive user experience and real-time data visualization",
    tools: "UI/UX Design, User Research",
    image: "/lovable-uploads/da0c0674-eb8a-4e9f-a0ec-949b5e534711.png",
    link: "#"
  }, {
    title: "HEALTHCARE APP",
    subtitle: "Mobile Health Platform",
    description: "Comprehensive health tracking app with appointment booking and telemedicine features",
    tools: "UI/UX Design, Wireframing",
    image: "/lovable-uploads/da0c0674-eb8a-4e9f-a0ec-949b5e534711.png",
    link: "#"
  }];
  const skills = [{
    name: "Web Designing",
    level: 95
  }, {
    name: "UI/UX Design",
    level: 90
  }, {
    name: "Front-End Technology",
    level: 85
  }, {
    name: "Editing and Design",
    level: 88
  }];
  return <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-green-400">Portfolio</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Education', 'Skills', 'Contact'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`text-sm font-medium transition-colors hover:text-green-400 ${activeSection === item.toLowerCase() ? 'text-green-400' : 'text-gray-300'}`}>
                  {item}
                </button>)}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 border-b border-gray-800">
              <div className="px-4 py-6 space-y-4">
                {['Home', 'About', 'Projects', 'Education', 'Skills', 'Contact'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left text-gray-300 hover:text-green-400 transition-colors">
                    {item}
                  </button>)}
                <Button variant="outline" size="sm" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>
            </div>}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <p className="text-green-400 mb-4 text-lg">Hi, I'm JAYANTI KOTAPATI</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              I'M A UI/UX
              <br />
              <span className="text-green-400">DESIGNER</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              I am a passionate UI/UX designer with a love for creating beautiful and functional user experiences. I have strong foundation in UI/UX design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-green-400 text-gray-900 hover:bg-green-500 transition-all duration-300 transform hover:scale-105">
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="border-gray-600 hover:border-green-400 hover:text-green-400">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-600 hover:border-green-400 hover:text-green-400">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-600 hover:border-green-400 hover:text-green-400">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in animation-delay-300">
            <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-green-400/20 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
              <ArrowDown className="w-8 h-8 text-gray-900" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About <span className="text-green-400">Me</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Passionate about creating meaningful digital experiences that solve real-world problems through thoughtful design and user-centered approaches.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop" alt="Working" className="rounded-lg shadow-xl" />
            </div>
            <div className="animate-fade-in animation-delay-300">
              <h3 className="text-3xl font-bold mb-6">Creating Digital Solutions</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">I'm fresher  in UI/UX design, I specialize in creating intuitive and engaging digital experiences. My approach combines user research, creative design thinking, and technical implementation to deliver solutions that not only look great but also function seamlessly.</p>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                I believe in the power of good design to transform businesses and improve people's lives. Every project I work on is an opportunity to learn, grow, and create something meaningful.
              </p>
              <div className="grid grid-cols-2 gap-8">
                
                <div>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="text-green-400">Projects</span></h2>
            <p className="text-gray-400 text-lg">A selection of my recent work showcasing various design disciplines</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => <div key={index} className="group bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in" style={{
            animationDelay: `${index * 200}ms`
          }}>
                <div className="relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-green-400">{project.title}</h3>
                  <h4 className="text-lg text-gray-300 mb-3">{project.subtitle}</h4>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  <p className="text-sm text-green-400 mb-4">{project.tools}</p>
                  <Button variant="outline" size="sm" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition-all duration-300">
                    View Project
                  </Button>
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
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-12 text-center lg:text-left">
                <span className="text-green-400">Education</span>
              </h2>
              <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-400/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-green-400 mb-2">Bachelor of Computer Science (CSE)</h3>
                  <p className="text-gray-300 mb-2">Dnyy College of Engineering and Technology</p>
                  <p className="text-gray-400 text-sm mb-2">CGPA: 7.0/10</p>
                  <p className="text-gray-500 text-sm">2020 - 2024</p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-400/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-green-400 mb-2">Intermediate (M.P.C)</h3>
                  <p className="text-gray-300 mb-2">Tirru Vani Junior College</p>
                  <p className="text-gray-400 text-sm mb-2">Percentage: 94.2%</p>
                  <p className="text-gray-500 text-sm">2018 - 2020</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-400/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-green-400 mb-2">S.S.C</h3>
                  <p className="text-gray-300 mb-2">Zp High School</p>
                  <p className="text-gray-400 text-sm mb-2">CGPA: 9.5/10</p>
                  <p className="text-gray-500 text-sm">2017 - 2018</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div id="skills" className="animate-fade-in animation-delay-300">
              <h2 className="text-4xl font-bold mb-12 text-center lg:text-left">
                <span className="text-green-400">Skills</span>
              </h2>
              <div className="space-y-8">
                {skills.map((skill, index) => <div key={index} className="group hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-green-400 font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 ease-out" style={{
                    width: `${skill.level}%`
                  }} />
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In <span className="text-green-400">Touch</span></h2>
            <p className="text-gray-400 text-lg">Ready to start your next project? Let's create something amazing together.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                What's next? Feel free to reach out to me if you're looking for a UI/UX Designer, have a query, or simply want to connect.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">jayanthkotapati14@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900">
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900">
                    <Github className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="animate-fade-in animation-delay-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400" />
                </div>
                
                <div>
                  <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400" />
                </div>
                
                <div>
                  <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleInputChange} required rows={5} className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400" />
                </div>
                
                <Button type="submit" size="lg" className="w-full bg-green-400 text-gray-900 hover:bg-green-500 transition-all duration-300 transform hover:scale-105">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Jayanti Kotapati. All rights reserved. | Ready to get started?
          </p>
        </div>
      </footer>
    </div>;
};
export default Index;