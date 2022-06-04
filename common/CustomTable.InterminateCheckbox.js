import React from "react";
import { Checkbox } from "@material-ui/core";

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <Checkbox
        ref={resolvedRef}
        {...rest}
      />
    </>
  );
});

export default IndeterminateCheckbox;
