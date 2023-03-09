import type * as euitypes from '@elastic/eui';
import { ReactNode } from 'react';
import { vi } from 'vitest';

// TODO: this is global, we could have problems with parallel tests
let mocksActivated = false;
export const activateEuiMocks = () => {
  mocksActivated = true;
};
export const deactivateEuiMocks = () => {
  mocksActivated = false;
};

export async function mockEui() {
  const eui = (await vi.importActual('@elastic/eui')) as typeof euitypes;

  type TypeOfEui = typeof eui;
  type KeysOfEui = keyof TypeOfEui;
  type ValuesOfEui = TypeOfEui[KeysOfEui];

  const mockedEui = { ...eui };
  Object.entries(mockedEui).forEach(([key, value]) => {
    const name = key as KeysOfEui;
    if (
      typeof name === 'string' &&
      name.startsWith('Eui') &&
      typeof value === 'function'
    ) {
      // TODO: the objective is to mock the UI components, not everything that starts with Eui
      mockedEui[name] = mockComponent(name, value) as never;
    }
  });

  function mockComponent(name: string, value: ValuesOfEui) {
    // this component returns the mocked component or the original one depending on the mocksActivated flag
    return function ({ children, ...props }: { children: ReactNode }) {
      if (mocksActivated) {
        return <MockedEuiComponent {...props}>{children}</MockedEuiComponent>;
      }
      return typeof value === 'function'
        ? value({ children, ...props }) // TODO: typescript warns us that we are treating everything as a component, they are right
        : value;
    };

    // this is the component we render instead when mocks are active
    function MockedEuiComponent({
      children,
      ...props
    }: {
      children: ReactNode;
    }) {
      return (
        <div role={name} {...props}>
          {children}
        </div>
      );
    }
  }
  return { ...mockedEui };
}
