import * as indexService from "../service/index";

export default {
  namespace: "indexModel",

  state: {
    list: [],
    count: 0,
    id: "",
    info: {}
  },

  reducers: {
    default(state) {
      return { ...state };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveInfo(state, { payload }) {
      const { list } = state;
      let obj = {};
      for (const value of list) {
        const { id } = value;
        if (id === payload.id) {
          obj = { ...value };
        }
      }
      return { ...state, ...{ info: obj } };
    },
    clearModel(state) {
      const obj = {};
      return { ...state, ...obj };
    },
    clear() {
      return {};
    }
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const res = yield call(indexService.getList, payload);
      if (res) {
        console.log("res", res);
        // const { list, count } = res.RESULT;
        yield put({
          type: "save",
          payload: {
            list: res
          }
        });
      } else {
        yield put({
          type: "save",
          payload: {}
        });
      }
    },
    *getInfo({ payload }, { call, put }) {
      const res = yield call(indexService.getInfo, payload);
      if (res) {
        yield put({
          type: "save",
          payload: {
            info: res
          }
        });
      } else {
        yield put({
          type: "save",
          payload: {}
        });
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === "/") {
          dispatch({
            type: "getList",
            payload: {}
          });
        }
      });
    }
  }
};
