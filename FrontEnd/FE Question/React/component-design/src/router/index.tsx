import { RouteObject } from 'react-router-dom';
import Home from '../pages/home';
import AdvancedScroll from '../pages/advanced-scroll';
import Countdown from '../pages/countdown';
import TodoList from '../pages/todo-list';
import CountryAutocompletion from '../pages/country-autocompletion';

const router: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/advanced-scroll',
    element: <AdvancedScroll />,
  },
  {
    path: '/countdown',
    element: <Countdown />,
  },
  {
    path: '/todo-list',
    element: <TodoList />,
  },
  {
    path: '/country-autocompletion',
    element: <CountryAutocompletion />,
  },
];

export default router;
