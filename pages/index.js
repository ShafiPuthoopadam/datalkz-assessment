import {
  Breadcrumb,
  Icon,
  Row,
  Col,
  Layout
} from 'antd';
import Link from 'next/link';
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';
import CustomTable from "../components/CustomTable";
import TableHeader from "../components/TableHeader";
import "../style.less";

const store = configureStore();
const { Header } = Layout;

export default () => (
  <Provider store={store}>
    <Layout>
      <Header>
        <Row justify="space-around" type="flex">
          <Col span={20}>
            <Row justify="space-around" type="flex">
              <Col span={12} md={12} xs={24}>
                <h4>Welcome to My Assesment</h4>
              </Col>
              <Col span={12} md={12} xs={0}>
                <span className="ml-30 float-right">
                  <Icon type="phone" theme="filled" /> Call us 09-886-167582
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>

      <Row justify="space-around" type="flex">
        <Col span={20} style={{ marginTop: '10px'}}>
          <Breadcrumb>
            <Breadcrumb.Item href="">
              <Icon type="home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="">
              <Icon type="table" />
              <span>Table</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row justify="space-around" type="flex">
        <TableHeader/>
        <Col span={20} style={{ paddingBottom: '40px' }}>
          <CustomTable/>
        </Col>
      </Row>

      <Row justify="space-around" type="flex" style={{ background: '#f9f9f9', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Col md={8} xs={20} style={{height: '40px', display: 'flex'}}>
          <div style={{ margin: 'auto 0px' }}>
            &copy; 2019 assessment
          </div>
        </Col>
        <Col md={8} xs={20}>
          <div style={{ margin: 'auto', height: '40px', display: 'flex', justifyContent: 'flex-end' }}>
            <Icon style={{ margin: 'auto 10px', fontSize: 20 }} type="facebook" />
            <Icon style={{ margin: 'auto 10px', fontSize: 20 }} type="instagram" />
            <Icon style={{ margin: 'auto 10px', fontSize: 20 }} type="google" />
          </div>
        </Col>
      </Row>
    </Layout>
  </Provider>
)
