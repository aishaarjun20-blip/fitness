export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
}

export interface Inquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  selectedPlan: string;
  additionalNotes?: string;
  submittedAt: string;
  status: 'Pending' | 'Contacted' | 'Scheduled';
}

export interface ClassScheduleItem {
  id: string;
  className: string;
  time: string;
  trainer: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Extreme';
  category: 'Cardio' | 'Strength' | 'HIIT' | 'Yoga & Flex';
  room: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  basePrice: number;
  features: string[];
  isPopular?: boolean;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  imageUrl: string;
}

export interface GymService {
  id: string;
  title: string;
  category: 'Strength' | 'Cardio & Dance' | 'Wellness & Core' | 'Specialized';
  description: string;
  iconName: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Extreme';
}

