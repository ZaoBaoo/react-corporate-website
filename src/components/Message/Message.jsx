import React from 'react';
import ReactTooltip from 'react-tooltip';
import cn from 'classnames';

// Styles
import styles from './Message.module.scss';

const Message = (props) => {
  const { position, text, time, date } = props;
  return (
    <div
      className={cn({
        [styles.messageLeft]: position === 'left',
        [styles.messageRight]: position === 'right'
      })}
    >
      <div className={styles.messageBlock}>
        <div className={styles.messageText}>{text}</div>
        <div data-tip={date} className={styles.messageDate}>
          {time}
        </div>
        <ReactTooltip
          className={styles.messageTooltip}
          place="bottom"
          offset={{ top: 12 }}
        />
      </div>
    </div>
  );
};

export { Message };
