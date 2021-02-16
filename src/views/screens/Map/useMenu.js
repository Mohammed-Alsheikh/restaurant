import {useState} from 'react';

export default () => {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);
  const onPress = () => setVisible(true);

  return {
    visible,
    onDismiss,
    onPress,
  };
};
