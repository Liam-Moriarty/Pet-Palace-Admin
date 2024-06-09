import React, { useEffect, useMemo, useState } from "react";
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

  const columns = useMemo(
    () => [
      { name: "_id", label: "ID" },
      {
        name: "imageFile",
        label: "Image",
        options: {
          customBodyRender: (value) => {
            const imageUrl = `http://localhost:5000/${value}`; // Ensure the URL is correct
            return (
              <img
                src={imageUrl}
                alt="Pet"
                className="w-12 h-12 rounded-full p-1 object-cover object-center"
              />
            );
          },
        },
      },
      { name: "name", label: "Name" },
      { name: "age", label: "Age" },
      { name: "breed", label: "Breed" },
      { name: "color", label: "Color" },
      {
        name: "gender",
        label: "Gender",
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
      { name: "type", label: "Type" },
      // { name: "description", selector: (row) => row.description },

      {
        name: "actions",
        label: "Actions",
        options: {
          customBodyRender: (value, tableMeta) => {
            const id = tableMeta.rowData[0]; // Assuming ID is the first column
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
    ],
    []
  );

  const options = useMemo(
    () => ({
      // filterType: "checkbox",
      selectableRows: false,
      elevation: 0,
      rowsPerPage: 5,
      rowsPerPageOption: [5, 10, 20, 30],
      responsive: "standard",
      tableBodyHeight: "700px", // Max height for table body
      setTableProps: () => ({
        style: {
          height: "auto", // Ensures the table container is auto height
        },
      }),
    }),
    []
  );

  // Define themes for both light and dark modes
  const lightTheme = useMemo(
    () =>
      createTheme({
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
      }),
    []
  );

  const darkTheme = useMemo(
    () =>
      createTheme({
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
      }),
    []
  );

  useEffect(() => {
    const fetchAdoption = async () => {
      try {
        const response = await axios.get("http://localhost:5000/adoption");
        setAdoptionList(response.data);
      } catch (error) {
        console.error("Error fetching adoption data:", error);
      }
    };
    fetchAdoption();
  }, []);

  return (
    <div className="w-full overflow-y-auto">
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
