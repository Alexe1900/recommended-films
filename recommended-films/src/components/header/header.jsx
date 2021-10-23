import { Typography, Divider } from 'antd';

import styles from './header.module.css'

const { Title, Text } = Typography;

const HeaderContent = function () {
  return (
    <>
      <Title className={styles.headerTitle}>Recommended Films</Title>
      <Divider className={styles.headerDivider} type="vertical" />
      <Text className={styles.headerText}>This is a page, where you rate different genres and get films you should like. You can also rate films.</Text>
    </>
  );
}

export { HeaderContent };