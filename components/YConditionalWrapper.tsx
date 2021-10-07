interface Props {
  children?: React.ReactNode;
  condition?: boolean;
  wrapper?: React.FC<any>;
}

/**
 * Util component, wraps children with proveded wrapper component based on condition passed as prop
 * @param param0 {children, condition, wrapper}
 * @returns
 */
const YConditionalWrapper = ({
  children,
  condition = true,
  wrapper = ({ children }) => <>{children}</>,
}: Props) => (condition ? wrapper({ children }) : <>{children}</>);

export default YConditionalWrapper;
