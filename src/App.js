import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomeView from "./home/HomeView";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
