import PieChart, {
  Series,
  Label,
  Connector,
  Export,
  Legend,
  Animation,
  Font,
} from 'devextreme-react/pie-chart';
import formatPoint from './helpers/formatPoint';
const MacrosPieChart = (props) => {
  const formatMacroLabelText = (arg) => {
    if (arg.point.data.id === 'protein') {
      props.setProteinColor(arg.point.getColor());
    } else if (arg.point.data.id === 'fat') {
      props.setFatColor(arg.point.getColor());
    } else if (arg.point.data.id === 'carb') {
      props.setCarbColor(arg.point.getColor());
    }
    return arg.percentText;
  };

  return (
    <PieChart
      id="pie"
      dataSource={props.mealPlanMeal.chartMacroData}
      palette="Bright"
      customizePoint={formatPoint}
    >
      <Series argumentField="id" valueField="proportion">
        <Label
          visible={true}
          customizeText={formatMacroLabelText}
          position="outside"
        >
          <Font size={14} weight={600} />
          <Connector visible={true} width={0.5} />
        </Label>
      </Series>
      <Export enabled={false} />
      <Legend visible={false} />
      <Animation enabled={false} />
    </PieChart>
  );
};
export default MacrosPieChart;
