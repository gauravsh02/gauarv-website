import { useState, useEffect } from 'react'
import './App.css'

import toast, { Toaster } from 'react-hot-toast';

function App() {

  interface contactDataInterface {
    name: string, email: string, message: string
  }
  
  const contactInitData: contactDataInterface = {
    name: "",
    email: "",
    message: ""
  }

  const [theme, setTheme] = useState("light");
  const [contactData, setContactData] = useState(contactInitData);
  const [ssResourceLoading, setIsResourceLoading] = useState(false);

  useEffect( () => {
    if ( localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      localStorage.setItem('color-theme', 'dark');
      document.body.style.backgroundImage = "url('/assets/images/bg-dark.jpg')";
    } else {
      setTheme('light');
      localStorage.setItem('color-theme', 'light');
      document.body.style.backgroundImage = "url('/assets/images/bg-light.jpg')";
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme == "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem('color-theme', newTheme);

    document.body.style.backgroundImage = theme == "light" ? "url('/assets/images/bg-dark.jpg')" : "url('/assets/images/bg-light.jpg')";
  }

  const setContactInputData = function(value:any, inputType:string) {
    if( inputType === "name" || inputType === "email" || inputType === "message") {
      setContactData({...contactData, [inputType]: value});
    }
  }

  const submitContactform = async (e: any) => {
    e.preventDefault()

    if(ssResourceLoading) {
      return false;
    }

    setIsResourceLoading(true);
    const toastId = toast.loading('Saving...');

    const fetchData = await fetch("https://formkeep.com/f/0ac132b4b574", { 
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          name: contactData.name,
          email: contactData.email,
          message: contactData.message
       })
    });

    if (fetchData.status !== 200) {
      toast.error('Please try again.', { id: toastId });        
        setIsResourceLoading(false);
        return false;
    } else {
        toast.success('Thanks, i\'ll get back to you.', { id: toastId });
        setIsResourceLoading(false);
        setContactData(contactInitData);
        return true;
    }

  }

  return (
    <>

      <div className={theme}>
        <Toaster />
        <nav className='nav-bar-blur'>
          <a href="#home" className="active">
              <svg className="text-black dark:text-white" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
              </svg>
          </a>
          {/* <a href="#about" className="">
              <svg className="text-black dark:text-white" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
              </svg>
          </a> */}
          <a href="#experience" className="">
              <svg className="text-black dark:text-white" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z"></path>
                <path d="M8 6h9v2H8z"></path>
              </svg>
          </a>
          <a href="#portfolio" className="">
              <svg className="text-black dark:text-white" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M3.161 4.469a6.5 6.5 0 0 1 8.84-.328 6.5 6.5 0 0 1 9.178 9.154l-7.765 7.79a2 2 0 0 1-2.719.102l-.11-.101-7.764-7.791a6.5 6.5 0 0 1 .34-8.826zm1.414 1.414a4.5 4.5 0 0 0-.146 6.21l.146.154L12 19.672l5.303-5.304-3.535-3.535-1.06 1.06a3 3 0 1 1-4.244-4.242l2.102-2.103a4.501 4.501 0 0 0-5.837.189l-.154.146zm8.486 2.828a1 1 0 0 1 1.414 0l4.242 4.242.708-.706a4.5 4.5 0 0 0-6.211-6.51l-.153.146-3.182 3.182a1 1 0 0 0-.078 1.327l.078.087a1 1 0 0 0 1.327.078l.087-.078 1.768-1.768z"></path>
                </g>
              </svg>
          </a>
          <a href="#contact" className="">
              <svg className="text-black dark:text-white" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z"></path>
                <path d="M7 9h10v2H7zm0 4h7v2H7z"></path>
              </svg>
          </a>

          <a className="" onClick={toggleTheme}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="text-black dark:text-white dark-mode-light dark:hidden" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="text-black dark:text-white dark-mode-dark hidden fill-jacarta-700 group-hover:fill-white group-focus:fill-white dark:block dark:fill-white " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle fill="none" cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
          </a>

        </nav>

        <div className='left hidden xl:block'>
            <ul className=''>
              <li className='left_SidebarItems'>
                <a href='https://cmd.gauravshankar.com' className='text-[#232323] hover:text-black dark:text-[#c7c7c7] dark:hover:text-white' target='_blank' rel='noreferrer'>
                  <svg stroke="currentColor" fill="currentColor" className="sidebar_icon" strokeWidth="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.25 12a.75.75 0 01-.22.53l-2.75 2.75a.75.75 0 01-1.06-1.06L7.44 12 5.22 9.78a.75.75 0 111.06-1.06l2.75 2.75c.141.14.22.331.22.53zm2 2a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5z"/><path fillRule="evenodd" d="M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25H1.75z"/>
                  </svg>
                </a>
              </li>
              <li className='left_SidebarItems'>
                <a href='https://github.com/gauravsh02' className='text-[#232323] hover:text-black dark:text-[#c7c7c7] dark:hover:text-white' target='_blank' rel='noreferrer'>
                  <svg stroke="currentColor" fill="currentColor" className="sidebar_icon" strokeWidth="0.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.713 18.042c-1.268 0.38-2.060 0.335-2.583 0.17-0.231-0.073-0.431-0.176-0.614-0.302-0.411-0.284-0.727-0.675-1.119-1.172-0.356-0.451-0.85-1.107-1.551-1.476-0.185-0.098-0.386-0.177-0.604-0.232-0.536-0.134-1.079 0.192-1.213 0.728s0.192 1.079 0.728 1.213c0.074 0.023 0.155 0.060 0.155 0.060 0.252 0.133 0.487 0.404 0.914 0.946 0.366 0.464 0.856 1.098 1.553 1.579 0.332 0.229 0.711 0.426 1.149 0.564 1.015 0.321 2.236 0.296 3.76-0.162 0.529-0.159 0.829-0.716 0.67-1.245s-0.716-0.829-1.245-0.67zM17 22v-3.792c0.052-0.684-0.056-1.343-0.292-1.942 0.777-0.171 1.563-0.427 2.297-0.823 2.083-1.124 3.496-3.242 3.496-6.923 0-1.503-0.516-2.887-1.379-3.981 0.355-1.345 0.226-2.726-0.293-3.933-0.122-0.283-0.359-0.482-0.634-0.564-0.357-0.106-1.732-0.309-4.373 1.362-2.273-0.541-4.557-0.509-6.646-0.002-2.639-1.669-4.013-1.466-4.37-1.36-0.296 0.088-0.521 0.3-0.635 0.565-0.554 1.292-0.624 2.672-0.292 3.932-0.93 1.178-1.387 2.601-1.379 4.017 0 3.622 1.389 5.723 3.441 6.859 0.752 0.416 1.56 0.685 2.357 0.867-0.185 0.468-0.286 0.961-0.304 1.456-0.005 0.141-0.003 0.283 0.005 0.424l0.001 3.838c0 0.552 0.448 1 1 1s1-0.448 1-1v-3.87c0-0.021-0.001-0.045-0.002-0.069-0.006-0.084-0.007-0.168-0.004-0.252 0.020-0.568 0.241-1.126 0.665-1.564 0.145-0.149 0.246-0.347 0.274-0.572 0.068-0.548-0.321-1.048-0.869-1.116-0.34-0.042-0.677-0.094-1.006-0.159-0.79-0.156-1.518-0.385-2.147-0.733-1.305-0.723-2.391-2.071-2.41-5.042 0.013-1.241 0.419-2.319 1.224-3.165 0.257-0.273 0.35-0.671 0.212-1.040-0.28-0.748-0.341-1.58-0.14-2.392 0.491 0.107 1.354 0.416 2.647 1.282 0.235 0.157 0.533 0.214 0.825 0.133 1.997-0.557 4.242-0.602 6.47 0.002 0.271 0.073 0.569 0.033 0.818-0.135 1.293-0.866 2.156-1.175 2.647-1.282 0.189 0.766 0.157 1.595-0.141 2.392-0.129 0.352-0.058 0.755 0.213 1.040 0.758 0.795 1.224 1.872 1.224 3.060 0 3.075-1.114 4.445-2.445 5.163-0.623 0.336-1.343 0.555-2.123 0.7-0.322 0.060-0.651 0.106-0.983 0.143-0.21 0.023-0.418 0.114-0.584 0.275-0.397 0.384-0.408 1.017-0.024 1.414 0.067 0.070 0.13 0.143 0.188 0.22 0.34 0.449 0.521 1.015 0.474 1.617 0 0.024-0.001 0.051-0.003 0.078v3.872c0 0.552 0.448 1 1 1s1-0.448 1-1z"></path>
                  </svg>
                </a>
              </li>
              <li className='left_SidebarItems'>
                <a href='https://www.linkedin.com/in/gaurav-shankar-087a68145' className='text-[#232323] hover:text-black dark:text-[#c7c7c7] dark:hover:text-white' target='_blank' rel='noreferrer'>
                  <svg stroke="currentColor" fill="currentColor" className="sidebar_icon" strokeWidth="0.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7c-1.933 0-3.684 0.785-4.95 2.050s-2.050 3.017-2.050 4.95v7c0 0.552 0.448 1 1 1h4c0.552 0 1-0.448 1-1v-7c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293 0.525 0.111 0.707 0.293 0.293 0.431 0.293 0.707v7c0 0.552 0.448 1 1 1h4c0.552 0 1-0.448 1-1v-7c0-1.933-0.785-3.684-2.050-4.95s-3.017-2.050-4.95-2.050zM16 9c1.381 0 2.63 0.559 3.536 1.464s1.464 2.155 1.464 3.536v6h-2v-6c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879-1.58 0.337-2.121 0.879-0.879 1.293-0.879 2.121v6h-2v-6c0-1.381 0.559-2.63 1.464-3.536s2.155-1.464 3.536-1.464zM2 8c-0.552 0-1 0.448-1 1v12c0 0.552 0.448 1 1 1h4c0.552 0 1-0.448 1-1v-12c0-0.552-0.448-1-1-1zM3 10h2v10h-2zM7 4c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879-1.58 0.337-2.121 0.879-0.879 1.293-0.879 2.121 0.337 1.58 0.879 2.121 1.293 0.879 2.121 0.879 1.58-0.337 2.121-0.879 0.879-1.293 0.879-2.121zM5 4c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293-0.525-0.111-0.707-0.293-0.293-0.431-0.293-0.707 0.111-0.525 0.293-0.707 0.431-0.293 0.707-0.293 0.525 0.111 0.707 0.293 0.293 0.431 0.293 0.707z"></path>
                  </svg>
                </a>
              </li>
            </ul>
            <div className='sidebar_line bg-black dark:bg-white' />
        </div>

        <section className="bg-homeBg min-h-screen bg-no-repeat bg-center bg-cover bg-fixed dark:bg-homeTwoBg-dark md:pb-16 w-full">
          <div className="container w-full bg-[#F3F6F6] dark:bg-black lg:bg-transparent lg:dark:bg-transparent flex justify-between py-5 lg:px-0">
            <div className="w-full flex justify-between px-4">
              <a href="/">
                <h1 className="text-black dark:text-white text-3xl">gauravshankar.com</h1>
              </a>
            </div>

          </div>
          <div className="container grid grid-cols-12 md:gap-10 justify-between mt-35">
            <div className="col-span-12 lg:col-span-4 lg:h-screen lg:sticky top-20">
              <div className="w-full mb-6 lg:mb-0 mx-auto relative bg-white text-center dark:bg-[#2c2c2c] px-6 rounded-[20px] mt-35 ">
                <div className="pt-[100px] pb-8">
                  <h1 className="mt-6 mb-1 text-5xl font-semibold text-black dark:text-white">Gaurav Shankar</h1>
                  <h3 className="my-4 text-[#7B7B7B] inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg dark:text-[#A6A6A6] ">Software Engineer</h3>
                  <div className="flex justify-center space-x-3">

                    {/* <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                      <span className="socialbtn text-[#1773EA]">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                        </svg>
                      </span>
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                      <span className="socialbtn text-[#1C9CEA]">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                        </svg>
                      </span>
                    </a>
                    <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">
                      <span className="socialbtn text-[#e14a84]">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z"></path>
                        </svg>
                      </span>
                    </a> */}

                    <a href='https://github.com/gauravsh02' target='_blank' rel='noopener noreferrer'>
                      <span className="socialbtn text-[#2e2e2e]">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="1" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.713 18.042c-1.268 0.38-2.060 0.335-2.583 0.17-0.231-0.073-0.431-0.176-0.614-0.302-0.411-0.284-0.727-0.675-1.119-1.172-0.356-0.451-0.85-1.107-1.551-1.476-0.185-0.098-0.386-0.177-0.604-0.232-0.536-0.134-1.079 0.192-1.213 0.728s0.192 1.079 0.728 1.213c0.074 0.023 0.155 0.060 0.155 0.060 0.252 0.133 0.487 0.404 0.914 0.946 0.366 0.464 0.856 1.098 1.553 1.579 0.332 0.229 0.711 0.426 1.149 0.564 1.015 0.321 2.236 0.296 3.76-0.162 0.529-0.159 0.829-0.716 0.67-1.245s-0.716-0.829-1.245-0.67zM17 22v-3.792c0.052-0.684-0.056-1.343-0.292-1.942 0.777-0.171 1.563-0.427 2.297-0.823 2.083-1.124 3.496-3.242 3.496-6.923 0-1.503-0.516-2.887-1.379-3.981 0.355-1.345 0.226-2.726-0.293-3.933-0.122-0.283-0.359-0.482-0.634-0.564-0.357-0.106-1.732-0.309-4.373 1.362-2.273-0.541-4.557-0.509-6.646-0.002-2.639-1.669-4.013-1.466-4.37-1.36-0.296 0.088-0.521 0.3-0.635 0.565-0.554 1.292-0.624 2.672-0.292 3.932-0.93 1.178-1.387 2.601-1.379 4.017 0 3.622 1.389 5.723 3.441 6.859 0.752 0.416 1.56 0.685 2.357 0.867-0.185 0.468-0.286 0.961-0.304 1.456-0.005 0.141-0.003 0.283 0.005 0.424l0.001 3.838c0 0.552 0.448 1 1 1s1-0.448 1-1v-3.87c0-0.021-0.001-0.045-0.002-0.069-0.006-0.084-0.007-0.168-0.004-0.252 0.020-0.568 0.241-1.126 0.665-1.564 0.145-0.149 0.246-0.347 0.274-0.572 0.068-0.548-0.321-1.048-0.869-1.116-0.34-0.042-0.677-0.094-1.006-0.159-0.79-0.156-1.518-0.385-2.147-0.733-1.305-0.723-2.391-2.071-2.41-5.042 0.013-1.241 0.419-2.319 1.224-3.165 0.257-0.273 0.35-0.671 0.212-1.040-0.28-0.748-0.341-1.58-0.14-2.392 0.491 0.107 1.354 0.416 2.647 1.282 0.235 0.157 0.533 0.214 0.825 0.133 1.997-0.557 4.242-0.602 6.47 0.002 0.271 0.073 0.569 0.033 0.818-0.135 1.293-0.866 2.156-1.175 2.647-1.282 0.189 0.766 0.157 1.595-0.141 2.392-0.129 0.352-0.058 0.755 0.213 1.040 0.758 0.795 1.224 1.872 1.224 3.060 0 3.075-1.114 4.445-2.445 5.163-0.623 0.336-1.343 0.555-2.123 0.7-0.322 0.060-0.651 0.106-0.983 0.143-0.21 0.023-0.418 0.114-0.584 0.275-0.397 0.384-0.408 1.017-0.024 1.414 0.067 0.070 0.13 0.143 0.188 0.22 0.34 0.449 0.521 1.015 0.474 1.617 0 0.024-0.001 0.051-0.003 0.078v3.872c0 0.552 0.448 1 1 1s1-0.448 1-1z"></path>
                        </svg>
                      </span>
                    </a>
                    <a href="https://www.linkedin.com/in/gaurav-shankar-087a68145" target="_blank" rel="noopener noreferrer">
                      <span className="socialbtn text-[#0072b1]">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                        </svg>
                      </span>
                    </a>

                  </div>
                  <div className="p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]">
                    <div className="flex py-2.5 border-b border-[#E3E3E3] dark:border-[#3D3A3A]">
                      <span className="flex-shrink-0 socialbtn bg-white dark:bg-black text-[#E93B81] shadow-md">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"></path>
                        </svg>
                      </span>
                      <div className="text-left ml-2.5">
                        <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">Phone</p>
                        <p className="text-black dark:text-white break-all">
                          <a className="hover:text-[#0071ff] duration-300 transition" href="tel:+917008571193">+91 700 857 1193</a>
                        </p>
                      </div>
                    </div>
                    <div className="flex py-2.5 border-b border-[#E3E3E3] dark:border-[#3D3A3A]">
                      <span className="flex-shrink-0 socialbtn bg-white dark:bg-black text-[#6AB5B9]  shadow-md">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
                        </svg>
                      </span>
                      <div className="text-left ml-2.5">
                        <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">Location</p>
                        <p className="text-black dark:text-white break-all">Bengaluru, India</p>
                      </div>
                    </div>
                    <div className="flex py-2.5 border-b border-[#E3E3E3] dark:border-[#3D3A3A]">
                      <span className="flex-shrink-0 socialbtn bg-white dark:bg-black text-[#FD7590] shadow-md">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M176 216h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16zm-16 80c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16zm96 121.13c-16.42 0-32.84-5.06-46.86-15.19L0 250.86V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V250.86L302.86 401.94c-14.02 10.12-30.44 15.19-46.86 15.19zm237.61-254.18c-8.85-6.94-17.24-13.47-29.61-22.81V96c0-26.51-21.49-48-48-48h-77.55c-3.04-2.2-5.87-4.26-9.04-6.56C312.6 29.17 279.2-.35 256 0c-23.2-.35-56.59 29.17-73.41 41.44-3.17 2.3-6 4.36-9.04 6.56H96c-26.51 0-48 21.49-48 48v44.14c-12.37 9.33-20.76 15.87-29.61 22.81A47.995 47.995 0 0 0 0 200.72v10.65l96 69.35V96h320v184.72l96-69.35v-10.65c0-14.74-6.78-28.67-18.39-37.77z"></path>
                        </svg>
                      </span>
                      <div className="text-left ml-2.5">
                        <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">Email</p>
                        <p className="text-black dark:text-white break-all">
                          <a className="hover:text-[#0071ff] duration-300 transition" href="mailto:gauravshankar.bk@gmail.com">gauravshankar.bk@gmail.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                    {/* <a href="/images/cv.pdf" download="" className="inline-flex items-center mx-auto bg-[#1e90ff] duration-200 transition ease-linear hover:bg-[#1e90ff] px-8 py-3 text-lg text-white rounded-[35px] mt-6">
                      <svg className='mx-2' style={{"fill": "none", "stroke": "#fff", "strokeLinecap": "round", "strokeLinejoin": "round", "strokeWidth":"2"}} fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" id="download" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path id="primary" d="M5.65,10.56,7,9a1,1,0,0,1,1.41-.11L10,10.34V3h4v7.34l1.64-1.41A1,1,0,0,1,17.05,9l1.3,1.52A1,1,0,0,1,18.24,12l-5.59,4.79a1,1,0,0,1-1.3,0L5.76,12A1,1,0,0,1,5.65,10.56ZM20,17v3a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V17"></path>
                        </g>
                      </svg>
                      Download CV
                    </a> */}
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8 ">

              <div className="lg:rounded-2xl bg-white dark:bg-[#2c2c2c]">
                <div className="text-black dark:text-white">

                  <section id="home" className="pt-20 md:py-12 md:pt-16 pb-2 sm:px-5 md:px-10 lg:px-14">
                    <h2 className="after-effect after:left-52 font-semibold text-3xl">About Me</h2>
                    <div className="lg:grid grid-cols-12 md:gap-10 pt-4 md:pt-[30px] items-center ">
                      <div className="col-span-12 space-y-2.5">
                        <div className="lg:mr-16">
                          <p className="text-gray-lite dark:text-color-910 leading-7">Hi, I am Gaurav Shankar from Bengaluru, India, working in Web & Cloud development with 5+ years of experience. I'm passionate about tackling complex problems and building reliable and scalable software that solve problems and improve lives. </p>
                          <p className="text-gray-lite leading-7 mt-2.5 dark:text-color-910">I have experience of the full software development cycle and I am highly adept in leading engineer teams to achieve software development upgrades & new features, increase business efficiency while delivering world-class solutions.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="experience" className="pt-16 pb-12 px-2 sm:px-5 md:px-10 lg:px-14 ">
                    <h3 className="after-effect after:left-52 font-semibold text-3xl">What I do!</h3>
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 pt-4 md:pt-[30px]">
                      <div className="about-box dark:bg-transparent">
                        <div className="space-y-2 break-all">
                          <h3 className="flex dark:text-white text-xl font-semibold">
                            <svg className="mx-2" height={24} width={24} stroke="currentColor" fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M474.553,296.69v-42.506c0-4.512-3.657-8.17-8.17-8.17H264.17v-33.588h108.936c4.513,0,8.17-3.658,8.17-8.17v-43.574 c0-4.512-3.657-8.17-8.17-8.17h-2.723v-16.34h2.723c4.513,0,8.17-3.658,8.17-8.17V84.426c0-4.512-3.657-8.17-8.17-8.17h-2.723 v-16.34h2.723c4.513,0,8.17-3.658,8.17-8.17V8.17c0-4.512-3.657-8.17-8.17-8.17H138.894c-4.512,0-8.17,3.658-8.17,8.17v43.574 c0,4.512,3.658,8.17,8.17,8.17h2.723v16.34h-2.723c-4.512,0-8.17,3.658-8.17,8.17V128c0,4.512,3.658,8.17,8.17,8.17h2.723v16.34 h-2.723c-4.512,0-8.17,3.658-8.17,8.17v43.574c0,4.512,3.658,8.17,8.17,8.17H247.83v33.588H45.617c-4.512,0-8.17,3.658-8.17,8.17 v42.506C16.181,300.554,0,319.197,0,341.561c0,25.153,20.464,45.617,45.617,45.617c25.153,0,45.617-20.464,45.617-45.617 c0-22.364-16.181-41.007-37.447-44.87v-34.336h123.915v34.336c-21.265,3.863-37.447,22.506-37.447,44.87 c0,25.153,20.464,45.617,45.617,45.617c25.153,0,45.617-20.464,45.617-45.617c0-22.364-16.181-41.007-37.447-44.87v-34.336 h123.915v34.336c-21.265,3.863-37.447,22.506-37.447,44.87c0,25.153,20.464,45.617,45.617,45.617 c25.153,0,45.617-20.464,45.617-45.617c0-22.364-16.181-41.007-37.447-44.87v-34.336h123.915v34.336 c-21.265,3.863-37.447,22.506-37.447,44.87c0,25.153,20.464,45.617,45.617,45.617c25.153,0,45.617-20.465,45.617-45.617 C512,319.197,495.819,300.554,474.553,296.69z M74.894,341.561c0,16.143-13.133,29.277-29.277,29.277 c-16.143,0-29.277-13.134-29.277-29.277s13.133-29.277,29.277-29.277C61.76,312.284,74.894,325.417,74.894,341.561z M215.149,341.561c0,16.143-13.133,29.277-29.277,29.277s-29.277-13.133-29.277-29.277s13.133-29.277,29.277-29.277 S215.149,325.417,215.149,341.561z M147.064,16.34h217.872v27.234H147.064V16.34z M354.043,59.915v16.34H157.957v-16.34H354.043z M147.064,92.596h217.872v27.234h-35.404c-4.513,0-8.17,3.658-8.17,8.17s3.657,8.17,8.17,8.17h24.511v16.34H157.957v-16.34 h138.894c4.513,0,8.17-3.658,8.17-8.17s-3.657-8.17-8.17-8.17H147.064V92.596z M147.064,196.085v-27.234h217.872v27.234H147.064z M355.404,341.561c0,16.143-13.133,29.277-29.277,29.277s-29.277-13.134-29.277-29.277s13.133-29.277,29.277-29.277 S355.404,325.417,355.404,341.561z M466.383,370.837c-16.143,0-29.277-13.133-29.277-29.277s13.133-29.277,29.277-29.277 s29.277,13.133,29.277,29.277S482.526,370.837,466.383,370.837z"></path> </g> </g> <g> <g> <path d="M153.192,420.766h-29.277V286.865c0-4.512-3.658-8.17-8.17-8.17s-8.17,3.658-8.17,8.17v133.901H78.298 c-4.512,0-8.17,3.658-8.17,8.17v74.894c0,4.512,3.658,8.17,8.17,8.17h74.894c4.512,0,8.17-3.658,8.17-8.17v-74.894 C161.362,424.424,157.704,420.766,153.192,420.766z M145.021,495.66H86.468v-58.553h58.553V495.66z"></path> </g> </g> <g> <g> <path d="M293.447,420.766H264.17V286.865c0-4.512-3.657-8.17-8.17-8.17c-4.512,0-8.17,3.658-8.17,8.17v133.901h-29.277 c-4.512,0-8.17,3.658-8.17,8.17v74.894c0,4.512,3.658,8.17,8.17,8.17h74.894c4.513,0,8.17-3.658,8.17-8.17v-74.894 C301.617,424.424,297.96,420.766,293.447,420.766z M285.277,495.66h-58.553v-58.553h58.553V495.66z"></path> </g> </g> <g> <g> <path d="M433.702,420.766h-29.277V286.865c0-4.512-3.657-8.17-8.17-8.17s-8.17,3.658-8.17,8.17v133.901h-29.277 c-4.513,0-8.17,3.658-8.17,8.17v74.894c0,4.512,3.657,8.17,8.17,8.17h74.894c4.513,0,8.17-3.658,8.17-8.17v-74.894 C441.872,424.424,438.215,420.766,433.702,420.766z M425.532,495.66h-58.553v-58.553h58.553V495.66z"></path> </g> </g> </g></svg>
                            Design and Architecture
                          </h3>
                          <p className="leading-8 text-gray-lite dark:text-[#A6A6A6] break-normal">
                            Be involved in architectural discussions and decisions, ensuring that systems are robust, scalable, maintainable, and meet performance requirements.
                          </p>
                        </div>
                      </div>
                      <div className="about-box dark:bg-transparent">
                        <div className="space-y-2">
                          <h3 className="flex dark:text-white text-xl font-semibold">
                            <svg className="mx-2" height={24} width={24} stroke="currentColor" fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 70 70" enableBackground="new 0 0 70 70" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M62.817,2.583H6.026c-2.209,0-3.443,2.06-3.443,4.269v57c0,2.209,1.234,2.731,3.443,2.731h57 c2.209,0,3.557-0.522,3.557-2.731v-58C66.583,3.643,65.026,2.583,62.817,2.583z M62.583,6.583v9h-56v-9H62.583z M6.583,62.583v-45 h56v45H6.583z"></path> <path d="M10.417,12.583h2c0.553,0,1-0.447,1-1s-0.447-1-1-1h-2c-0.553,0-1,0.447-1,1S9.864,12.583,10.417,12.583z"></path> <path d="M16.417,12.583h2c0.553,0,1-0.447,1-1s-0.447-1-1-1h-2c-0.553,0-1,0.447-1,1S15.864,12.583,16.417,12.583z"></path> <path d="M22.417,12.583h2c0.553,0,1-0.447,1-1s-0.447-1-1-1h-2c-0.553,0-1,0.447-1,1S21.864,12.583,22.417,12.583z"></path> <path d="M26.109,33.077c-0.429-0.35-1.058-0.285-1.406,0.143l-5.944,7.283c-0.293,0.357-0.302,0.87-0.021,1.238l5.944,7.801 c0.196,0.258,0.494,0.394,0.796,0.394c0.211,0,0.424-0.066,0.605-0.205c0.438-0.334,0.523-0.962,0.188-1.401l-5.466-7.173 l5.445-6.673C26.602,34.056,26.538,33.426,26.109,33.077z"></path> <path d="M44.328,33.245c-0.333-0.438-0.96-0.525-1.401-0.188c-0.439,0.334-0.523,0.962-0.188,1.401l5.466,7.172l-5.445,6.674 c-0.35,0.428-0.286,1.058,0.143,1.406c0.186,0.152,0.409,0.226,0.631,0.226c0.29,0,0.578-0.126,0.775-0.368l5.944-7.284 c0.293-0.358,0.302-0.87,0.021-1.238L44.328,33.245z"></path> <path d="M31.241,31.734c-0.205-0.514-0.786-0.762-1.299-0.561c-0.514,0.204-0.764,0.786-0.561,1.299l7.916,19.918 c0.156,0.393,0.532,0.631,0.93,0.631c0.123,0,0.248-0.022,0.369-0.07c0.514-0.204,0.764-0.786,0.561-1.299L31.241,31.734z"></path> </g> </g></svg>
                            Coding and Development
                          </h3>
                          <p className="leading-8 text-gray-lite dark:text-[#A6A6A6] break-normal">
                            Write clean, efficient, and maintainable code. Focus on best practices, code reviews, adherence to coding standards and refactor and improve existing code when necessary.
                          </p>
                        </div>
                      </div>
                      <div className="about-box dark:bg-transparent">
                        <div className="space-y-2 break-all">
                          <h3 className="flex dark:text-white text-xl font-semibold">
                            <svg className="mx-2" height={24} width={24} stroke="currentColor" fill="currentColor" version="1.1" id="PUZZLE" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1800 1800" enableBackground="new 0 0 1800 1800" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1794.799,86.801c0-45.832-38.102-83.119-84.936-83.119H901.35h-3.8H93.755 c-45.832,0-83.119,38.102-83.119,84.94v812.311c0,1.243,0.092,2.47,0.231,3.678c-0.14,1.208-0.231,2.424-0.231,3.677v807.594 c0,45.832,38.101,83.119,84.936,83.119h808.513h3.8h803.795c45.831,0,83.119-38.102,83.119-84.94V901.747 c0-1.243-0.093-2.469-0.232-3.677c0.14-1.208,0.232-2.428,0.232-3.675V86.801z M1732.043,86.801v776.217h-243.219 c33.027-37.121,52.45-85.802,52.45-137.973c0-41.45-12.262-80.067-33.282-112.504c-36.425-59.971-102.365-100.121-177.514-100.121 c-114.426,0-207.517,93.091-207.517,207.517c0.005,41.893,12.554,81.503,34.587,114.715c6.236,10.024,13.272,19.537,21.129,28.366 H932.727V524.099c0-10.37-5.047-19.532-12.799-25.249c-5.691-5.796-13.609-9.398-22.378-9.398h-9.739 c-13.483,0-25.455,8.61-29.745,21.393c-19.808,59.008-74.951,98.65-137.22,98.65c-23.59,0-45.862-5.708-65.561-15.764 c-43.652-24.956-73.156-71.948-73.156-125.733c0-79.827,64.939-144.771,144.763-144.771c22.955,0,44.921,5.427,64.527,15.189 c30.695,17.146,54.906,45.228,66.646,80.208c2.933,8.746,9.508,15.457,17.659,18.871c5.182,3.673,11.468,5.787,18.131,5.787h7.494 c17.33,0,31.377-14.042,31.377-31.377V66.437h777.137C1722.093,66.437,1732.043,75.573,1732.043,86.801z M73.392,88.622 c0-12.23,9.136-22.185,20.364-22.185h772.417v247.737c-13.447-12.178-28.418-22.575-44.58-30.861 c-30.126-16.726-64.584-26.107-100.747-26.107c-114.426,0-207.517,93.095-207.517,207.525c0,80.024,45.557,149.56,112.072,184.172 c30.029,16.915,64.641,26.61,101.491,26.61c52.805,0,101.994-19.926,139.281-53.694v247.732h-338.39 c-17.33,0-31.377,14.048-31.377,31.38v9.735c0,7.117,2.447,13.771,6.588,19.139c3.633,7.257,10.016,13.019,18.07,15.715 c31.597,10.61,57.555,31.412,74.938,57.948c13.067,21.914,20.447,47.364,20.447,74.163c0,79.827-64.939,144.762-144.762,144.762 c-50.271,0-94.618-25.766-120.581-64.769c-13.273-21.861-20.92-47.495-20.92-74.881c-0.004-62.264,39.646-117.412,98.659-137.224 c12.782-4.29,21.392-16.258,21.392-29.74v-7.494c0-5.953-1.685-11.489-4.557-16.229c-3.83-13.005-15.842-22.505-30.086-22.505 H73.392V88.622z M73.392,1715.881V939.665h243.219c-33.028,37.12-52.45,85.797-52.45,137.968c0,41.454,12.266,80.072,33.286,112.51 c36.42,59.97,102.362,100.119,177.51,100.119c114.426,0,207.517-93.09,207.517-207.517c-0.005-41.892-12.56-81.508-34.587-114.724 c-6.238-10.024-13.272-19.532-21.125-28.356h245.946v338.919c0,10.374,5.051,19.54,12.804,25.248 c5.69,5.796,13.609,9.395,22.373,9.395h9.74c13.482,0,25.455-8.606,29.744-21.388c19.809-59.008,74.951-98.65,137.22-98.65 c23.577,0,45.836,5.699,65.53,15.741c43.67,24.951,73.187,71.956,73.187,125.756c0,79.817-64.938,144.762-144.762,144.762 c-22.96,0-44.931-5.42-64.536-15.19c-30.69-17.142-54.894-45.228-66.639-80.203c-2.938-8.746-9.512-15.461-17.671-18.876 c-5.18-3.668-11.461-5.778-18.118-5.778h-7.495c-17.33,0-31.377,14.044-31.377,31.378v345.468H95.572 C83.341,1736.245,73.392,1727.104,73.392,1715.881z M1732.043,1714.06c0,12.231-9.135,22.186-20.363,22.186H939.263v-247.737 c13.443,12.17,28.414,22.57,44.571,30.852c30.125,16.731,64.589,26.117,100.755,26.117c114.427,0,207.518-93.1,207.518-207.526 c0-80.037-45.569-149.586-112.098-184.185c-30.024-16.906-64.624-26.598-101.465-26.598c-52.805,0-101.999,19.926-139.281,53.693 V933.124h338.39c17.33,0,31.377-14.043,31.377-31.377v-9.738c0-7.113-2.447-13.767-6.593-19.133 c-3.628-7.258-10.015-13.019-18.065-15.72c-31.597-10.607-57.559-31.408-74.938-57.949c-13.066-21.909-20.446-47.364-20.446-74.163 c0-79.823,64.938-144.762,144.762-144.762c50.266,0,94.618,25.761,120.581,64.764c13.268,21.861,20.919,47.5,20.919,74.889 c0.005,62.265-39.646,117.408-98.658,137.22c-12.782,4.29-21.393,16.262-21.393,29.745v7.494c0,5.952,1.686,11.484,4.557,16.23 c3.83,13,15.838,22.499,30.087,22.499h342.201V1714.06z"></path> </g></svg>
                            Problem Solving
                          </h3>
                          <p className="leading-8 text-gray-lite dark:text-[#A6A6A6] break-normal">
                            Be the go-to person for troubleshooting and debugging complex issues.
                            Identify and solve performance bottlenecks and other technical challenges.
                          </p>
                        </div>
                      </div>
                      <div className="about-box dark:bg-transparent">
                        <div className="space-y-2 break-all">
                          <h3 className="flex dark:text-white text-xl font-semibold">
                          <svg className="mx-2" height={24} width={24} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M8 1v13h3V1zm2 12H9V2h1zm4-1h-1V5h3v6.023a.99.99 0 0 0-.781.62l-.137.357H15V6h-1zM6 9H3v5h3zm-1 4H4v-3h1zm6 2v1H1V1h1v14zm6 1a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm4.105-3.137l.705-1.538-1.166-1.167-1.624.724-.628-.296-.59-1.586h-1.65l-.636 1.66-.653.235-1.543-.71-1.166 1.168.727 1.627-.295.628-1.586.59v1.65l1.66.636.235.653-.71 1.543 1.168 1.166 1.627-.727.628.295.59 1.586h1.65l.636-1.66.653-.235 1.543.71 1.162-1.171-.724-1.624.296-.628 1.586-.59v-1.65l-1.66-.636zM22 18.266l-1.32.49-.543 1.16.623 1.398-.41.413-1.28-.588-1.207.434L17.315 23h-.581l-.491-1.32-1.16-.544-1.4.627-.412-.411.59-1.283-.434-1.206L12 18.315v-.581l1.32-.491.544-1.16-.627-1.4.411-.412 1.283.59 1.206-.434.548-1.427h.581l.491 1.32 1.158.543 1.397-.622.412.412-.585 1.28.434 1.204 1.427.548z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                            Project Management
                          </h3>
                          <p className="leading-8 text-gray-lite dark:text-[#A6A6A6] break-normal">
                            Collaborate with product managers to define project scope and requirements.
                            Estimate and plan development tasks, and track progress to ensure on-time delivery.
                          </p>
                        </div>
                      </div>
                      <div className="about-box dark:bg-transparent">
                        <div className="space-y-2 break-all">
                          <h3 className="flex dark:text-white text-xl font-semibold">
                            <svg className="mx-2" height={24} width={24} stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="ic-actions-go-out"> <path d="M19.58,4.16,4.13,10a.21.21,0,0,0,0,.38l6.61,2.83a.2.2,0,0,1,.11.11l2.83,6.61a.21.21,0,0,0,.38,0L19.84,4.42A.2.2,0,0,0,19.58,4.16Z"></path> <line x1="19.79" y1="4.21" x2="10.81" y2="13.19"></line> </g> </g></svg>
                            Leadership and Mentoring
                          </h3>
                          <p className=" leading-8 text-gray-lite dark:text-[#A6A6A6] break-normal">
                            Have taken responsibility and leadership roles within organization to help interns / junior engineers onboaring and mentor to help them advance in their careers.
                          </p>
                        </div>
                      </div>
                      <div className="about-box dark:bg-transparent">
                        <div className="space-y-2 break-all">
                          <h3 className="flex dark:text-white text-xl font-semibold">
                            <svg className="mx-2" height={24} width={24} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.902 13.161a7.876 7.876 0 0 0-3.956-8.1c0-.021.006-.04.006-.061a3.952 3.952 0 0 0-7.904 0c0 .02.006.04.006.06a7.876 7.876 0 0 0-3.956 8.101 3.946 3.946 0 1 0 4.242 5.93 7.855 7.855 0 0 0 7.32 0 3.945 3.945 0 1 0 4.242-5.93zM12 2.051A2.948 2.948 0 1 1 9.052 5 2.951 2.951 0 0 1 12 2.052zM5 19.949A2.948 2.948 0 1 1 7.948 17 2.951 2.951 0 0 1 5 19.948zm3.75-1.76A3.896 3.896 0 0 0 8.952 17a3.952 3.952 0 0 0-3.868-3.944A7.1 7.1 0 0 1 4.996 12a6.977 6.977 0 0 1 3.232-5.885 3.926 3.926 0 0 0 7.544 0A6.977 6.977 0 0 1 19.004 12a7.1 7.1 0 0 1-.088 1.056A3.952 3.952 0 0 0 15.048 17a3.896 3.896 0 0 0 .202 1.188 7.13 7.13 0 0 1-6.5 0zM19 19.948A2.948 2.948 0 1 1 21.948 17 2.951 2.951 0 0 1 19 19.948z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                            Team Collaboration
                          </h3>
                          <p className=" leading-8 text-gray-lite dark:text-[#A6A6A6] break-normal">
                            Foster a positive and inclusive team culture, where knowledge sharing and innovation are encouraged and effectively communicate & collaboration accross technical and non-technical teams.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="portfolio" className="pt-20 md:pt-16  px-2 sm:px-5 md:px-10 lg:px-14 mb-10">
                    <h3 className="text-[35px] dark:text-white font-medium pb-5">Portfolio</h3>
                    <div className="bg-[#F8FBFB] dark:bg-[#1D1D1D] max-w-full h-auto py-10 rounded-xl">
                      <div className="overflow-hidden">
                        <div className="slick-slider slick-initialized" dir="ltr">
                          <div className="slick-list">
                            <div className="slick-track" >
                              <div className="p-4">
                                <span className="flex">
                                  <img className="overflow-hidden px-2" alt="brand" src="/assets/images/ed-logo.png" width="20%" decoding="async" data-nimg="1" loading="lazy" />
                                  <span className="flex items-center justify-center text-xl font-semibold">
                                    Edmingle
                                  </span>
                                </span>
                                <div className="text-left p-2">
                                  Edmingle is a SAS E-Learing platform, Working at Edmingle as senior software engineer managing internal and external team, managin codebase and code review, developing robust and scalable software to meet requirements of software that server large number of users. 
                                  Also involved managing cloud infrastructure on AWS and Azure and help with CI / CD. Have significant experience with integrating of external product with the system and writing interanl tool and tools for data migrations.
                                </div>
                              </div>
                              <div className="p-4">
                                <span className="flex">
                                  <img className="overflow-hidden px-2" alt="brand" src="/assets/images/kl-logo.png" width="10%" decoding="async" data-nimg="1" loading="lazy" />
                                  <span className="flex items-center justify-center text-xl font-semibold">
                                    Klassroom
                                  </span>
                                </span>
                                <div className="text-left p-2">
                                  Klassroom is a Offline to Online Hybrid tutoring platform and work with state institutions and private institutsions and also provide a franchise business modal for it, worked on their student facing website as well as management side for managing sales, enquiry, partner onboarding study material managment etc.
                                  Also manage cloud infrastructure and maintance.
                                </div>
                              </div>

                              <div className="p-4">
                                <a href="https://github.com/gauravsh02" className="flex">
                                  <svg height={48} width={48} className="mx-4" fill="currentColor" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#142]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g></svg>
                                  <span className="flex items-center justify-center text-xl font-semibold">
                                    Check out my other projects on GitHub.
                                  </span>
                                </a>
                              </div>

                              <div className="p-4">
                                <a className="flex" href="https://cmd.gauravshankar.com/" target="_blank">
                                  <span className="flex p-2 items-center justify-center text-xl font-semibold">
                                    Terminal Website
                                  </span>
                                </a>
                                <div className="grid-container grid grid-cols-1 md:grid-cols-3 text-left p-2">
                                  <img className="overflow-hidden px-2 col-span-1 md:col-span-1" alt="brand" src="/assets/images/tmweb.png" width="80%" decoding="async" data-nimg="1" loading="lazy" />
                                  <span className="col-span-1 md:col-span-2">
                                    Terminal style portfolio website built with React, TypeScript and tailwind.
                                  </span>
                                </div>
                              </div>

                              <div className="p-4">
                                <a className="flex" href="https://gol.gauravshankar.com/" target="_blank">
                                  <span className="flex p-2 items-center justify-center text-xl font-semibold">
                                    Game of Life
                                  </span>
                                </a>
                                <div className="grid-container grid grid-cols-1 md:grid-cols-3 text-left p-2">
                                  <img className="overflow-hidden px-2 col-span-1 md:col-span-1" alt="brand" src="/assets/images/gol.png" width="80%" decoding="async" data-nimg="1" loading="lazy" />
                                  <span className="col-span-1 md:col-span-2">
                                    Conway's Game of Life in React, JS Canvas and Web Worker.
                                  </span>
                                </div>
                              </div>

                              <div className="p-4">
                                <a className="flex" href="https://ms-word-image-parser.vercel.app/" target="_blank">
                                  <span className="flex p-2 items-center justify-center text-xl font-semibold">
                                    Image Manipulation
                                  </span>
                                </a>
                                <div className="grid-container grid grid-cols-1 md:grid-cols-3 text-left p-2">
                                  <img className="overflow-hidden px-2 col-span-1 md:col-span-1" alt="brand" src="/assets/images/imageparser.png" width="80%" decoding="async" data-nimg="1" loading="lazy" />
                                  <span className="col-span-1 md:col-span-2">
                                    Manipulate image to remove empty white space from MS Office web exports and output a single file with images without extra white space, using JS Canvas.
                                  </span>
                                </div>
                              </div>

                              <div className="p-4">
                                <a className="flex" href="https://globe.gauravshankar.com/" target="_blank">
                                  <span className="flex p-2 items-center justify-center text-xl font-semibold">
                                    3D Globe
                                  </span>
                                </a>
                                <div className="grid-container grid grid-cols-1 md:grid-cols-3 text-left p-2">
                                  <img className="overflow-hidden px-2 col-span-1 md:col-span-1" alt="brand" src="/assets/images/globe.png" width="80%" decoding="async" data-nimg="1" loading="lazy" />
                                  <span className="col-span-1 md:col-span-2">
                                    3D Globe render to display different data across the world.
                                  </span>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section id="contact" className="pt-0.5">
                    <div className="  dark:border-[#212425] dark:border-2 mb-16 md:m-[48px] p-8 bg-[#F3F6F6] dark:bg-[#1D1D1D]   bg-color-810 dark:bg-[#111111] rounded-xl mb-[30px] md:mb-[60px]">
                      <h3 className="text-[35px] dark:text-white font-medium pb-5">Contact</h3>
                      <h5 className="text-xl">
                        <span className="text-gray-lite dark:text-[#A6A6A6] ">
                          I'm always open to discussion
                        </span>
                        <br/>
                        <span className="font-semibold dark:text-white">
                          contact me using below form
                        </span>
                      </h5>
                      <form id="contactForm" onSubmit={submitContactform}>
                        <div className="relative z-0 w-full mt-[40px] mb-8 group">
                          <input id="contactFormName" type="text" name="name" value={contactData.name} onChange={e => { setContactInputData(e.target.value, "name") }} placeholder=" " required={true} autoComplete="false" className="block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-[#1e90ff] focus:outline-none focus:ring-0 focus:border-[#1e90ff] peer" />
                          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-color-910 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-[#1e90ff] peer-focus:dark:text-[#1e90ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            Name
                          </label>
                        </div>
                        <div className="relative z-0 w-full mt-[40px] mb-8 group">
                          <input id="contactFormEmail" type="email" name="email" value={contactData.email} onChange={e => { setContactInputData(e.target.value, "email") }} placeholder=" " required={true} autoComplete="false" className="block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-[#1e90ff] focus:outline-none focus:ring-0 focus:border-[#1e90ff] peer" />
                          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-color-910 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-[#1e90ff] peer-focus:dark:text-[#1e90ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            Email
                          </label>
                        </div>
                        <div className="relative z-0 w-full mt-[40px] mb-8 group">
                          <textarea id="contactFormMessage" name="message" value={contactData.message} onChange={e => { setContactInputData(e.target.value, "message") }}  rows={3} placeholder=" " required={true} autoComplete="false" className="block autofill:bg-transparent py-2.5 px-0 w-full text-sm text-gray-lite bg-transparent border-0 border-b-[2px] border-[#B5B5B5] appearance-none dark:text-white dark:border-[#333333] dark:focus:border-[#1e90ff] focus:outline-none focus:ring-0 focus:border-[#1e90ff] peer" />
                          <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-color-910 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-[#1e90ff] peer-focus:dark:text-[#1e90ff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
                            Message
                          </label>
                        </div>
                        <div className="transition-all duration-300 ease-in-out inline-block hover:bg-[#1e90ff] rounded-lg mt-3">
                          <input id="contactFormSubmit" type="submit" disabled={ssResourceLoading} className="transition ease-in duration-200 font-semibold cursor-pointer border-color-910 hover:border-transparent px-6 py-2 rounded-lg border-[2px] hover:text-white dark:text-white " value="Submit" />
                        </div>
                      </form>
                    </div>
                  </section>

                  <footer className="overflow-hidden rounded-b-2xl bg-slate-50 dark:bg-[#1d1d1d]">
                    <div className="container">
                      <p className="text-center py-6 text-black dark:text-white">© 2023 All Rights Reserved by gauravshankar.com </p>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className='right hidden xl:block'>
          <a href='mailto:gauravshankar.bk@gmail.com' className='sidebar_email font-semibold text-[#232323] hover:text-black dark:text-[#c7c7c7] dark:hover:text-white'>gauravshankar.bk@gmail.com</a>
          <div className='sidebar_line  bg-black dark:bg-white' />
        </div>

      </div>

    </>
  )
}

export default App
