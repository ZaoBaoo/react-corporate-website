import { TitleLogin } from '../../TitleLogin';
import { Link } from 'react-router-dom';
import { ButtonLogin } from '../../ButtonLogin';
import { ModalAndWrapper } from './ModalAndWrapper';
import { TextLogin } from '../../TextLogin';

const ResetPasswordComplete = () => {
  return (
    <ModalAndWrapper>
      <TitleLogin
        title="Успешно"
        style={{ marginBottom: '2rem', color: '#86c178' }}
      />
      <TextLogin
        text="Данные о сбросе пароля отправлены на почту. Если письмо не пришло, проверьте вкладку спам"
        style={{ marginBottom: '2.5rem' }}
      />

      <Link to="/login">
        <ButtonLogin mode="registration" name="Вернуться" />
      </Link>
    </ModalAndWrapper>
  );
};

export { ResetPasswordComplete };
