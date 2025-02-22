import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { DefaultLayout as Layout } from '~/layout';
import { AdminLayout as AdminLayout } from "~/layout";
import { privateRoute, publicRoute } from '~/routes';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          {publicRoute.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Layout><Page /><ToastContainer /></Layout>} />
          })}

          {
            privateRoute.map((route, index) => {
              const Page = route.component;
              return <Route 
              key={index} path={route.path} element={
                <ProtectedRoute role="admin">
                  <AdminLayout>
                    <Page /><ToastContainer />
                  </AdminLayout>
                </ProtectedRoute>} />
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
