
import { getAllUserSchedule } from '../services/Admin/getAllUserSchedule'
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from 'react';

type personsType = {

  userName: string

}
export default function ComboBox(props:any) {
  
  const [allHistoryRegisters, setAllHistoryRegisters] = useState<personsType[] | []>([])

  const getAllHistoryRegisters = async () => {
    const data1 = await getAllUserSchedule()
    setAllHistoryRegisters(data1)
  };

  React.useEffect(() => {
    getAllHistoryRegisters()
  }, [])

  const [inputValue, setInputValue] = React.useState("");
  props.func(inputValue);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={allHistoryRegisters}
      getOptionLabel={(option) => option.userName}
      sx={{ width: 300 }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="Colaboradores" />}
    />
  );
}