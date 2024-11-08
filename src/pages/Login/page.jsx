import { styled } from "styled-components";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../axios/instance";
import { createNewCookie } from "../../Cookies/Cookie";
import excavator2 from "../../assets/budget1.jpeg";
import { clearAll } from "../../HelperFunctions/clearAllStorage";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // clear all the storage
    clearAll();

    try {
      const response = await instance.post("/auth/login/", {
        username: username,
        password: password,
      });
      createNewCookie("access_token", response.data.access);
      createNewCookie("refresh_token", response.data.refresh);
      // createNewCookie("username", response.data.user.username);
      toast.success("Logged in successfully");

      navigate("/wallets");
    } catch (error) {
      if (error.response && error.response.status) {
        const status = error.response.status;
        const message = error.response.data.error;

        switch (status) {
          case 400:
            toast.error(`${message}`);
            break;
          case 401:
            toast.error(`${message}`);
            break;
          case 404:
            toast.error("Invalid username or password");
            break;
          case 500:
            toast.error(`Server Error: Internal Server Error.`);
            break;
          default:
            toast.error("Unknown error occurred");
            break;
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full font-poppins overflow-y-scroll">
      <div className="flex justify-between">
        <Section className="w-[61%] h-screen hidden lg:flex text-primaryColor pl-16">
          <div className="  w-[35rem] ">
            <h1 className=" text-4xl mt-20 mb-20 opacity-0">
              <span className="font-extrabold">FIFA</span> ID
            </h1>
            <h1 className="font-medium text-[4rem]">
              Welcome Back, Sign In Now.
            </h1>
            <p className="text-2xl font-medium">
              Login to access your account and explore our platform.
            </p>
          </div>
        </Section>
        <section className="flex-1 flex justify-center ">
          <form className=" w-[73%] mt-5 md:mt-20" onSubmit={handleSubmit}>
            <h1 className="font-medium text-[24px] md:text-4xl mt-5">Login</h1>
            <div className="mt-10">
              <label className="font-medium text-[14px] md:text-[1.1rem]">
                Username
              </label>
              <input
                className="bg-[#e8f0fe] h-[3rem] w-full border-b-[1px] border-gray-400 pl-3 outline-none text-[14px] md:text-base"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update email state
                required
              />
            </div>
            <div className="mt-10">
              <label className="font-medium text-[14px] md:text-[1.1rem]">
                Password
              </label>
              <input
                className="bg-[#e8f0fe] h-[3rem] w-full border-b-[1px] border-gray-400 pl-3 outline-none text-[14px] md:text-base"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
            </div>
            <button
              type="submit"
              // className="mt-5 mb-5 bg-[#28A745] hover:bg-[#339966] py-3 px-7 rounded-3xl text-white text-sm uppercase"
              className="mt-8 md:mt-5 mb-5 bg-primaryColor hover:opacity-[0.7] py-3 px-7 rounded-3xl text-white
               transition-opacity duration-300 
               uppercase text-[13px] md:text-[16px] font-semibold flex items-center justify-center 
               "
              disabled={loading}
            >
              {loading ? "logging in ..." : "Login"}
            </button>
            <p
              onClick={() => alert("Coming soon")}
              className="mb-[3.2rem] md:mb-8 text-blue-600 hover:text-blue-900 text-[13px] md:text-md text-left cursor-pointer"
            >
              Forgotten your password?
            </p>

            <p className="mb-2 text-left text-[13px] md:text-base">
              <span>Don&apos;t have an account?</span>
              <NavLink to="/signup">
                <span className="ml-1 text-blue-600">Signup</span>
              </NavLink>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

const Section = styled.section`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)),
    url(${excavator2});
  background-size: 100% 100%;
  // background-color:red;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: scroll;
`;
// const LowerImage=styled.div`
// // background-color:blue;
// background:url(${LOWER_IMAGE});
// background-attachment:scroll;
// background-repeat:no-repeat;
// background-size:cover;
// background-position:center center;
// box-shadow:inset 0px 0px 10px #f5f5dc;
// `;

export default Login;
