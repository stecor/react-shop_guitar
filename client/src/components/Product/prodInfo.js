import React from 'react';
import MyButton from '../utils/button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdInfo = (props) => {

    const detail = props.detail;

  return(
  <div>
      <h2>{detail.brand.name} {detail.name}</h2>
      <p>
        {detail.description}
      </p>
  </div>
)};

export default ProdInfo;
