import { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, ExternalLink, Instagram, Linkedin, Menu, X, Figma } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import CV from '../../Jayanth Kotapati__UIUX_.pdf';

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await emailjs.send('service_6r6956i',
      // Your EmailJS service ID
      'template_c7s8ghz',
      // Your EmailJS template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Jayanti Kotapati'
      }, 'g1iMpZw27FIrnlHs5' // Your EmailJS public key
      );
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
    projectLink: "https://www.figma.com/proto/6HFtUNU5pppQWZAGwRDxK/Nike-Sneaker-Website--Community-?node-id=0-1&t=L68Lf60Bqu0tWWMs-1",
    caseStudyLink: "#"
  }];
  const skills = ["Web Designing", "UI/UX Design", "Front-End Technology", "Editing and Design"];
  const technologies = [
    { name: "Figma", icon: Figma },
    { name: "Photoshop", icon: null },
    { name: "Canva", icon: null }
  ];

  return <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-green-400 rounded-sm">JK</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Education', 'Skills', 'Contact'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`text-sm font-medium transition-colors hover:text-green-400 ${activeSection === item.toLowerCase() ? 'text-green-400' : 'text-gray-300'}`}>
                  {item}
                </button>)}
            </div>

          <div className="hidden md:flex items-center space-x-4">
              <a href={CV} download="Jayanth Kotapati__UIUX_.pdf">
                <Button variant="outline" size="sm" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900">
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
          {isMenuOpen && <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 border-b border-gray-800">
              <div className="px-4 py-6 space-y-4">
                {['Home', 'About', 'Projects', 'Education', 'Skills', 'Contact'].map(item => <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left text-gray-300 hover:text-green-400 transition-colors">
                    {item}
                  </button>)}
                <a href={CV} download="Jayanth Kotapati__UIUX_.pdf" className="w-full">
                  <Button variant="outline" size="sm" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>
                </a>
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
              
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="border-green-400 text-green-400 bg-gray-800/50 hover:bg-green-400 hover:text-gray-900 transition-all duration-300" onClick={() => window.open('https://www.linkedin.com/in/jayanth-kotapati-800b88288/', '_blank')}>
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-green-400 text-green-400 bg-gray-800/50 hover:bg-green-400 hover:text-gray-900 transition-all duration-300" onClick={() => window.open('https://www.instagram.com/j_a_y_a__n_t_h?igsh=MWR2MHJqYmJndjJ0MA==', '_blank')}>
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-green-400 text-green-400 bg-gray-800/50 hover:bg-green-400 hover:text-gray-900 transition-all duration-300" onClick={() => window.open('https://www.behance.net/jayanthkotapati', '_blank')}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.5 2.5C7.5 1.119 8.619 0 10 0h11C22.881 0 24 1.119 24 2.5v19c0 1.381-1.119 2.5-2.5 2.5H10c-1.381 0-2.5-1.119-2.5-2.5v-19zM8.5 2.5v19c0 .827.673 1.5 1.5 1.5h11c.827 0 1.5-.673 1.5-1.5v-19c0-.827-.673-1.5-1.5-1.5H10c-.827 0-1.5.673-1.5 1.5z" />
                    <path d="M12 6.5c-.828 0-1.5-.672-1.5-1.5S11.172 3.5 12 3.5s1.5.672 1.5 1.5S12.828 6.5 12 6.5z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="border-green-400 text-green-400 bg-gray-800/50 hover:bg-green-400 hover:text-gray-900 transition-all duration-300" onClick={() => window.open('mailto:jayanthkotapati14@gmail.com', '_blank')}>
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in animation-delay-300">
            <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-green-400/20 shadow-2xl">
              <img alt="Profile" src="/lovable-uploads/681759b3-ea0b-419e-b9da-8d674b8d5052.jpg" className="w-full h-full object-fill" />
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
          
          <div className="flex flex-col items-center justify-center text-center">
            <div className="animate-fade-in">
              <h3 className="text-3xl font-bold mb-6 text-center">Creating Digital Solutions</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed text-justify max-w-3xl">I'm fresher in UI/UX design, I specialize in creating intuitive and engaging digital experiences. My approach combines user research, creative design thinking, and technical implementation to deliver solutions that not only look great but also function seamlessly.</p>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed text-justify max-w-3xl">
                I believe in the power of good design to transform businesses and improve people's lives. Every project I work on is an opportunity to learn, grow, and create something meaningful.
              </p>
            </div>

            {/* Technologies & Tools Section */}
            <div className="w-full max-w-4xl mt-12">
              <h3 className="text-3xl font-bold mb-8 text-center">Technologies & <span className="text-green-400">Tools</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {technologies.map((tech, index) => (
                  <div key={index} className="group bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-400/50 transition-all duration-300 hover:-translate-y-2">
                    <div className="flex flex-col items-center space-y-4">
                      {tech.icon ? (
                        <tech.icon className="w-12 h-12 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
                          <span className="text-green-400 font-bold text-lg">{tech.name.charAt(0)}</span>
                        </div>
                      )}
                      <h4 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                        {tech.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-800/50 mx-0">
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
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition-all duration-300" onClick={() => window.open(project.projectLink, '_blank')}>
                      View Project
                    </Button>
                    <Button variant="outline" size="sm" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 transition-all duration-300" onClick={() => project.caseStudyLink !== "#" && window.open(project.caseStudyLink, '_blank')} disabled={project.caseStudyLink === "#"}>
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
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-12 text-center lg:text-left">
                <span className="text-green-400">Education</span>
              </h2>
              <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-400/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-green-400 mb-2">Bachelor of Computer Science (CSE)</h3>
                  <p className="text-gray-300 mb-2">Eluru College of Engineering and Technology</p>
                  <p className="text-gray-400 text-sm mb-2">CGPA: 7.07/10</p>
                  <p className="text-gray-500 text-sm">2020 - 2024</p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-400/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-green-400 mb-2">Intermediate (M.P.C)</h3>
                  <p className="text-gray-300 mb-2">Vidya Vikas Junior College</p>
                  <p className="text-gray-400 text-sm mb-2">Percentage: 7/10</p>
                  <p className="text-gray-500 text-sm">2018 - 2020</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-400/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-green-400 mb-2">S.S.C</h3>
                  <p className="text-gray-300 mb-2">Vidya Vikas High School</p>
                  <p className="text-gray-400 text-sm mb-2">CGPA: 9.2/10</p>
                  <p className="text-gray-500 text-sm">2017 - 2018</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div id="skills" className="animate-fade-in animation-delay-300">
              <h2 className="text-4xl font-bold mb-12 text-center lg:text-left">
                <span className="text-green-400">Skills</span>
              </h2>
              <div className="space-y-6">
                {skills.map((skill, index) => <div key={index} className="group hover:-translate-y-2 transition-all duration-300 bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-400/50">
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors text-center">
                      {skill}
                    </h3>
                  </div>)}
              </div>
            </div>
          </div>

          {/* Technologies & Tools Section */}
          <div className="w-full max-w-4xl mx-auto mt-20">
            <h2 className="text-4xl font-bold mb-12 text-center">Technologies & <span className="text-green-400">Tools</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <div key={index} className="group bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-green-400/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="flex flex-col items-center space-y-4">
                    {tech.icon ? (
                      <tech.icon className="w-12 h-12 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
                        <span className="text-green-400 font-bold text-lg">{tech.name.charAt(0)}</span>
                      </div>
                    )}
                    <h4 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                      {tech.name}
                    </h4>
                  </div>
                </div>
              ))}
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
                  <Button variant="outline" size="icon" className="border-green-400 text-green-400 bg-gray-800/50 hover:bg-green-400 hover:text-gray-900 transition-all duration-300" onClick={() => window.open('https://www.linkedin.com/in/jayanth-kotapati-800b88288/', '_blank')}>
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-green-400 text-green-400 bg-gray-800/50 hover:bg-green-400 hover:text-gray-900 transition-all duration-300" onClick={() => window.open('https://www.instagram.com/j_a_y_a__n_t_h?igsh=MWR2MHJqYmJndjJ0MA==', '_blank')}>
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-green-400 text-green-400 bg-gray-800/50 hover:bg-green-400 hover:text-gray-900 transition-all duration-300" onClick={() => window.open('https://www.behance.net/jayanthkotapati', '_blank')}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.5 2.5C7.5 1.119 8.619 0 10 0h11C22.881 0 24 1.119 24 2.5v19c0 1.381-1.119 2.5-2.5 2.5H10c-1.381 0-2.5-1.119-2.5-2.5v-19zM8.5 2.5v19c0 .827.673 1.5 1.5 1.5h11c.827 0 1.5-.673 1.5-1.5v-19c0-.827-.673-1.5-1.5-1.5H10c-.827 0-1.5.673-1.5 1.5z" />
                      <path d="M12 6.5c-.828 0-1.5-.672-1.5-1.5S11.172 3.5 12 3.5s1.5.672 1.5 1.5S12.828 6.5 12 6.5z" />
                    </svg>
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
