import { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';

type Props = {
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  'aria-label'?: string;
  rightButtonContent?: React.ReactNode | string;
  onSubmit: (str: string) => Promise<void>;
  isOpen: boolean;
};

const OneInputForm = ({ rightButtonContent, onSubmit, isOpen, ...props }: Props) => {
  const [state, setState] = useState('' as string);
  const ref = useRef({} as { input: HTMLInputElement | null });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => ref.current.input?.focus(), 50);

      if (props.type === 'password') {
        setState('');
      }
    }
  }, [ref, isOpen, props.type]);

  return (
    <form>
      <div className="main-input-wrapper">
        <input
          ref={(input) => (ref.current.input = input)}
          value={state}
          className="main-input"
          {...props}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
        {rightButtonContent && (
          <button
            type="submit"
            className="main-input-button"
            onClick={async (e) => {
              e.preventDefault();
              await onSubmit(state);
            }}
          >
            {rightButtonContent}
          </button>
        )}
      </div>
    </form>
  );
};

export default OneInputForm;
