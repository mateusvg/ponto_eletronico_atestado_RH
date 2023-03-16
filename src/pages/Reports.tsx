import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
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
          <Button>
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
          <Button>
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
      
    </div>
  );
}
