import { extractMetadata } from "@utils/helper";
import { ChangeEvent, useEffect, useState } from "react";

type Params = {
  value: string;
  isEdit: boolean;
  onChangeValue: (value: string) => void;
};

export const useRichTextEditor = ({ value, isEdit, onChangeValue }: Params) => {
  const [urls, setUrls] = useState<string[]>([]);

  const updateUrls = (content: string) => {
    const { urls } = extractMetadata(content);
    if (urls && urls?.length > 0) {
      setUrls(urls);
    }
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    updateUrls(newValue);
    onChangeValue(newValue);
  };

  useEffect(() => {
    if (value) {
      updateUrls(value);
    }

    if (!value) {
      setUrls([]);
    }
  }, [isEdit, value]);

  const removeLinks = () => setUrls([]);

  return {
    urls,

    onChange,
    removeLinks,
  };
};
