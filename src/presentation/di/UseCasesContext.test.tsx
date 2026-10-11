import { renderHook } from '@testing-library/react-native';

import { useUseCases } from './UseCasesContext';

describe('useUseCases', () => {
  it('fails loudly outside the provider', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    await expect(renderHook(() => useUseCases())).rejects.toThrow(
      'useUseCases must be used inside <UseCasesProvider>',
    );
  });
});
