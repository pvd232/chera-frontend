import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ScheduleSnackCard from "./ScheduleSnackCard";
import clientMealsTable from "./scss/ClientMealsTable.module.scss";
const ClientSnacksTable = (props) => {
  return (
    <Grid container item className={clientMealsTable.tableContainer}>
      <Grid container item className={clientMealsTable.tableSubContainer}>
        <Grid container item>
          <Typography
            className={clientMealsTable.header}
            style={{ padding: "20px 0" }}
          >
            Client Weekly Scheduled Snacks
          </Typography>
        </Grid>
        {props.currentScheduledOrderSnacks.map(
          (scheduledOrderSnackCardData, i) => {
            return (
              <Grid
                item
                key={`gridChosenScheduledOrderMeal${i}`}
                className={clientMealsTable.scheduleMealCardContainer}
              >
                <ScheduleSnackCard
                  snackData={scheduledOrderSnackCardData}
                  key={`clientMeal${i}`}
                />
              </Grid>
            );
          }
        )}
      </Grid>
    </Grid>
  );
};
export default ClientSnacksTable;
