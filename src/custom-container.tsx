import { EuiButton, EuiPanel, EuiText } from '@elastic/eui';
import { PropsWithChildren } from 'react';

export default ({ children }: PropsWithChildren) => {
  return (
    <EuiPanel>
      <EuiText>
        <h1>Custom Component</h1>
        <p>Some text</p>
      </EuiText>
      <EuiPanel color="subdued">{children}</EuiPanel>
      <EuiButton color="primary" fill>
        Button at the end
      </EuiButton>
    </EuiPanel>
  );
};
