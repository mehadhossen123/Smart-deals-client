import React, { use } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

const Register = () => {

const { signInGoogle}=use(AuthContext)
const handleGoogleLogin=(e)=>{
    e.preventDefault()
    signInGoogle().then(result=>{
        console.log(result);
        
    }).catch(error=>{
        console.log(error)
    })
}


    return (
      <div className="max-w-11/12 mx-auto min-h-screen flex justify-center items-center">
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <p className="fieldset-legend">Register Now!</p>

          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <p>Forget password?</p>

          <button className="btn btn-neutral mt-4">Register</button>
          <div className="divider divider-neutral">or</div>

          {/* Google */}
          <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

        </form>
      </div>
    );
};

export default Register;