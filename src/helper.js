export const getHeaders = (arr) => {
  let cols = [];
  for (let i = 0; i < arr.length; i++) {
    const elem = {
      id: "param-" + i,
      value: arr[i],
    };
    cols.push(elem);
  }
  return cols;
};

export const getObjectFromTable = (rows, cols) => {
  let objectEntries = {};
  let dates = [];

  for (let i = 0; i < cols.length; i++) {
    objectEntries[cols[i].id] = [];

    if (cols[i].value.toString().toLowerCase().includes("date")) dates.push(i);
  }

  for (let i = 0; i < rows.length; i++) {
    for (let k = 0; k < rows[i].length; k++) {
      if (dates.includes(k)) {
        rows[i][k] = getFormattedDate(rows[i][k]);
      }
      const key = "param-" + k;

      objectEntries[key].push(rows[i][k]);
    }
  }
  return objectEntries;
};

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const keyValArr = (obj) => {
  let newArr = [];
  //   debugger;
  const key = Object.entries(obj)[0][0];
  const length = obj[key].length;

  for (let i = 0; i < length; i++) {
    let tempArr = [];
    for (const [key, value] of Object.entries(obj)) {
      tempArr.push(value[i]);
    }
    newArr.push(tempArr);
  }

  return newArr;
};

export const getFormattedDate = (d) => {
  const date = new Date(d);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return day + "/" + month + "/" + year;
};

export const getDataForCharts = (data, columns) => {
  console.log(data, columns);
  //   const tempData = {
  //     param0: [1, 2, 3, 4, 5, 6],
  //     param10: [2, 5, 888, 3333, 1111, 5656],
  //   };

  //   [
  //     {
  //       key: "Group 1",
  //       values: [
  //         { x: "A", y: 23 },
  //         { x: "B", y: 8 },
  //       ],
  //     }]
  const outputArr = [];
  const ki = Object.entries(data)[0][0];
  const length = data[ki].length;
  for (let i = 0; i < length; i++) {
    const newObj = {};

    newObj["key"] = "Group " + i;
    newObj["values"] = [];
    for (const [key, value] of Object.entries(data)) {
      const k = columns.find((d) => d.id === key).value;

      let tempObj = {
        x: k,
        y: value[i],
      };
      newObj["values"].push(tempObj);
    }
    outputArr.push(newObj);
  }
  return outputArr;
};

// const piedata = [
//     { label: "Group 1", value: 23 },
//     { label: "Group 2", value: 15 },
//   ];

export const getDataForPieChart = (arr) => {
  const outputArr = [];

  for (let i = 0; i < arr.length; i++) {
    const newObject = {};
    newObject["label"] = "Group " + i;
    newObject["value"] = arr[i];
    outputArr.push(newObject);
  }
  return outputArr;
};
