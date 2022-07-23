import Head from "next/head";
import { auth, provider } from "../firebase";
function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <div className="flex flex-col items-center bg-[#2C3333] min-h-screen w-full justify-center">
      <Head>
        <title>Login</title>
      </Head>

      <div className="p-4 cursor-pointer bg-[#E7F6F2] rounded-xl text-lg hover:bg-[#395B64] hover:text-white" onClick={signIn}>
        Sign in with Google 
      </div>
    </div>
  );
}

export default Login;
