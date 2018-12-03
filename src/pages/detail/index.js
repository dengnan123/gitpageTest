import React, { Component } from "react";
import { connect } from "dva";
import ReactMarkdown from "react-markdown";
// import router from "umi/router";
// import PropTypes from "prop-types";
import { Skeleton } from "antd";
import styles from "./index.less";

class Detail extends Component {
  componentDidMount() {
    const {
      location: {
        query: { id }
      },
      dispatch
    } = this.props;
    dispatch({
      type: "indexModel/getInfo",
      payload: {
        id
      }
    });
  }

  render() {
    const { loading, arr, list, info } = this.props;
    const isLoading = loading.effects["indexModel/getInfo"];
    return (
      <div className={styles.pageContent}>
        <Skeleton loading={isLoading} active>
          {info.body ? <ReactMarkdown source={info.body} /> : null}
        </Skeleton>
      </div>
    );
  }
}

function indexStateToProps(state) {
  const { loading } = state;
  const { info } = state.indexModel;
  return {
    loading,
    info
  };
}

export default connect(indexStateToProps)(Detail);
