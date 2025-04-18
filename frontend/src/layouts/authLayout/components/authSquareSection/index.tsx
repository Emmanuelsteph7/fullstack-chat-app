import cs from "classnames";
import useAuthSquareBoxes from "../../hooks/useAuthSquareBoxes";

const AuthSquareBoxes = () => {
  const { paragraph, title } = useAuthSquareBoxes();
  return (
    <div className="hidden flex-1 h-full lg:flex items-center bg-base-200">
      <div className="max-w-[300px] xl:max-w-[400px] mx-auto">
        <div className="grid grid-cols-3 mb-4 gap-2">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={cs("aspect-square bg-primary/10 rounded-2xl", {
                "animate-pulse": index % 2,
              })}
            />
          ))}
        </div>
        <h3 className="text-center font-semibold text-[24px]">{title}</h3>
        <p className="text-center">{paragraph}</p>
      </div>
    </div>
  );
};

export default AuthSquareBoxes;
