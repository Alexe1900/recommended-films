import React from 'react';
import { Button, Typography, Modal } from 'antd';

import styles from './film.module.css'

const { Title, Paragraph } = Typography;

const Film = ({ data }) => {
  let [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.film}>
      <img className={styles.filmImg} src={data.img} alt={data.title} />
      <Title className={styles.filmTitle}>{data.title}</Title>
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