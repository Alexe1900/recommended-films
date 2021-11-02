import React from 'react'
import { Steps, Button, message, Input, Rate, Typography } from 'antd';
import { UserOutlined, DislikeFilled, FrownFilled, MehFilled, SmileFilled, LikeFilled } from '@ant-design/icons';

import styles from './form.module.css';
import './form.css'

const { Step } = Steps;
const { Title } = Typography;

const Form = () => {
  const [data, setData] = React.useState({
    'name': '',
    'comedy': 3,
    'sci-fi': 3,
    'entertainment': 3,
    'adventure': 3,
    'drama': 3,
  })

  const customIcons = {
    1: <DislikeFilled />,
    2: <FrownFilled />,
    3: <MehFilled />,
    4: <SmileFilled />,
    5: <LikeFilled />,
  };

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  const RateComponent = ({genre}) => (
      <>
        <Title level={2}>Please rate genre: {genre}</Title>
        <Rate 
          className={styles.formRate} 
          defaultValue={data[genre]} 
          character={({ index }) => customIcons[index + 1]}
          tooltips={desc} 
          allowClear={false} 
          onChange={(number) => {
            setData(() => Object.assign({}, data, {
              [genre]: number
            }));
          }} 
        />
      </>
    )
  ;

  const steps = [
    {
      title: 'Type your name',
      content: (
        <Input
          className={styles.nameInput}
          value={data['name']}
          size="large"
          placeholder="Type your name here"
          prefix={<UserOutlined />}
          onChange={(e) => {
            setData(Object.assign({}, data, {'name': e.target.value}));
            e.target.focus({cursor: 'end'});
          }}
        />
      )
    },
    {
      title: 'Rate genre: Comedy',
      content: (
        <RateComponent genre={'comedy'} />
      )
    },
    {
      title: 'Rate genre: Sci-fi',
      content: (
        <RateComponent genre={'sci-fi'} />
      )
    },
    {
      title: 'Rate genre: Entertainment',
      content: (
        <RateComponent genre={'entertainment'} />
      )
    },
    {
      title: 'Rate genre: Adventure',
      content: (
        <RateComponent genre={'adventure'} />
      )
    },
    {
      title: 'Rate genre: Drama',
      content: (
        <RateComponent genre={'drama'} />
      ),
    },
  ];

  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className={styles.stepsContent}>{steps[current].content}</div>
      <div className={styles.stepsAction}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => {
            message.success('Your data filled!');
            console.log(data);
          }
          }>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export { Form }