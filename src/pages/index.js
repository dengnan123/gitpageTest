import React, { Component } from "react";
import { connect } from "dva";
import router from "umi/router";
// import PropTypes from "prop-types";
import { Row, Col, Card, Skeleton } from "antd";
import styles from "./index.less";

class FleetList extends Component {
  click = id => {
    router.push(`/detail?id=${id}`);
  };

  render() {
    const { loading, arr, list } = this.props;
    const isLoading = loading.effects["indexModel/getList"];
    return (
      <div className={styles.pageContent}>
        <Skeleton loading={isLoading} active>
          <Row type="flex" justify="center">
            <Col span={24}>
              {list.map(value => {
                return (
                  <Card
                    key={value.id}
                    title={value.title}
                    bordered={false}
                    className={styles.cardSpan}
                    onClick={() => {
                      this.click(value.number);
                    }}
                  >
                    {value.body.slice(0, 45)}
                  </Card>
                );
              })}
            </Col>
          </Row>
        </Skeleton>
        {arr.map((value, index) => {
          return (
            <Skeleton loading={isLoading} active key={index}>
              {""}
            </Skeleton>
          );
        })}
      </div>
    );
  }
}

function indexStateToProps(state) {
  const { loading } = state;
  const { list, count } = state.indexModel;
  const arr = Array(15).fill(0);
  return {
    loading,
    list,
    count,
    arr
  };
}

export default connect(indexStateToProps)(FleetList);
