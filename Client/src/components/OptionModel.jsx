function OptionModel({ item }) {
  return item.map((car) => (
    <option key={car} value={car} data-test={`option${car}`}>
      {car}
    </option>
  ));
}
export default OptionModel;
