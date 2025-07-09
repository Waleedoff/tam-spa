

import { AppRouting } from './app-routes';
import './App.css';
import Header from './components/user/header';

function App() {


  return (
    <main>
      <div>
        <div className="flex flex-col justify-start">
          <Header />
          <div className="min-h-[80vh]">
            <AppRouting />
          </div>
          
        </div>
      </div>
      {/* <ToastMessage /> */}
    </main>
  );
}

export default App;
