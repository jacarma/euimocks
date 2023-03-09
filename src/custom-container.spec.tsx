import { vi } from 'vitest'; // I'm using vitest, but jest should work very similar
import { mockEui, activateEuiMocks, deactivateEuiMocks } from './eui-mocks';
vi.doMock('@elastic/eui', mockEui); // this needs to be done before importing the components
import CustomContainer from './custom-container';
import renderer from 'react-test-renderer';
import { EuiButton } from '@elastic/eui';

const nestedCustomAndEuiComponents = (
  <CustomContainer>
    <CustomContainer>Hello World</CustomContainer>
  </CustomContainer>
);

const button = (
  <EuiButton color="primary" fill>
    I'm a button
  </EuiButton>
);

describe('EuiButton', async () => {
  it('serialize with mocks', () => {
    // this snapshot shows <div role="EuiButton" color="primary" fill>I'm a button</div>
    // just the component name, props and children)
    activateEuiMocks();
    expect(renderer.create(button).toJSON()).toMatchSnapshot();
  });
  it('serialize without mocks', () => {
    // this snapshows shows <button className="..." disabled={false} type="button"><span className="..."><span className="eui-textTruncate">I'm a button</span></span></button>
    // the whole rendered component
    deactivateEuiMocks();
    expect(renderer.create(button).toJSON()).toMatchSnapshot();
  });
});

describe('custom-container', async () => {
  // we need to include the children in the mocks or we loose anything iside the EuiPanel
  // everything rendered inside the custom component is rendered completely. But the Eui components are mocked
  it('serialize with mocks', () => {
    activateEuiMocks();
    expect(
      renderer.create(nestedCustomAndEuiComponents).toJSON()
    ).toMatchSnapshot();
  });
  it('serialize without mocks', () => {
    deactivateEuiMocks();
    expect(
      renderer.create(nestedCustomAndEuiComponents).toJSON()
    ).toMatchSnapshot();
  });
});
