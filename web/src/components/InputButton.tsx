import * as R from 'ramda';

type Props = {
  content?: React.ReactNode | string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
};

const InputButton: React.FC<Props> = ({ content, onClick }) => {
  if (R.isNil(content)) {
    return null;
  }

  return (
    <button
      type="submit"
      className="main-input-button"
      onClick={async (e) => {
        e.preventDefault();
        await onClick(e);
      }}
    >
      {content}
    </button>
  );
};

export default InputButton;
