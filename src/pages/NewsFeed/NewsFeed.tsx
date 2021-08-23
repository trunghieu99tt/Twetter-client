// layout
import MainLayout from "../../layout/Main/Main.layout";

// styles
import { NewsFeedContainer } from "./newsFeed.style";

interface Props {}

const NewsFeed = (props: Props) => {
    return <NewsFeedContainer>This is new feed</NewsFeedContainer>;
};

export default MainLayout(NewsFeed);
