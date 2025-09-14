"use client";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function () {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/dashboard",
      },
    });

    if (error) setMessage(error.message);
    else setMessage("Link sent");
  };
  return (
    <>
      <h1>Authentication</h1>
      <input
        type="email"
        value={email}
        placeholder="example@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </>
  );
}
