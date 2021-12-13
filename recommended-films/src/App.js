import { HeaderContent } from "./components/header/header";
import { BackTop, Layout, Typography } from "antd";
import { Form } from "./components/form/form";

import "antd/dist/antd.css";

import styles from "./App.module.css";
import React from "react";
import { Film } from "./shared/film/film";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const ws = new WebSocket("ws://rocky-savannah-28997.herokuapp.com/");
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

  const Comedies = () => (
    <>
      <Title>Recommended comedies:</Title>
      {data.comedy
        ? data.comedy.map((film, index) => (
            <Film data={film} key={index} ws={ws} />
          ))
        : null}
    </>
  );

  const SciFi = () => (
    <>
      <Title>Recommended sci-fi films:</Title>
      {data["sci-fi"]
        ? data["sci-fi"].map((film, index) => (
            <Film data={film} key={index} ws={ws} />
          ))
        : null}
    </>
  );

  const Entertainment = () => (
    <>
      <Title>Recommended entertainment films:</Title>
      {data.entertainment
        ? data.entertainment.map((film, index) => (
            <Film data={film} key={index} ws={ws} />
          ))
        : null}
    </>
  );

  const Adventure = () => (
    <>
      <Title>Recommended adventure films:</Title>
      {data.adventure
        ? data.adventure.map((film, index) => (
            <Film data={film} key={index} ws={ws} />
          ))
        : null}
    </>
  );

  const Drama = () => (
    <>
      <Title>Recommended dramas:</Title>
      {data.drama
        ? data.drama.map((film, index) => (
            <Film data={film} key={index} ws={ws} />
          ))
        : null}
    </>
  );

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
