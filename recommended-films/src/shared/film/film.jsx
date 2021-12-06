import React from 'react';
import { Button, Typography, Modal, Rate } from 'antd';

import styles from './film.module.css'

const { Title, Paragraph } = Typography;

const Film = ({ data, ws }) => {
  let [isModalVisible, setIsModalVisible] = React.useState(false);
  let [rating, setRating] = React.useState(
                                            data.rating === 'No rating' ?
                                            0 :
                                            (
                                              localStorage.getItem(String(data.id)) ?
                                              localStorage.getItem(String(data.id)) :
                                              data.rating
                                            )
                                          );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.film}>
      <img
        className={styles.filmImg}
        src={data.img}
        alt={data.title}
      />
      <Title className={styles.filmTitle}>
        {data.title}
      </Title>
      <Rate
        className={styles.filmRate}
        value={rating}
        onChange={
          (newRating) => {
            setRating(newRating);
            localStorage.setItem(String(data.id), String(newRating))
            console.log(data.id);
            ws.send(JSON.stringify({
              type: 'NEWRATING',
              data: {
                id: data.id,
                newRating: newRating
              }
            }))
          }
        }
      />
      <Button size="large" className={styles.learnMoreButton} type="ghost" onClick={showModal}>Learn more</Button>
      <Modal className={styles.learnMoreModal} title={data.title} visible={isModalVisible} onCancel={handleCancel} footer={null} centered>
        <div className={styles.learnMoreContent}>
          <img className={styles.filmImg} src={data.img} alt={data.title} />
          <Paragraph className={styles.filmDescripion}>{data.description}</Paragraph>
        </div>
      </Modal>
    </div>
  )
}

export { Film };