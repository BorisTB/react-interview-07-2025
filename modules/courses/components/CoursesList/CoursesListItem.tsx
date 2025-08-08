import styles from './CoursesListItem.module.scss';

type Props = {
  title: string;
  onRemove?: () => void;
};

const CoursesListItem: React.FC<Props> = ({ title, onRemove }) => {
  return (
    <li className={styles['courses-list-item']}>
      {title}
      <button onClick={onRemove}>remove course</button>
    </li>
  );
};

export default CoursesListItem;
