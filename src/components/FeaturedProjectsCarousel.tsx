import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

interface Project {
  title: string
  subtitle: string
  description: string
  tools: string
  image: string
  projectLink: string
  caseStudyLink: string
}

interface FeaturedProjectsCarouselProps {
  projects: Project[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function FeaturedProjectsCarousel({ 
  projects, 
  autoPlay = false, 
  autoPlayInterval = 4000 
}: FeaturedProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      )
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, projects.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? projects.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === projects.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (projects.length === 0) return null

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Project Display */}
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Project Image */}
          <div className="relative overflow-hidden">
            <img
              src={projects[currentIndex].image}
              alt={projects[currentIndex].title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
          </div>

          {/* Project Details */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {projects[currentIndex].title}
                </h3>
                <h4 className="text-xl text-foreground/80 mb-4">
                  {projects[currentIndex].subtitle}
                </h4>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {projects[currentIndex].description}
              </p>

              <div className="flex flex-wrap gap-2">
                {projects[currentIndex].tools.split(', ').map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="default"
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => window.open(projects[currentIndex].projectLink, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Project
                </Button>
                {projects[currentIndex].caseStudyLink !== "#" && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                    onClick={() => window.open(projects[currentIndex].caseStudyLink, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Case Study
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-background transition-all duration-300 hover:scale-110"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-background transition-all duration-300 hover:scale-110"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center mt-8 space-x-4 overflow-x-auto pb-4">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              currentIndex === index
                ? 'border-primary shadow-lg scale-110'
                : 'border-border hover:border-primary/50 opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'bg-primary scale-125'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}