import { motion, AnimatePresence } from "framer-motion";

// style
import { Wrapper, DropdownList, DropdownListItem } from "./DropdownStyle";

interface Props {
    isVisible?: boolean;
    items: any;
}

const Dropdown = ({ isVisible, items }: Props) => {
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
                        </DropdownList>
                    </Wrapper>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Dropdown;
