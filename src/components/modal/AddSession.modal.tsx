import React, { useState, useEffect } from "react";
import Button from "../buttons/Button";
import { AiOutlinePlus, AiOutlineCloseCircle } from "react-icons/ai";

interface SessionData {
  name: string;
  material: any[];
}

const AddSessionModal = ({
  show,
  onSubmit,
  onClose,
}: {
  show: boolean;
  onSubmit: (data: any) => void;
  onClose: (close: boolean) => void;
}) => {
  const [sessionData, setSessionData] = useState<SessionData>({
    name: "",
    material: [],
  });

  return (
    <div
      id="staticModal"
      data-modal-backdrop="static"
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        show ? "" : "hidden"
      }`}
    >
      <div className="backdrop"></div>
      <div className="relative w-full max-w-4xl max-h-full mt-[4em] mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Session
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Session Name
              </label>
              <input
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                type="text"
                placeholder="Session Name"
                value={sessionData.name}
                onChange={(e) => {
                  setSessionData({
                    ...sessionData,
                    name: e.target.value
                  });
                }}
              />
              <div className="my-5">
                <h3>Material</h3>
                {sessionData?.material?.map((x: any, i: number) => (
                  <div className="border rounded-md my-3 p-3" key={i}>
                    <div>
                      <div
                        className="h-[22px] w-[26px] cursor-pointer p-[3px] ml-auto"
                        onClick={() => {
                          const updatedMaterial = [...sessionData.material];
                          updatedMaterial.splice(i, 1);
                          setSessionData({
                            ...sessionData,
                            material: updatedMaterial,
                          });
                        }}
                      >
                        <AiOutlineCloseCircle />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Material Title
                        </label>
                        <input
                          className="appearance-none block w-full border-gray-200  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          value={x.title}
                          placeholder="Material Title"
                          onChange={(e) => {
                            const ls = [...sessionData.material];
                            ls[i].title = e.target.value
                            setSessionData({
                              ...sessionData,
                              material: ls
                            })

                          }}
                        />
                        {/* <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p> */}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Material Date
                        </label>
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="date"
                          value={x.dateMaterial}
                          onChange={(e) => {
                            const ls = [...sessionData.material];
                            ls[i].dateMaterial = e.target.value
                            setSessionData({
                              ...sessionData,
                              material: ls
                            })

                          }}
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Material Time
                        </label>
                        <input
                          className="appearance-none block w-full border-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="time"
                          placeholder="Material Title"
                          value={x.timeMaterial}
                          onChange={(e) => {
                            const ls = [...sessionData.material];
                            ls[i].timeMaterial = e.target.value
                            setSessionData({
                              ...sessionData,
                              material: ls
                            })

                          }}
                        />
                        {/* <p className="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p> */}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Material Duration
                        </label>
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="time"
                          value={x.duration}
                          onChange={(e) => {
                            const ls = [...sessionData.material];
                            ls[i].duration = e.target.value
                            setSessionData({
                              ...sessionData,
                              material: ls
                            })

                          }}
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-1/2 md:1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Type
                        </label>
                        <div className="relative">
                          <select
                            value={x.type}
                            onChange={(e) => {
                              const ls = [...sessionData.material];
                              ls[i].type = e.target.value
                              setSessionData({
                                ...sessionData,
                                material: ls
                              })
  
                            }}
                            className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                          >
                            <option value={"onsite"}>Onsite</option>
                            <option value={"video"}>Video</option>
                          </select>
                        </div>
                      </div>
                      <div className="px-3 w-1/2 flex items-end mb-6 md:mb-0">
                        <div className="md:items-center mb-6">
                          <label className="md:w-2/3 text-gray-500 font-bold flex items-center">
                            <input
                              className="mr-2 leading-tight"
                              type="checkbox"
                              checked={x.isRequired}
                              onChange={(e) => {
                                const ls = [...sessionData.material];
                                ls[i].isRequired = e.target.checked
                                setSessionData({
                                  ...sessionData,
                                  material: ls
                                })
    
                              }}
                            />
                            <span className="text-xs">Required</span>
                          </label>
                        </div>
                        <div className="md:items-center mb-6 ml-3">
                          <label className="md:w-2/3 text-gray-500 font-bold flex items-center">
                            <input
                              className="mr-2 leading-tight"
                              type="checkbox"
                              checked={x.isPreviewable}
                              onChange={(e) => {
                                const ls = [...sessionData.material];
                                ls[i].isPreviewable = e.target.checked
                                setSessionData({
                                  ...sessionData,
                                  material: ls
                                })
    
                              }}
                            />
                            <span className="text-xs">Previewable</span>
                          </label>
                        </div>
                        <div className="md:items-center mb-6 ml-3">
                          <label className="md:w-2/3 text-gray-500 font-bold flex items-center">
                            <input
                              className="mr-2 leading-tight"
                              type="checkbox"
                              checked={x.isDownloadable}
                              onChange={(e) => {
                                const ls = [...sessionData.material];
                                ls[i].isDownloadable = e.target.checked
                                setSessionData({
                                  ...sessionData,
                                  material: ls
                                })
    
                              }}
                            />
                            <span className="text-xs">Downloadable</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center mt-3">
                  <Button
                    color="text-white bg-purple-700 !p-[10px]"
                    onClick={() => {
                      const arr: any = [...sessionData.material];
                      let payload: any = {
                        title: "",
                        type: "video",
                        isShowDropdown: false,
                        isRequired: false,
                        isPreviewable: false,
                        isDownloadable: false,
                        dateMaterial: "",
                        timeMaterial: "",
                        duration: "",
                      };
                      arr.push(payload);
                      const updatedSessionData = {
                        ...sessionData,
                        material: arr,
                      };
                      setSessionData(updatedSessionData);
                    }}
                  >
                    <AiOutlinePlus />
                  </Button>
                  <small className="ml-2">Add Lesson Material</small>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="staticModal"
              type="button"
              onClick={() => {
                onSubmit(sessionData)
                setSessionData({
                  name: "",
                  material: []
                })
              }}
              className="text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Save
            </button>
            <button
              data-modal-hide="staticModal"
              type="button"
              onClick={() => {
                onClose(false);
                setSessionData({
                  name: "",
                  material: []
                })
              }}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSessionModal;
