import { Link } from 'react-router';
import { ImageWithFallback } from './ImageWithFallback';
import { ArrowRight, Heart, Camera, Send, Star } from 'lucide-react';
import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export function Homepage() {
  const portfolioImages = [
    'https://images.unsplash.com/photo-1761574044344-394d47e1a96c?w=800',
    'https://images.unsplash.com/photo-1768900043796-5ca3c0fe760b?w=800',
    'https://images.unsplash.com/photo-1646799921089-65e49ec2d809?w=800',
    'https://images.unsplash.com/photo-1768611261577-09f64ebec3db?w=800',
    'https://images.unsplash.com/photo-1770582071125-51d6e53bd23f?w=800',
    'https://images.unsplash.com/photo-1768900045236-c11ea4441d94?w=800',
    'https://images.unsplash.com/photo-1646791601316-457f13308b4f?w=800',
    'https://images.unsplash.com/photo-1766910701111-9eee02328e95?w=800',
  ];

  const testimonials = [
    {
      name: 'Sarah & Michael',
      text: 'Captured our wedding day with such emotion and artistry. Every photo tells a story we\'ll cherish forever.',
      rating: 5,
    },
    {
      name: 'Priya & Rohan',
      text: 'Professional, creative, and so easy to work with. Our photos exceeded all expectations.',
      rating: 5,
    },
    {
      name: 'Emily & James',
      text: 'The attention to detail and ability to capture candid moments is unmatched. Absolutely stunning work.',
      rating: 5,
    },
  ];

  const steps = [
    { icon: Send, title: 'Inquiry', description: 'Fill out our simple form and tell us about your big day' },
    { icon: Heart, title: 'Consultation', description: 'We discuss your vision and customize a package for you' },
    { icon: Camera, title: 'The Big Day', description: 'We capture every precious moment with care and artistry' },
    { icon: Star, title: 'Delivery', description: 'Receive your beautifully edited photos in a private gallery' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1770217614223-c1a102292237?w=1920"
            alt="Wedding photography"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Timeless Moments,
            <br />
            Beautifully Preserved
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 text-white/90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Luxury wedding photography that captures the emotion, elegance, and story of your special day
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-primary rounded-sm hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              View Portfolio
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/inquiry"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-sm hover:bg-white/10 transition-colors inline-flex items-center justify-center"
            >
              Check Availability
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="py-24 px-6 bg-beige">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              Featured Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse into our portfolio of weddings, each one unique and beautifully told
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioImages.map((img, idx) => (
              <motion.div
                key={idx}
                className="aspect-[3/4] overflow-hidden rounded-sm group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <ImageWithFallback
                  src={img}
                  alt={`Portfolio ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-12" {...fadeInUp}>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all"
            >
              View Full Portfolio
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              How We Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From first inquiry to final delivery, we make the process seamless and enjoyable
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-beige flex items-center justify-center">
                  <step.icon size={28} className="text-gold" />
                </div>
                <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-beige">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              Kind Words
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What our couples have to say about their experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-medium">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              Investment
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Packages designed to suit your needs, from intimate ceremonies to grand celebrations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Essential', price: '$2,500', features: ['6 hours coverage', '300+ edited photos', 'Online gallery', 'Print release'] },
              { name: 'Premium', price: '$4,500', features: ['10 hours coverage', '600+ edited photos', 'Second photographer', 'Engagement session', 'Premium album'] },
              { name: 'Luxury', price: '$7,500', features: ['Full day coverage', '1000+ edited photos', 'Second photographer', 'Engagement session', 'Luxury album', 'Prints collection'] },
            ].map((pkg, idx) => (
              <motion.div
                key={idx}
                className={`p-8 rounded-sm border ${idx === 1 ? 'border-gold bg-beige' : 'border-border bg-white'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  {pkg.name}
                </h3>
                <p className="text-4xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                  {pkg.price}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-gold mt-1">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/inquiry"
                  className="block w-full py-3 text-center bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                >
                  Inquire Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
            {...fadeInUp}
          >
            Let's Create Something Beautiful Together
          </motion.h2>
          <motion.p className="text-lg mb-10 text-primary-foreground/90" {...fadeInUp}>
            Limited dates available for 2026. Inquire today to secure your wedding date.
          </motion.p>
          <motion.div {...fadeInUp}>
            <Link
              to="/inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-sm hover:bg-white/90 transition-colors"
            >
              Get in Touch
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-beige border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                Eternal Moments
              </h3>
              <p className="text-sm text-muted-foreground">
                Luxury wedding photography capturing timeless love stories
              </p>
            </div>
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/portfolio" className="text-muted-foreground hover:text-primary">Portfolio</Link></li>
                <li><Link to="/inquiry" className="text-muted-foreground hover:text-primary">Inquire</Link></li>
                <li><Link to="/client/login" className="text-muted-foreground hover:text-primary">Client Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>hello@eternalmoments.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Available worldwide</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
            © 2026 Eternal Moments Photography. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
