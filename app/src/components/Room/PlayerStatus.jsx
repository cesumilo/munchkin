import React from 'react';

export default ({ status }) => (
  <div className={`player-status player-${status ? '' : 'not-'}ready`} />
);
