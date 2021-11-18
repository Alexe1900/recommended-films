import { Typography } from 'antd';

import styles from './film.module.css'

const { Title } = Typography;

const Film = ({ data }) => {
  return (
    <div className={styles.film}>
      <img className={styles.filmImg} src={data.img} alt={data.title} />
      <Title className={styles.filmTitle}>{data.title}</Title>
    </div>
  )
}

export { Film };