import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllRegistersUsersStatus } from '../../services/Admin/getAllRegistersUsersStatus'

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
  }
  const [persons, setPerson] = useState<personsType[] | []>([]);
  useEffect(() => {
    getAllHistoryRegisters()
  }, [])

  const getAllHistoryRegisters = async () => {
    const data1 = await getAllRegistersUsersStatus()
    setPerson(data1)
  };



  // Download file report XLS OR TXT
  function downloadFile(e: any) {
    const element = document.createElement("a")
    let novoArray: any = ["ID", "Nome", "CPF", "Status", "Aptidão"]
    let arraySemAnexo: any = []
    persons?.map(function (item, indice) {
      return arraySemAnexo.push(` \n ${persons[indice]['idmedicalCertificate']}, ${persons[indice]['patientName']} , ${persons[indice]['patientCpf']} , ${persons[indice]['status'] }, ${persons[indice]['fitness'] }`)
    });

    const file = new Blob([`${novoArray} \n ${arraySemAnexo}`]);
    e.preventDefault()
    element.href = URL.createObjectURL(file);
    element.download = `Relatorio.xlsx`
    element.click();

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
          <Button >
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
          <Button>
            Executar
          </Button>
        </AccordionDetails>
      </Accordion>

    </div >
  );
}
