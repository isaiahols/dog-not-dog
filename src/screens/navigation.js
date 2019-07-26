import { createStackNavigator, createAppContainer } from 'react-navigation';
import Welcome from './Welcome';
import Results from "./Results";
import Capture from './Capture';


const AppNavigator = createStackNavigator(
    {
        Welcome,
        Results,
        Capture,
    },
    {
        initialRouteName: "Welcome"
    }
);
export default createAppContainer(AppNavigator)
