export const AnswerComponent = (props:
    { 
        answer: string[];
        onSelect: (answer: string) => void;
    }
  ) => {

  function handleClick(value:string) {
    props.onSelect(value);
  }
  

  return (
    <div>
      <button onClick={() => handleClick(props.answer[0])}>
        <p>{props.answer[0]}</p>
      </button>
      <button onClick={() => handleClick(props.answer[1])}>
        <p>{props.answer[1]}</p>
      </button>
      <button onClick={() => handleClick(props.answer[2])}>
        <p>{props.answer[2]}</p>
      </button>
      <button onClick={() => handleClick(props.answer[3])}>
        <p>{props.answer[3]}</p>
      </button>
    </div>
  );
}
