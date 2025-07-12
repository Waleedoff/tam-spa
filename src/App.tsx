import { AppRouting } from './app-routes';
import './App.css';
import Header from './components/user/header';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <main>
      <div>
        <div className="flex flex-col justify-start">
          <Header />
          <div className="min-h-[80vh]">
          <ToastContainer position="top-left" autoClose={3000} />
            <AppRouting />
          </div>
        </div>
      </div>
      {/* <ToastMessage /> */}
    </main>
  );
}

export default App;
