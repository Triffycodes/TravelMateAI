import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/toaster.jsx'
import CreateTrip from './create-trip/index.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'
import { Helmet , HelmetProvider} from 'react-helmet-async';

const router = createBrowserRouter(
  [{
    path:"/",
    element: <App/>
  },
  {
    path:"/create-trip",
    element: <CreateTrip/>
  },
  {
    path:"/view-trip/:tripId",
    element:<ViewTrip/>
  },
  {
    path:"/my-trips",
    element: <MyTrips/>
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header></Header>
    <Toaster />
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
