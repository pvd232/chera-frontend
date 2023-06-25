import '../../../../../static/scss/NutritionLabel.scss';
import { Series, Label, Legend, Font } from 'devextreme-react/pie-chart';
import {
  ArgumentAxis,
  Chart,
  CommonAxisSettings,
  ValueAxis,
} from 'devextreme-react/chart';
import DataSource from 'devextreme/data/data_source';
import capitalize from '../../../../../helpers/capitalize';
import formatNutrientLabelText from './helpers/formatNutrientLabelText';
const DailyNutrientChartComponent = (props) => {
  const newDs = new DataSource(props.dataSource);
  return (
    <Chart dataSource={newDs}>
      <Series
        valueField="dailyValue"
        argumentField="name"
        name="Daily Nutrients"
        type="bar"
        color={props.customTheme.palette.olive.main}
      >
        <Label visible={true} customizeText={formatNutrientLabelText}>
          <Font
            size={14}
            weight={600}
            family={'Roboto,Helvetica,Arial,sans-serif'}
          />
        </Label>
      </Series>
      <CommonAxisSettings
        grid={{ visible: false }}
        tick={{ visible: false }}
      ></CommonAxisSettings>
      <ValueAxis
        visible={false}
        label={{ visible: false }}
        // startValue = -0.001 so that the bar chart will show a bar for nutrients that have a daily value of 0
        visualRange={{ startValue: -0.001, endValue: 1.0 }}
      ></ValueAxis>
      <ArgumentAxis>
        <Label
          visible={true}
          customizeText={(arg) => capitalize(arg.value)}
          family={'Roboto,Helvetica,Arial,sans-serif'}
        >
          <Font
            size={!props.customTheme.extraSmallScreen() ? 12 : 11.5}
            color={'black'}
            family={'Roboto,Helvetica,Arial,sans-serif'}
          />
        </Label>
      </ArgumentAxis>
      <Legend visible={false} />
    </Chart>
  );
};
export default DailyNutrientChartComponent;
