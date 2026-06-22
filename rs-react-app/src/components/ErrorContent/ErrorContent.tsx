type Props = {
  message: string;
};

export const ErrorContent = ({ message }: Props) => {
  return (
    <div className="text-fuchsia-400 font-bold text-lg my-12">{message}</div>
  );
};
