import QueryString from 'query-string';

export default {
  getFirebaseId() {
    const params = QueryString.parse(location.search);
    return params.id;
  }
}