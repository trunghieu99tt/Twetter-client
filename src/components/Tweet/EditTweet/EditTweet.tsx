import { useTranslation } from "react-i18next";

// components
import TweetForm from "../TweetForm";
const Modal = lazy(() => import("@components/Modal"));

// types
import { iTweet } from "@type/tweet.types";
import { lazy, Suspense } from "react";

interface Props {
  tweet: iTweet;
  onCancel: () => void;
}

const EditTweet = ({ tweet, onCancel }: Props) => {
  const { t } = useTranslation();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal
        header={<h3>{t("editTweet")}</h3>}
        isOpen={true}
        body={<TweetForm tweet={tweet} onCancel={onCancel} />}
        onCancel={onCancel}
      />
    </Suspense>
  );
};

export default EditTweet;
