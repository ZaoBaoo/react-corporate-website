import { useEffect } from 'react';
import { Preloader } from '../../Preloader/';

// STORE
import { registrationAction } from '../../../store/slice/registrationSlice';
import { useDispatch, useSelector } from 'react-redux';

// SCSS
import styles from './LoginAndRegistration.module.scss';

const ModalAndWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.registration);

  // const isLoading = true;

  useEffect(() => {
    setTimeout(() => {
      dispatch(registrationAction.stopLoading());
    }, 1000);
  }, [dispatch]);

  return (
    <div className={styles.blockWrapper}>
      {isLoading && <Preloader />}
      {!isLoading && <div className={styles.modal}>{children}</div>}
    </div>
  );
};

export { ModalAndWrapper };
