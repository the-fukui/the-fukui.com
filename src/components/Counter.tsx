import { useSignal, useComputed } from '@preact/signals';

export default function CounterWithSignals() {
  const count = useSignal(0);
  const double = useComputed(() => count.value * 2);

  return (
    <button onClick={() => count.value++}>
      {count} x 2 = {double}
    </button>
  );
}
