
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { FaUserCircle } from 'react-icons/fa'
import logo from "../assets/images.png"
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { ClipLoader } from "react-spinners";
import axios from "axios"
import { showCustomAlert } from '../components/CustomAlerts'

const SignIn = () => {

  const [step, setStep] = useState(1);
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [backendImage, setBackendImage] = useState(null);
  const [frontendImage, setFrontImage] = useState(null);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);



  // const handleImage = (e) => {
  //   const file = e.target.files[0];
  //   setBackendImage(file);
  //   setFrontImage(URL.createObjectURL(file));
  // }


  const handleNext = () => {
    if (step == 1) {
      if (!email) {
        showCustomAlert("All fields are required");
        return;
      }
    }
    if (step == 2) {
      if (!password) {
        showCustomAlert("All field are required");
        return;
      }
    }
    setStep(prev => prev + 1);

  }


  const handleSignIn = async () => {
    setloading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {email,password},
        {
          withCredentials: true,
        }
      );
      showCustomAlert("UserSign In")
      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      showCustomAlert(error.response?.data?.message || "Signup failed");
    } finally {
      setloading(false);
    }
  };



  return (
    <div className='flex items-center justify-center min-h-screen bg-[#181818]'>
      <div className=' bg-[#202124] rounded-2xl p-10 w-full max-w-md shadow-2xl'>
        <div className='flex items-center mb-6'>

          <button className='text-gray-300 mr-3 hover:text-white'>
            <FaArrowLeft size={29} onClick={() => {
              if (step > 1) {
                setStep(prev => prev - 1);
              } else {
                navigate("/");
              }
            }} />

          </button>
          <span className='text-white text-2xl font-medium'>Play Tube</span>

        </div>

        {step == 1 && (
          <>
            <h1 className="text-3xl font-normal text-white mb-5 flex items-center gap-2">
              <img src={logo} alt="imagesplatube" className='w-8 h-8' />
              Sign In
            </h1>
            <h1 className="text-sm font-normal text-white mb-5 flex items-center gap-2">
              With your Account to continue to PlayTube
            </h1>

            <input type="text" placeholder="Email" className="w-full bg-transparent border
                     border-gray-500 rounded-md px-3 py-3
                     text-white focus:outline-none focus:border-orange-500 mb-4"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
            <div className='flex justify-between items-center mt-10'>
              <button className="text-sm font-normal text-orange-400 mb-5 flex items-center gap-2"
              onClick={()=>navigate("/signup")}
              >
                Create Account
              </button>

              <button className='bg-orange-500 hover:bg-orange-600 text-white 
                     px-6 py-2 rounded-full'
                onClick={handleNext}
              >
                Next
              </button>
            </div>

          </>
        )}


        {step == 2 && (
          <>
            <h1 className="text-3xl font-normal text-white mb-5 flex items-center gap-2">
              <img src={logo} alt="imagesplatube" className='w-8 h-8' />
              Security
            </h1>
            <div className='flex items-center bg-[#3c4043] text-white px-3 py-3 rounded-full w-fit mb-6'>
              <FaUserCircle className='mr-2' size={20} />
              {email}
            </div>
            <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full bg-transparent border
                     border-gray-500 rounded-md px-3 py-3
                     text-white focus:outline-none focus:border-orange-500 mb-4"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <div className='flex items-center gap-3 mt-3'>
              <input type='checkbox' id='showpass'
                checked={showPassword}
                onChange={() => setShowPassword(prev => !prev)} />
              <label className='text-gray-300 cursor-pointer' htmlFor='showpass'>Show Password</label>

            </div>

            <div className='flex items-center justify-between mt-10'>
              <h1 className="text-sm font-normal text-orange-400 mb-5 flex items-center gap-2">
                Forget Password
              </h1>
              <button className='bg-orange-500 hover:bg-orange-600 text-white 
                     px-6 py-2 rounded-full'
                onClick={handleSignIn}
              >
                {loading?<ClipLoader color='black' size={20}/>:"Sign In"}
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  )
}

export default SignIn
