import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  // מסכים ראשיים
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Exercises: undefined;
  
  // מסכי אימות
  Login: undefined;
  Register: undefined;
  RoleSelect: undefined;
  
  // מסכי תרגילים
  AddExercise: undefined;
  ExerciseDetails: {
    exerciseId: string;
  };
  EditExercise: {
    exerciseId: string;
  };
  
  // מסכי מאמן
  TrainerDashboard: undefined;
  TrainerProfile: { trainerId: string }; 
  TrainerList: undefined;
  AddTrainee: { trainerId: string }; 
  EditTrainer: { trainerId: string };
  
  // מסכי מנהל
  AdminDashboard: undefined;
  TraineeList: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = {
  navigation: {
    navigate: (screen: T, params?: RootStackParamList[T]) => void;
    goBack: () => void;
  };
  route: {
    params: RootStackParamList[T];
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type NavigationProp = {
  navigate: <T extends keyof RootStackParamList>(
    screen: T,
    params?: RootStackParamList[T]
  ) => void;
  goBack: () => void;
}; 