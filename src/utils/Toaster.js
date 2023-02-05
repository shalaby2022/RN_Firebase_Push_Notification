import Toast from 'react-native-root-toast';

export const toaster = (message, config) => {
  Toast.show(message, {
    visible: true,
    backgroundColor: config?.color,
    duration: config?.duration || 1000,
    position: 0,
    shadow: true,
    shadowColor: 'orange',
    animation: true,
    hideOnPress: true,
    delay: 0,
    textColor: '#fff',
  });
};
