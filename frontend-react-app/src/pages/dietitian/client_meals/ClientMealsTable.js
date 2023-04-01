import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import capitalize from '../../../helpers/capitalize';
import ScheduleMealCard from './ScheduleMealCard';

const ClientMealsTable = (props) => (
  <Grid
    container
    item
    xs={12}
    sx={{
      background: `${props.customTheme.palette.lightGrey.secondary}`,
      borderTop: `solid 2px ${props.customTheme.palette.lightGrey.secondary}`,
    }}
    justifyContent={'center'}
  >
    <Grid
      container
      item
      lg={10}
      spacing={3}
      paddingTop={'3vh'}
      paddingBottom={'6vh'}
      paddingLeft={'1vw'}
      paddingRight={'1vw'}
      justifyContent={'flex-start'}
    >
      <Grid container item xs={12} justifyContent={'flex-start'}>
        <Typography
          fontSize={'2rem'}
          fontWeight={'500'}
          component="div"
          paddingBottom={'3vh'}
          paddingTop={'3vh'}
        >
          Your Clients' Weekly Scheduled Meals
        </Typography>
      </Grid>
      <Grid item lg={10} xs={8}>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl fullWidth>
            <InputLabel>Client</InputLabel>
            <Select
              label="Client"
              required
              name="client"
              value={props.filterClient}
              onChange={(e) => props.handleFilterChange(e)}
            >
              {props.clients.clientArray.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {capitalize(client.firstName) +
                    ' ' +
                    capitalize(client.lastName)}
                </MenuItem>
              ))}
              {
                <MenuItem key={'all'} value={'all'}>
                  All
                </MenuItem>
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}></Grid>
      </Grid>

      {props.scheduleMealCardItems.map((scheduleMealCardItem) => {
        // scheduleMealCardItem is an Array of flattened ScheduleMealCardItem maps
        // scheduleMealCardItem[0] is the scheduleMealId
        // scheduleMealCardItem[1] is the ScheduleMealCardItem
        return (
          <Grid
            item
            key={'grid-' + String(scheduleMealCardItem[0])}
            sx={{
              marginLeft: window.innerWidth < 450 ? 'auto' : '',
              marginRight: window.innerWidth < 450 ? 'auto' : '',
            }}
          >
            <ScheduleMealCard
              mealData={scheduleMealCardItem[1]}
              key={String(scheduleMealCardItem[0])}
            />
          </Grid>
        );
      })}
    </Grid>
  </Grid>
);
export default ClientMealsTable;
