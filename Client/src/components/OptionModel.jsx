function OptionModel({ item }) {
  return item.map((car) => (
    <option key={car} value={car}>
      {car}
    </option>
  ));
}
export default OptionModel;
