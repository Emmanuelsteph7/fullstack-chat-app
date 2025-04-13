import cs from "classnames";

interface Props {
  isSender: boolean;
}

const DeletedMessage = ({ isSender }: Props) => {
  return (
    <div
      className={cs("italic flex text-[12px] mb-5", {
        "justify-end": isSender,
      })}
    >
      <p className="py-1 px-3 rounded-lg bg-primary-content text-primary w-max">
        This message was deleted
      </p>
    </div>
  );
};

export default DeletedMessage;
