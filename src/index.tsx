import {StrictMode, useEffect, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import BootSplash from 'react-native-bootsplash';

import AppRouter from '@routers';

const queryClient = new QueryClient();

export default function App() {
  useEffect(function () {
    const init = async function () {};

    init().finally(async function () {
      await BootSplash.hide({fade: true});
    });
  }, []);

  const linking = useMemo(function () {
    return {
      prefixes: ['myzet://', 'https://myzet.shop'],
      config: {
        screens: {
          Home: '',
        },
      },
    };
  }, []);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <SafeAreaProvider>
            <NavigationContainer linking={linking}>
              <AppRouter />
            </NavigationContainer>
          </SafeAreaProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </StrictMode>
  );
}
