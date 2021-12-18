import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import InputButton from './inputButton';

type FormUtils = {
  setError: (str: string) => void;
  hideError: () => void;
};

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  error?: string;
  errorDismissTimeout?: number;
  rightButtonContent: React.ReactNode | string;
  footerContent?: (utils: FormUtils) => React.ReactNode;
  additionalContent?: React.ReactNode;
  handleSubmit: (str: string, utils: FormUtils) => Promise<void>;
  isLoading?: boolean;
  isOpen: boolean;
};

const OneInputForm = ({
  rightButtonContent,
  handleSubmit,
  isOpen,
  error: _error,
  errorDismissTimeout,
  additionalContent,
  footerContent,
  isLoading,
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

  const wrapperClass = 'form-main-input-wrapper';
  const errorWrapperClass = 'form-main-input-wrapper form-main-input-wrapper-error';

  return (
    <div className="centered-content-block">
      <form>
        <div className="flex flex-col">
          <div className={error && showError ? errorWrapperClass : wrapperClass}>
            <input
              ref={(input) => {
                ref.current.input = input;
                return input;
              }}
              value={value}
              className="form-main-input"
              {...props}
              onChange={(e) => {
                setShowError(false);
                setValue(e.target.value);
              }}
            />
            {additionalContent}
            <InputButton
              content={rightButtonContent}
              isLoading={isLoading}
              onClick={async () => {
                setShowError(false);
                await handleSubmit(value, {
                  setError: setErrorCallback,
                  hideError: () => setShowError(false),
                });
              }}
            />
          </div>
          <p
            className={
              error && showError ? 'form-main-input-error' : 'form-main-input-error opacity-0'
            }
          >
            {error || <span className="invisible">dummy</span>}
          </p>
        </div>
      </form>
      {footerContent &&
        footerContent({ setError: setErrorCallback, hideError: () => setShowError(false) })}
    </div>
  );
};

export type { FormUtils };
export default OneInputForm;
