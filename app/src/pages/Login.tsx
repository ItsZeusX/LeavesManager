import { Button, Input } from "@nextui-org/react";
import React from "react";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.status === 200) {
        window.location.href = "/";
      } else {
        alert("Invalid credentials");
      }
    });
  };

  
  return (
    <div className="flex justify-center items-center w-screen h-screen font-poppins">
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-black text-center">LOGIN</h1>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="bg-lime-200 font-bold" onClick={() => handleLogin()}>
          LOGIN
        </Button>
      </div>
    </div>
  );
};

export default Login;
