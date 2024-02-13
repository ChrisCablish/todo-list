import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import IndividualListItem from "./IndividualListItemComponent";
import styles from "./DraggableList.module.scss";

const DraggableList = ({
  items,
  currentList,
  setCurrentList,
  singleLists,
  handleItemCrud,
}) => {
  const handleListChange = (e) => {
    setCurrentList(e.target.value);
  };

  const getListId = (listName) => {
    const matchingList = singleLists.find((list) => list.name === listName);
    return matchingList ? matchingList.id : null;
  };

  const filteredItems = items.filter((item) =>
    item.singleListIds.includes(getListId(currentList))
  );

  const createItemsDto = (filteredItems) =>
    filteredItems.map((item) => ({
      id: String(item.id),
      description: item.description,
      isComplete: item.isComplete,
    }));

  const [itemsDto, setItemsDto] = useState(createItemsDto(filteredItems));

  // Update itemsDto whenever items prop changes
  useEffect(() => {
    setItemsDto(createItemsDto(filteredItems));
  }, [items, currentList, singleLists]); // Dependency array includes items to track changes

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newArray = Array.from(itemsDto);
    const [removed] = newArray.splice(result.source.index, 1);
    newArray.splice(result.destination.index, 0, removed);

    setItemsDto(newArray);
  };

  return (
    <section>
      <div className="listPicker">
        <span>List Picker</span>
        <select onChange={handleListChange} value={currentList}>
          {singleLists.map((list) => (
            <option key={list.id} value={list.name}>
              {list.name}
            </option>
          ))}
        </select>
      </div>
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
                      <IndividualListItem
                        key={item.id}
                        description={item.description}
                        id={item.id}
                        isComplete={item.isComplete}
                        singleLists={singleLists}
                        currentList={currentList}
                        handleItemCrud={handleItemCrud}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default DraggableList;
