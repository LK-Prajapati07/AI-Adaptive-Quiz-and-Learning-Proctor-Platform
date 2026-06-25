import AppRouter from "./router/AppRouter";

import { useGetCurrentUser } from "./customHook/auth.hook";


function App() {


  useGetCurrentUser();


  return (

    <AppRouter/>

  );

}


export default App;