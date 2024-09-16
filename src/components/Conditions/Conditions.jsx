import { conditionsData } from './constants';
import styles from './styles.module.css';

const Conditions = () => {
  return (
    <ul>
      {conditionsData.map((item) => (
        <li className={styles.item}>
          {item.icon} <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default Conditions;
