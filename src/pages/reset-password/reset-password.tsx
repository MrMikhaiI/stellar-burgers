import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { resetPassword, getUserError } from '../../services/user-slice';
import { ResetPasswordUI } from '@ui-pages';
import { PATHS } from '../../utils/constants';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const error = useSelector(getUserError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token })).then((result) => {
      if (resetPassword.fulfilled.match(result)) {
        localStorage.removeItem('resetPassword');
        navigate(PATHS.LOGIN, { replace: true });
      }
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate(PATHS.FORGOT_PASSWORD, { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error ?? ''}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
