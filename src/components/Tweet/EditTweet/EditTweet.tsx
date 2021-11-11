import { useTranslation } from "react-i18next";

// components
import TweetForm from "../TweetForm";
import Modal from "@components/Modal";

// types
import { iTweet } from "@type/tweet.types";

interface Props {
    tweet: iTweet;
    onCancel: () => void;
}

const EditTweet = ({ tweet, onCancel }: Props) => {
    const { t } = useTranslation();

    return (
        <Modal
            header={<h3>{t("editTweet")}</h3>}
            isOpen={true}
            body={<TweetForm tweet={tweet} onCancel={onCancel} />}
            onCancel={onCancel}
        />
    );
};

export default EditTweet;
