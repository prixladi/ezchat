import { HTMLInputTypeAttribute } from 'react';

type Props = {
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  'aria-label'?: string;
  rightButtonContent?: React.ReactNode | string;
};

const OneInputForm = ({ rightButtonContent, ...props }: Props) => (
  <form>
    <div className="main-input-wrapper">
      <input className="main-input" {...props} />
      {rightButtonContent && (
        <button
          type="submit"
          className="main-input-button"
          onClick={(e) => {
            e.preventDefault(), console.log(e);
          }}
        >
          {rightButtonContent}
        </button>
      )}
    </div>
  </form>
);

export default OneInputForm;
