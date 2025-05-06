import PageView from "../views/PageView";
import StatisticsChartView from "../views/StatisticsChartView";

function StatisticsChartPresenter(props) {
	return (
		<PageView title="Statistics">
			<StatisticsChartView />
		</PageView>
	);
}

export default StatisticsChartPresenter;
