export type UserRole = "trainer" | "trainee";

export interface BaseUser {
  id: string;
  fullName: string;
  age: number;
  gender: "male" | "female";
  heightCm: number;
  weightKg: number;
  goal: string;
  role: UserRole;
}

export interface Trainer extends BaseUser {
  role: "trainer";
  specialty: string;
  experienceYears: number;
  trainees: Trainee[];
}

export interface Trainee extends BaseUser {
  role: "trainee";
  trainerId: string;
}

export const mockUsers: Trainer[] = [
  {
    id: "t1",
    fullName: "יוסי כהן",
    age: 35,
    gender: "male",
    heightCm: 180,
    weightKg: 82,
    goal: "שיפור סיבולת",
    role: "trainer",
    specialty: "אימון פונקציונלי",
    experienceYears: 8,
    trainees: [
      {
        id: "u1",
        fullName: "דני לוי",
        age: 28,
        gender: "male",
        heightCm: 175,
        weightKg: 78,
        goal: "חיטוב",
        role: "trainee",
        trainerId: "t1",
      },
      {
        id: "u2",
        fullName: "נועה בן דוד",
        age: 24,
        gender: "female",
        heightCm: 162,
        weightKg: 60,
        goal: "עלייה במסה",
        role: "trainee",
        trainerId: "t1",
      },
    ],
  },
  {
    id: "t2",
    fullName: "ליאור אסולין",
    age: 42,
    gender: "male",
    heightCm: 183,
    weightKg: 90,
    goal: "הובלת ספורטאים",
    role: "trainer",
    specialty: "ספורט תחרותי",
    experienceYears: 12,
    trainees: [
      {
        id: "u3",
        fullName: "מאיה כהן",
        age: 31,
        gender: "female",
        heightCm: 168,
        weightKg: 65,
        goal: "שיפור כושר כללי",
        role: "trainee",
        trainerId: "t2",
      },
    ],
  },
  // ... המשך עד 10 מאמנים ו-5 מתאמנים לכל אחד
];
