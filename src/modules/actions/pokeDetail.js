import {
  LOAD_DETAIL_SUCCESS,
  LOAD_DETAIL_FAILURE,
} from '../constants';
import { push } from 'connected-react-router';
// START LOAD
const loadDetailSuccess = ({ results = {}, index }) => ({
  type: LOAD_DETAIL_SUCCESS,
  pokemonDetail: results,
  index
});

const loadDetailFailed = () => ({ type: LOAD_DETAIL_FAILURE });

export function loadDetail({ url }, cb = () => { }) {
  return dispatch => {
    fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(results => {
        dispatch(loadDetailSuccess({ results }));
        dispatch(push('/details'))
        cb();
      })
      .catch(() => {
        dispatch(loadDetailFailed());
        cb();
      });
  };
}
// END LOAD

