import { motion, AnimatePresence } from "framer-motion";

// style
import { Wrapper, DropdownList, DropdownListItem } from "./DropdownStyle";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    items?: any;
    isVisible?: boolean;
}

const Dropdown = ({ isVisible, items, children }: Props) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transformOrigin: "top right",
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0,
                    }}
                >
                    <Wrapper>
                        <DropdownList>
                            {items?.map((item: any, idx: number) => {
                                return (
                                    <DropdownListItem
                                        key={item.id || `dropdown-item-${idx}`}
                                    >
                                        {item}
                                    </DropdownListItem>
                                );
                            })}
                            {children}
                        </DropdownList>
                    </Wrapper>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Dropdown;
