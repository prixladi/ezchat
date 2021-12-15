import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import api from '../../api';
import useLogout from '../../hooks/useLogout';

const App: NextPage = () => {
  const { data } = useQuery(api.getCurrentUser.cacheKey, api.getCurrentUser);
  const logout = useLogout();

  if (data) {
    return (
      <div
        className="flex flex-col"
        onClick={async () => {
          await logout();
        }}
      >
        <code>{JSON.stringify(data)}</code>
        <button>LOGOUT</button>
      </div>
    );
  }

  return null;
};

export default App;
