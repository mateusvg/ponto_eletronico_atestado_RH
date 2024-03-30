import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { userIdConst } from "../../contexts/UsersId";

//services
import { getUserScheduleApointment } from "../../services/Users/getUserScheduleApointment";

type personsType = {
  ideletronicPoint: number;
  scheduleDate: Date;
  status: string;
  finalTime: string;
  totalWork: string;
};

export default function Agendamentos() {
  const { userId } = useContext(userIdConst);
  const [allScheduleUser, setAllScheduleUser] = useState<personsType[] | []>(
    []
  );
  const getAllScheduleUser = async () => {
    const data1 = await getUserScheduleApointment(userId);
    setAllScheduleUser(data1);
  };

  useEffect(() => {
    getAllScheduleUser();
  }, []);

  function convert(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'} p={2}>
      {" Agendamentos"}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Data Agendada</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allScheduleUser?.map((history) => (
              <TableRow key={history.ideletronicPoint}>
                <TableCell>
                  {history.scheduleDate ? (
                    convert(history.scheduleDate.toString())
                  ) : (
                    <>Sem dados de ponto para o usuário</>
                  )}
                </TableCell>
                <TableCell>{history.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
