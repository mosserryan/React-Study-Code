import LoginForm from "./Components/LoginUser";
import RegisterForm from "./Components/RegisterUser";
import UserDashboard from "./Components/UserDashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const loginUser = (user) => {
    console.log(user, "logged in");
  };

  return (
    <Router>
      <div className="App">
        <Route
          path="/login"
          exact
          render={() => <LoginForm login={loginUser} />}
        />
        <Route path="/register" exact render={() => <RegisterForm />} />
        <Route path="/userDashboard" render={() => <UserDashboard />} />
      </div>
    </Router>
  );
}

export default App;
