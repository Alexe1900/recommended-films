import { HeaderContent } from "./components/header/header";

import { Layout } from "antd";
import "antd/dist/antd.css";

import styles from "./App.module.css";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout, App">
      <Header className={styles.header}>
        <HeaderContent />
      </Header>
      <Content style={{ padding: "50px" }}></Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
