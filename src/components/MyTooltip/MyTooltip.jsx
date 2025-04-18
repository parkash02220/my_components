import { styled, Tooltip, tooltipClasses } from "@mui/material";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(0,0,0,0.8)",
    color: "white",
    borderRadius: "8px",
    fontSize: "0.687rem",
    padding: "4px 8px",
    fontWeight: 500,
  },
}));

const MyTooltip = ({ children, title = "", placement = "" }) => {
  return (
    <>
      <CustomTooltip title={title} placement={placement}>
        {children}
      </CustomTooltip>
    </>
  );
};

export default MyTooltip;
