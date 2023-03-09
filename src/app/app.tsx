import { EuiProvider, EuiText } from '@elastic/eui';
import CustomContainer from 'src/custom-container';

export function App() {
  return (
    <EuiProvider>
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          height: '100vh',
          alignContent: 'center',
        }}
      >
        <EuiText>
          <h1>How to mock Eui components in other app snapshots</h1>
          <p>
            There is a eui-mock.tsx file that returns the Eui components mocked.
            The objective is to prevent apps that use Eui and snapshot testing
            to fail when changes in Eui components happen
          </p>
          <p>
            Please look custom-container.spec.tsx to see how to use the mocks
          </p>
          <p></p>
        </EuiText>
        <CustomContainer>
          <CustomContainer>Hello World</CustomContainer>
        </CustomContainer>
      </div>
    </EuiProvider>
  );
}

export default App;
