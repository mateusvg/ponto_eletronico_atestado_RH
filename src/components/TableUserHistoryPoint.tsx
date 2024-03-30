import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useContext, useEffect, useState } from "react";
import { userIdConst } from "../contexts/UsersId";
//services
import { getPointDateByUserAllHistory } from "../services/Users/getPointDateByUserAllHistory";
import { Box, CircularProgress } from "@mui/material";

type personsType = {
  ideletronicPoint: number;
  date: Date;
  initialTime: string;
  finalTime: string;
  totalWork: string;
};

export default function BasicTable() {
  const { userId } = useContext(userIdConst);
  const [allHistoryRegisters, setAllHistoryRegisters] = useState<
    personsType[] | []
  >([]);
  const [loading, setLoading] = useState(true);

  const getAllHistoryRegisters = async () => {
    const data1 = await getPointDateByUserAllHistory(userId);
    setAllHistoryRegisters(data1);
    setLoading(false);
  };

  useEffect(() => {
    getAllHistoryRegisters();
  }, []);

  function convert(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }

  return (
    <Box
    display={'flex'} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'} p={2}
    >
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Entrada</TableCell>
                <TableCell>Saida</TableCell>
                <TableCell>Total horas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allHistoryRegisters.map((history) => (
                <TableRow key={history.ideletronicPoint}>
                  <TableCell>{convert(history.date.toString())}</TableCell>
                  <TableCell>{history.initialTime}</TableCell>
                  <TableCell>{history.finalTime}</TableCell>
                  <TableCell>{history.totalWork}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
