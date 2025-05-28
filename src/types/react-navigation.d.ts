import { ParamListBase } from '@react-navigation/native';

declare module '@react-navigation/native' {
  export * from '@react-navigation/native';
}

declare module '@react-navigation/native-stack' {
  import { NavigatorScreenParams } from '@react-navigation/native';
  
  export function createNativeStackNavigator<T extends ParamListBase>(): {
    Navigator: any;
    Screen: any;
  };
} 