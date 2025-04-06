import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { ThumbUp, ThumbDown, Visibility, Share } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const ShortsCard = ({
  video,
  title,
  description,
  likes,
  dislikes,
  views,
  bgColor,
  actions,
  styleProps = {},
  tootTipProps = {},
  loading,
}) => {
  const {
    handleLike,
    handleDislike,
    handleView,
    handleShare,
    handleSubscribe,
    handleMenu,
  } = actions || {};
  const {
    cardStyles,
    cardLeftBoxStyles,
    videoBoxStyles,
    myLogoStyles,
    myTitleStyles,
    subscribeBtnStyles,
    shortTitleStyles,
    shortDesStyles,
    cardRightBoxStyles,
    cardBtnBoxStyles,
    cardIconStyles,
    cardIconLogoStyles,
    loadingBoxStyles,
  } = styleProps;
  const {
    likeBtn_title,
    likeBtn_placement,
    dislikeBtn_title,
    dislikeBtn_placement,
    viewBtn_title,
    viewBtn_placement,
    shareBtn_title,
    shareBtn_placement,
  } = tootTipProps;
  return (
    <Card
      sx={{
        width: cardStyles.width,
        height: cardStyles.height,
        backgroundColor: cardStyles.bgColor,
        display: "flex",
        flexDirection: cardStyles.flexDirection,
        justifyContent: cardStyles.justifyContent,
        alignItems: cardStyles.alignItems,
        color: cardStyles.color,
        position: "relative",
        border: cardStyles.border,
        ...cardStyles.sx,
        // borderTopLeftRadius: "20px",
        // borderBottomLeftRadius: "20px",
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "0px !important",
        }}
      >
        {loading ? (
          <Box
            width={loadingBoxStyles.width}
            display={loadingBoxStyles.display}
            alignItems={loadingBoxStyles.alignItems}
            justifyContent={loadingBoxStyles.justifyContent}
            bgcolor={loadingBoxStyles.bgcolor}
            padding={loadingBoxStyles.padding}
            sx={{
              borderRadius: loadingBoxStyles.borderRadius,
              position: "relative",
              boxShadow: loadingBoxStyles.boxShadow,
              color: loadingBoxStyles.color,
              ...loadingBoxStyles.sx,
            }}
          >
            <CircularProgress color={"inherit"} />
          </Box>
        ) : (
          <Box
            className="left"
            display={"flex"}
            flexDirection={cardLeftBoxStyles.flexDirection}
            alignItems={cardLeftBoxStyles.alignItems}
            justifyContent={cardLeftBoxStyles.justifyContent}
            bgcolor={bgColor || cardLeftBoxStyles.bgcolor}
            flex={1}
            padding={cardLeftBoxStyles.padding}
            gap={cardLeftBoxStyles.gap}
            sx={{
              borderRadius: cardLeftBoxStyles.borderRadius,
              position: "relative",
              boxShadow: cardLeftBoxStyles.boxShadow,
              marginLeft: cardLeftBoxStyles.ml,
              ...cardLeftBoxStyles.sx,
            }}
          >
            <Box
              sx={{
                width: videoBoxStyles.width,
                height: videoBoxStyles.height,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                position: "absolute",
                borderRadius: videoBoxStyles.borderRadius,
                // borderBottomRightRadius: "20px",
                top: 0,
                left: 0,
                ...videoBoxStyles.sx,
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
            <Box
              display={"flex"}
              gap={"8px"}
              width={"100%"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <IconButton
                sx={{
                  width: myLogoStyles.width,
                  height: myLogoStyles.height,
                  borderRadius: myLogoStyles.borderRadius,
                  background: myLogoStyles.background,
                  ...myLogoStyles.sx,
                }}
              >
                <YouTubeIcon
                  sx={{
                    color: myLogoStyles.iconColor,
                    fontSize: myLogoStyles.iconSize,
                  }}
                />
              </IconButton>
              <Typography
                zIndex={1}
                fontSize={myTitleStyles.fontSize}
                color={myTitleStyles.color}
                sx={{ ...myTitleStyles.sx }}
              >
                My Shorts
              </Typography>
              <Button
                sx={{
                  color: subscribeBtnStyles.color,
                  background: subscribeBtnStyles.background,
                  borderRadius: subscribeBtnStyles.borderRadius,
                  fontWeight: subscribeBtnStyles.fontWeight,
                  height: subscribeBtnStyles.height,
                  textTransform: subscribeBtnStyles.textTransform,
                  fontSize: subscribeBtnStyles.fontSize,
                  "&:hover": {
                    background: subscribeBtnStyles.hoverBackground,
                  },
                  ...subscribeBtnStyles.sx,
                }}
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </Box>
            <Box
              display={"flex"}
              width={"100%"}
              flexDirection={"column"}
              alignItems={"start"}
            >
              <Typography
                fontWeight={shortTitleStyles.fontWeight}
                zIndex={1}
                sx={{
                  color: shortTitleStyles.color,
                  fontSize: shortTitleStyles.fontSize,
                  ...shortTitleStyles.sx,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant={shortDesStyles.variant}
                sx={{
                  opacity: 0.8,
                  color: shortDesStyles.color,
                  fontSize: shortDesStyles.fontSize,
                  ...shortDesStyles.sx,
                }}
              >
                {description}
              </Typography>
            </Box>
          </Box>
        )}
        <Box
          className="right"
          display={"flex"}
          flexDirection={cardRightBoxStyles.flexDirection}
          alignItems={cardRightBoxStyles.alignItems}
          justifyContent={cardRightBoxStyles.justifyContent}
          p={cardRightBoxStyles.p}
          bgcolor={cardRightBoxStyles.bgcolor}
          gap={cardRightBoxStyles.gap}
          sx={{
            width: cardRightBoxStyles.width,
            ...cardRightBoxStyles.sx,
          }}
        >
          <Box
            display={cardBtnBoxStyles.display}
            flexDirection={cardBtnBoxStyles.flexDirection}
            justifyContent={cardBtnBoxStyles.justifyContent}
            alignItems={cardBtnBoxStyles.alignItems}
            gap={cardBtnBoxStyles.gap}
            sx={{ ...cardBtnBoxStyles.sx }}
          >
            <Tooltip title={likeBtn_title} placement={likeBtn_placement}>
              <IconButton
                sx={{
                  backgroundColor: cardIconStyles.bgcolor,
                  color: cardIconStyles.color,
                  width: cardIconStyles.width,
                  height: cardIconStyles.height,
                  "&:hover": { bgcolor: cardIconStyles.hoverBgcolor },
                  ...cardIconStyles.sx,
                }}
                onClick={handleLike}
              >
                <ThumbUp />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "14px", sm: "15px", md: "16px" },
              }}
            >
              {likes}
            </Typography>
          </Box>
          <Box
            display={cardBtnBoxStyles.display}
            flexDirection={cardBtnBoxStyles.flexDirection}
            justifyContent={cardBtnBoxStyles.justifyContent}
            alignItems={cardBtnBoxStyles.alignItems}
            gap={cardBtnBoxStyles.gap}
            sx={{ ...cardBtnBoxStyles.sx }}
          >
            <Tooltip title={dislikeBtn_title} placement={dislikeBtn_placement}>
              <IconButton
                sx={{
                  backgroundColor: cardIconStyles.bgcolor,
                  color: cardIconStyles.color,
                  width: cardIconStyles.width,
                  height: cardIconStyles.height,
                  "&:hover": { bgcolor: cardIconStyles.hoverBgcolor },
                  ...cardIconStyles.sx,
                }}
                onClick={handleDislike}
              >
                <ThumbDown />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "14px", sm: "15px", md: "16px" },
              }}
            >
              {dislikes}
            </Typography>
          </Box>
          <Box
            display={cardBtnBoxStyles.display}
            flexDirection={cardBtnBoxStyles.flexDirection}
            justifyContent={cardBtnBoxStyles.justifyContent}
            alignItems={cardBtnBoxStyles.alignItems}
            gap={cardBtnBoxStyles.gap}
            sx={{ ...cardBtnBoxStyles.sx }}
          >
            <Tooltip title={viewBtn_title} placement={viewBtn_placement}>
              <IconButton
                sx={{
                  backgroundColor: cardIconStyles.bgcolor,
                  color: cardIconStyles.color,
                  width: cardIconStyles.width,
                  height: cardIconStyles.height,
                  "&:hover": { bgcolor: cardIconStyles.hoverBgcolor },
                  ...cardIconStyles.sx,
                }}
                onClick={handleView}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "14px", sm: "15px", md: "16px" },
              }}
            >
              {views}
            </Typography>
          </Box>
          <Box
            display={cardBtnBoxStyles.display}
            flexDirection={cardBtnBoxStyles.flexDirection}
            justifyContent={cardBtnBoxStyles.justifyContent}
            alignItems={cardBtnBoxStyles.alignItems}
            gap={cardBtnBoxStyles.gap}
            sx={{ ...cardBtnBoxStyles.sx }}
          >
            <Tooltip title={shareBtn_title} placement={shareBtn_placement}>
              <IconButton
                sx={{
                  backgroundColor: cardIconStyles.bgcolor,
                  color: cardIconStyles.color,
                  width: cardIconStyles.width,
                  height: cardIconStyles.height,
                  "&:hover": { bgcolor: cardIconStyles.hoverBgcolor },
                  ...cardIconStyles.sx,
                }}
                onClick={handleShare}
              >
                <Share />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            display={cardBtnBoxStyles.display}
            flexDirection={cardBtnBoxStyles.flexDirection}
            justifyContent={cardBtnBoxStyles.justifyContent}
            alignItems={cardBtnBoxStyles.alignItems}
            gap={cardBtnBoxStyles.gap}
            sx={{ ...cardBtnBoxStyles.sx }}
          >
            <IconButton
              sx={{
                backgroundColor: cardIconStyles.bgcolor,
                color: cardIconStyles.color,
                width: cardIconStyles.width,
                height: cardIconStyles.height,
                "&:hover": { bgcolor: cardIconStyles.hoverBgcolor },
                ...cardIconStyles.sx,
              }}
              onClick={handleMenu}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Box
            display={cardBtnBoxStyles.display}
            flexDirection={cardBtnBoxStyles.flexDirection}
            justifyContent={cardBtnBoxStyles.justifyContent}
            alignItems={cardBtnBoxStyles.alignItems}
            gap={cardBtnBoxStyles.gap}
            sx={{ ...cardBtnBoxStyles.sx }}
          >
            <IconButton
              sx={{
                width: cardIconLogoStyles.width,
                height: cardIconLogoStyles.height,
                borderRadius: cardIconLogoStyles.borderRadius,
                background: cardIconLogoStyles.background,
                ...cardIconLogoStyles.sx,
              }}
            >
              <YouTubeIcon
                sx={{
                  color: cardIconLogoStyles.color,
                  fontSize: cardIconLogoStyles.iconSize,
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShortsCard;
