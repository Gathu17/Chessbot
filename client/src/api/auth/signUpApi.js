import { toast } from "react-toastify";
import { navigate } from "react-router-dom";

const signup = async (username, password, setToken) => {
  try {
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      toast.success("Sign-up Successful");
      setToken(token);

      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } else {
      const data = await response.json();
      toast.error(data.message);
      console.log(data.message);
    }
  } catch (error) {
    console.error("Error during sign-up:", error);
  }
};

export { signup };
