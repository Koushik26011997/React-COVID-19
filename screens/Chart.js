import {useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {LineChart, PieChart, ProgressChart} from 'react-native-chart-kit';
import Spinner from 'react-native-loading-spinner-overlay';
import {request} from '../service/common';
import {SCREEN_WIDTH, showFlashMessage} from '../utility/MyUtility';

const Chart = ({navigation}) => {
  const {colors, custom} = useTheme();
  let pieData = [];
  const [loader, setLoader] = React.useState(false);
  const [chartData, setChartData] = React.useState([]);
  const [data, setData] = React.useState({});

  useEffect(() => {
    getCurrentData();
  }, []);

  const getCurrentData = async () => {
    try {
      setLoader(true);
      let response = await request('get', 'data.json');
      await setData(response.data.statewise[0]);
      console.log('data', data);
      calaculateData();
      setLoader(false);
    } catch (e) {
      setLoader(false);
      console.log(e);
      showFlashMessage(e, '', 'danger');
    }
  };

  const calaculateData = () => {
    pieData = [
      {
        name: 'Confirmed',
        population: parseInt(data?.confirmed),
        color: custom.confirm,
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Active',
        population: parseInt(data?.active),
        color: '#007bff',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Recovered',
        population: parseInt(data?.recovered),
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Deaths',
        population: parseInt(data?.deaths),
        color: '#ffffff',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      // {
      //   name: 'Vaccination',
      //   population: 11920000,
      //   color: 'rgb(0, 0, 255)',
      //   legendFontColor: '#7F7F7F',
      //   legendFontSize: 15,
      // },
    ];

    setChartData(pieData);
  };
  const chartConfig = {
    backgroundColor: '#e26a00',
    // backgroundGradientFrom: '#fb8c00',
    // backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {loader ? (
        <Spinner visible={loader} />
      ) : (
        <PieChart
          data={chartData}
          width={SCREEN_WIDTH}
          height={220}
          chartConfig={chartConfig}
          accessor={'population'}
          sbackgroundColor={'transparent'}
          center={[10, 50]}
          absolute
        />
      )}
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({});
