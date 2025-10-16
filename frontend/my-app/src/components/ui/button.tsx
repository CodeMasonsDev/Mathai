import * as React from "react";
import Button from "@mui/material/Button";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; // sparkles icon
import Stack from "@mui/material/Stack";

interface Props {
  name: string;
  onGenerate: () => void;
}

export default function IconLabelButtons({ name, onGenerate }: Props) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button
        onClick={onGenerate}
        variant="contained"
        startIcon={<AutoAwesomeIcon />}
        sx={{
          background: "linear-gradient(90deg, #6A6FF5 0%, #8F9BFF 100%)",
          color: "#fff",
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: "9999px", // fully rounded
          paddingX: 3,
          paddingY: 1.5,
          fontSize: "1rem",
          boxShadow: "0 4px 12px rgba(106, 111, 245, 0.4)",
          "&:hover": {
            background: "linear-gradient(90deg, #5B63E6 0%, #7F8BFF 100%)",
            boxShadow: "0 6px 15px rgba(106, 111, 245, 0.5)",
          },
        }}
      >
        {name}
      </Button>
    </Stack>
  );
}
