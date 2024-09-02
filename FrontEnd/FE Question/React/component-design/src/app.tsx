import { Link, Outlet, useRoutes } from 'react-router-dom';
import router from './router';

const App = () => {
  const element = useRoutes(router);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
          padding: 16,
          borderBottom: '1px solid black',
        }}
      >
        <Link to='/'>Home</Link>
        <Link to='/advanced-scroll'>Advanced Scroll</Link>
        <Link to='/countdown'>Countdown</Link>
        <Link to='/todo-list'>Todo List</Link>
        <Link to='/country-autocompletion'>Country Autocompletion</Link>
      </div>

      <div style={{ padding: 16 }}>
        {element}
        <Outlet />
      </div>
    </div>
  );
};

export default App;
