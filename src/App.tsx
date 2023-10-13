'use client';
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SortableList from "./components/DragableCard/SortableList";
import { Header } from "./components/header";
import { AiOutlineEye } from 'react-icons/ai'
import Button from "./components/buttons/Button";
import ButtonOutline from "./components/buttons/ButtonOutline";
import { Tabs } from "./components/tabs/tabs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const tabs = [ 
    { name: "Curiculum", href: "#" }
  ]

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="container mx-auto">
        <div className="flex mt-[3em] items-center">
          <div className="w-full">
            <h3 className="text-3xl font-medium">Belajar dan praktek cinematic videography</h3>
          </div>
          <div className="w-1/2">
            <small className="text-gray-500">Last edited 18 October 2021 | 13:23</small>
          </div>
          <div className="w-full text-right">
            <ButtonOutline color="text-purple-700 border-purple-700 ml-auto" onClick={() => {}}>
              <AiOutlineEye />
              <p>Preview</p>
            </ButtonOutline>
          </div>
        </div>

        <div className="mt-[2em]">
          <Tabs tabs={tabs}/>
        </div>

        <div className="border rounded-md mt-[3em] p-[1.5rem]">
          <p>Event Schedule: 24 October 2021, 16:30</p>
        </div>
        <SortableList />
      </div>

      {/* <h2>Sortable List</h2> */}
    </div>
  );
}

export default App;
