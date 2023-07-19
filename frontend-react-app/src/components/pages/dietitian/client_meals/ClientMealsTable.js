import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import capitalize from "../../../../helpers/capitalize";
import ScheduleMealCard from "./ScheduleMealCard";
import clientMealsTable from "./scss/ClientMealsTable.module.scss";
import DeliveryDateUtility from "../../../../helpers/DeliveryDateUtility";
const ClientMealsTable = (props) => {
  
  const deliveryDayIndex = [0, 1, 2, 3]

  const handleChangeDeliveryIndex = (event) => {
    const selectedDeliveryIndex = event.target.value;
    props.handleChangeDeliveryIndex(selectedDeliveryIndex);
  };

  const renderDateOptions = () => {
    return deliveryDayIndex.map((index) => {
      return (
        <MenuItem key={index} value={index}>
          {`${DeliveryDateUtility.getDeliveryDateFromIndex(
          index
        ).getDate()} ${DeliveryDateUtility.months[
          DeliveryDateUtility.getDeliveryDateFromIndex(
            index
          ).getMonth()
        ]}`}
        </MenuItem>
      );
    });
  };
  
  return(
  <Grid container item className={clientMealsTable.tableContainer}>
    <Grid container item className={clientMealsTable.tableSubContainer}>
      <Grid container item>
        <Typography className={clientMealsTable.header}>
          Client Weekly Scheduled Meals
        </Typography>
      </Grid>
      <Grid item xs={8} lg={10}>
        <Grid container spacing={2}>
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
                {props.clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {capitalize(client.firstName) +
                      " " +
                      capitalize(client.lastName)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <FormControl fullWidth>
              <InputLabel>Date</InputLabel>
              <Select
                label="Date"
                required
                name="date"
                value={props.selectedDeliveryIndex}
                onChange={handleChangeDeliveryIndex}
              >
                {renderDateOptions()}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {props.scheduleMealCardItems.map((scheduleMealCardItem) => {
        // scheduleMealCardItem is an Array of flattened ScheduleMealCardItem maps
        // scheduleMealCardItem[0] is the scheduleMealId
        // scheduleMealCardItem[1] is the ScheduleMealCardItem
        return (
          <Grid
            item
            key={"grid-" + String(scheduleMealCardItem[0])}
            className={clientMealsTable.scheduleMealCardContainer}
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
};
export default ClientMealsTable;
