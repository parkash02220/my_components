import { Typography, Chip } from "@mui/material";
import { getFullName } from "@/utils";

export const getRenderTags = (type) => {
  switch (type) {
    case "username": {
      const UserNameRenderTags = (value, getTagProps) => {
        const visibleTags = value.slice(0, 4);
        return [
          ...visibleTags.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={option?.id || key}
                label={getFullName(option?.firstName, option?.lastName)}
                {...tagProps}
              />
            );
          }),
          value.length > 4 && (
            <Typography key="more" fontSize={14}>
              +{value.length - 4} more
            </Typography>
          ),
        ];
      };

      UserNameRenderTags.displayName = "UserNameRenderTags";
      return UserNameRenderTags;
    }

    default: {
      const DefaultRenderTags = (value, getTagProps) =>
        value.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip key={option.id || key} label={option.name} {...tagProps} />
          );
        });

      DefaultRenderTags.displayName = "DefaultRenderTags";
      return DefaultRenderTags;
    }
  }
};
