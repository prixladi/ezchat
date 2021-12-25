import api from '@lib/api';
import type { NextPage } from 'next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useLogout from './lib/hooks/useLogout';

const App: NextPage = () => {
  const client = useQueryClient();
  const { data: userData } = useQuery(api.getCurrentUser.cacheKey, api.getCurrentUser);
  const { data: channelsData } = useQuery(api.getCurrentChannels.cacheKey, api.getCurrentChannels);
  const { mutateAsync: createChanel } = useMutation(api.createChannel);

  const logout = useLogout();

  if (userData && channelsData) {
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
        <button
          type="button"
          onClick={async () => {
            await createChanel({ name: 'jack', description: "aaaa" });
            client.removeQueries({ queryKey: api.getCurrentChannels.cacheKey });
          }}
        >
          New channel
        </button>
        <code>{JSON.stringify(userData)}</code>
        <code>{JSON.stringify(channelsData)}</code>
      </div>
    );
  }

  return null;
};

export default App;
