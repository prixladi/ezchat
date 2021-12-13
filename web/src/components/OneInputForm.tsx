import { HTMLInputTypeAttribute, useCallback, useEffect, useRef, useState } from 'react';
import * as R from 'ramda';
import InputButton from './InputButton';

type FormUtils = {
  setError: (str: string) => void;
};

type Props = {
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  error?: string;
  errorDismissTimeout?: number;
  'aria-label'?: string;
  rightButtonContent?: React.ReactNode | string;
  footerContent?: React.ReactNode | string;
  onSubmit: (str: string, utils: FormUtils) => Promise<void>;
  isOpen: boolean;
};

const OneInputForm = ({
  rightButtonContent,
  onSubmit,
  isOpen,
  error: _error,
  errorDismissTimeout,
  footerContent,
  ...props
}: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(_error);
  const [showError, setShowError] = useState(true);
  const ref = useRef({} as { input: HTMLInputElement | null });

  const setErrorCallback = useCallback((err: string) => {
    setError(err);
    setShowError(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => ref.current.input?.focus(), 50);

      if (props.type === 'password') {
        setValue('');
      }
    }
  }, [ref, isOpen, props.type]);

  const wrapperClass =
    'main-input-wrapper' + (error && showError ? ' main-input-wrapper-error' : '');

  return (
    <div className="centered-content-block">
      <form>
        <div className="flex flex-col">
          <div className={wrapperClass}>
            <input
              ref={(input) => (ref.current.input = input)}
              value={value}
              className="main-input"
              {...props}
              onChange={(e) => {
                setShowError(false);

                setValue(e.target.value);
              }}
            />
            <InputButton
              content={rightButtonContent}
              onClick={async () => await onSubmit(value, { setError: setErrorCallback })}
            />
          </div>
          <p className={error && showError ? 'main-input-error' : 'main-input-error opacity-0'}>
            {error || <span className="invisible">dummy</span>}
          </p>
        </div>
      </form>
      {footerContent}
    </div>
  );
};

export type { FormUtils };
export default OneInputForm;
