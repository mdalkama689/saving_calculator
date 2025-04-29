import { Calculator } from './components/Calculator';
import { Header } from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <Calculator />
      </main>
    </div>
  );
}

export default App;