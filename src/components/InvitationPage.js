import React, { useState, useEffect } from "react";
import { Heart, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../utils/supabase";

export default function InvitationPage() {
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "1",
    status: "",
    message: "",
    events: { wedding: false, reception: false },
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [submittedRSVP, setSubmittedRSVP] = useState(null);

  // Calendar event definitions for accepted events
  const calendarEvents = {
    wedding: {
      title: "Wedding Ceremony",
      location: "Girideepam Convention Center, Nalanchira, Thiruvananthapuram",
      details: "Join us to celebrate the wedding.",
      start: "20251223T110000",
      end: "20251223T120000",
      timezone: "Asia/Kolkata",
    },
    reception: {
      title: "Wedding Reception",
      location: "Adathara Auditorium, Sulthan Bathery, Wayanad",
      details: "Celebrate with us at the reception.",
      start: "20251226T180000",
      end: "20251226T220000",
      timezone: "Asia/Kolkata",
    },
  };

  const getGoogleCalendarUrl = (evt) => {
    const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
      text: evt.title,
      dates: `${evt.start}/${evt.end}`,
      details: evt.details,
      location: evt.location,
      ctz: evt.timezone,
    });
    return `${base}&${params.toString()}`;
  };

  const galleryImages = [
    {
      image:
        "https://res.cloudinary.com/dqafneas4/image/upload/v1760721709/WhatsApp_Image_2025-10-17_at_22.48.36_gpoxia.jpg",
      quote:
        "This marks the beginning of forever, where two hearts become one and love writes its most beautiful chapter.",
    },
    {
      image:
        "https://res.cloudinary.com/dqafneas4/image/upload/v1760721709/WhatsApp_Image_2025-10-17_at_22.48.55_n1yvsc.jpg",
      quote:
        "In this moment, we step into a new dawn where every tomorrow holds the promise of shared dreams and endless love.",
    },
    {
      image:
        "https://res.cloudinary.com/dqafneas4/image/upload/v1760721709/WhatsApp_Image_2025-10-17_at_22.48.12_kcrywc.jpg",
      quote:
        "Like two rivers merging into an ocean, our souls unite to create something greater than the sum of our parts.",
    },
    {
      image:
        "https://res.cloudinary.com/dqafneas4/image/upload/v1760721709/WhatsApp_Image_2025-10-17_at_22.47.50_ar8msq.jpg",
      quote:
        "This is where our story truly begins - in the sacred space between 'I do' and 'forever after'.",
    },
    {
      image:
        "https://res.cloudinary.com/dqafneas4/image/upload/v1760721709/WhatsApp_Image_2025-10-17_at_22.47.40_ecksrq.jpg",
      quote:
        "Together we embark on life's greatest adventure, hand in hand, heart to heart, soul to soul.",
    },
    {
      image:
        "https://res.cloudinary.com/dqafneas4/image/upload/v1760721709/WhatsApp_Image_2025-10-17_at_22.47.15_yiu4jx.jpg",
      quote:
        "From this day forward, every sunrise will be brighter, every sunset more beautiful, because we face them together.",
    },
    {
      image:
        "https://res.cloudinary.com/dqafneas4/image/upload/v1760721709/WhatsApp_Image_2025-10-17_at_22.48.22_mhtxcu.jpg",
      quote: "blessed!",
    },
  ];

  const familyBlessings = [
    {
      name: "Anisree Suresh",
      backgroundImage:
        "https://res.cloudinary.com/dqafneas4/image/upload/v1760722370/WhatsApp_Image_2025-10-17_at_23.01.15_nyozp3.jpg",
      msg: "Wishing you both loads of love and happiness. So excited!!!",
    },
    {
      name: "Chikku",
      backgroundImage:
        "https://res.cloudinary.com/dqafneas4/image/upload/v1762953134/WhatsApp_Image_2025-11-12_at_18.39.00_rs415o.jpg",
      msg: "Congratulations to you both. And good luck Ash😑!"  
    },
    {
      name: "Poko",
      backgroundImage: "https://res.cloudinary.com/dqafneas4/image/upload/v1762953134/WhatsApp_Image_2025-11-12_at_18.39.00_1_b0nv6n.jpg",
      msg: "Yay! My Chinju aunty and Ash are getting married! I can't wait to celebrate and have lots of fun in India",
    },
    {
      name: "Sneezu",
      backgroundImage:
        "https://res.cloudinary.com/dqafneas4/image/upload/v1760722371/WhatsApp_Image_2025-10-17_at_23.01.52_mlgkxe.jpg",
      msg: "With lots of love!",
    },
    
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryImages.length]);

  // Resume auto-play after user interaction
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 2000); // Resume after 2 seconds
      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying]);

  const handleRSVPSubmit = async () => {
    if (!formData.name) {
      setSubmitError("Please enter your name.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await api.saveRSVP(formData);
      setSubmittedRSVP(formData);
      setFormSubmitted(true);

      // Only show celebration for joyful acceptance
      if (formData.status === "accepted") {
        setShowCelebration(true);
        // Hide celebration after 3 seconds
        setTimeout(() => {
          setShowCelebration(false);
        }, 3000);
      }

      setFormData({
        name: "",
        phone: "",
        guests: "1",
        status: "",
        message: "",
        events: { wedding: false, reception: false },
      });
    } catch (error) {
      console.error("Error saving RSVP:", error);
      setSubmitError("There was an error saving your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Party Popper Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Confetti that shoots out from center */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(100)].map((_, i) => {
              const angle = (i / 100) * 360;
              const distance = 200 + Math.random() * 300;
              const x = Math.cos((angle * Math.PI) / 180) * distance;
              const y = Math.sin((angle * Math.PI) / 180) * distance;
              const colors = [
                "#ff6b6b",
                "#4ecdc4",
                "#45b7d1",
                "#96ceb4",
                "#feca57",
                "#ff9ff3",
                "#ff7675",
                "#74b9ff",
              ];

              return (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      colors[Math.floor(Math.random() * colors.length)],
                    left: "50%",
                    top: "50%",
                    "--x": `${x}px`,
                    "--y": `${y}px`,
                    animation: `partyPopper 2s ease-out forwards`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Success Message with Party Popper Emoji */}
          <div className="absolute inset-0 flex items-center justify-center margin-auto">
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center transform scale-0 animate-partyMessage justify-center">
              <div className="text-8xl mb-4 animate-bounce">🎊</div>
              <h2 className="text-4xl font-bold text-green-600 mb-2">
                RSVP Accepted!
              </h2>
              <p className="text-gray-600 text-lg">
                We can't wait to celebrate with you!
              </p>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Great+Vibes&family=Alex+Brush&family=Tangerine:wght@400;700&family=Cinzel:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg);opacity:0.1}50%{transform:translateY(-30px) rotate(180deg);opacity:0.3}}
        @keyframes partyPopper {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(0.5);
            opacity: 0;
          }
        }
        @keyframes partyMessage {
          0% {
            transform: scale(0) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(5deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes gentle-sway {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .font-wedding { font-family: 'Great Vibes', cursive; font-weight: 400; }
        .font-elegant { font-family: 'Playfair Display', serif; font-weight: 500; }
        .font-body { font-family: 'Cormorant Garamond', serif; font-weight: 400; }
        .font-script { font-family: 'Dancing Script', cursive; font-weight: 500; }
        .font-brush { font-family: 'Alex Brush', cursive; font-weight: 400; }
        .font-tangerine { font-family: 'Tangerine', cursive; font-weight: 700; }
        .font-cinzel { font-family: 'Cinzel', serif; font-weight: 500; }
        .font-lora { font-family: 'Lora', serif; font-weight: 400; }
        .text-shadow-elegant { text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }
        .drop-cap:first-letter { 
          font-family: 'Tangerine', cursive; 
          float: left; 
          font-size: 4em; 
          line-height: 0.8; 
          padding-right: 0.1em;
          color: #be185d;
        }
        .animate-gentle-sway {
          animation: gentle-sway 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose-200 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${15 + i * 3}s linear infinite`,
              animationDelay: `${i * 2}s`,
              width: "30px",
              height: "30px",
            }}
          />
        ))}
      </div>

      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-400 animate-pulse" />
            <span className="font-wedding text-2xl text-gray-800">Wedding Bells are ringing!</span>
          </div>
        </div>
      </nav>

      <div className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100/50 via-transparent to-transparent" />
        
        {/* Decorative corner elements */}
        <div className="absolute top-32 left-8 md:left-32 w-24 h-24 border-l-2 border-t-2 border-rose-300 opacity-70"></div>
        <div className="absolute top-32 right-8 md:right-32 w-24 h-24 border-r-2 border-t-2 border-rose-300 opacity-70"></div>
        <div className="absolute bottom-32 left-8 md:left-32 w-24 h-24 border-l-2 border-b-2 border-rose-300 opacity-70"></div>
        <div className="absolute bottom-32 right-8 md:right-32 w-24 h-24 border-r-2 border-b-2 border-rose-300 opacity-70"></div>
        
        {/* Decorative flourishes */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-64 h-64 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-rose-400 fill-current">
            <path d="M50,0 C50,50 0,50 0,50 C0,50 50,50 50,100 C50,50 100,50 100,50 C100,50 50,50 50,0 Z" />
          </svg>
        </div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <Heart className="w-20 h-20 text-rose-400 mx-auto mb-8 animate-pulse" />
          
          {/* Enhanced heading with elegant styling */}
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-tangerine text-gray-800 mb-6 text-shadow-elegant">
              Chinju <span className="text-rose-400 animate-gentle-sway inline-block">&</span> Ashwin
            </h1>
            
            {/* Decorative swashes around names */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-rose-300 opacity-30 hidden md:block">
              <svg className="w-16 h-32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4C12 4 12 20 4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-rose-300 opacity-30 hidden md:block">
              <svg className="w-16 h-32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4C12 4 12 20 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          
          {/* Enhanced divider with ornamental design */}
          <div className="relative h-6 w-64 mx-auto mb-8">
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-rose-400 to-transparent absolute top-1/2 -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1">
              <Heart className="w-4 h-4 text-rose-400" />
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 font-cinzel tracking-widest mb-10">
            ARE GETTING MARRIED
          </p>
          <p className="text-2xl text-gray-500 font-lora font-light italic">
            December 23rd, 2025
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-32 relative">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-rose-400 fill-current">
            <path d="M50,0 C50,50 0,50 0,50 C0,50 50,50 50,100 C50,50 100,50 100,50 C100,50 50,50 50,0 Z" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-0 w-32 h-32 opacity-10 rotate-45">
          <svg viewBox="0 0 100 100" className="w-full h-full text-purple-400 fill-current">
            <path d="M50,0 C50,50 0,50 0,50 C0,50 50,50 50,100 C50,50 100,50 100,50 C100,50 50,50 50,0 Z" />
          </svg>
        </div>
        
        {/* Artistic section heading with decorative elements */}
        <div className="relative mb-16">
          <h2 className="text-6xl font-tangerine text-center text-gray-800 mb-4 text-shadow-elegant">
            Our Journey
          </h2>
          
          {/* Decorative flourish under heading */}
          <div className="relative h-8 w-64 mx-auto mb-4">
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-rose-400 to-transparent absolute top-1/2 -translate-y-1/2"></div>
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 bg-white rounded-full p-0.5">
              <div className="w-1.5 h-1.5 bg-rose-300 rounded-full"></div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1">
              <Heart className="w-3 h-3 text-rose-400" />
            </div>
            <div className="absolute left-3/4 top-1/2 -translate-y-1/2 bg-white rounded-full p-0.5">
              <div className="w-1.5 h-1.5 bg-rose-300 rounded-full"></div>
            </div>
          </div>
          
          <p className="text-center text-gray-600 mb-4 text-lg font-lora italic">
            Celebrating love and new beginnings
          </p>
          
          {/* Decorative swirl */}
          <div className="flex justify-center">
            <svg className="w-32 h-8 text-rose-300 opacity-50" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10 Q 25 0, 50 10 Q 75 20, 100 10" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        <div className="relative h-[700px] rounded-3xl overflow-hidden shadow-2xl border border-rose-100">
          {/* Decorative corner elements on the gallery */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-white/40 z-10 pointer-events-none"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-white/40 z-10 pointer-events-none"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-white/40 z-10 pointer-events-none"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-white/40 z-10 pointer-events-none"></div>
          
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentGalleryImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative h-full">
                {/* Blurred background version of the same image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={img.image}
                    alt=""
                    className="w-full h-full object-cover blur-xl scale-110 opacity-70"
                    style={{ filter: "saturate(1.2)" }}
                  />
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                </div>
                
                {/* Main Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={img.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                  {/* Enhanced overlay with gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                </div>

                {/* Enhanced Content */}
                <div className="relative h-full flex items-end justify-center p-8 pb-16">
                  <div className="text-center max-w-2xl backdrop-blur-sm bg-black/10 p-6 rounded-xl border border-white/20">
                    <div className="mb-4">
                      <Heart className="w-8 h-8 text-white mx-auto drop-shadow-lg animate-pulse" />
                    </div>
                    <p className="text-lg md:text-2xl font-script text-white leading-relaxed drop-shadow-lg">
                      "{img.quote}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              setCurrentGalleryImage(
                (prev) =>
                  (prev - 1 + galleryImages.length) % galleryImages.length
              );
              setIsAutoPlaying(false);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              setCurrentGalleryImage(
                (prev) => (prev + 1) % galleryImages.length
              );
              setIsAutoPlaying(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentGalleryImage(index);
                  setIsAutoPlaying(false);
                }}
                className={`transition-all ${
                  index === currentGalleryImage
                    ? "w-8 h-3 bg-white rounded-full"
                    : "w-3 h-3 bg-white/50 rounded-full hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 via-white to-rose-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-wedding text-center text-gray-800 mb-16">
            Celebrations
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Wedding",
                color: "rose",
                icon: "💍",
                time: "11:00 AM - 12:00 PM",
                date: "December 23rd, 2025",
                venue: "Girideepam Convention Center",
                address: "Nalanchira, Thiruvananthapuram",
                mapUrl:
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.123456789!2d76.987654321!3d8.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05b93e7d02ff99%3A0x50b3ddce4c7edb1a!2sGirideepam%20Convention%20Center!5e0!3m2!1sen!2sin!4v1234567890",
                link: "https://maps.google.com/?q=Girideepam+Convention+Center+Nalanchira+Thiruvananthapuram",
              },
              {
                title: "Reception",
                color: "purple",
                icon: "🎉",
                time: "6:00 PM - 10:00 PM",
                date: "December 26th, 2025",
                venue: "Adathara Auditorium",
                address: "Sulthan Bathery, Wayanad",
                mapUrl:
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.123456789!2d76.123456789!3d11.987654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba608a070ff77a1%3A0x7f69269eed76c86d!2sAdathara%20Auditorium!5e0!3m2!1sen!2sin!4v1234567890",
                link: "https://www.google.com/maps?q=Adathara+Auditorium,+Sultan+Bathery,+Kerala+673592",
              },
            ].map((event, i) => (
              <div
                key={i}
                className={`relative bg-white/90 rounded-3xl p-0 shadow-xl hover:shadow-2xl transition hover:-translate-y-1 overflow-hidden group`}
              >
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className={`absolute inset-0 bg-${event.color}-500`} style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                
                {/* Colored accent border */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${event.color}-300 via-${event.color}-500 to-${event.color}-300`}></div>
                
                {/* Content container */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full bg-${event.color}-100 flex items-center justify-center text-2xl shadow-inner`}>
                      {event.icon}
                    </div>
                    <h3 className="text-3xl font-tangerine text-gray-800 text-shadow-elegant">{event.title}</h3>
                  </div>
                  
                  <div className="space-y-6 mb-6">
                    <div className={`flex gap-4 p-4 rounded-xl bg-${event.color}-50/50 border border-${event.color}-100`}>
                      <Clock className={`w-6 h-6 text-${event.color}-600 mt-1 flex-shrink-0`} />
                      <div>
                        <p className="font-cinzel text-xl font-semibold text-gray-900">{event.time}</p>
                        <p className="text-md text-gray-700 font-lora">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className={`flex gap-4 p-4 rounded-xl bg-${event.color}-50/50 border border-${event.color}-100`}>
                      <MapPin className={`w-6 h-6 text-${event.color}-600 mt-1 flex-shrink-0`} />
                      <div>
                        <p className="font-cinzel text-lg font-semibold text-gray-900">{event.venue}</p>
                        <p className="text-md text-gray-700 font-lora">{event.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Map section with overlay */}
                <div className="relative">
                  {/* Decorative corner elements */}
                  <div className="absolute -top-2 -left-2 w-12 h-12 pointer-events-none z-10 opacity-70">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0C55.2285 0 100 44.7715 100 100H75C75 58.5786 41.4214 25 0 25V0Z" fill={`${event.color === 'rose' ? '#FDF2F8' : '#F5F3FF'}`} />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 pointer-events-none z-10 opacity-70 rotate-90">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0C55.2285 0 100 44.7715 100 100H75C75 58.5786 41.4214 25 0 25V0Z" fill={`${event.color === 'rose' ? '#FDF2F8' : '#F5F3FF'}`} />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 pointer-events-none z-10 opacity-70 -rotate-90">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0C55.2285 0 100 44.7715 100 100H75C75 58.5786 41.4214 25 0 25V0Z" fill={`${event.color === 'rose' ? '#FDF2F8' : '#F5F3FF'}`} />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 pointer-events-none z-10 opacity-70 rotate-180">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0C55.2285 0 100 44.7715 100 100H75C75 58.5786 41.4214 25 0 25V0Z" fill={`${event.color === 'rose' ? '#FDF2F8' : '#F5F3FF'}`} />
                    </svg>
                  </div>
                  
                  {/* Separate action button above map */}
                  <div className="mb-4 flex justify-center">
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-2 bg-${event.color}-600 text-white rounded-full shadow-lg hover:bg-${event.color}-700 transition-colors duration-200 flex items-center gap-2 font-cinzel border border-gray-300 hover:border-gray-400`}
                    >
                      <span className="tracking-wide uppercase font-semibold text-gray-900 drop-shadow-sm">
                        Open in Maps
                      </span>
                      <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200 drop-shadow-sm" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>

                  {/* Map container with fancy border */}
                  <div className="h-56 overflow-hidden rounded-xl border-4 border-white shadow-inner relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/30 pointer-events-none z-10"></div>
                    <iframe
                      src={event.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title={event.title}
                      className="filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>



                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="relative bg-gradient-to-br from-rose-50 via-white to-pink-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-rose-200">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d53f8c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          {/* Elegant corner decorations */}
          <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-rose-300 rounded-tl-3xl"></div>
          <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-rose-300 rounded-tr-3xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-rose-300 rounded-bl-3xl"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-rose-300 rounded-br-3xl"></div>

          {/* Decorative flourishes */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6">
            <svg className="w-24 h-12 text-rose-300" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,25 C25,0 75,0 100,25 C75,50 25,50 0,25 Z" fill="currentColor" opacity="0.2" />
            </svg>
          </div>

          <div className="text-center mb-8 relative">
            {/* Enhanced RSVP icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Heart className="w-10 h-10 text-white animate-pulse" />
            </div>
            
            <h2 className="text-6xl font-tangerine text-gray-800 mb-3 text-shadow-elegant">RSVP</h2>
            
            {/* Decorative divider with ornamental design */}
            <div className="relative h-6 w-48 mx-auto mb-3">
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-rose-400 to-transparent absolute top-1/2 -translate-y-1/2"></div>
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 bg-white rounded-full p-0.5">
                <div className="w-1 h-1 bg-rose-300 rounded-full"></div>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-0.5">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              </div>
              <div className="absolute left-3/4 top-1/2 -translate-y-1/2 bg-white rounded-full p-0.5">
                <div className="w-1 h-1 bg-rose-300 rounded-full"></div>
              </div>
            </div>
            
            <p className="text-gray-600 font-lora italic">We look forward to celebrating with you</p>
          </div>

          {formSubmitted ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-3xl font-serif mb-3">Thank You!</h3>
              <p className="text-gray-600 mb-6">
                Your response has been recorded!
              </p>

              {submittedRSVP?.status === "accepted" && (
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    {submittedRSVP?.events?.wedding && (
                      <a
                        href={getGoogleCalendarUrl(calendarEvents.wedding)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                      >
                        Add Wedding to Calendar
                      </a>
                    )}
                    {submittedRSVP?.events?.reception && (
                      <a
                        href={getGoogleCalendarUrl(calendarEvents.reception)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                      >
                        Add Reception to Calendar
                      </a>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-6 text-rose-500 underline hover:text-rose-600"
              >
                Submit another RSVP
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-gray-700 mb-2 font-medium font-lora">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none transition font-lora bg-white/80 shadow-sm"
                    placeholder="Enter your name"
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-lg border border-white/50"></div>
                </div>
                <div className="absolute -right-2 -top-2 w-6 h-6 text-rose-300 opacity-50">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4C12 4 12 20 4 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-2 font-medium font-lora">
                  Phone Number <span className="text-gray-400 italic">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none transition font-lora bg-white/80 shadow-sm"
                    placeholder="+91 98765 43210"
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-lg border border-white/50"></div>
                </div>
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-2 font-medium font-lora">
                  Number of Guests
                </label>
                <div className="relative">
                  <select
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none transition font-lora bg-white/80 shadow-sm appearance-none"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} Guest{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-0 pointer-events-none rounded-lg border border-white/50"></div>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -left-2 -bottom-2 w-6 h-6 text-rose-300 opacity-50">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4C12 4 12 20 20 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-4 font-medium font-lora text-center">
                  Will you be joining us?
                </label>
                <div className="grid grid-cols-3 gap-3 relative">
                  <button
                    onClick={() =>
                      setFormData({ ...formData, status: "accepted" })
                    }
                    className={`py-4 rounded-lg border-2 font-medium transition-all duration-300 font-lora relative overflow-hidden group ${
                      formData.status === "accepted"
                        ? "border-green-400 bg-green-50/80 text-green-700 shadow-md"
                        : "border-rose-200 hover:border-green-300 bg-white/80 hover:shadow-sm"
                    }`}
                  >
                    <span className="relative z-10">✓ Joyfully Accept</span>
                    {formData.status === "accepted" && (
                      <span className="absolute -right-1 -bottom-1 w-8 h-8 text-green-200 animate-pulse">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                        </svg>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, status: "not_sure" })
                    }
                    className={`py-4 rounded-lg border-2 font-medium transition-all duration-300 font-lora relative overflow-hidden group ${
                      formData.status === "not_sure"
                        ? "border-yellow-400 bg-yellow-50/80 text-yellow-700 shadow-md"
                        : "border-rose-200 hover:border-yellow-300 bg-white/80 hover:shadow-sm"
                    }`}
                  >
                    <span className="relative z-10">? Not Sure</span>
                    {formData.status === "not_sure" && (
                      <span className="absolute -right-1 -bottom-1 w-8 h-8 text-yellow-200 animate-pulse">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" fill="currentColor" />
                        </svg>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, status: "declined" })
                    }
                    className={`py-4 rounded-lg border-2 font-medium transition-all duration-300 font-lora relative overflow-hidden group ${
                      formData.status === "declined"
                        ? "border-red-400 bg-red-50/80 text-red-700 shadow-md"
                        : "border-rose-200 hover:border-red-300 bg-white/80 hover:shadow-sm"
                    }`}
                  >
                    <span className="relative z-10">✗ Regretfully Decline</span>
                    {formData.status === "declined" && (
                      <span className="absolute -right-1 -bottom-1 w-8 h-8 text-red-200 animate-pulse">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
                <div className="absolute -left-3 -top-3 w-8 h-8 text-rose-300 opacity-50 transform rotate-180">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12C6 12 10 8 12 6C14 8 18 12 18 12C18 12 14 16 12 18C10 16 6 12 6 12Z" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                <div className="absolute -right-3 -bottom-3 w-8 h-8 text-rose-300 opacity-50">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12C6 12 10 8 12 6C14 8 18 12 18 12C18 12 14 16 12 18C10 16 6 12 6 12Z" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </div>
              </div>

              {formData.status === "accepted" && (
                <div>
                  <label className="block text-gray-700 mb-3 font-medium">
                    Events *
                  </label>
                  <div className="space-y-3">
                    <label className="flex gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-rose-300 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={formData.events.wedding}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            events: {
                              ...formData.events,
                              wedding: e.target.checked,
                            },
                          })
                        }
                        className="w-5 h-5 text-rose-500 rounded"
                      />
                      <div>
                        <div className="font-medium">Wedding</div>
                        <div className="text-sm text-gray-600">
                          11:00 AM - 12:00 PM - Girideepam Convention Center
                        </div>
                      </div>
                    </label>
                    <label className="flex gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={formData.events.reception}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            events: {
                              ...formData.events,
                              reception: e.target.checked,
                            },
                          })
                        }
                        className="w-5 h-5 text-purple-500 rounded"
                      />
                      <div>
                        <div className="font-medium">Reception</div>
                        <div className="text-sm text-gray-600">
                          6:00 PM - 10:00 PM - Adathara Auditorium
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-2 font-medium font-body">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none transition font-body bg-rose-50/30"
                  rows="3"
                  placeholder="Share your wishes for the couple"
                />
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-body">
                  {submitError}
                </div>
              )}

              <button
                onClick={handleRSVPSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold transition shadow-lg font-body text-lg ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 hover:from-rose-500 hover:via-pink-500 hover:to-rose-600 hover:shadow-xl"
                } text-white relative overflow-hidden group`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <>
                      Submit RSVP
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 via-rose-50 to-pink-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-serif text-center text-gray-800 mb-4">
            Best Wishes!
          </h2>
          <p className="text-center text-gray-600 mb-16">
            Words of love from those closest to us
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {familyBlessings.map((family, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                {/* Profile Section */}
                <div className="flex items-start space-x-4 mb-4">
                  {/* Round Profile Image */}
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={family.backgroundImage}
                      alt={family.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name and Quote */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {family.name}
                    </h3>

                    {/* Quote/Comment Style */}
                    <div className="bg-gray-50 rounded-lg p-4 relative">
                      <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-50"></div>
                      <p className="text-gray-700 italic leading-relaxed text-sm">
                        "{family.msg}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center py-12 bg-gradient-to-br from-rose-50 to-pink-50">
        <Heart className="w-8 h-8 mx-auto mb-4 text-rose-400 animate-pulse" />
        <p className="text-gray-600 font-light">
          Thank you for being part of our special day
        </p>
        <p className="text-gray-500 text-sm mt-2">Chinju & Ashwin</p>
      </div>
    </div>
  );
}
