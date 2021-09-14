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
    return (
        <Modal
            header={<h3>Edit Tweet</h3>}
            isOpen={true}
            body={<TweetForm tweet={tweet} onCancel={onCancel} />}
            onCancel={onCancel}
        />
    );
};

export default EditTweet;
