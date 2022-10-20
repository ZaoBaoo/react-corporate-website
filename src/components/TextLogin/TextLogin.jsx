import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './TextLogin.module.scss';

const TextLogin = ({
  text = '',
  linkedText,
  position,
  linkedTo,
  ...otherProps
}) => {
  const { textLogin, textLinkedLogin, right, left, margin } = styles;

  return (
    <div
      className={cn(margin, {
        [right]: position === 'right',
        [left]: position === 'left'
      })}
      {...otherProps}
    >
      <span className={textLogin}>{text}</span>
      {linkedText && (
        <Link to={linkedTo}>
          <span className={textLinkedLogin}>{linkedText}</span>
        </Link>
      )}
    </div>
  );
};

export { TextLogin };
