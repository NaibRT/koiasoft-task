import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import { chartContext } from "../context/ChartContext";
import { Query } from "../models/Query";

function ChartForm() {
  const { data, getDataByQuery } = useContext(chartContext);
  const navigate = useNavigate();
  const { handleSubmit, register, formState, control } = useForm();
  const { errors } = formState;

  function submit(data: {}) {
    addQueryToURL(data);
    let queryData = convertFromDataToQuery(data);
    getDataByQuery(queryData);
  }

  function error(err: {}) {
    console.log(err);
  }

  function addQueryToURL(params: {}) {
    const optios = {
      pathname: "/",
      search: `${createSearchParams(params)}`,
    };

    navigate(optios, { replace: true });
  }

  function convertFromDataToQuery(data:{}){
    let queries : Query[] = [];

    Object.entries(data).forEach((item) => {
       queries.push({
        code: item[0],
        selection:{
            filter: "item",
            values: item[1] as string[] 
        }
       });
    })

    return queries;
  }

  return (
    <form onSubmit={handleSubmit(submit, error)}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {data.variables?.map((x, i) => (
          <Controller
            key={`controller-${i}`}
            name={x.code}
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, name, value },
              formState: { errors },
            }) => (
              <FormControl sx={{ mx: 1 }} fullWidth>
                <InputLabel id="demo-simple-select-label">{x.text}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name={name}
                  value={Array.isArray(value) ? value : []}
                  label={x.text}
                  multiple
                  onChange={(e) => {
                    onChange(e);
                  }}
                >
                  {x.valueTexts.map((valueTexts, valueTextIndex) => (
                    <MenuItem
                      key={`value-${valueTextIndex}`}
                      value={x.values[valueTextIndex]}
                    >
                      {valueTexts}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        ))}

        {/* <Controller
          name="test2"
          control={control}
          render={({ 
            field: { onChange, name, value },
            formState: { errors }
        }) => (
            <FormControl sx={{ mx:1}} fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name={name}
                value={value}
                label="Age"
                onChange={onChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="test3"
          control={control}
          render={({ 
            field: { onChange, name, value },
            formState: { errors }
        }) => (
            <FormControl sx={{ mx:1}} fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name={name}
                value={value}
                label="Age"
                onChange={onChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          )}
        /> */}
      </Box>

      <Button sx={{ mt: 1 }} type="submit" variant="contained">
        Show data
      </Button>
    </form>
  );
}

export default ChartForm;
