import logo from "./logo.svg";
import "./App.css";
import FileUpload from "./components/FileUpload";
import TableContainer from "./components/TableContainer";
import Charts from "./components/Charts";
import { useState } from "react";
import readXlsxFile from "read-excel-file";
import {
  getDataForCharts,
  getDataForPieChart,
  getHeaders,
  getObjectFromTable,
  move,
} from "./helper";

function App() {
  const [fileData, setFileData] = useState();
  const [columns, setColumns] = useState();
  const [data, setData] = useState();
  const [selected, setSelected] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [barChartData, setBarChartData] = useState();
  const [pieChartData, setPieChartData] = useState();

  const onFileUpload = async (e) => {
    const rows = await readXlsxFile(e.target.files[0]);
    console.log(rows);
    let cols = getHeaders(rows[0]);
    setColumns(cols);
    let rowsWithoutHeading = rows.filter((elem, idx) => idx !== 0);
    let objectEntries = getObjectFromTable(rowsWithoutHeading, cols);

    let colHead = [];
    colHead.push(cols[0]);
    setSelected(colHead);
    setData(objectEntries);
    const dataElems = objectEntries[cols[0].id];
    setSelectedData((prev) => {
      return { ...prev, [cols[0].id]: dataElems };
    });
  };

  const onDragEnd = (res) => {
    console.log(res);
    const { source, destination, draggableId } = res;
    if (!destination || source.droppableId === destination.droppableId) return;
    const cols = [...columns];
    const sel = [...selected];
    if (source.droppableId === "droppable") {
      const updatedCols = cols.filter((col) => col.id !== draggableId);
      const splicedData = cols.splice(source.index, 1);
      const updatedSel = sel.concat(splicedData);

      setSelected(updatedSel);
      setColumns(updatedCols);
      const dataElems = data[draggableId];
      setSelectedData((prev) => {
        return { ...prev, [draggableId]: dataElems };
      });

      const s = selectedData;
      s[draggableId] = dataElems;
      console.log(dataElems);
      // debugger;
      if (typeof dataElems[0] === "number") {
        const pie = getDataForPieChart(dataElems);
        setPieChartData(pie);
      }
      const bar =
        Object.keys(s).length !== 0 && getDataForCharts(s, updatedSel);
      // console.log(bar);

      setBarChartData(bar);
    }

    if (source.droppableId === "droppable2") {
      if (selected.length === 1) return;
      const updatedSel = sel.filter((col) => col.id !== draggableId);
      const splicedData = cols.splice(source.index, 1);
      const updatedCols = cols.concat(splicedData);
      setSelected(updatedSel);
      setColumns(updatedCols);
      delete selectedData[draggableId];
      setSelectedData(selectedData);
      const s = selectedData;

      const bar =
        Object.keys(s).length !== 0 && getDataForCharts(s, updatedSel);
      // console.log(bar);

      setBarChartData(bar);
    }

    // const result = move(columns, selected, source, destination);
    // const values = data[draggableId];

    // setColumns(result.droppable);
    // setSelected(result.droppable2);
  };

  return (
    <div
      className="container"
      style={{ borderStyle: "solid", background: "antiquewhite" }}
    >
      <FileUpload onFileUpload={onFileUpload} fileData={fileData} />
      <TableContainer
        fileData={columns}
        onDragEnd={onDragEnd}
        selected={selected}
        data={data}
        selectedData={selectedData}
      />
      {barChartData && (
        <Charts barChartData={barChartData} pieChartData={pieChartData} />
      )}
    </div>
  );
}

export default App;
