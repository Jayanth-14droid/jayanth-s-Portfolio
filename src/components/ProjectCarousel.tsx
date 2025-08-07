import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tools: string;
  image: string;
  projectLink: string;
  caseStudyLink: string;
  featured?: boolean;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter featured projects (first 5)
  const featuredProjects = projects.slice(0, 5);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredProjects.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? featuredProjects.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (featuredProjects.length === 0) return null;

  const currentProject = featuredProjects[currentIndex];

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main carousel */}
      <Card className="overflow-hidden bg-card border-border hover-lift">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image section */}
            <div className="relative overflow-hidden aspect-[4/3] md:aspect-square">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content section */}
            <div className="p-8 flex flex-col justify-center">
              <div className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    Featured Project
                  </Badge>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {currentProject.title}
                  </h3>
                  <h4 className="text-lg text-primary font-medium mb-3">
                    {currentProject.subtitle}
                  </h4>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {currentProject.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {currentProject.tools.split(', ').map((tool, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => window.open(currentProject.projectLink, '_blank')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                  {currentProject.caseStudyLink !== "#" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(currentProject.caseStudyLink, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Case Study
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border hover:bg-background z-10"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm border-border hover:bg-background z-10"
        aria-label="Next project"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {featuredProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary scale-110'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted/30 h-1 rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{
            width: `${((currentIndex + 1) / featuredProjects.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}