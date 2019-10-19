import React, { useEffect } from 'react';

import { useOvermind } from 'app/overmind';
import { WorkspaceInputContainer } from '../../../elements';

import { EnvEntry } from './EnvEntry';
import { EnvModal } from './EnvModal';

export const EnvironmentVariables = () => {
  const {
    actions: {
      editor: {
        fetchEnvironmentVariables,
        updateEnvironmentVariables,
        deleteEnvironmentVariable,
      },
    },
    state: {
      editor: {
        currentSandbox: { environmentVariables },
      },
    },
  } = useOvermind();

  useEffect(() => {
    fetchEnvironmentVariables();
  }, [fetchEnvironmentVariables]);

  const createEnv = ({ name, value }) => {
    updateEnvironmentVariables({ name, value });
  };

  const deleteEnv = name => {
    deleteEnvironmentVariable({ name });
  };

  const envVars = environmentVariables;

  if (!envVars) {
    return (
      <WorkspaceInputContainer>
        <div style={{ fontStyle: 'italic' }}>Loading...</div>
      </WorkspaceInputContainer>
    );
  }

  return (
    <div>
      {Object.keys(envVars.toJSON ? envVars.toJSON() : envVars).map(keyName => (
        <EnvEntry
          onSubmit={createEnv}
          onDelete={deleteEnv}
          key={keyName}
          name={keyName}
          value={
            typeof envVars.get === 'function'
              ? envVars.get(keyName)
              : envVars[keyName]
          }
        />
      ))}

      <WorkspaceInputContainer style={{ flexDirection: 'column' }}>
        <EnvModal onSubmit={createEnv} />
      </WorkspaceInputContainer>
    </div>
  );
};
