function deeplink() {
    const linking = {
        prefixes: ['gkash://'],
        initialRouteName: 'InitialPage',
        config: {
          screens: {
            InitialPage: {
              path: 'InitialPage',
            },
            ResponsePage: {
              path: 'returntoapp'
            }

          }
        }
    };

    return linking;
}

export default deeplink
