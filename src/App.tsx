import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import hero from "../src/assets/hero.svg";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="overflow-hidden">
      <img className="pt-14" src={hero} alt="hero-image" />
      <div className="m-auto my-10">
        <h1 className="text-center font-semibold text-5xl mt-[-50px] lg:mt-[-150px]">Flights</h1>
      </div>
      <SearchBar />
    </div>
  );
}

export default App;
