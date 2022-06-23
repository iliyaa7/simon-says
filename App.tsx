import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./src/redux/store/store";
import { Provider } from "react-redux";
import GameScreen from "./src/Screens/GameScreen/GameScreen";
import LeaderBoard from "./src/Screens/LeaderBoardScreen/LeaderBoardScreen";
import SplashScreen from "./src/Screens/SplashScreen/SplasScreen";

export type RootStackParamList = {
  Splash: undefined;
  Game: undefined;
  LeaderBoard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Splash"
        >
          <Stack.Screen name="Splash" component={SplashScreen}  />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
