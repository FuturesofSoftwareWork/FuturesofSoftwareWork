import Hero from "./components/Hero";
import ContentStream from "./components/ContentStream";
import AboutProject from "./components/AboutProject";
import WhatIfSection from "./components/WhatIf/WhatIfSection";

function App() {
  return (
    <div className="bg-midnight min-h-screen text-white font-sans selection:bg-electric-blue selection:text-white">
      <Hero />
      <WhatIfSection />
      <ContentStream />
      <AboutProject />

      <footer className="bg-black py-12 text-center text-gray-500 text-sm">
        <p>© 2026 Alternative Futures of Software Work Project. </p>
        <p className="mt-2">
          A collaboration between VTT, University of Helsinki, and Business
          Finland.
        </p>
      </footer>
    </div>
  );
}

export default App;
