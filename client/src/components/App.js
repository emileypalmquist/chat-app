import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import ChatsList from "../pages/ChatsList";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((resp) => {
      if (resp.ok) {
        resp.json().then(setUser);
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar onLogout={setUser} />
      <main>
        <Switch>
          <Route exact path="/">
            <ChatsList user={user} />
          </Route>
          <Route path="/new">
            <h1>Hello :)</h1>
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
