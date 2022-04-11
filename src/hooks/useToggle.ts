import { useState } from "react";

const useToggle = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const onShow = () => setVisible(true);

  const onHide = () => {
    setVisible(false);
  };

  const onToggle = () => {
    setVisible((value) => !value);
  };

  return {
    visible,
    onShow,
    onHide,
    onToggle,
  };
};

export { useToggle };
