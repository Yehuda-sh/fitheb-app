// src/navigation/RootStackParamList.ts

export type RootStackParamList = {
  RoleSelect: undefined;
  Login: { role?: "trainer" | "trainee" } | undefined;
  AddExercise: undefined;
  Register: undefined;
  Home: undefined;
  AdminDashboard: undefined;
  TrainerDashboard: undefined;
  TrainerList: undefined;
  TrainerProfile: { trainerId: string };
  EditTrainer: { trainerId: string };
  AddTrainee: { trainerId: string };
  TraineeProfile: undefined;
  Profile: undefined;      // ← הוסף שורה זו!
  Exercises: undefined;    // ← הוסף שורה זו!
  TraineeList: undefined;
  Settings: undefined; 
  

};
