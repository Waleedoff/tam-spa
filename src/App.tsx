import { AppRouting } from './app-routes';
import './App.css';
import Header from './components/user/header';

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="flex min-h-[80vh] flex-col justify-start">
          <AppRouting />
        </div>
      </main>
    </>
  );
}

export default App;
