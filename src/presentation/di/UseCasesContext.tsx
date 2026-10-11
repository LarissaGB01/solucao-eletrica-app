import { createContext, type ReactNode, useContext } from 'react';

import type { DimensionarCabeamento } from '../../application/cabeamento/DimensionarCabeamento';
import type { DimensionarDisjuntor } from '../../application/disjuntor/DimensionarDisjuntor';
import type { DimensionarEletroduto } from '../../application/eletroduto/DimensionarEletroduto';

/** Public surface only, so tests can pass plain fakes. */
export type UseCases = {
  dimensionarCabeamento: Pick<DimensionarCabeamento, 'execute'>;
  dimensionarDisjuntor: Pick<DimensionarDisjuntor, 'execute'>;
  dimensionarEletroduto: Pick<DimensionarEletroduto, 'execute'>;
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
