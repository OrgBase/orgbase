import React, { useState } from 'react';

const Countdown = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount)
  React.useEffect(() => {
    count > 1 && setTimeout(() => setCount(count - 1), 1000);
  }, [count]);

  return <span>{count}</span>
}

export default Countdown;