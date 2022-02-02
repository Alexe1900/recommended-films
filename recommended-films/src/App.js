import { HeaderContent } from "./components/header/header";
import { BackTop, Layout, Typography } from "antd";
import { Form } from "./components/form/form";

import "antd/dist/antd.css";

import styles from "./App.module.css";
import React from "react";
import { Film } from "./shared/film/film";
import { GenreBlock } from "./shared/GenreBlock/GenreBlock";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const ws = new WebSocket("wss://rocky-savannah-28997.herokuapp.com/");
  let [data, setData] = React.useState({
    comedy: null,
    "sci-fi": null,
    entertainment: null,
    adventure: null,
    drama: null,
  });

  ws.onmessage = (e) => {
    setData(JSON.parse(e.data));
    console.log(data);
  };

  const Comedies = GenreBlock('comedy', 'Recommended comedies:');
  const SciFi = GenreBlock('sci-fi', 'Recommended sci-fi films:');
  const Entertainment = GenreBlock('entertainment', 'Recommended entertainment films:');
  const Adventure = GenreBlock('adventure', 'Recommended adventure films:');
  const Drama = GenreBlock('drama', 'Recommended dramas:');

  return (
    <Layout className="layout, App">
      <BackTop />
      <Header className={styles.header}>
        <HeaderContent />
      </Header>
      <Content style={{ padding: "50px" }}>
        <Form ws={ws} />

        {data.comedy ? <Comedies /> : <></>}

        {data["sci-fi"] ? <SciFi /> : <></>}

        {data.entertainment ? <Entertainment /> : <></>}

        {data.adventure ? <Adventure /> : <></>}

        {data.drama ? <Drama /> : <></>}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
