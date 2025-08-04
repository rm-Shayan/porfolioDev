import React, { useRef, useEffect, useState } from 'react';
import { useAppSelector } from '../App/Hooks';
import { gsap } from 'gsap';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MessageCircle,
  MessageSquare,
  PlusCircle,
  X,
  Quote
} from 'lucide-react';

type Theme = 'light' | 'dark';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

const initialTestimonials = [
  {
    quote: "Shayan is a highly skilled and dedicated developer. His attention to detail and passion for creating clean, responsive UIs is truly impressive.",
    name: "John Doe",
    title: "Project Manager at TechCo"
  },
  {
    quote: "Working with Shayan was a great experience. He is a fast learner and consistently delivers high-quality work on time.",
    name: "Jane Smith",
    title: "Lead Developer at Innovate Inc."
  },
  {
    quote: "His frontend skills, especially with React and Tailwind, are top-notch. I highly recommend him for any challenging web development project.",
    name: "Alex Johnson",
    title: "CTO at Startup Hub"
  },
];

const Contact = () => {
  const theme = useAppSelector((state) => state.theme.mode) as Theme;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [showAddTestimonialModal, setShowAddTestimonialModal] = useState(false);
  const [newTestimonialData, setNewTestimonialData] = useState<Omit<Testimonial, 'title'>>({
    name: '',
    quote: ''
  });
  
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTestimonialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTestimonialData({ ...newTestimonialData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // This is where you would connect to a backend
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsMessageSent(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsMessageSent(false), 5000); // Hide message after 5 seconds
    }, 2000);
  };

  const handleAddTestimonialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, this would post to a backend
    const newTestimonial = { ...newTestimonialData, title: 'Satisfied Client' };
    setTestimonials([newTestimonial, ...testimonials]);
    setNewTestimonialData({ name: '', quote: '' });
    setShowAddTestimonialModal(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        contactRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );

      tl.fromTo(
        [detailsRef.current, formRef.current, testimonialsRef.current],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.3 },
        '-=0.5'
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const textGradient =
    'font-bold animate-gradient-reverse bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent';
  
  const cardClasses =
    theme === "dark"
      ? "bg-[#1f1a2a] bg-opacity-90 backdrop-blur-lg border border-purple-700 shadow-xl relative"
      : "bg-gray-50 text-gray-800 shadow-md border border-gray-200";

  const messageBoxClasses = `
    fixed bottom-8 right-8 p-4 rounded-xl shadow-lg transition-transform duration-500 transform
    ${theme === 'dark' ? 'bg-green-800 text-white' : 'bg-green-500 text-white'}
    ${isMessageSent ? 'translate-x-0' : 'translate-x-[150%]'}
  `;

  return (
    <div
      ref={contactRef}
      // The `w-full` class ensures the container respects its parent's width,
      // and `overflow-x-hidden` prevents horizontal scrollbars from appearing
      // if child elements temporarily exceed the viewport width.
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 w-full overflow-x-hidden"
    >
      <div className="w-full max-w-6xl space-y-16">
        <section className="text-center">
          <h1 className={`${textGradient} text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight`}>
            Get in Touch
          </h1>
          <p className={`mt-4 text-xl ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </section>

        {/* This grid now uses a more balanced gap on medium and large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-12">
          {/* Contact Details Card */}
          <section ref={detailsRef} className={`${cardClasses} p-8 rounded-3xl  sm:mb-4 `}>
            <h2 className={`text-2xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <MessageCircle className="w-6 h-6 text-indigo-500" />
              Contact Details
            </h2>
            <ul className="mt-6 space-y-6">
              <li className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105
                ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
                <Mail className="w-6 h-6 text-pink-500 flex-shrink-0" />
                <a
                  href="mailto:raomuhammadshayan897@gmail.com"
                  className={`text-lg hover:underline transition-colors duration-200 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} truncate`}
                >
                  raomuhammadshayan897@gmail.com
                </a>
              </li>
              <li className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105
                ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
                <Phone className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <a
                  href="tel:+923115404497"
                  className={`text-lg hover:underline transition-colors duration-200 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  +92 311 5404497
                </a>
              </li>
              <li className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105
                ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
                <Linkedin className="w-6 h-6 text-indigo-500 flex-shrink-0" />
                {/* Added 'min-w-0' to fix the truncate on smaller screens */}
                <a
                  href="https://linkedin.com/in/rao-muhammad-shayan-473a31944"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-lg hover:underline transition-colors duration-200 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} truncate min-w-0`}
                >
                  linkedin.com/in/rao-muhammad-shayan...
                </a>
              </li>
              <li className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105
                ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200/50'}`}>
                <Github className="w-6 h-6 text-orange-500 flex-shrink-0" />
                {/* Added 'min-w-0' to fix the truncate on smaller screens */}
                <a
                  href="https://github.com/rm-shayan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-lg hover:underline transition-colors duration-200 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} truncate min-w-0`}
                >
                  github.com/rm-shayan
                </a>
              </li>
            </ul>
          </section>

          {/* Send Message Form */}
          <section ref={formRef} className={`${cardClasses} p-8 rounded-3xl sm:mb-4`}>
            <h2 className={`text-2xl font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <MessageCircle className="w-6 h-6 text-indigo-500" />
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full rounded-md shadow-sm border-2 p-3 transition-colors duration-200
                  ${theme === 'dark' ? 'bg-gray-800 text-white border-purple-800 focus:border-indigo-500 focus:ring-indigo-500' : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full rounded-md shadow-sm border-2 p-3 transition-colors duration-200
                  ${theme === 'dark' ? 'bg-gray-800 text-white border-purple-800 focus:border-indigo-500 focus:ring-indigo-500' : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full rounded-md shadow-sm border-2 p-3 transition-colors duration-200
                  ${theme === 'dark' ? 'bg-gray-800 text-white border-purple-800 focus:border-indigo-500 focus:ring-indigo-500' : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center w-full px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform
                bg-indigo-600 hover:bg-indigo-700 text-white
                ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {isSubmitting ? 'Sending...' : 'Submit Message'}
              </button>
            </form>
          </section>
        </div>
        
        {/* Testimonials Section */}
        <section ref={testimonialsRef} className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className={`${textGradient} text-3xl font-bold flex items-center gap-2`}>
              <MessageSquare className="w-8 h-8 text-fuchsia-500" />
              What My Clients Say
            </h2>
            <button
              onClick={() => setShowAddTestimonialModal(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full shadow-lg transition-all duration-300 transform bg-purple-600 text-white hover:scale-105 hover:bg-purple-700"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add Testimonial
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`${cardClasses} p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl`}>
                <Quote className={`w-8 h-8 opacity-20 absolute top-4 left-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`} />
                <p className={`text-lg italic ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                  "{testimonial.quote}"
                </p>
                <div className="mt-4 pt-4 border-t border-dashed border-gray-600/50">
                  <p className={`text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    - {testimonial.name}
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {testimonial.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      {/* Custom message box for form submission */}
      <div className={messageBoxClasses}>
        Thank you for your message! I will get back to you shortly.
      </div>

      {/* Add Testimonial Modal */}
      {showAddTestimonialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className={`${cardClasses} p-8 rounded-3xl w-full max-w-md relative`}>
            <button
              onClick={() => setShowAddTestimonialModal(false)}
              className={`absolute top-4 right-4 text-gray-400 transition-colors duration-200 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-800'}`}
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className={`${textGradient} text-2xl font-bold mb-6`}>Add Your Testimonial</h3>
            <form onSubmit={handleAddTestimonialSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="testimonial-name"
                  className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="testimonial-name"
                  name="name"
                  value={newTestimonialData.name}
                  onChange={handleTestimonialChange}
                  required
                  className={`mt-1 block w-full rounded-md shadow-sm border-2 p-3 transition-colors duration-200
                  ${theme === 'dark' ? 'bg-gray-800 text-white border-purple-800 focus:border-indigo-500 focus:ring-indigo-500' : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                />
              </div>
              <div>
                <label
                  htmlFor="testimonial-quote"
                  className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Your Testimonial
                </label>
                <textarea
                  id="testimonial-quote"
                  name="quote"
                  rows={4}
                  value={newTestimonialData.quote}
                  onChange={handleTestimonialChange}
                  required
                  className={`mt-1 block w-full rounded-md shadow-sm border-2 p-3 transition-colors duration-200
                  ${theme === 'dark' ? 'bg-gray-800 text-white border-purple-800 focus:border-indigo-500 focus:ring-indigo-500' : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform bg-purple-600 text-white hover:scale-105 hover:bg-purple-700"
              >
                Submit Testimonial
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
