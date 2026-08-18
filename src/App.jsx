import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'  // to send data to store
import config from './config/config.js'; // appwrite db Operations module
import authService from './appwrite/auth.js'; // auth module
import { login, logout } from './store/authSlice.js'; // disinct reducers functions impors
import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom'  // subsitute any element in its place 

function App() {
  //console.log(config.appwriteUrl);
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch(); // to interact with store

  useEffect(() => 
    {
      authService.getCurrentUser()
      .then(
        (userData) => {



          console.log(userData, "user data");
          

          if(userData)
            {

              // to prevent serializableCheck issue

              const clearUser = {
                $id : userData.$id,
                status : userData.status,
                email : userData.email,
                name : userData.name,

              }  
              dispatch(login({ userData : clearUser})); // the bug of userdata here, after reload, this page is first mounted, and the user details are fetched form here
                // dispatch whole object, instead as per cluade, dispatch specific attr
                // if user is logged, fetch the user data, and load it in the store 
                // now current logged in user data is in the store
            }  



          else 
            {
              dispatch(logout()) 

              // if user not logged in, run logout()
              // set status as falese, and userData as null
            }

        }
      )
      .finally(() => setLoading(false))

    }, [])

console.log(loading);

 return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-slate-300'>

        <div className='w-full block'>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>

    </div>
) : null;

}

export default App