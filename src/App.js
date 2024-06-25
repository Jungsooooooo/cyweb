import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomeView from "./home/HomeView";

const App = () => {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
