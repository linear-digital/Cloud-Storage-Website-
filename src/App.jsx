import { Outlet } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
const App = () => {
  const { user } = useSelector(state => state.user)
  // console.log(user)
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;