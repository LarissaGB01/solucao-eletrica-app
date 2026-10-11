import { createContext, type ReactNode, useContext } from 'react';

import type { DimensionarCabeamento } from '../../application/cabeamento/DimensionarCabeamento';

/** Public surface only, so tests can pass plain fakes. */
export type UseCases = {
  dimensionarCabeamento: Pick<DimensionarCabeamento, 'execute'>;
};

const UseCasesContext = createContext<UseCases | null>(null);

export function UseCasesProvider({
  value,
  children,
}: {
  value: UseCases;
  children: ReactNode;
}) {
  return (
    <UseCasesContext.Provider value={value}>
      {children}
    </UseCasesContext.Provider>
  );
}

export function useUseCases(): UseCases {
  const useCases = useContext(UseCasesContext);
  if (!useCases) {
    throw new Error('useUseCases must be used inside <UseCasesProvider>');
  }
  return useCases;
}
