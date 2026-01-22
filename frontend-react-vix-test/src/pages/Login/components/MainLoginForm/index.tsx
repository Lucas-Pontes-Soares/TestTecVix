import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../stores/useZTheme";
import { useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { TextRob20Font1MC } from "../../../../components/Text1MC";
import { LoginForm } from "./LoginForm";
import { KeepLogged } from "./KeepLogged";
import { NewOnVituaX } from "./NewOnVituaX";
import { Contact } from "./Contact";
import { SwithLanguages } from "../../../../components/SwithLanguages";
import { SwithThemeMode } from "../../../../components/SwithThemeMode";
// import { LogoBrand } from "../../../../components/LogoBrand";
import { useLogin } from "../../../../hooks/useLogin";
import { useZGlobalVar } from "../../../../stores/useZGlobalVar";
import { ModalUserNotActive } from "./ModalUserNotActive";
import { LogoBrand } from "../../../../components/LogoBrand";
import { useZBrandInfo } from "../../../../stores/useZBrandStore";
import { InstallButton } from "./InstallButton";
import { Link } from "react-router-dom";
import { TextRob18Font2M } from "../../../../components/Text2M";

export const MainLoginForm = () => {
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  const { isLoading, goLogin } = useLogin();
  const { isOpenModalUserNotActive, setIsOpenModalUserNotActive } =
    useZGlobalVar();
  const { idBrand } = useZBrandInfo();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSend = () => {
    goLogin({ username, password, email });
  };

  return (
    <>
      <Stack
        className=""
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
            marginBottom: "24px",
          }}
        >
          <SwithLanguages keepShow />
          <SwithThemeMode />
        </Stack>
        {/* Logo */}
        {/* <LogoBrand /> */}
        <Stack
          sx={{
            width: "100%",
          }}
        >
          <LogoBrand
            sx={{
              width: "fit-content",
            }}
          />
        </Stack>
        {/* Login form */}
        <LoginForm
          email={email}
          setEmail={setEmail}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onEnterPassword={() => handleSend()}
        />
        {/* Keep logged in and forgot password */}
        <KeepLogged checked={checked} handleChange={handleChange} />
        {/* Login button */}
        <Button
          onClick={() => handleSend()}
          sx={{
            width: "100%",
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "#4B5CB7",
            textTransform: "none",
          }}
        >
          {isLoading ? (
            <CircularProgress
              sx={{
                color: theme[mode].light,
              }}
            />
          ) : (
            <TextRob20Font1MC
              sx={{
                color: "#FFF",
              }}
            >
              {t("loginRegister.join")}
            </TextRob20Font1MC>
          )}
        </Button>
        {/* Go to register page */}
        <Link to="/register" className="py-3">
          <TextRob18Font2M
            sx={{
              color: theme[mode].blue,
            }}
          >
            {t("loginRegister.registerPage")}
          </TextRob18Font2M>
        </Link>
        {/* New on Brand (unless vituax)? */}
        {Boolean(idBrand) && <NewOnVituaX />}
        {/* Brand - Contact - Terms and policy */}
        {/* Install button */}
        <InstallButton />
        {idBrand === null && <Contact />}
      </Stack>
      {isOpenModalUserNotActive && (
        <ModalUserNotActive
          open={isOpenModalUserNotActive}
          onClose={() => setIsOpenModalUserNotActive(false)}
        />
      )}
    </>
  );
};
