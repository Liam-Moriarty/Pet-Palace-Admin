import React, { useEffect, useState } from "react";
import { Button } from "../component/index";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "../context/theme";

const AdoptionTable = () => {
  const [adoptionList, setAdoptionList] = useState([]);
  const { mode } = useTheme(); // Destructure mode from the theme context

  const handleEdit = (id) => {
    // Handle edit action
    console.log(`Edit action for ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log(`Delete action for ID: ${id}`);
  };

  const columns = [
    { name: "_id", selector: (row) => row._id },
    {
      name: "image",
      options: {
        customBodyRender: (value) => {
          return (
            <img
              src={value}
              alt="Pet Pictures"
              className="w-12 h-12 rounded-full p-3 bg-slate-700"
            />
          );
        },
      },
    },
    { name: "name", selector: (row) => row.name },
    { name: "age", selector: (row) => row.age },
    { name: "breed", selector: (row) => row.breed },
    { name: "color", selector: (row) => row.color },
    {
      name: "gender",
      options: {
        customBodyRender: (value) => {
          return (
            <p
              className={` py-1 w-[4.5rem] text-center border-none rounded-md ${
                value === "Male"
                  ? `bg-slate-blue text-white-second hover:bg-blue-700`
                  : `bg-pink-500 text-white-second hover:bg-pink-700`
              }`}
            >
              {value}
            </p>
          );
        },
      },
    },
    { name: "type", selector: (row) => row.type },
    // { name: "description", selector: (row) => row.description },

    {
      name: "actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowData = tableMeta.rowData;
          const id = rowData[0]; // Assuming ID is the first column
          return (
            <div className="flex gap-2">
              <Button type="edit" onClick={() => handleEdit(id)}>
                Edit
              </Button>
              <Button type="delete" onClick={() => handleDelete(id)}>
                Delete
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    // filterType: "checkbox",
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOption: [5, 10, 20, 30],
  };

  // Define themes for both light and dark modes
  const lightTheme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
    palette: {
      background: {
        paper: "#ffffff",
        default: "#ffffff",
      },
      text: {
        primary: "#000000",
      },
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
    palette: {
      background: {
        paper: "#141b2d",
        default: "#141b2d",
      },
      text: {
        primary: "#ffffff",
      },
      mode: "dark",
    },
  });

  useEffect(() => {
    const fetchAdoption = async () => {
      const response = await fetch("http://localhost:5000/adoption");
      const json = await response.json();

      if (response.ok) {
        setAdoptionList(json);
      }
    };
    fetchAdoption();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     axios
  //       .get("https://jsonplaceholder.typicode.com/users")
  //       .then((res) => setAdoptionList(res.data))
  //       // .then((res) => console.log(res.data))
  //       .catch((err) => console.log(err));
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="w-full h-full overflow-y-auto">
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <MUIDataTable
          title={"Adoption List"}
          data={adoptionList}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  );
};

export default AdoptionTable;
