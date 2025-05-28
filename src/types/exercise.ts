export type ExerciseCategory = 'strength' | 'cardio' | 'flexibility' | 'balance' | 'other';
export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type ExerciseEquipment = 'none' | 'dumbbells' | 'barbell' | 'kettlebell' | 'resistance_band' | 'machine' | 'other';
export type ExerciseMuscleGroup = 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core' | 'full_body' | 'other';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  difficulty: ExerciseDifficulty;
  equipment: ExerciseEquipment;
  muscleGroup: ExerciseMuscleGroup;
  instructions: string[];
  imageUrl?: string;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExerciseFilters {
  category?: ExerciseCategory;
  difficulty?: ExerciseDifficulty;
  equipment?: ExerciseEquipment;
  muscleGroup?: ExerciseMuscleGroup;
}

export interface ExerciseSortOptions {
  field: 'name' | 'category' | 'difficulty' | 'createdAt';
  direction: 'asc' | 'desc';
} 