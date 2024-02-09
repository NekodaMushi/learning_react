import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";

function CityList({ isLoading, cities }) {
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      <cities.map(city=> <CityItem city />))
    </ul>
  );
}

export default CityList;
