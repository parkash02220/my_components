import { Typography } from "@mui/material";
import { getFullName } from "@/utils";

export const getRenderOptions = (type) => {
  switch (type) {
    case "all_users":
    case "chatroom_users":
      return (props, option) => {
        const { key, ...rest } = props;
        return (
          <li
            key={option?.id || key}
            {...rest}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={option?.avatar || "/dummyUser.svg"}
              alt={option?.firstName}
              referrerPolicy="no-referrer"
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                borderRadius: "50%",
              }}
            />
            <Typography>
              {getFullName(option.firstName, option.lastName)}
            </Typography>
          </li>
        );
      };

    default:
      return (props, option) => (
        <li key={option?.id || props.key} {...props}>
          {option?.name || "Unknown"}
        </li>
      );
  }
};
