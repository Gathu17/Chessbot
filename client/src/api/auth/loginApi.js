import { toast } from "react-toastify"; 
import { navigate } from "react-router-dom";


const login = async (username, password, setToken) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
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
        toast.success("Login Successful");
        setToken(token); // Assuming setToken is a function that sets the token in your application state
  
        setTimeout(() => {
          navigate("/"); // Redirect to the home page or the desired route
        }, 2000);
      } else {
        const data = await response.json();
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  export { login };