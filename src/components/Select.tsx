import React from "react";
import { useAppDispatch } from "../store/hooks";
import { fetchBooks, setParamsSearch } from "../store/slices/bookSlice";

type TSelect = {
  title: string;
  name: string;
  items: string[];
};

const Select: React.FC<TSelect> = React.memo(({ title, name, items }) => {
  const dispatch = useAppDispatch();

  const onChangeSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setParamsSearch([e.target.value, e.target.name]));
    dispatch(fetchBooks());
  };

  return (
    <div className="header-select__item">
      <label htmlFor="selectId">{title}</label>
      <select name={name} id="selectId" onChange={onChangeSelectValue}>
        {items.map((item, index) => (
          <option key={index} value={item} defaultValue={items[0]}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
