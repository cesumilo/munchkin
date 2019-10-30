import React from 'react';
import { Spinner } from 'react-bootstrap';

export default ({ loading, children }) => {
  if (loading) {
    return <Spinner animation="border" variant="warning" />;
  }
  return children;
};
