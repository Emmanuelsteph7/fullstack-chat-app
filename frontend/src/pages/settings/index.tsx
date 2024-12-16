import Container from "../../components/container";
import Navbar from "../../components/navbar";
import { THEME } from "../../constants/theme";
import { useThemeStore } from "../../store/useThemeStore";
import cs from "classnames";
import { Check } from "lucide-react";

const Settings = () => {
  const { setTheme, theme } = useThemeStore();
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen">
        <Container>
          <div className="w-full max-w-[1000px] mx-auto rounded-lg lg:px-6 lg:py-6">
            <h2 className="mb-1 text-[24px] font-semibold">Theme</h2>
            <p className="mb-8">Choose a theme for your chat interface</p>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5">
              {THEME.map((t) => (
                <div className="relative rounded-lg" data-theme={t}>
                  {theme === t && (
                    <div className="absolute top-0 left-[50%] translate-x-[-50%] w-[30px] h-[30px] flex items-center justify-center">
                      <Check className="" />
                    </div>
                  )}
                  <button
                    className={cs(
                      "flex w-full rounded-lg overflow-hidden duration-150 items-center flex-col",
                      {
                        "bg-base-200 opacity-50": theme === t,
                        "hover:bg-base-200/50 hover:scale-110 transform":
                          theme !== t,
                      }
                    )}
                    onClick={() => setTheme(t)}
                  >
                    <div className="flex w-full items-center">
                      <div className="flex-1 h-[25px] bg-primary"></div>
                      <div className="flex-1 h-[25px] bg-secondary"></div>
                      <div className="flex-1 h-[25px] bg-accent"></div>
                      <div className="flex-1 h-[25px] bg-neutral"></div>
                    </div>
                    <h5 className="text-[12px] truncate">
                      {t[0].toUpperCase()}
                      {t.slice(1)}
                    </h5>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Settings;
