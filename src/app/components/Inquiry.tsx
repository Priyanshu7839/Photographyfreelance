import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function Inquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    location: '',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Thank You!
          </h2>
          <p className="text-muted-foreground mb-8">
            Your inquiry has been received. We'll get back to you within 24 hours to discuss your special day.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
          >
            Submit Another Inquiry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl mb-4 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            Let's Connect
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tell us about your wedding day and we'll create a custom package for you
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                placeholder="Jane & John"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                placeholder="hello@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="weddingDate" className="block mb-2 text-sm">
                Wedding Date *
              </label>
              <input
                type="date"
                id="weddingDate"
                name="weddingDate"
                required
                value={formData.weddingDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block mb-2 text-sm">
              Wedding Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
              placeholder="City, State or Venue Name"
            />
          </div>

          <div>
            <label htmlFor="budget" className="block mb-2 text-sm">
              Estimated Budget *
            </label>
            <select
              id="budget"
              name="budget"
              required
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all bg-white"
            >
              <option value="">Select your budget range</option>
              <option value="under-2500">Under $2,500</option>
              <option value="2500-4500">$2,500 - $4,500</option>
              <option value="4500-7500">$4,500 - $7,500</option>
              <option value="7500-plus">$7,500+</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm">
              Tell Us About Your Vision
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all resize-none"
              placeholder="Share details about your wedding day, style preferences, or any specific requests..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-4 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
            >
              Send Inquiry
            </button>
            <p className="text-sm text-muted-foreground mt-4">
              We typically respond within 24 hours. Fields marked with * are required.
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
