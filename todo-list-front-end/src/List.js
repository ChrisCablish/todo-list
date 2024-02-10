import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DraggableList = ({ items }) => {
  const createItemsDto = (listItems) =>
    listItems.map((item) => ({
      id: String(item.id),
      description: item.description,
    }));

  const [itemsDto, setItemsDto] = useState(createItemsDto(items));

  // Update itemsDto whenever items prop changes
  useEffect(() => {
    setItemsDto(createItemsDto(items));
  }, [items]); // Dependency array includes items to track changes

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newArray = Array.from(itemsDto);
    const [removed] = newArray.splice(result.source.index, 1);
    newArray.splice(result.destination.index, 0, removed);

    setItemsDto(newArray);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {itemsDto.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.description}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
