// talons
import { useAddTweet } from "./useAddTweet";

// components
import AudienceSelector from "@components/AudienceSelector";

// icons
import { BsCardImage } from "react-icons/bs";

// data
import { user } from "../../mocks/user.data";

// styles
import {
    Main,
    HeadLine,
    Wrapper,
    TweetContentInput,
    FileInput,
    FileLabel,
    TweetSubmitButton,
    TweetContentInputWrapper,
    Footer,
    TweetImageWrapper,
    TweetImage,
    ImageLeftPlaceHolder,
} from "./AddTweetStyle";
import { Flex, UserAvatarSmall } from "@shared/style/sharedStyle.style";

type modeType = "block" | "flex" | "grid" | "none";

const AddTweet = () => {
    const {
        loading,
        content,
        audience,
        imagesPreview,
        // onCancelImage,
        onSubmit,
        setAudience,
        onChangeFile,
        onChangeContent,
    } = useAddTweet();

    let imageViewMode: modeType = "none";
    const imagesLen = imagesPreview?.length;

    if (imagesLen > 2) {
        imageViewMode = "grid";
    } else if (imagesLen > 1) {
        imageViewMode = "flex";
    } else if (imagesLen > 0) {
        imageViewMode = "block";
    }

    const imageLeft = Math.max(0, imagesLen - 5);

    return (
        <Wrapper>
            <HeadLine>Tweet something</HeadLine>
            <Main>
                <UserAvatarSmall src={user?.avatar} alt={user?.name} />
                <div>
                    <TweetContentInputWrapper>
                        <TweetContentInput
                            value={content}
                            name="tweet-content"
                            onChange={onChangeContent}
                            placeholder="What's on your mind?"
                        />
                    </TweetContentInputWrapper>
                    <TweetImageWrapper mode={imageViewMode}>
                        {imagesPreview?.length > 0 &&
                            imagesPreview
                                .slice(0, Math.min(5, imagesLen))
                                .map((image, index) => (
                                    <TweetImage
                                        key={`add-tweet-file-image-${index}`}
                                        src={image}
                                        alt={`add-tweet-file-image-${index}`}
                                    />
                                ))}
                        {imageLeft && (
                            <ImageLeftPlaceHolder>
                                {imageLeft}+
                            </ImageLeftPlaceHolder>
                        )}
                    </TweetImageWrapper>
                    <Footer>
                        <Flex gap="1.5rem">
                            <FileLabel htmlFor="tweet-file">
                                <BsCardImage />
                            </FileLabel>
                            <FileInput
                                type="file"
                                id="tweet-file"
                                onChange={onChangeFile}
                                multiple
                            />
                            <AudienceSelector
                                audience={audience}
                                setAudience={setAudience}
                            />
                        </Flex>
                        <TweetSubmitButton
                            onClick={onSubmit}
                            disabled={loading}
                        >
                            Tweet
                        </TweetSubmitButton>
                    </Footer>
                </div>
            </Main>
        </Wrapper>
    );
};

export default AddTweet;
