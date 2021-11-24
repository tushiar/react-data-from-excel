import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { keyValArr } from "../helper";

const TableContainer = ({
  fileData,
  onDragEnd,
  selected,
  data,
  selectedData,
}) => {
  const updatedData =
    Object.keys(selectedData).length !== 0 && keyValArr(selectedData);
  console.log(updatedData);
  return (
    <div className="row">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="table-responsive col-md-3">
          <h3 className="sub-header">Titles</h3>
          <hr />
          <table className="table table-primary">
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <thead ref={provided.innerRef}>
                  {fileData &&
                    fileData.map(({ id, value }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided, snapshot) => (
                          <tr
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <th className="col-md-1">{value}</th>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                </thead>
              )}
            </Droppable>
          </table>
        </div>
        <div className="col-md-9 table-responsive">
          <h3 className="sub-header">Data from titles </h3>
          <hr />
          <table className="table table-striped">
            <thead>
              <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                  <tr ref={provided.innerRef}>
                    {selected &&
                      selected.map(({ id, value }, index) => (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided, snapshot) => (
                            <th
                              key={id}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              className="col-md-1"
                            >
                              {value}
                              {provided.placeholder}
                            </th>
                          )}
                        </Draggable>
                      ))}
                  </tr>
                )}
              </Droppable>
            </thead>
            <tbody>
              {updatedData &&
                updatedData.map((data, idx) => (
                  <tr key={`row-${idx}`}>
                    {data.map((d, idx) => (
                      <td key={idx} className="col-md-2">
                        {d}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TableContainer;
