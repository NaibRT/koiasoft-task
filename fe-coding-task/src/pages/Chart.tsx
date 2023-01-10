import { Grid } from "@mui/material";
import ChartForm from "../components/ChartForm";
import LineChart from "../components/LineChart";
import { ChartContextProvider } from "../context/ChartContext";

function Chart() {
  return (
    <ChartContextProvider>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <ChartForm />
        </Grid>
        <Grid item sm={12}>
        <LineChart />
        </Grid>
      </Grid>
    </ChartContextProvider>
  );
}

export default Chart;
