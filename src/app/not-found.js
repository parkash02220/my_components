import PageNotFound from "@/components/PageNotFound";
import { Box } from "@mui/material";

export default function NotFound() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PageNotFound />
      </Box>
    </>
  );
}
