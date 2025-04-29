import { styled, Tooltip, tooltipClasses } from "@mui/material";

const CustomTooltip = styled(({ bgcolor,className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme,bgcolor }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: bgcolor || "rgba(0,0,0,0.8)",
    color: "white",
    borderRadius: "8px",
    fontSize: "0.687rem",
    padding: "4px 8px",
    fontWeight: 500,
  },
}));

const MyTooltip = ({ children, title = "",content, placement = "bottom",bgColor }) => {
  console.log(":title",title)
  if ((!title || title.trim() === "") && !content) return children;
  return (
    <>
      <CustomTooltip title={content || title} placement={placement} bgcolor={bgColor} PopperProps={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -6],
            },
          },
        ],
      }}>
        {children}
      </CustomTooltip>
    </>
  );
};

export default MyTooltip;
