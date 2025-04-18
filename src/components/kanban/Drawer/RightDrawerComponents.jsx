import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import MyTextField from "../../MyTextfield/MyTextfield";

function RightDrawerComponents(){
  return <>
  
  </>
}

export default RightDrawerComponents;

export const RightDrawerContent = () => {
  const tabValues = [
    {
      key: 1,
      value: "overview",
      label: "Overview",
    },
    {
      key: 2,
      value: "subtasks",
      label: "Subtasks",
    },
    {
      key: 3,
      value: "Comments (0)",
      label: "comments",
    },
  ];
  const [value, setValue] = useState("overview");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Box
          sx={{ width: "100%", background: "#F4F6F8" }}
          className="editTask_tabs"
          padding={1}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            variant="fullWidth"
            sx={{
              background: "#F4F6F8",
            }}
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
          >
            {tabValues.map((tab) => (
              <Tab
                disableRipple
                key={tab?.key}
                value={tab?.value}
                label={tab?.label}
                sx={{
                  color: "#637381 !important",
                  fontWeight: "600",
                  fontSize: "14px",
                  textTransform: "none",
                  padding: "8px 0px",
                  borderRadius: "8px",
                  margin: "0px",
                  zIndex: 1,
                  backgroundSize: "200% 100%",
                  backgroundPosition: "right center",
                  backgroundImage:
                    "linear-gradient(to right, #FFFFFF 50%, transparent 50%)",
                  transition: "background-position 0.4s ease, color 0.3s ease",
                  "&.Mui-selected": {
                    backgroundPosition: "left center",
                    color:"#1C252E !important",
                  },
                  "&:hover": {},
                }}
              />
            ))}
          </Tabs>
        </Box>
        <Box padding={"24px 20px"}>
          <Box display={"flex"} flexDirection={"column"} gap={3}>
            <Box>
              <Typography
                fontSize={18}
                fontWeight={600}
                padding={"4px 0px 5px"}
                color="#1C252E"
              >
                Title name
              </Typography>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              className="editTask__reporterBox"
            >
              <Typography
                fontWeight={600}
                fontSize={"0.75rem"}
                width={"100px"}
                flexShrink={0}
                color="#637381"
              >
                Reporter
              </Typography>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Box
                  width={40}
                  height={40}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"50%"}
                  fontSize={"1.25rem"}
                  overflow={"hidden"}
                >
                  <img
                    src="https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-17.webp"
                    alt="user"
                    style={{
                      width: "100%",
                      height: "100%",
                      color: "transparent",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              className="editTask__assigneeBox"
            >
              <Typography
                fontWeight={600}
                fontSize={"0.75rem"}
                width={"100px"}
                flexShrink={0}
                color="#637381"
              >
                Assignee
              </Typography>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Box
                  width={40}
                  height={40}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"50%"}
                  fontSize={"1.25rem"}
                  overflow={"hidden"}
                >
                  <img
                    src="https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-17.webp"
                    alt="user"
                    style={{
                      width: "100%",
                      height: "100%",
                      color: "transparent",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  width={40}
                  height={40}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"50%"}
                  fontSize={"1.25rem"}
                  overflow={"hidden"}
                >
                  <img
                    src="	https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-2.webp"
                    alt="user"
                    style={{
                      width: "100%",
                      height: "100%",
                      color: "transparent",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  width={40}
                  height={40}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"50%"}
                  fontSize={"1.25rem"}
                  overflow={"hidden"}
                >
                  <img
                    src="https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-3.webp"
                    alt="user"
                    style={{
                      width: "100%",
                      height: "100%",
                      color: "transparent",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  width={40}
                  height={40}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"50%"}
                  fontSize={"1.25rem"}
                  overflow={"hidden"}
                >
                  <img
                    src="https://api-prod-minimal-v700.pages.dev/assets/images/avatar/avatar-4.webp"
                    alt="user"
                    style={{
                      width: "100%",
                      height: "100%",
                      color: "transparent",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  width={40}
                  height={40}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"50%"}
                  fontSize={"1.25rem"}
                  overflow={"hidden"}
                  padding={"8px"}
                  border={"1px dashed rgba(145 158 171 / 0.2)"}
                  sx={{
                    cursor: "pointer",
                    background: "rgba(145,158,171,0.08)",
                  }}
                >
                  <img
                    src="/addAssignIcon.svg"
                    alt="add assignee"
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "transparent",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              className="editTask__labelsBox"
            >
              <Typography
                fontWeight={600}
                fontSize={"0.75rem"}
                width={"100px"}
                flexShrink={0}
                color="#637381"
              >
                Labels
              </Typography>
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Box
                  sx={{
                    height: "24px",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(0,184,217,0.16)",
                    whiteSpace: "nowrap",
                    transition:
                      "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);",
                    padding: "0px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      paddingInline: "8px",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      color: "#006C9C",
                    }}
                  >
                    Technology
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "24px",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(0,184,217,0.16)",
                    whiteSpace: "nowrap",
                    transition:
                      "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);",
                    padding: "0px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      paddingInline: "8px",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      color: "#006C9C",
                    }}
                  >
                    Health and Wellness
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "24px",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(0,184,217,0.16)",
                    whiteSpace: "nowrap",
                    transition:
                      "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);",
                    padding: "0px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      paddingInline: "8px",
                      whiteSpace: "nowrap",
                      fontSize: "13px",
                      color: "#006C9C",
                    }}
                  >
                    Finance
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              className="editTask__dueDateBox"
            >
              <Typography
                fontWeight={600}
                fontSize={"0.75rem"}
                width={"100px"}
                flexShrink={0}
                color="#637381"
              >
                Due date
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={30}
                padding={"4px"}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#1C252E",
                    fontSize: "13px",
                  }}
                >
                  23-24 Apr 2025
                </Typography>
              </Box>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              className="editTask__priorityBox"
            >
              <Typography
                fontWeight={600}
                fontSize={"0.75rem"}
                width={"100px"}
                flexShrink={0}
                color="#637381"
              >
                Priority
              </Typography>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    padding: "4px 10px 4px 6px",
                    borderRadius: "8px",
                    boxShadow: "inset 0 0 0 1px rgba(145,158,171,0.24)",
                  }}
                >
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      margin: "0px 4px 0px 0px",
                    }}
                  >
                    <img
                      src="/lowPriorityIcon.svg"
                      alt="low priority"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "capitalize",
                      color: "#1C252E",
                    }}
                  >
                    Low
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    padding: "4px 10px 4px 6px",
                    borderRadius: "8px",
                    boxShadow: "inset 0 0 0 1px rgba(145,158,171,0.24)",
                    border: "2px solid black",
                  }}
                >
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      margin: "0px 4px 0px 0px",
                    }}
                  >
                    <img
                      src="/meduimPriorityIcon.svg"
                      alt="low priority"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "capitalize",
                      color: "#1C252E",
                    }}
                  >
                    Medium
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    padding: "4px 10px 4px 6px",
                    borderRadius: "8px",
                    boxShadow: "inset 0 0 0 1px rgba(145,158,171,0.24)",
                  }}
                >
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      margin: "0px 4px 0px 0px",
                    }}
                  >
                    <img
                      src="/highPriorityIcon.svg"
                      alt="low priority"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "capitalize",
                      color: "#1C252E",
                    }}
                  >
                    High
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box display={"flex"} className="editTask__descriptionBox">
              <Typography
                fontWeight={600}
                fontSize={"0.75rem"}
                width={"100px"}
                flexShrink={0}
                color="#637381"
              >
                Description
              </Typography>
              <Box width={"100%"}>
                <MyTextField
                label=""
                  multiline={true}
                  rows={4}
                  boxShadow="inset 0 0 0 1px rgba(145,158,171,0.24)"
                  borderColor="transparent"
                  fullWidth={true}
                  hoverBorderColor={'#1C252E'}
                />
              </Box>
            </Box>
            <Box display={"flex"} className="editTask__attachmentsBox">
              <Typography
                fontWeight={600}
                fontSize={"0.75rem"}
                width={"100px"}
                flexShrink={0}
                color="#637381"
              >
                Attachments
              </Typography>
              <Box sx={{
                width:"64px",
                height:"64px",
                flexShrink:0,
                display:"flex",
                justifyContent:'center',
                alignItems:"center",
                borderRadius:"8px",
                cursor:"pointer",
                color:"#919EAB",
                background:"rgba(145,158,171,0.08)",
                border:"rgba(145,158,171,0.16)"
              }}>
               <img src="/attachmentsIcon.svg" alt="attachments" style={{widows:"28px",height:"28px"}} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
