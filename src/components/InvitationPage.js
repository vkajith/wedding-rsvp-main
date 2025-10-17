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
      msg: "Watching you both together fills our hearts with joy. May your journey be blessed with endless love.",
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
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center transform scale-0 animate-partyMessage">
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
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Great+Vibes&family=Alex+Brush&display=swap');
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
        .font-wedding { font-family: 'Great Vibes', cursive; font-weight: 400; }
        .font-elegant { font-family: 'Playfair Display', serif; font-weight: 500; }
        .font-body { font-family: 'Cormorant Garamond', serif; font-weight: 400; }
        .font-script { font-family: 'Dancing Script', cursive; font-weight: 500; }
        .font-brush { font-family: 'Alex Brush', cursive; font-weight: 400; }
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
            <span className="font-wedding text-2xl text-gray-800">C & A</span>
          </div>
        </div>
      </nav>

      <div className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100/50 via-transparent to-transparent" />
        <div className="relative z-10 text-center px-4">
          <Heart className="w-20 h-20 text-rose-400 mx-auto mb-8 animate-pulse" />
          <h1 className="text-7xl md:text-9xl font-wedding text-gray-800 mb-6">
            Chinju <span className="text-rose-400">&</span> Ashwin
          </h1>
          <div className="h-1 w-40 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-gray-600 font-elegant tracking-widest mb-10">
            ARE GETTING MARRIED
          </p>
          <p className="text-2xl text-gray-500 font-body font-light">
            December 23rd, 2025
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-32">
        <h2 className="text-5xl font-wedding text-center text-gray-800 mb-4">
          Our Journey
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg font-body">
          Celebrating love and new beginnings
        </p>

        <div className="relative h-[700px] rounded-3xl overflow-hidden shadow-2xl">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentGalleryImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative h-full">
                {/* Background Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={img.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-end justify-center p-8 pb-16">
                  <div className="text-center max-w-2xl">
                    <div className="mb-4">
                      <Heart className="w-8 h-8 text-white mx-auto drop-shadow-lg" />
                    </div>
                    <p className="text-lg md:text-xl font-elegant text-white italic leading-relaxed drop-shadow-lg">
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
                className="bg-white/90 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-3xl font-elegant">{event.title}</h3>
                </div>
                <div className="space-y-4 mb-6 font-body">
                  <div className="flex gap-3">
                    <Clock className={`w-5 h-5 text-${event.color}-400 mt-1`} />
                    <div>
                      <p className="font-semibold">{event.time}</p>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin
                      className={`w-5 h-5 text-${event.color}-400 mt-1`}
                    />
                    <div>
                      <p className="font-semibold">{event.venue}</p>
                      <p className="text-sm text-gray-600">{event.address}</p>
                    </div>
                  </div>
                </div>
                <div className="h-56 rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <iframe
                    src={event.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={event.title}
                  />
                </div>
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center text-${event.color}-500 hover:text-${event.color}-600 font-medium py-2 rounded-lg hover:bg-${event.color}-50 transition font-body`}
                >
                  Open in Maps →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="relative bg-gradient-to-br from-rose-50 via-white to-pink-50 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-double border-rose-300">
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-rose-300"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-rose-300"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-rose-300"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-rose-300"></div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl font-wedding text-gray-800 mb-2">RSVP</h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-3"></div>
            <p className="text-gray-600 font-body italic">
              Kindly respond by December 1st
            </p>
          </div>

          {formSubmitted ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-3xl font-serif mb-3">Thank You!</h3>
              <p className="text-gray-600 mb-8">
                Your response has been recorded!
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-rose-500 underline hover:text-rose-600"
              >
                Submit another RSVP
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium font-body">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none transition font-body bg-rose-50/30"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium font-body">
                  Phone Number <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none transition font-body bg-rose-50/30"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium font-body">
                  Number of Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-rose-200 focus:border-rose-400 outline-none transition font-body bg-rose-50/30"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Guest{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-3 font-medium font-body text-center">
                  Will you be joining us?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() =>
                      setFormData({ ...formData, status: "accepted" })
                    }
                    className={`py-4 rounded-lg border-2 font-medium transition font-body ${
                      formData.status === "accepted"
                        ? "border-green-400 bg-green-50 text-green-700 shadow-lg"
                        : "border-rose-200 hover:border-green-300 bg-rose-50/30"
                    }`}
                  >
                    ✓ Joyfully Accept
                  </button>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, status: "not_sure" })
                    }
                    className={`py-4 rounded-lg border-2 font-medium transition font-body ${
                      formData.status === "not_sure"
                        ? "border-yellow-400 bg-yellow-50 text-yellow-700 shadow-lg"
                        : "border-rose-200 hover:border-yellow-300 bg-rose-50/30"
                    }`}
                  >
                    ? Not Sure
                  </button>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, status: "declined" })
                    }
                    className={`py-4 rounded-lg border-2 font-medium transition font-body ${
                      formData.status === "declined"
                        ? "border-gray-400 bg-gray-100 text-gray-700 shadow-lg"
                        : "border-rose-200 hover:border-gray-400 bg-rose-50/30"
                    }`}
                  >
                    ✗ Decline
                  </button>
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
                } text-white`}
              >
                {isSubmitting ? "Submitting..." : "Submit RSVP"}
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
