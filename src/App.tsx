import { AppRouting } from './app-routes';
import './App.css';
import Header from './components/user/header';

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col justify-start min-h-[80vh]">
          <AppRouting />
        </div>
      </main>
    </>
  );
}

export default App;
