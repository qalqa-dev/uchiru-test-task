import { useCatStore } from '@/stores/catStore';
import { ROUTES } from '@/utils/routes';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.scss';

const Auth = () => {
  const { userApiKey, setApiKey } = useCatStore();
  const isAuthed = !!userApiKey;

  const [inputKey, setInputKey] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setInputKey(event.currentTarget.value);
  };

  const handleAuth = () => {
    if (inputKey === '') {
      setError('Вы не ввели ключ!');
      return;
    }
    setApiKey(inputKey);
    navigate(ROUTES.BREEDS);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isAuthed ? (
          <>
            <h2 className={styles.title}>Вы авторизованы!</h2>
            <Link to={ROUTES.BREEDS} className={styles.button}>
              По породам
            </Link>
          </>
        ) : (
          <>
            <h2 className={styles.title}>Авторизация</h2>
            <div>
              <label className={styles.label} htmlFor="apiKey">
                Вставьте ваш API key
              </label>
              <input
                value={inputKey}
                onInput={(e) => handleInput(e)}
                className={styles.input}
                id="apiKey"
                type="text"
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>
            <button onClick={() => handleAuth()} className={styles.button}>
              Подтвердить ключ
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
