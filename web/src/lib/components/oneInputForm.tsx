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
  clearInput: () => void;
};

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  prefix?: string;
  rightButtonContent: React.ReactNode | string;
  additionalContent?: React.ReactNode;
  handleSubmit: (str: string, utils: FormUtils) => Promise<void>;
  isLoading?: boolean;
};

const OneInputForm = ({
  prefix,
  rightButtonContent,
  handleSubmit,
  additionalContent,
  isLoading,
  ...props
}: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null as unknown);
  const [showError, setShowError] = useState(true);
  const ref = useRef({} as { input: HTMLInputElement | null });

  const setErrorCallback = useCallback((err: string) => {
    setError(err);
    setShowError(true);
  }, []);

  useEffect(() => {
    setTimeout(() => ref.current.input?.focus(), 50);
  }, [ref]);

  const wrapperClass = 'form-main-input-wrapper';
  const errorWrapperClass = 'form-main-input-wrapper form-main-input-wrapper-error';

  const utils = {
    setError: setErrorCallback,
    hideError: () => setShowError(false),
    clearInput: () => setValue(''),
  };

  return (
    <div className="centered-content-block">
      <form>
        <div className="flex flex-col">
          <div className={error && showError ? errorWrapperClass : wrapperClass}>
            {prefix && <span className="form-main-input-prefix">{prefix}</span>}
            <input
              ref={(input) => {
                ref.current.input = input;
                return input;
              }}
              autoComplete="nope"
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
                await handleSubmit(value, utils);
              }}
            />
          </div>
          <p
            className={
              error && showError ? 'form-main-input-error' : 'form-main-input-error opacity-0'
            }
          >
            {showError && error}
          </p>
        </div>
      </form>
    </div>
  );
};

export type { FormUtils };
export default OneInputForm;
