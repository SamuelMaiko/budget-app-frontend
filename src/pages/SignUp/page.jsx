import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useState } from "react";
import underground from "../../assets/budget2.jpg";
import { toast } from "react-toastify";
import instance from "../../axios/instance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
    } else {
      try {
        const response = await instance.post("/auth/register/", {
          username: name,
          email: email,
          password: password,
        });
        toast.success("Signed up successfully");

        navigate("/login");
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
              toast.error(message);
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
    }
  };

  return (
    <div className="h-screen w-full font-poppins">
      <div className="flex justify-between">
        <Section className="w-[61%] h-screen text-primaryColor hidden lg:flex pl-16">
          <div className="  w-[35rem] ">
            <h1 className=" text-4xl mt-20 mb-20 opacity-0">
              <span className="font-extrabold">FIFA</span> ID
            </h1>
            <h1 className="font-medium text-[4rem]">
              Create Your Account Today.
            </h1>
            <p className="text-2xl font-medium">
              Join our vibrant community and unlock exclusive benefits and
              features.
            </p>
          </div>
        </Section>
        <section className="flex-1 flex justify-center">
          <form className=" w-[73%] mt-0" onSubmit={handleSubmit}>
            <h1 className="font-medium text-4xl mt-7">Sign Up</h1>
            <div className="mt-5">
              <label className="font-medium text-[1.1rem]">Username</label>
              <input
                className="bg-[#e8f0fe] h-[3rem] w-full border-b-[1px] border-gray-400 pl-3 outline-none"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state
                required
              />
            </div>
            <div className="mt-5">
              <label className="font-medium text-[1.1rem]">Email</label>
              <input
                className="bg-[#e8f0fe] h-[3rem] w-full border-b-[1px] border-gray-400 pl-3 outline-none"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                required
              />
            </div>
            <div className="mt-5">
              <label className="font-medium text-[1.1rem]">Password</label>
              <input
                className="bg-[#e8f0fe] h-[3rem] w-full border-b-[1px] border-gray-400 pl-3 outline-none"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
            </div>
            <div className="mt-5">
              <label className="font-medium text-[1.1rem]">
                Confirm Password
              </label>
              <input
                className="bg-[#e8f0fe] h-[3rem] w-full border-b-[1px] border-gray-400 pl-3 outline-none"
                placeholder="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                required
              />
            </div>
            <button
              type="submit"
              // className="mt-8 mb-5 bg-[#28A745] hover:bg-[#339966] py-3 px-7 rounded-3xl text-white text-sm uppercase"
              className="mt-8 mb-5 bg-primaryColor hover:opacity-[0.7] py-3 px-7 rounded-3xl text-white
               text-sm uppercase transition-opacity duration-300"
              disabled={loading}
            >
              {loading ? "loading ..." : "Sign Up"}
            </button>
            <p className="mb-2 text-left">Already have an account?</p>
            <NavLink to="/login">
              <button
                type="button"
                className="border-[1px] border-black rounded-3xl py-3 px-7 uppercase text-sm"
              >
                Login
              </button>
            </NavLink>
          </form>
        </section>
      </div>
    </div>
  );
};

const Section = styled.section`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)),
    url(${underground});
  background-size: 100% 100%;
  // background-color:red;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: scroll;
`;

export default SignUp;
