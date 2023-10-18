import React, { useState, useEffect } from "react";
import Header from "../components/navigation/header/Header";

const Redux = ({ token }) => {
  const [jwToken, setJwToken] = useState(null);
  useEffect(() => {
    setJwToken(token);
  }, [token]);
  return (
    <div>
      <Header token={jwToken} />
    </div>
  );
};

export default Redux;
