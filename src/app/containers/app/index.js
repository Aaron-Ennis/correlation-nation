/*
 *  This is a container file that represents the top-level of the
 *  React app component tree.
 */
import Title from "./components/title";
import Main from "./components/main";

function App() {
  return (
    <div className="app pt-4 justify-content-center">
      <Title />
      <Main />
    </div>
  );
}

export default App;
