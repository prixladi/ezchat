import api from '@lib/api';
import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import useLogout from './lib/hooks/useLogout';

const App: NextPage = () => {
  const { data } = useQuery(api.getCurrentUser.cacheKey, api.getCurrentUser);
  const logout = useLogout();

  if (data) {
    return (
      <div className="flex flex-col">
        <button
          type="button"
          onClick={async () => {
            await logout();
          }}
        >
          LOGOUT
        </button>
        
        <code>{JSON.stringify(data)}</code>
      </div>
    );
  }

  return null;
};

export default App;
