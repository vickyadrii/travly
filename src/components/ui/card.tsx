export type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => {
  return <div className="border border-gray-100 p-6 rounded-md">{children}</div>;
};

export default Card;
