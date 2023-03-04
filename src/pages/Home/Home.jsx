import BarChart from "../../components/BarChart/BarChart";
import TodoMain from "../../components/TodoMain/TodoMain";
import "./Home.css"

const Home = () => {
  return (
    <div className="home-main">
      <BarChart />
      <TodoMain />
    </div>
  );
};

export default Home;
