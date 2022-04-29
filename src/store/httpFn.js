/**
 * Created by Rick on 2019/11/13.
 */
import store from './index';

function httpFn(commitName, apiFn, payload) {
  return new Promise((resolve, reject) => {
    apiFn(payload)
      .then((res) => {
        if (commitName) {
          store.commit(commitName, res);
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export default httpFn;
