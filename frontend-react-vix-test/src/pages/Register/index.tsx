import { Stack } from "@mui/material";
import { Screen } from "../../components/Screen";
import { MainRegisterForm } from "./components/MainRegisterForm";

export const RegisterPage = () => {
  return (
    <Screen
      sx={{
        overflowY: "auto",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Register box */}
      <Stack
        className=""
        sx={{
          width: "100%",
          maxWidth: "700px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Main form */}
        <MainRegisterForm />
      </Stack>
    </Screen>
  );
};
