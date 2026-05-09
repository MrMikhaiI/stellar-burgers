import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, getUserError } from '../../services/user-slice';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATHS } from '../../utils/constants';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(getUserError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        const from = location.state?.from?.pathname || PATHS.HOME;
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <LoginUI
      errorText={error ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
