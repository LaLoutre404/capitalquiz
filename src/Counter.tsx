import { useState } from "react";

type CounterProps = {
  onChange?: (count: number) => void;
  defaultValue?: number;
};

export const Counter = ({ onChange, defaultValue }: CounterProps) => {
  const [count, setCount] = useState<number>(defaultValue ?? 0);

  const handleCountChange = (add: number) => {
    setCount((curr) => curr + add);
    onChange?.(count + add);
  };

  return (
    <div>
      <button onClick={() => handleCountChange(+1)}>+</button>
      <span>{count}</span>
      <button onClick={() => handleCountChange(-1)}>-</button>
    </div>
  );
};
