import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

interface TestimonialsProps {
  className?: string;
}

const testimonials = [
  {
    quote: "The most practical curriculum I've ever followed. Every lesson translates directly to real-world skills.",
    author: 'Alex Chen',
    role: 'Frontend Engineer',
    company: 'TechCorp',
    avatar: 'A',
    color: '#2ED9FF'
  },
  {
    quote: "I went from tutorials to shipping real features in production. The full-stack path is incredibly well-structured.",
    author: 'Sam Rodriguez',
    role: 'Full-Stack Developer',
    company: 'StartupXYZ',
    avatar: 'S',
    color: '#FF2ECC'
  },
  {
    quote: "Finally, a course that teaches architecture, not just syntax. Understanding the 'why' changed everything.",
    author: 'Jordan Park',
    role: 'Tech Lead',
    company: 'Enterprise Inc',
    avatar: 'J',
    color: '#00E676'
  },
];

export default function Testimonials({ className = '' }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const localTriggersRef = useRef<ScrollTrigger[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.testimonial-card');
      cards.forEach((card) => {
        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 0.4,
          onUpdate: (self) => {
            gsap.set(card, {
              y: 40 - self.progress * 40,
              opacity: self.progress
            });
          }
        });
        localTriggersRef.current.push(st);
      });
    }, section);

    return () => {
      localTriggersRef.current.forEach(st => st.kill());
      localTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`relative w-full bg-[#07040A] py-24 lg:py-32 ${className}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-[#7B2D8E]/15 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F2F7] mb-4">
            Built by{' '}
            <span className="text-[#7B2D8E]">learners.</span>
          </h2>
          <p className="text-[#B8B2C6] max-w-xl mx-auto">
            Join thousands of developers who transformed their careers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card glass-card-sm p-6 lg:p-8 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] group"
            >
              {/* Quote Icon */}
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${testimonial.color}20` }}
              >
                <Quote className="w-5 h-5" style={{ color: testimonial.color }} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 fill-[#FFB300] text-[#FFB300]" 
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#F4F2F7] text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ 
                    backgroundColor: `${testimonial.color}30`,
                    color: testimonial.color 
                  }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#F4F2F7]">{testimonial.author}</p>
                  <p className="text-sm text-[#B8B2C6]">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '50K+', label: 'Students' },
            { value: '200+', label: 'Lessons' },
            { value: '4.9', label: 'Rating' },
            { value: '95%', label: 'Success Rate' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-[#F4F2F7] mb-1">{stat.value}</p>
              <p className="text-sm text-[#B8B2C6]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
