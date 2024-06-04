import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const ref = useRef();
  const passwordRef = useRef();
  const [passwordArray, setpasswordArray] = useState([]);


  const getPasswords=async()=>{
    let req=await fetch("http://localhost:3000/")
    let passwords=await req.json();
    setpasswordArray(passwords);
  }

  useEffect(() => {
    // const passwords = localStorage.getItem("passwords");
    // if (passwords) {
    //   setpasswordArray(JSON.parse(passwords));
    // }
    getPasswords();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async() => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
      
      await fetch('http://localhost:3000/',{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:form.id})})
      setpasswordArray([...passwordArray, {...form,id:uuidv4()}]);
      await fetch('http://localhost:3000/',{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));

      setForm({ site: "", username: "", password: "" })
      toast("Saved Successfully!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }else{
    toast("Please add valid values", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  };


  const editPassword = (id) => {
    setForm({...passwordArray.filter(i=>i.id===id)[0],id:id})
    const updatedPasswords = passwordArray.filter(item => item.id !== id);
    setpasswordArray(updatedPasswords);
  };


  const deletePassword = async(id) => {
    let c=confirm("Do you really want to delete the password?");
    if(c){
      const updatedPasswords = passwordArray.filter(item => item.id !== id);
      setpasswordArray(updatedPasswords);
      // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      let res=await fetch('http://localhost:3000/',{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})})

      toast("Password deleted successfully!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  


  const handleonChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
        <div className="absolute inset-0 -z-10 h-full w-full">
      <div className="p-2 md:p-0 md:mycontainer min-h-[88.2vh]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
        </div>
      </div>
      <div className=" mycontainer">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700 ">OP/&gt;</span>
        </h1>

        <p className="text-green-900 text-lg  text-center">
          Your own Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleonChange}
            placeholder="Enter Website Name"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="sitename"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleonChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleonChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1 toChange"
                  width={26}
                  src="icons/hidden.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex gap-4 justify-center items-center hover:bg-green-400 bg-green-500 rounded-full px-8 py-2 w-fit border-green-900 border"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              // style="width:250px;height:250px"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length == 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (<table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div className="size-7 cursor-pointer">
                            <img
                              onClick={() => {
                                copyText(item.site);
                              }}
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div className="size-7 cursor-pointer">
                            <img
                              onClick={() => {
                                copyText(item.username);
                              }}
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div className="size-7 cursor-pointer">
                            <img
                              onClick={() => {
                                copyText(item.password);
                              }}
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="icons/copy.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span className="cursor-pointer mx-1">
                            <img
                              src="icons/edit.png"
                              onClick={()=>editPassword(item.id)}
                              style={{ width: "25px", height: "25px" }}
                              alt=""
                            />
                          </span>
                          <span className="cursor-pointer mx-1">
                            <lord-icon
                              onClick={()=>deletePassword(item.id)}
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
