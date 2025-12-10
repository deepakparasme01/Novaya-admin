import Allroutes from "./Allroutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Allroutes />
    </>
  );
}

export default App;
