import { RouteObject } from 'react-router-dom';
import Home from '../pages/home';
import AdvancedScroll from '../pages/advanced-scroll';
import Countdown from '../pages/countdown';
import TodoList from '../pages/todo-list';

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
];

export default router;
