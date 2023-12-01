import { useReducer } from "react";

const reducer = (state, target) => {
  return {
    ...state,
    [target.name]: target.value,
  };
};

const MyReducer = () => {
  const [state, dispatch] = useReducer(reducer, { name: "", age: "" });
  const { name, age } = state;

  const onChange = (e) => {
    dispatch(e.target);
  };
  return (
    <>
      <div>
        안녕하세요. 제 이름은 {name}이고, 나이는 {age}살 입니다.
      </div>
      <input name="name" value={name} onChange={onChange} />
      <input name="age" value={age} onChange={onChange} />
    </>
  );
};

export default MyReducer;
