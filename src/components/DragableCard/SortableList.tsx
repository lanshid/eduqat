import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GrDrag } from "react-icons/gr";
import { produce } from "immer";

interface Item {
  id: string;
  content: string;
}

const SortableList: React.FC = () => {
  const [schema, setSchema] = useState([
    {
      id: "parent-1",
      type: "a",
      text: "123-text",
      name: "Session 1",
      material: [
        {
          id: "1-1",
          type: "a",
          text: "123-text",
        },
        {
          id: "1-2",
          type: "b",
          text: "345-text",
        },
        {
          id: "1-3",
          type: "a",
          text: "567-text",
        },
        {
          id: "1-4",
          type: "b",
          text: "789-text",
        },
      ],
    },
    {
      id: "parent-2",
      type: "b",
      text: "345-text",
      name: "Session 2",
      material: [
        {
          id: "2-1",
          type: "a",
          text: "123-text",
        },
        {
          id: "2-2",
          type: "b",
          text: "345-text",
        },
        {
          id: "2-3",
          type: "a",
          text: "567-text",
        },
        {
          id: "2-4",
          type: "b",
          text: "789-text",
        },
      ],
    },
    {
      id: "parent-3",
      type: "a",
      text: "567-text",
      name: "Session 3",
      material: [
        {
          id: "3-1",
          type: "a",
          text: "123-text",
        },
        {
          id: "3-2",
          type: "b",
          text: "345-text",
        },
        {
          id: "3-3",
          type: "a",
          text: "567-text",
        },
        {
          id: "3-4",
          type: "b",
          text: "789-text",
        },
      ],
    },
    {
      id: "parent-4",
      type: "b",
      text: "789-text",
      name: "Session 4",
      material: [
        {
          id: "4-1",
          type: "a",
          text: "123-text",
        },
        {
          id: "4-2",
          type: "b",
          text: "345-text",
        },
        {
          id: "4-3",
          type: "a",
          text: "567-text",
        },
        {
          id: "4-4",
          type: "b",
          text: "789-text",
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

  return (
    <div className="mt-[2em]">
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
                      {...provided.dragHandleProps}
                      className="list-item rounded-md"
                      style={{
                        listStyle: "none",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div className="items-center flex">
                        <div className="text-gray-700 mr-[1em]">
                          <GrDrag />
                        </div>
                        <p className="text-lg">{it.name}</p>
                      </div>
                      <div>
                        <DragDropContext onDragEnd={onDragMaterialEnd}>
                          <Droppable droppableId={it.id}>
                            {(providedMt, snap) => (
                              <div
                                ref={providedMt.innerRef}
                                {...providedMt.droppableProps}
                              >
                                {it?.material?.map((mt, idx) => {
																	const index = it.material.findIndex((item) => item.id === mt.id);
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
                                          className="list-item rounded-md"
                                          style={{
                                            listStyle: "none",
                                            ...providedMt.draggableProps.style,
                                          }}
                                        >
                                          <div>{mt.text}</div>
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
    </div>
  );
};

export default SortableList;
