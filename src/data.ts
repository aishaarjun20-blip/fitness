import { Review, MembershipPlan, ClassScheduleItem, Amenity, Trainer, GymService } from './types';

export const GYM_CONTACT = {
  name: "Fitness Track",
  phone: "09123349529",
  address: "61B, Matheswartala Road, near Kim Pou Restaurant, China Town, Kolkata, West Bengal 700046",
  googleMapsLink: "https://maps.google.com/?q=61B,+Matheswartala+Road,+near+Kim+Pou+Restaurant,+China+Town,+Kolkata,+West+Bengal+700046",
  email: "contact@fitnesstrackkolkata.com"
};

export const GYM_TIMINGS = {
  weekdays: "6:30 AM – 10:00 PM",
  sunday: "6:30 AM – 1:00 PM",
  detailed: [
    { day: "Monday", hours: "6:30 am – 10:00 pm", openHour: 6.5, closeHour: 22 },
    { day: "Tuesday", hours: "6:30 am – 10:00 pm", openHour: 6.5, closeHour: 22 },
    { day: "Wednesday", hours: "6:30 am – 10:00 pm", openHour: 6.5, closeHour: 22 },
    { day: "Thursday", hours: "6:30 am – 10:00 pm", openHour: 6.5, closeHour: 22 },
    { day: "Friday", hours: "6:30 am – 10:00 pm", openHour: 6.5, closeHour: 22 },
    { day: "Saturday", hours: "6:30 am – 10:00 pm", openHour: 6.5, closeHour: 22 },
    { day: "Sunday", hours: "6:30 am – 1:00 pm", openHour: 6.5, closeHour: 13 },
  ]
};

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "basic",
    name: "Classic Gym",
    basePrice: 1200,
    features: [
      "Access to Strength Zone",
      "Full Cardio Arena Access",
      "Standard Locker Rooms",
      "General Trainer Guidance",
      "1 Complementary Body Assessment"
    ]
  },
  {
    id: "elite",
    name: "Elite Performance",
    basePrice: 2200,
    features: [
      "All Classic Gym features",
      "Access to CrossFit & HIIT Arena",
      "Premium Towel & Lounge Access",
      "Group Fitness Classes (Unlimited)",
      "Monthly BMI & Fitness Tracking",
      "Dedicated Locker Storage"
    ],
    isPopular: true
  },
  {
    id: "pro",
    name: "VIP Premium",
    basePrice: 3800,
    features: [
      "All Elite features",
      "Dedicated Personal Trainer (4 sessions/month)",
      "Custom Diet & Nutrition Consultation",
      "Sauna & Recovery Lounge",
      "Guest Pass (1 per month)",
      "Complementary Gym Apparel Kit"
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Arijit Das",
    rating: 5,
    comment: "Best gym near Chinatown! Extremely spacious with brand new Hammer Strength equipment. The trainers are highly certified and helpful. Value for money is top notch.",
    date: "2026-06-28",
    isVerified: true
  },
  {
    id: "rev-2",
    name: "Megha Sen",
    rating: 5,
    comment: "The CrossFit zone is unmatched here. Timings are incredibly convenient (opens early at 6:30 AM which is perfect for my pre-office workouts). Clean shower rooms as well!",
    date: "2026-07-03",
    isVerified: true
  },
  {
    id: "rev-3",
    name: "Rahul Kothari",
    rating: 4,
    comment: "Excellent trainers. Vikram is super motivating. Only feedback is Sunday has shorter timings (closes at 1:00 PM), but otherwise highly recommended!",
    date: "2026-07-08",
    isVerified: true
  },
  {
    id: "rev-4",
    name: "Ching-Hwa Lee",
    rating: 5,
    comment: "Located conveniently near Kim Pou Restaurant. The gym environment is highly energetic. Music list is great. Highly hygienic and Sanitized regularly.",
    date: "2026-07-11",
    isVerified: true
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: "strength",
    title: "Heavy Strength Zone",
    description: "Premium Hammer Strength plates, dynamic power racks, dumbbells up to 50kg, and custom heavy-duty cable systems.",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "cardio",
    title: "Cardio Arena",
    description: "Equipped with state-of-the-art interactive treadmills, spin bikes, elliptical coaches, and air rowers with live heart rate trackers.",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "crossfit",
    title: "CrossFit & HIIT Studio",
    description: "Features plyometric boxes, battle ropes, premium kettlebells, bumper plates, gymnastics rings, and sled-push turf tracks.",
    imageUrl: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "yoga",
    title: "Mind & Body Lounge",
    description: "A peaceful, air-conditioned studio dedicated to Yoga, Flexibility, and core stability classes away from heavy weights.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600"
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: "tr-1",
    name: "Vikram Sen",
    specialty: "CrossFit Coach & Strength Conditioning",
    experience: "8+ Years Experience | Former State Athlete",
    imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "tr-2",
    name: "Priya Sharma",
    specialty: "Yoga, Pilates & Flexibility Therapist",
    experience: "6+ Years Experience | Certified RY-500 Coach",
    imageUrl: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "tr-3",
    name: "Arjun Banerjee",
    specialty: "Bodybuilding Specialist & Nutrition Analyst",
    experience: "7+ Years Experience | Certified Fitness Nutritionist",
    imageUrl: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=400"
  }
];

export const WEEKLY_SCHEDULE: ClassScheduleItem[] = [
  // Cardio Category
  { id: "sch-1", className: "Cardio Shred", time: "07:00 AM - 08:00 AM", trainer: "Vikram Sen", intensity: "High", category: "Cardio", room: "Studio A" },
  { id: "sch-2", className: "Spin Endurance", time: "08:30 AM - 09:30 AM", trainer: "Arjun Banerjee", intensity: "Medium", category: "Cardio", room: "Cardio Zone" },
  { id: "sch-3", className: "Zumba Burn", time: "06:00 PM - 07:00 PM", trainer: "Priya Sharma", intensity: "Medium", category: "Cardio", room: "Studio B" },
  
  // Strength Category
  { id: "sch-4", className: "Powerlifting Foundations", time: "09:00 AM - 10:15 AM", trainer: "Arjun Banerjee", intensity: "Extreme", category: "Strength", room: "Strength Zone" },
  { id: "sch-5", className: "Hypertrophy Upper Body", time: "05:00 PM - 06:00 PM", trainer: "Vikram Sen", intensity: "High", category: "Strength", room: "Strength Zone" },
  { id: "sch-6", className: "Core & Glute Sculpt", time: "07:00 PM - 07:45 PM", trainer: "Priya Sharma", intensity: "Medium", category: "Strength", room: "Studio A" },

  // HIIT Category
  { id: "sch-7", className: "AMRAP Extreme", time: "06:30 AM - 07:15 AM", trainer: "Vikram Sen", intensity: "Extreme", category: "HIIT", room: "CrossFit Arena" },
  { id: "sch-8", className: "MetCon Conditioning", time: "10:30 AM - 11:30 AM", trainer: "Arjun Banerjee", intensity: "High", category: "HIIT", room: "CrossFit Arena" },
  { id: "sch-9", className: "Tabata Blitz", time: "06:30 PM - 07:15 PM", trainer: "Vikram Sen", intensity: "Extreme", category: "HIIT", room: "CrossFit Arena" },

  // Yoga & Flex
  { id: "sch-10", className: "Vinyasa Flow Yoga", time: "07:30 AM - 08:30 AM", trainer: "Priya Sharma", intensity: "Medium", category: "Yoga & Flex", room: "Mind & Body Lounge" },
  { id: "sch-11", className: "Post-Workout Deep Stretch", time: "11:30 AM - 12:15 PM", trainer: "Priya Sharma", intensity: "Low", category: "Yoga & Flex", room: "Mind & Body Lounge" },
  { id: "sch-12", className: "Power Pilates Core", time: "05:30 PM - 06:30 PM", trainer: "Priya Sharma", intensity: "Medium", category: "Yoga & Flex", room: "Studio B" }
];

export const GYM_SERVICES: GymService[] = [
  {
    id: "srv-aerobics",
    title: "Aerobics",
    category: "Cardio & Dance",
    description: "High-energy rhythmic exercises designed to improve cardiovascular fitness, coordination, and overall stamina.",
    iconName: "Activity",
    intensity: "Medium"
  },
  {
    id: "srv-kickboxing",
    title: "Kickboxing",
    category: "Specialized",
    description: "Action-packed combat drills combining martial arts kicks and boxing punches to burn fat and build endurance.",
    iconName: "Flame",
    intensity: "Extreme"
  },
  {
    id: "srv-crossfit",
    title: "CrossFit",
    category: "Strength",
    description: "High-intensity functional movements scaled for all levels, combining weightlifting, plyometrics, and gymnastics.",
    iconName: "Dumbbell",
    intensity: "Extreme"
  },
  {
    id: "srv-dance",
    title: "Dance Fitness Classes",
    category: "Cardio & Dance",
    description: "Calorie-burning dance parties set to high-tempo music like Zumba, hip-hop, and Bollywood beats.",
    iconName: "Music",
    intensity: "Medium"
  },
  {
    id: "srv-pt",
    title: "Personal Training",
    category: "Specialized",
    description: "Customized 1-on-1 coaching plans with certified professional coaches to keep you accountable and safe.",
    iconName: "Users",
    intensity: "High"
  },
  {
    id: "srv-weight",
    title: "Weight Training",
    category: "Strength",
    description: "Structured resistance training targeting progressive overload to maximize muscle hypertrophy and power.",
    iconName: "Dumbbell",
    intensity: "High"
  },
  {
    id: "srv-pilates",
    title: "Pilates Classes",
    category: "Wellness & Core",
    description: "Low-impact flexibility and muscular strength workouts prioritizing core development and spinal alignment.",
    iconName: "Sparkles",
    intensity: "Medium"
  },
  {
    id: "srv-nutrition",
    title: "Nutrition Consulting",
    category: "Specialized",
    description: "Personalized macronutrient tracking guidance, hydration setups, and habit counseling to match your workouts.",
    iconName: "Apple",
    intensity: "Low"
  },
  {
    id: "srv-transformation",
    title: "Body Transformation",
    category: "Specialized",
    description: "Comprehensive 90-day progress programs combining active training, customized diets, and regular composition checks.",
    iconName: "TrendingUp",
    intensity: "High"
  },
  {
    id: "srv-core",
    title: "Core Training",
    category: "Wellness & Core",
    description: "Focused anatomical exercises to stabilize your abdominal, lower back, and pelvic floor muscle groups.",
    iconName: "Target",
    intensity: "Medium"
  },
  {
    id: "srv-spinning",
    title: "Spinning Classes",
    category: "Cardio & Dance",
    description: "Dynamic indoor cycling journeys led by motivating coaches set to rhythmic high-intensity playlists.",
    iconName: "Bike",
    intensity: "High"
  },
  {
    id: "srv-hiit",
    title: "HIIT Exercise Classes",
    category: "Strength",
    description: "High-intensity interval training designed to push your heart rate to maximum limits for ultimate metabolic afterburn.",
    iconName: "Timer",
    intensity: "Extreme"
  }
];

