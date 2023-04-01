import '../../../../static/css/NutritionLabel.css';
import { Series, Label, Legend, Font } from 'devextreme-react/pie-chart';
import {
  ArgumentAxis,
  Chart,
  CommonAxisSettings,
  ValueAxis,
} from 'devextreme-react/chart';
import capitalize from '../../../../helpers/capitalize';
import formatNutrientLabelText from './helpers/formatNutrientLabelText';
const DailyNutrientChartComponent = (props) => (
  <Chart dataSource={props.dataSource}>
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
      visualRange={{ startValue: 0, endValue: 1.0 }}
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
export default DailyNutrientChartComponent;
