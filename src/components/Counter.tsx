import { useComputed, useSignal } from '@preact/signals'

import styles from './index.module.scss'

export default function CounterWithSignals() {
  const count = useSignal(0)
  const double = useComputed(() => count.value * 2)

  return (
    <button onClick={() => count.value++} className={styles.test}>
      {count} x 2 = {double}
    </button>
  )
}
