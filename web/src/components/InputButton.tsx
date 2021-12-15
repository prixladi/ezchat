import { useState } from 'react';

type Props = {
  content: React.ReactNode | string;
  isLoading?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
};

const InputButton: React.FC<Props> = ({ content, isLoading, onClick }) => {
  const [submitting, setSubmitting] = useState(false);

  return (
    <button
      type="submit"
      disabled={submitting || isLoading}
      className="form-main-input-button"
      onClick={async (e) => {
        setSubmitting(true);
        try {
          e.preventDefault();
          await onClick(e);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {submitting || isLoading ? (
        <div className="form-spinner-wrapper">
          <div className="form-spinner" />
        </div>
      ) : (
        content
      )}
    </button>
  );
};

export default InputButton;
