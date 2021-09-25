import React from 'react';
import ReactTooltip from 'react-tooltip';
import { IconInfo } from './icon';

export const Tooltip = ({ tooltipText }) => (
  <div className="tooltip">
    <IconInfo data-tip={tooltipText} />
    <ReactTooltip
      effect="solid"
      multiline={true}
    />
  </div>
);