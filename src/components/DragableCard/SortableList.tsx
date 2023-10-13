import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GrDrag } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { BsCameraVideo } from "react-icons/bs";
import {
  HiOutlineDotsHorizontal,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { BiDownload } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import { AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import { produce } from "immer";
import Button from "../buttons/Button";
import AddSessionModal from "../modal/AddSession.modal";
import AddLessonMaterial from "../modal/AddLessonMaterial.modal";
import EditLessonMaterialModal from "../modal/EditLessonMaterial.modal";
import { toast } from "react-toastify";

let _ = require("lodash");

interface Material {
  id: string;
  title: string;
  type: string;
  isShowDropdown: boolean;
  isRequired: boolean;
  isPreviewable: boolean;
  isDownloadable: boolean;
  dateMaterial: string;
  timeMaterial: string;
  duration: string;
}

const SortableList: React.FC = () => {
  const [modalSession, setModalSession] = useState(false);
  const [modalLesson, setModalLesson] = useState({
    show: false,
    parentId: "",
  });

  const [modalEditLesson, setModalEditLesson] = useState({
    show: false,
    parentId: "",
  });

  const [selectedMaterial, setSelectedMaterial] = useState<Material>();

  const [schema, setSchema] = useState([
    {
      id: "parent-1",
      name: "Session 1",
      isEdit: false,
      isShowDropdown: false,
      material: [
        {
          id: "1-1",
          title: "VIDEO EDUKASI",
          type: "video",
          isShowDropdown: false,
          isRequired: true,
          isPreviewable: true,
          isDownloadable: true,
          dateMaterial: "2023-11-12",
          timeMaterial: "15:00",
          duration: "06:00",
        },
        {
          id: "1-2",
          type: "onsite",
          title: "Onsite data",
          isShowDropdown: false,
          isRequired: true,
          isPreviewable: false,
          isDownloadable: true,
          dateMaterial: "2023-10-12",
          timeMaterial: "13:00",
          duration: "07:00",
        },
        {
          id: "1-3",
          type: "video",
          title: "Video pelajar",
          isShowDropdown: false,
          isRequired: true,
          isPreviewable: true,
          isDownloadable: true,
          dateMaterial: "2023-11-20",
          timeMaterial: "20:00",
          duration: "13:00",
        },
        {
          id: "1-4",
          type: "onsite",
          title: "Onsite text",
          isShowDropdown: false,
          isRequired: false,
          isPreviewable: false,
          isDownloadable: false,
          dateMaterial: "2023-10-20",
          timeMaterial: "12:00",
          duration: "15:00",
        },
      ],
    },
  ]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const schemaCopy: any = schema.slice();
    const [removed] = schemaCopy.splice(result.source.index, 1);
    schemaCopy.splice(result.destination.index, 0, removed);

    setSchema(schemaCopy);
  };

  const onDragMaterialEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;

    setSchema((prevSchema) => {
      const updatedSchema = produce(prevSchema, (draft) => {
        const sourceParent = draft.find(
          (item) => item.id === sourceDroppableId
        );
        const destinationParent = draft.find(
          (item) => item.id === destinationDroppableId
        );

        if (sourceParent && destinationParent) {
          const sourceMaterial = sourceParent.material;
          const destinationMaterial = destinationParent.material;

          const [movedItem] = sourceMaterial.splice(result.source.index, 1);
          destinationMaterial.splice(result.destination.index, 0, movedItem);
        }
      });

      return updatedSchema;
    });
  };

  const formatDate = (date: string) => {
    if (date) {
      const dt = new Date(date);
      const formattedDate = dt.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDate;
    }

    return "-";
  };

  return (
    <div className="my-[2em]">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="column1">
          {(provided, snap) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {schema.map((it, i) => (
                <Draggable key={it.id} draggableId={it.id} index={i}>
                  {(provided, snap) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="list-item rounded-md !mb-[1em]"
                      style={{
                        listStyle: "none",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div
                        className="items-center flex"
                        {...provided.dragHandleProps}
                      >
                        <div className="text-gray-300 mr-[1em]">
                          <GrDrag />
                        </div>
                        <div>
                          {it.isEdit ? (
                            <div className="flex gap-2 items-center">
                              <input
                                value={it.name}
                                type="text"
                                onChange={(e) => {
                                  setSchema((prevSchema) => {
                                    const updatedSchema = prevSchema.map(
                                      (item) => {
                                        if (item.id === it.id) {
                                          // Create a new object with the changes
                                          return {
                                            ...item,
                                            name: e.target.value,
                                          };
                                        }
                                        return item;
                                      }
                                    );
                                    return updatedSchema;
                                  });
                                }}
                                className={`rounded-md border-gray-300 h-[40px]`}
                              />
                              <Button
                                color="text-white bg-purple-700"
                                onClick={() => {
                                  setSchema((prevSchema) => {
                                    const updatedSchema = prevSchema.map(
                                      (item) => {
                                        if (item.id === it.id) {
                                          return { ...item, isEdit: false };
                                        }
                                        return item;
                                      }
                                    );
                                    return updatedSchema;
                                  });
                                }}
                              >
                                Save
                              </Button>
                            </div>
                          ) : (
                            <p
                              className={`text-lg flex gap-3 items-center cursor-pointer`}
                              onClick={() => {
                                setSchema((prevSchema) => {
                                  const updatedSchema = prevSchema.map(
                                    (item) => {
                                      if (item.id === it.id) {
                                        return { ...item, isEdit: true };
                                      }
                                      return item;
                                    }
                                  );
                                  return updatedSchema;
                                });
                              }}
                            >
                              {it.name}
                              <CiEdit />
                            </p>
                          )}
                        </div>
                        <div className="ml-auto">
                          <div className="dropdown-container">
                            <button
                              onClick={() => {
                                setSchema((prevSchema) => {
                                  const updatedSchema = prevSchema.map(
                                    (item) => {
                                      if (item.id === it.id) {
                                        return {
                                          ...item,
                                          isShowDropdown: !item.isShowDropdown,
                                        };
                                      }
                                      return item;
                                    }
                                  );
                                  return updatedSchema;
                                });
                              }}
                              className="dropdown-button"
                            >
                              <HiOutlineDotsHorizontal />
                            </button>
                            {it.isShowDropdown && (
                              <ul
                                className="dropdown-list"
                                onClick={() => {
                                  const updatedMaterial = [...schema];
                                  updatedMaterial.splice(i, 1);
                                  setSchema(updatedMaterial);
                                  toast.success("Delete Session Success!", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                  });
                                }}
                              >
                                <li>Hapus</li>
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 ml-[15px]">
                        <DragDropContext onDragEnd={onDragMaterialEnd}>
                          <Droppable droppableId={it.id}>
                            {(providedMt, snap) => (
                              <div
                                ref={providedMt.innerRef}
                                {...providedMt.droppableProps}
                              >
                                {it?.material?.map((mt, idx) => {
                                  const index = it.material.findIndex(
                                    (item) => item.id === mt.id
                                  );
                                  return (
                                    <Draggable
                                      key={mt.id}
                                      draggableId={mt.id}
                                      index={index}
                                    >
                                      {(providedMt, snap) => (
                                        <div
                                          ref={providedMt.innerRef}
                                          {...providedMt.draggableProps}
                                          {...providedMt.dragHandleProps}
                                          className="list-item rounded-md hover:!bg-gray-100"
                                          style={{
                                            listStyle: "none",
                                            ...providedMt.draggableProps.style,
                                            backgroundColor: snap.isDragging
                                              ? "#f3f4f6"
                                              : "#fff",
                                          }}
                                        >
                                          <div className="grid grid-cols-2">
                                            <div className="flex gap-3 items-center">
                                              <div>
                                                <GrDrag />
                                              </div>
                                              <div className="bg-gray-100 p-[6px] rounded-md">
                                                {mt.type === "onsite" ? (
                                                  <HiOutlineLocationMarker />
                                                ) : (
                                                  <BsCameraVideo />
                                                )}
                                              </div>
                                              <div>
                                                <p className="text-xs">
                                                  {mt.title !== ""
                                                    ? mt.title
                                                    : "-"}
                                                </p>
                                              </div>
                                              {mt.isRequired && (
                                                <>
                                                  <div className="border border-gray-300 h-[20px]"></div>
                                                  <div>
                                                    <p className="text-xs text-purple-700 font-medium">
                                                      Required
                                                    </p>
                                                  </div>
                                                </>
                                              )}
                                              {mt.isPreviewable && (
                                                <>
                                                  <div className="text-gray-400">
                                                    <RxDotFilled />
                                                  </div>
                                                  <div className="text-xs text-gray-500">
                                                    Previewable
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                            <div className="flex gap-3 items-center justify-end">
                                              <div>
                                                <AiOutlineClockCircle />
                                              </div>
                                              <div>
                                                <p className="text-xs">
                                                  {formatDate(mt.dateMaterial)},{" "}
                                                  {mt.timeMaterial !== ""
                                                    ? mt.timeMaterial
                                                    : "-"}
                                                </p>
                                              </div>
                                              <div className="text-gray-400">
                                                <RxDotFilled />
                                              </div>
                                              <div>
                                                <AiOutlineClockCircle />
                                              </div>
                                              <div>
                                                <p className="text-xs">
                                                  {mt.duration !== ""
                                                    ? mt.duration
                                                    : "-"}{" "}
                                                  Min
                                                </p>
                                              </div>
                                              {mt.isDownloadable && (
                                                <>
                                                  <div className="text-gray-400">
                                                    <RxDotFilled />
                                                  </div>
                                                  <div>
                                                    <BiDownload />
                                                  </div>
                                                  <div>
                                                    <p className="text-xs">
                                                      Downloadable
                                                    </p>
                                                  </div>
                                                </>
                                              )}

                                              <div className="dropdown-container">
                                                <button
                                                  onClick={() => {
                                                    setSchema((prevSchema) => {
                                                      const updatedSchema =
                                                        prevSchema.map(
                                                          (parent) => {
                                                            if (
                                                              parent.id ===
                                                              it.id
                                                            ) {
                                                              // Find the material object by ID within the parent object
                                                              const updatedMaterial =
                                                                parent.material.map(
                                                                  (
                                                                    material
                                                                  ) => {
                                                                    if (
                                                                      material.id ===
                                                                      mt.id
                                                                    ) {
                                                                      // Toggle the isShowDropdown property
                                                                      return {
                                                                        ...material,
                                                                        isShowDropdown:
                                                                          !material.isShowDropdown,
                                                                      };
                                                                    }
                                                                    return material;
                                                                  }
                                                                );

                                                              // Update the parent object with the updated material
                                                              return {
                                                                ...parent,
                                                                material:
                                                                  updatedMaterial,
                                                              };
                                                            }
                                                            return parent;
                                                          }
                                                        );
                                                      return updatedSchema;
                                                    });
                                                  }}
                                                  className="dropdown-button"
                                                >
                                                  <HiOutlineDotsHorizontal />
                                                </button>
                                                {mt.isShowDropdown && (
                                                  <ul className="dropdown-list">
                                                    <li
                                                      onClick={() => {
                                                        setSelectedMaterial(mt);
                                                        setModalEditLesson({
                                                          show: true,
                                                          parentId: it.id,
                                                        });
                                                      }}
                                                    >
                                                      Edit
                                                    </li>
                                                    <li
                                                      onClick={() => {
                                                        const updatedMaterial =
                                                          [...schema];
                                                        const parentIndex =
                                                          updatedMaterial.findIndex(
                                                            (item) =>
                                                              item.id === it.id
                                                          );

                                                        if (
                                                          parentIndex !== -1
                                                        ) {
                                                          updatedMaterial[
                                                            parentIndex
                                                          ].material.splice(
                                                            idx,
                                                            1
                                                          );
                                                          setSchema(
                                                            updatedMaterial
                                                          );
                                                          toast.success("Delete Lesson Success!", {
                                                            position: "top-right",
                                                            autoClose: 5000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: "light",
                                                          });
                                                        }
                                                      }}
                                                    >
                                                      Hapus
                                                    </li>
                                                  </ul>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                })}
                                {providedMt.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                        <div className="flex items-center">
                          <Button
                            color="text-white bg-purple-700 !p-[10px]"
                            onClick={() => {
                              setModalLesson({
                                show: true,
                                parentId: it.id,
                              });
                            }}
                          >
                            <AiOutlinePlus />
                          </Button>
                          <small className="ml-2">Add Lesson Material</small>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="flex mb-[8rem] justify-end mt-5">
        <Button
          color="text-white bg-purple-700 !p-[10px]"
          onClick={() => {
            setModalSession(true);
          }}
        >
          <AiOutlinePlus /> Add Session
        </Button>
      </div>
      <AddSessionModal
        onSubmit={(data: any) => {
          const arrMt: any = [];
          data?.material?.map((mt: any, i: number) =>
            arrMt.push({
              ...mt,
              id: `${schema.length + 1}-${i + 1}`,
            })
          );
          let payload: any = {
            id: `parent-${schema.length + 1}`,
            name: data?.name,
            isEdit: false,
            isShowDropdown: false,
            material: arrMt,
          };

          const updatedSchema = [payload, ...schema];

          setSchema(updatedSchema);
          setModalSession(false);
          toast.success("Add Session Success!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }}
        onClose={() => {
          setModalSession(false);
        }}
        show={modalSession}
      />

      <AddLessonMaterial
        onSubmit={(data: any) => {
          const updatedSchema = _.cloneDeep(schema);
          const parentIndex = updatedSchema.findIndex(
            (item: any) => item.id === modalLesson.parentId
          );

          if (parentIndex !== -1) {
            const materialLength = updatedSchema[parentIndex].material.length;

            const newMaterialId = `${modalLesson.parentId.split("-")[1]}-${
              materialLength + 1
            }`;

            const newData = _.cloneDeep(data.material[0]);
            newData.id = newMaterialId;

            if (updatedSchema[parentIndex].material) {
              const newMaterialArray = [
                ...updatedSchema[parentIndex].material,
                newData,
              ];

              updatedSchema[parentIndex].material = newMaterialArray;
            }

            setSchema(updatedSchema);
          }

          toast.success("Add Lesson Success!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setModalLesson({
            show: false,
            parentId: "",
          });
        }}
        onClose={() => {
          setModalLesson({
            show: false,
            parentId: "",
          });
        }}
        show={modalLesson.show}
      />

      <EditLessonMaterialModal
        show={modalEditLesson.show}
        onClose={() => {
          setModalEditLesson({
            show: false,
            parentId: "",
          });
        }}
        data={selectedMaterial}
        onSubmit={(data: any) => {
          const updatedSchema = [...schema];

          const parentIndex = updatedSchema.findIndex(
            (item) => item.id === modalEditLesson.parentId
          );

          if (parentIndex !== -1) {
            const materials = [...updatedSchema[parentIndex].material];
            const materialIndex = materials.findIndex(
              (item) => item.id === data.id
            );
            if (materialIndex !== -1) {
              materials[materialIndex] = { ...data };
              updatedSchema[parentIndex].material = materials;
              setSchema(updatedSchema);
            }
          } else {
            console.log("Parent tidak ditemukan");
          }

          toast.success("Edit Lesson Success!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setModalEditLesson({
            show: false,
            parentId: "",
          });
        }}
      />
    </div>
  );
};

export default SortableList;
