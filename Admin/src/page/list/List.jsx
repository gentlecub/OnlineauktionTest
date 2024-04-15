import "./list.css";
import SideBar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
export default function List() {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
}
