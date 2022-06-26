import { iUser } from "@type/user.types";
import mergeClasses from "@utils/mergeClasses";
import {
  Mention,
  MentionsInput as LibMentionInput,
  SuggestionDataItem,
} from "react-mentions";
import defaultClasses from "./mentionInput.module.css";
import { UserService } from "services/user.service";
import { useState } from "react";

type Props = {
  onChange?: (newValue: string) => void;
  value?: string;
  disabled?: boolean;
  classes?: any;
};

const MentionInput = ({
  value,
  onChange: propsOnChange,
  disabled = false,
  classes: propsClasses,
}: Props): JSX.Element => {
  const [suggestions, setSuggestions] = useState<iUser[]>([]);
  const classes = mergeClasses(defaultClasses, propsClasses);

  const onChange = (_: { target: { value: string } }, newValue: string) => {
    propsOnChange &&
      typeof propsOnChange === "function" &&
      propsOnChange(newValue || "");
  };

  const fetchUser = async (
    query: string,
    callback: (data: SuggestionDataItem[]) => void
  ) => {
    const data = await UserService.searchUser(query);
    setSuggestions(data);
    const transformedData = data.map((user: iUser) => ({
      display: user.name,
      id: user._id,
    }));
    callback(transformedData);
  };

  return (
    <div className={classes.root}>
      <LibMentionInput onChange={onChange} value={value} disabled={disabled}>
        <Mention
          trigger="@"
          data={fetchUser}
          displayTransform={(id: string, display: string) => {
            const user = suggestions.find((user: iUser) => user._id === id);
            if (!user) {
              return display;
            }
            return `<article>
              <img src="${user.avatar}" alt="${user.name}" />
              <span>{display}</span>
              
            </article>`;
          }}
          className={classes.mention}
          style={{
            maxHeight: "10rem",
            overflowY: "auto",
            padding: "0.5rem",
          }}
        />
      </LibMentionInput>
    </div>
  );
};

export default MentionInput;
