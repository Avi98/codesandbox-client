import React, { useEffect } from 'react';
import Centered from '@codesandbox/common/lib/components/flex/Centered';
import MaxWidth from '@codesandbox/common/lib/components/flex/MaxWidth';
import Margin from '@codesandbox/common/lib/components/spacing/Margin';
import { Navigation } from 'app/pages/common/Navigation';
import { inject, hooksObserver } from 'app/componentConnectors';
import { CreateSandbox } from 'app/components/CreateNewSandbox/CreateSandbox';

const NewSandbox = ({ signals: { sandboxPageMounted } }) => {
  useEffect(() => {
    sandboxPageMounted();
  }, [sandboxPageMounted]);

  return (
    <MaxWidth
      css={`
        height: 100vh;
      `}
    >
      <Margin horizontal={1.5} style={{ height: '100%' }} vertical={1.5}>
        <Navigation title="New Sandbox" />

        <Margin top={5}>
          <Centered horizontal vertical>
            <Margin style={{ maxWidth: '100%', width: 900 }} top={2}>
              <CreateSandbox />
            </Margin>
          </Centered>
        </Margin>
      </Margin>
    </MaxWidth>
  );
};

export default inject('signals')(hooksObserver(NewSandbox));
