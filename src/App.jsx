import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation/Navigation";
import Articles from "./components/Articles/Articles";
import Home from "./components/Home/Home";

function App() {
  const articles = useSelector((state) => state.articles.list);
  const loading = useSelector((state) => state.articles.loading);

  const isFirstLoading = loading && articles.length === 0;

  return (
    <>
      {isFirstLoading && <h1>Loading...</h1>}
      {!isFirstLoading && (
        <>
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="articles" element={<Articles />} />
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
