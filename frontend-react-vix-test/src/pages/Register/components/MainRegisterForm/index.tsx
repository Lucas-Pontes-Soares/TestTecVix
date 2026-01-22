import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../stores/useZTheme";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { TextRob20Font1MC } from "../../../../components/Text1MC";
import { RegisterForm } from "./RegisterForm";
import { Contact } from "./Contact";
import { SwithLanguages } from "../../../../components/SwithLanguages";
import { SwithThemeMode } from "../../../../components/SwithThemeMode";
import { LogoBrand } from "../../../../components/LogoBrand";
import { TextRob18Font2M } from "../../../../components/Text2M";
import { Link } from "react-router-dom";
import { useRegister } from "../../../../hooks/useRegister";
import { useZBrandInfo } from "../../../../stores/useZBrandStore";
import { NewOnVituaX } from "../../../Login/components/MainLoginForm/NewOnVituaX";
import { InstallButton } from "../../../Login/components/MainLoginForm/InstallButton"; 

export const MainRegisterForm = () => {
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const { goRegister } = useRegister();
  const { idBrand } = useZBrandInfo();

  return (
    <Stack
      className="h-full"
      sx={{
        width: "100%",
        maxWidth: "482px",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      {/* Switch mode and languages */}
      <Stack
        sx={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "16px",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <SwithLanguages keepShow />
        <SwithThemeMode />
      </Stack>
      {/* Logo */}
      <Stack
        sx={{
          width: "100%",
        }}
      >
        <LogoBrand sx={{ width: "fit-content" }} />
      </Stack>
      {/* Login form */}
      <RegisterForm
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
      />
      {/* Register button */}
      <Button
        onClick={() =>
          goRegister({ username, password, email, confirmPassword })
        }
        sx={{
          width: "100%",
          marginTop: "8px",
          height: "48px",
          borderRadius: "12px",
          backgroundColor: theme[mode].blue,
          textTransform: "none",
        }}
      >
        <TextRob20Font1MC
          sx={{
            color: theme[mode].btnText,
          }}
        >
          {t("loginRegister.register")}
        </TextRob20Font1MC>
      </Button>
      {/* Back to login page */}
      <Link to="/login" className="py-3">
        <TextRob18Font2M
          sx={{
            color: theme[mode].blue,
          }}
        >
          {t("loginRegister.loginPage")}
        </TextRob18Font2M>
      </Link>
      {/* New on Brand (unless vituax)? */}
      {Boolean(idBrand) && <NewOnVituaX />}
      {/* Brand - Contact - Terms and policy */}
      {/* Install button */}
      <InstallButton />
      {idBrand === null && <Contact />}
    </Stack>
  );
};
