import { Eye, ExternalLink } from 'lucide-react';
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

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">All Projects</h3>
        <p className="text-muted-foreground">
          Explore the complete collection of my design work
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card 
            key={index} 
            className="group overflow-hidden bg-card border-border hover-lift"
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => window.open(project.projectLink, '_blank')}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                {project.caseStudyLink !== "#" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(project.caseStudyLink, '_blank')}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 delay-75"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Case Study
                  </Button>
                )}
              </div>
            </div>

            <CardContent className="p-6 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <h4 className="text-sm text-primary font-medium">
                  {project.subtitle}
                </h4>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {project.tools.split(', ').map((tool, toolIndex) => (
                  <Badge 
                    key={toolIndex} 
                    variant="secondary" 
                    className="text-xs"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}