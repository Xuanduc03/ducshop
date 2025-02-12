import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {DefaultLayout as Layout} from '~/layout';
import { publicRoute } from '~/routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          {publicRoute.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Layout><Page /><ToastContainer /></Layout>} />
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
