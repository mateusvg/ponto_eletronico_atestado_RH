import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllRegistersUsersStatus } from '../../services/Admin/getAllRegistersUsersStatus'
import { getAllColaboradoresService } from '../../services/Admin/getAllColaboradores'
import { getAllExtratoService } from '../../services/Admin/getAllExtrato'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };



  type personsType = {
    idmedicalCertificate: string
    patientName: string
    attachment: any
    patientCpf: string
    fitness: string
    status: string
    userName: string
    cpf: string
    initialTime: string
    date: string
    finalTime: string
  }
  const [persons, setPerson] = useState<personsType[] | []>([]);
  useEffect(() => {
    getAllHistoryRegisters()
  }, [])
  const getAllHistoryRegisters = async () => {
    const data1 = await getAllRegistersUsersStatus()
    setPerson(data1)
  };


  const [colaboradores, setColaboradores] = useState<personsType[] | []>([]);
  useEffect(() => {
    getAllColaboradores()
  }, [])
  const getAllColaboradores = async () => {
    const data1 = await getAllColaboradoresService()
    setColaboradores(data1)
  };

  const [extrato, setExtrato] = useState<personsType[] | []>([]);
  useEffect(() => {
    getAllExtrato()
  }, [])
  const getAllExtrato = async () => {
    const data1 = await getAllExtratoService()
    setExtrato(data1)
  };



  const doc = new jsPDF();
  // Download file PDF
  function downloadFile(e: any) {
    const element = document.createElement("a")
    let arraySemAnexo: any = []
    persons?.map(function (item, indice) {
      arraySemAnexo.push([`${persons[indice]['idmedicalCertificate']} `, `${persons[indice]['patientName']}`, `${persons[indice]['patientCpf']}`, `${persons[indice]['status']}`, `${persons[indice]['fitness']}`])

    });
    console.log(arraySemAnexo);
    doc.text("Relatório Status de Atestado ", 70, 10);
    autoTable(doc, {
      head: [['ID', 'Nome', 'CPF', 'Status', 'Aptidão']],
      body: persons?.map(object => {
        return [object.idmedicalCertificate, object.patientName, object.patientCpf, object.status, object.fitness];
      }),
    })
    doc.save("StatusAtestado.pdf");
  }


  function downloadFileColaboradores(e: any) {
    let arraySemAnexo: any = []
    colaboradores?.map(function (item, indice) {
      arraySemAnexo.push([`${colaboradores[indice]['userName']} `, `${colaboradores[indice]['patientCpf']}`])

    });
    console.log(arraySemAnexo);
    doc.text("Total Colaboradores", 70, 10);
    autoTable(doc, {
      head: [['Nome de usuário', 'CPF']],
      body: colaboradores?.map(object => {
        return [object.userName, object.cpf];
      }),
    })
    doc.save("Total Colaboradores.pdf");
  }

  function downloadFileExtrato(e: any) {
    let arraySemAnexo: any = []
    extrato?.map(function (item, indice) {
      arraySemAnexo.push([`${extrato[indice]['userName']} `, `${extrato[indice]['date']}`,  `${extrato[indice]['initialTime']}` , `${extrato[indice]['finalTime']}`])

    });
    console.log(arraySemAnexo);
    doc.text("Total extrato", 70, 10);
    autoTable(doc, {
      head: [['Nome de usuário', 'Data', 'Horario Inicial', 'Horario Final']],
      body: extrato?.map(object => {
        return [object.userName, object.date, object.initialTime, object.finalTime];
      }),
    })
    doc.save("Extrato Ponto.pdf");
  }


  return (
    <div>
      < Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
        Relatórios
      </Box>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Status Atestado
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Relatório de status de atestado médico</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button onClick={downloadFile}>
            Executar
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Extrato de ponto
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Relatório de extrato de ponto</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button onClick={downloadFileExtrato}>
            Executar
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Total colaboradores
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Relatório de número total de colaboradores</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button onClick={downloadFileColaboradores}>
            Executar
          </Button>
        </AccordionDetails>
      </Accordion>

    </div >
  );
}
