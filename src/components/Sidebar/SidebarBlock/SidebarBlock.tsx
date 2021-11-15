// styles
import { Content, Header, Wrapper } from "./SidebarBlockStyle";

interface Props {
    title: string;
    content: any;
}

const SidebarBlock = ({ title, content }: Props) => {
    return (
        <Wrapper>
            <Header>{title}</Header>
            <Content>{content}</Content>
        </Wrapper>
    );
};

export default SidebarBlock;
