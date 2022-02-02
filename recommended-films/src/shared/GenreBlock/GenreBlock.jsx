import styles from "./GenreBlock.module.css";
import { Film } from "../film/film";

import { Typography } from 'antd';
const { Title } = Typography;

const GenreBlock = (genre, message) => (
  <>
    <Title>{message}</Title>
    {data[genre]
    ? data[genre].map((film, index) => (
      <Film data={film} key={index} ws={ws} />
      ))
    : null}
  </>
);

export { GenreBlock };