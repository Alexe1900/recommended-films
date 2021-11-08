import { HeaderContent } from "./components/header/header";
import { Layout, Typography } from "antd";
import { Form } from "./components/form/form";

import "antd/dist/antd.css";

import styles from "./App.module.css";
import React from "react";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const ws = new WebSocket("ws://localhost:1000");
  let [data, setData] = React.useState("");

  ws.onmessage = (e) => {
    setData(e.data);
  };

  return (
    <Layout className="layout, App">
      <Header className={styles.header}>
        <HeaderContent />
      </Header>
      <Content style={{ padding: "50px" }}>
        <Form ws={ws} />
        <Title>{data}</Title>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
