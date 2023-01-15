import Select from "react-select";

const Index = ({ options, onChange, value }) => {
  return (
    <Select
      options={options}
      placeholder="בחירת קטגוריה"
      className="customSelect"
      onChange={onChange}
      defaultValue={value || null}
    />
  );
};

export default Index;
