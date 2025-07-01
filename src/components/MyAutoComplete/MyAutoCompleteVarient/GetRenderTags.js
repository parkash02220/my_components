import { Typography, Chip } from "@mui/material";
import { getFullName } from "@/utils";

export const getRenderTags = (type,screen) => {
  switch (type) {
    case "username": {
      const visibleTagNumber = screen.isXs ? 2 : 4;
      const UserNameRenderTags = (value, getTagProps) => {
        const visibleTags = value.slice(0, visibleTagNumber);
        return [
          ...visibleTags.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={option?.id || key}
                label={getFullName(option?.firstName, option?.lastName)}
                sx={{
                  fontSize:{xs:12,sm:13,lg:14},
                  maxWidth:{xs:"150px !important",sm:"300px !important"},
                  textOverflow:'ellipsis',
                  overflow:'hidden',
                  whiteSpace:'nowrap',
                }}
                {...tagProps}
              />
            );
          }),
          value.length > visibleTagNumber && (
            <Typography key="more" variant="primary">
              +{value.length - visibleTagNumber} more
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
