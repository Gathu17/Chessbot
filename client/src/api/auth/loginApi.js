import { toast } from "react-toastify"; 
import { Navigate } from "react-router-dom";


const Login = async ({email,password}) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        toast.success("Login Successful");
        setToken(token);

        setTimeout(() => {
          // navigate("/"); 
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
  
export default Login;