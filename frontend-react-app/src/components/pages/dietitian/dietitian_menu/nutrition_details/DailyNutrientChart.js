import Grid from '@mui/material/Grid';
import DailyNutrientChartComponent from './DailyNutrientChartComponent';
const DailyNutrientChart = (props) => {
  const nutrientChartsToReturn = (() => {
    if (props.customTheme.largerScreen()) {
      const halfIndex = Math.ceil(props.dataSource.length / 2);
      return (
        <>
          <Grid item xs={11.5}>
            <DailyNutrientChartComponent
              customTheme={props.customTheme}
              dataSource={props.dataSource.slice(0, halfIndex)}
            ></DailyNutrientChartComponent>
          </Grid>
          <Grid item xs={11.5}>
            <DailyNutrientChartComponent
              customTheme={props.customTheme}
              dataSource={props.dataSource.slice(halfIndex)}
            ></DailyNutrientChartComponent>
          </Grid>
        </>
      );
    } else {
      const indexArray = [];
      const numberOfGraphs = (() => {
        if (props.customTheme.mediumScreen()) {
          return 3;
        } else if (props.customTheme.smallScreen()) {
          return 4;
        } else if (
          props.customTheme.extraSmallScreen() ||
          props.customTheme.extraExtraSmallScreen()
        ) {
          return 7;
        }
      })();
      const findMostEqualSizedIndices = (
        indexArrayParam,
        numberOfGraphsParam
      ) => {
        if (indexArrayParam.length === numberOfGraphsParam - 1) {
          return indexArrayParam;
        } else if (indexArrayParam.length > 0) {
          const remainingIndices = numberOfGraphsParam - indexArrayParam.length;
          const currentIndex = indexArrayParam[indexArrayParam.length - 1];

          const remainingValueToDistribute =
            props.dataSource.length - currentIndex;
          const newIndex =
            Math.ceil(remainingValueToDistribute / remainingIndices) +
            currentIndex;
          indexArrayParam.push(newIndex);
          return findMostEqualSizedIndices(
            indexArrayParam,
            numberOfGraphsParam
          );
        } else {
          const newIndex = Math.ceil(
            props.dataSource.length / numberOfGraphsParam
          );
          indexArrayParam.push(newIndex);
          return findMostEqualSizedIndices(
            indexArrayParam,
            numberOfGraphsParam
          );
        }
      };

      const dataSourceIndices = findMostEqualSizedIndices(
        indexArray,
        numberOfGraphs
      );
      return (
        <>
          {dataSourceIndices.map((index, i) => (
            <Grid item xs={12} key={i}>
              <DailyNutrientChartComponent
                customTheme={props.customTheme}
                dataSource={props.dataSource.slice(
                  i === 0 ? 0 : dataSourceIndices[i - 1],

                  index
                )}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <DailyNutrientChartComponent
              customTheme={props.customTheme}
              dataSource={props.dataSource.slice(
                dataSourceIndices[dataSourceIndices.length - 1]
              )}
            />
          </Grid>
        </>
      );
    }
  })();
  return nutrientChartsToReturn;
};
export default DailyNutrientChart;
