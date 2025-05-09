import { useEffect, useState } from 'react';
import { Calculator } from './components/Calculator';
import { Header } from './components/Header';
import MobileShare from './components/share/MobileShare';
import TabShare from './components/share/TabShare';

function App() {
    const [deviceType, setDeviceType] = useState<"big" | "small">("big");

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth < 1024 ? "small" : "big");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
        {deviceType === "small" ? <MobileShare /> : <TabShare />}
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <Calculator />
      </main>
    </div>
  );
}

export default App;